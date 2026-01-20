import os
import subprocess
import threading
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

# --- 1. THE PIPELINE STREAMING FUNCTION ---
def run_ffmpeg_pipe(source, destination, loop_count, resolution):
    print(f"Starting PIPELINE for: {source}")
    
    # 1. Configure Quality Settings
    # We map resolution to a rough bitrate for the ENCODER (sending to FB)
    # This doesn't affect what we download from YouTube (we always grab best).
    bitrate = '3000k'
    bufsize = '6000k'
    
    if resolution == '1080p':
        bitrate = '6000k'
        bufsize = '12000k'
    elif resolution == '4K':
        bitrate = '12000k'
        bufsize = '24000k'

    # 2. Build the YT-DLP Command (The Downloader)
    # We tell it to output to STDOUT (-) instead of a file
    yt_cmd = [
        'yt-dlp',
        '--no-warnings',
        '--quiet',
        '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        '-o', '-'  # Critical: Output to standard out (pipe)
    ]

    # Handle Cookies / Android Bypass
    if os.path.exists('cookies.txt'):
        print("Using cookies.txt for authorization")
        yt_cmd.extend(['--cookies', 'cookies.txt'])
    else:
        print("No cookies found. Using Android Client bypass.")
        yt_cmd.extend(['--extractor-args', 'youtube:player_client=android'])

    yt_cmd.append(source)

    # 3. Build the FFmpeg Command (The Encoder)
    # We tell it to read from STDIN (pipe:0)
    ffmpeg_cmd = [
        'ffmpeg',
        '-re',          # Read input at native framerate (prevents sending too fast)
        '-i', 'pipe:0', # Critical: Read from the pipe
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

    print(f"Pipeline Configured. \nYT-DLP: {' '.join(yt_cmd)}\nFFMPEG: {' '.join(ffmpeg_cmd)}")

    # 4. Execute the Pipeline
    try:
        # Start yt-dlp process
        yt_process = subprocess.Popen(yt_cmd, stdout=subprocess.PIPE)
        
        # Start ffmpeg process, connecting yt-dlp's stdout to ffmpeg's stdin
        ffmpeg_process = subprocess.Popen(ffmpeg_cmd, stdin=yt_process.stdout)
        
        # Allow yt_process to receive a SIGPIPE if ffmpeg exits
        # This effectively links them together
        if yt_process.stdout:
            yt_process.stdout.close()

        # Wait for finish
        ffmpeg_process.wait()
        yt_process.wait()
        
        print("Stream Pipeline Finished.")

    except Exception as e:
        print(f"Pipeline Crashed: {e}")
        # Ensure we kill processes on crash
        try:
            yt_process.kill()
            ffmpeg_process.kill()
        except:
            pass

# --- 2. THE API ENDPOINT ---
@app.route('/start_stream', methods=['POST'])
def start_stream():
    data = request.json
    source_url = data.get('source_url')
    rtmp_url = data.get('rtmp_url')
    loop_count = data.get('loop_count', 0) # loop is hard with pipes, we ignore it for live
    resolution = data.get('resolution', '720p')

    print(f"Received Start Request: Source={source_url}, Quality={resolution}")

    if not source_url or not rtmp_url:
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    # Start the pipeline thread
    thread = threading.Thread(target=run_ffmpeg_pipe, args=(source_url, rtmp_url, loop_count, resolution))
    thread.start()

    return jsonify({"message": "Stream started", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
