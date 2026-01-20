import os
import subprocess
import threading
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from auth import auth_bp
import yt_dlp

app = Flask(__name__)
CORS(app)

# Config
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth_bp, url_prefix='/auth')

# --- HELPER: Get Info ---
def get_video_info(url):
    """
    Checks if video is live and validates URL using yt-dlp
    """
    cookie_file = 'cookies.txt' if os.path.exists('cookies.txt') else None
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'cookiefile': cookie_file,
        # Fallback to Android if cookies fail or missing
        'extractor_args': {'youtube': {'player_client': ['android', 'web']}}
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return info.get('is_live', False), info.get('title', 'Unknown')
    except Exception as e:
        print(f"Info extraction failed: {e}")
        # Assume VOD if check fails, to allow pipeline to try anyway
        return False, "Unknown"

# --- 1. THE ROBUST PIPELINE FUNCTION ---
def run_pipeline(source, destination, loop_count, resolution):
    print(f"Preparing Pipeline for: {source}")
    
    # 1. Check if Live or VOD
    is_live, title = get_video_info(source)
    print(f"Detected: {title} | Live: {is_live} | Loop Setting: {loop_count}")

    # If Live, we force loop to 0 (cannot loop a live stream)
    # If VOD, we use the user's loop count
    total_runs = 1 if is_live else (int(loop_count) + 1)
    
    # 2. Config
    bitrate = '3000k'
    bufsize = '6000k'
    if resolution == '1080p':
        bitrate = '6000k'
        bufsize = '12000k'
    elif resolution == '4K':
        bitrate = '12000k'
        bufsize = '24000k'

    # 3. The Execution Loop (Handles VOD Looping)
    current_run = 0
    while current_run < total_runs:
        current_run += 1
        print(f"--- Starting Stream Loop {current_run}/{total_runs} ---")

        # Command to download to STDOUT
        yt_cmd = [
            'yt-dlp',
            '--no-warnings',
            '--quiet',
            '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
            '-o', '-' # Pipe output
        ]

        if os.path.exists('cookies.txt'):
            yt_cmd.extend(['--cookies', 'cookies.txt'])
        else:
            # Android client often bypasses "Sign in" on server IPs
            yt_cmd.extend(['--extractor-args', 'youtube:player_client=android'])

        yt_cmd.append(source)

        # Command to encode from STDIN
        ffmpeg_cmd = [
            'ffmpeg',
            '-re',           # Real-time speed (Crucial!)
            '-i', 'pipe:0',  # Read from yt-dlp
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-maxrate', bitrate,
            '-bufsize', bufsize,
            '-pix_fmt', 'yuv420p',
            '-g', '50',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-ar', '44100',
            '-f', 'flv',
            destination
        ]

        # Execute
        yt_process = None
        ffmpeg_process = None
        
        try:
            yt_process = subprocess.Popen(yt_cmd, stdout=subprocess.PIPE)
            ffmpeg_process = subprocess.Popen(ffmpeg_cmd, stdin=yt_process.stdout)
            
            # Close header to allow SIGPIPE
            if yt_process.stdout:
                yt_process.stdout.close()

            ffmpeg_process.wait()
            yt_process.wait()
            
        except Exception as e:
            print(f"Run crashed: {e}")
            break
        finally:
            # cleanup
            try:
                if yt_process: yt_process.kill()
                if ffmpeg_process: ffmpeg_process.kill()
            except:
                pass
        
        # If it was live, we stop after one run regardless of loop setting
        if is_live:
            print("Stream ended (Live). Stopping.")
            break
            
        print("Run finished.")

    print("All loops completed.")

# --- 2. THE API ENDPOINT ---
@app.route('/start_stream', methods=['POST'])
def start_stream():
    data = request.json
    source_url = data.get('source_url')
    rtmp_url = data.get('rtmp_url')
    loop_count = data.get('loop_count', 0)
    resolution = data.get('resolution', '720p')

    print(f"Received Start Request: Source={source_url}, Quality={resolution}")

    if not source_url or not rtmp_url:
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    # Threading to prevent blocking the API response
    thread = threading.Thread(target=run_pipeline, args=(source_url, rtmp_url, loop_count, resolution))
    thread.start()

    return jsonify({"message": "Stream pipeline started", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
