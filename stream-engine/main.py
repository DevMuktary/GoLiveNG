import os
import subprocess
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from auth import auth_bp
import yt_dlp  # CRITICAL: This requires the updated requirements.txt

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

# --- HELPER: Resolve YouTube/Live URL ---
def get_real_stream_url(url):
    """
    Uses yt-dlp to extract the underlying .m3u8 or .mp4 URL.
    This works for both YouTube Videos AND Live Streams.
    """
    print(f"Resolving URL for: {url}")
    try:
        ydl_opts = {
            'format': 'best',  # 'best' automatically picks m3u8 for Live streams
            'quiet': True,
            'no_warnings': True,
            'noplaylist': True
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if 'url' in info:
                print(f"Resolved to: {info['url']}")
                return info['url']
    except Exception as e:
        print(f"yt-dlp failed (using original): {str(e)}")
    
    return url

# --- 1. THE STREAMING FUNCTION ---
def run_ffmpeg(source, destination, loop_count):
    # 1. Get the actual streamable link
    real_source = get_real_stream_url(source)
    
    # 2. Construct FFmpeg command
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
        '-g', '50',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ar', '44100',
        '-f', 'flv',
        destination
    ]
    
    print(f"Starting FFMPEG: {' '.join(cmd)}")
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

    # Start in background thread
    thread = threading.Thread(target=run_ffmpeg, args=(source_url, rtmp_url, loop_count))
    thread.start()

    return jsonify({"message": "Stream started", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    # Local development fallback
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
