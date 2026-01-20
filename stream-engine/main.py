import os
import subprocess
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from auth import auth_bp
import yt_dlp  # <--- NEW IMPORT

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

# --- HELPER: EXTRACT REAL URL ---
def get_stream_url(url):
    """
    Uses yt-dlp to extract the underlying media URL.
    Works for YouTube Videos AND Live Streams.
    """
    try:
        ydl_opts = {
            'format': 'best',  # Gets best quality (mp4 or m3u8 for live)
            'quiet': True,
            'no_warnings': True,
            'noplaylist': True
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if 'url' in info:
                print(f"Resolved URL: {info['url']}")
                return info['url']
    except Exception as e:
        print(f"Could not resolve URL with yt-dlp (using original): {e}")
    
    return url

# --- 1. THE STREAMING FUNCTION ---
def run_ffmpeg(source, destination, loop_count):
    # 1. Resolve the actual stream URL (Handling YouTube/Live)
    real_source = get_stream_url(source)

    # 2. Construct FFmpeg command
    # -re = Read input at native framerate
    # -stream_loop = How many times to loop (-1 is infinite)
    cmd = [
        'ffmpeg',
        '-re',
        '-stream_loop', str(loop_count),
        '-i', real_source,
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-maxrate', '3000k',
        '-bufsize', '6000k',
        '-pix_fmt', 'yuv420p',
        '-g', '50',  # Keyframe interval (crucial for FB)
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ar', '44100',
        '-f', 'flv',
        destination
    ]
    
    print(f"Starting Stream Command: {' '.join(cmd)}")
    try:
        subprocess.run(cmd, check=True)
        print("Stream finished successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Stream crashed: {e}")

# --- 2. THE API ENDPOINT ---
@app.route('/start_stream', methods=['POST'])
def start_stream():
    data = request.json
    source_url = data.get('source_url')
    rtmp_url = data.get('rtmp_url')
    loop_count = data.get('loop_count', 0)

    print(f"Received Start Request: Source={source_url}, Target={rtmp_url}")

    if not source_url or not rtmp_url:
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    # Run FFmpeg in a background thread so we don't block the API
    thread = threading.Thread(target=run_ffmpeg, args=(source_url, rtmp_url, loop_count))
    thread.start()

    return jsonify({"message": "Stream started", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
