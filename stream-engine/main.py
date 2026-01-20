import os
import subprocess
import threading
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from auth import auth_bp

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

# --- 1. THE STREAMLINK PIPELINE ---
def run_streamlink_pipe(source, destination, resolution):
    print(f"Starting Streamlink Pipeline for: {source}")
    
    # 1. Map Quality to Streamlink format
    # Streamlink uses 'best', '1080p', '720p', etc.
    sl_quality = 'best'
    if resolution == '1080p':
        sl_quality = '1080p,best'
    elif resolution == '720p':
        sl_quality = '720p,best'
    elif resolution == '4K':
        sl_quality = '4k,best'

    # 2. Build Streamlink Command (The Fetcher)
    # --stdout: Writes the video data to the pipe instead of a file
    # --hls-live-restart: Helps if the stream glitches, it tries to pick up where it left off
    sl_cmd = [
        'streamlink',
        source,
        sl_quality,
        '--stdout',
        '--hls-live-restart',
        '--retry-streams', '5',
        '--retry-open', '5'
    ]

    # Optional: If you still have cookies.txt, Streamlink can use it via options,
    # but for public YouTube streams, it usually works better without them to avoid "Account" flags.
    # We rely on Streamlink's native handling here.

    # 3. Build FFmpeg Command (The Encoder)
    # -i pipe:0 : Reads the raw video data coming from Streamlink
    ffmpeg_cmd = [
        'ffmpeg',
        '-re',           # Read at native speed (crucial for pipes to prevent buffer overflows)
        '-i', 'pipe:0',  # INPUT: The pipe from Streamlink
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-maxrate', '4000k' if resolution == '1080p' else '2500k',
        '-bufsize', '8000k',
        '-pix_fmt', 'yuv420p',
        '-g', '50',      # Keyframe interval for FB
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ar', '44100',
        '-f', 'flv',
        destination
    ]

    print(f"Pipeline Launching...\nFETCHER: {' '.join(sl_cmd)}\nENCODER: {' '.join(ffmpeg_cmd)}")

    # 4. Execute the Pipeline
    sl_process = None
    ffmpeg_process = None

    try:
        # Start Streamlink (Writing to Pipe)
        sl_process = subprocess.Popen(sl_cmd, stdout=subprocess.PIPE)
        
        # Start FFmpeg (Reading from Streamlink's Output)
        ffmpeg_process = subprocess.Popen(ffmpeg_cmd, stdin=sl_process.stdout)
        
        # Allow sl_process to receive a SIGPIPE if ffmpeg exits
        # This closes the streamlink process if ffmpeg crashes/stops
        if sl_process.stdout:
            sl_process.stdout.close()

        # Monitor processes
        ffmpeg_process.wait()
        print("FFmpeg process finished.")
        
        sl_process.wait()
        print("Streamlink process finished.")

    except Exception as e:
        print(f"Pipeline Critical Error: {e}")
    finally:
        # Ensure cleanup
        if sl_process and sl_process.poll() is None:
            print("Killing Streamlink...")
            sl_process.kill()
        if ffmpeg_process and ffmpeg_process.poll() is None:
            print("Killing FFmpeg...")
            ffmpeg_process.kill()

# --- 2. THE API ENDPOINT ---
@app.route('/start_stream', methods=['POST'])
def start_stream():
    data = request.json
    source_url = data.get('source_url')
    rtmp_url = data.get('rtmp_url')
    # Loop count is not supported in a live pipe (it goes until the stream ends)
    resolution = data.get('resolution', '1080p')

    print(f"Received Start Request: Source={source_url}, Quality={resolution}")

    if not source_url or not rtmp_url:
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    # Launch background thread
    thread = threading.Thread(target=run_streamlink_pipe, args=(source_url, rtmp_url, resolution))
    thread.start()

    return jsonify({"message": "Stream started (Streamlink Mode)", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
