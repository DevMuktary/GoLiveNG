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

# --- HELPER: Smart URL Resolution ---
def get_stream_info(url):
    """
    Returns tuple: (resolved_url, is_live_bool)
    """
    print(f"Resolving URL for: {url}")
    
    cookie_file = 'cookies.txt' if os.path.exists('cookies.txt') else None
    
    # Base Options
    ydl_opts = {
        'format': 'best',
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True,
        'cookiefile': cookie_file
    }

    # CRITICAL FIX: Only use Android Client if NO cookies are present.
    # Mixing Desktop Cookies with Android Client causes "No video formats found".
    if not cookie_file:
        print("No cookies found. Using Android Client bypass.")
        ydl_opts['extractor_args'] = {'youtube': {'player_client': ['android', 'ios']}}
    else:
        print("Cookies found! Using Standard Client.")

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            resolved_url = info.get('url', url)
            is_live = info.get('is_live', False)
            print(f"Resolved: {resolved_url[:60]}... (Live: {is_live})")
            return resolved_url, is_live
    except Exception as e:
        print(f"yt-dlp failed: {str(e)}")
        # Fallback: Return original URL (FFmpeg might handle it if it's a direct link)
        return url, False

# --- 1. THE STREAMING FUNCTION ---
def run_ffmpeg(source, destination, loop_count, resolution):
    # 1. Get URL and Live Status
    real_source, is_live = get_stream_info(source)
    
    # 2. Determine Bitrate based on Resolution
    # Defaults to 720p settings
    bitrate = '3000k'
    bufsize = '6000k'
    
    if resolution == '1080p':
        bitrate = '6000k'
        bufsize = '12000k'
    elif resolution == '4K':
        bitrate = '12000k'
        bufsize = '24000k'

    print(f"Configuring Stream: {resolution} (Bitrate: {bitrate})")

    # 3. Build Command
    cmd = ['ffmpeg']

    # Use -re ONLY for VOD/Files. Never for Live.
    if not is_live:
        cmd.append('-re')

    if not is_live:
        cmd.extend(['-stream_loop', str(loop_count)])

    cmd.extend([
        '-i', real_source,
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-maxrate', bitrate,   # Dynamic Bitrate
        '-bufsize', bufsize,   # Dynamic Buffer
        '-pix_fmt', 'yuv420p',
        '-g', '50',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ar', '44100',
        '-f', 'flv',
        destination
    ])
    
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
    resolution = data.get('resolution', '720p') # Receive Resolution

    print(f"Received Start Request: Source={source_url}, Quality={resolution}")

    if not source_url or not rtmp_url:
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    thread = threading.Thread(target=run_ffmpeg, args=(source_url, rtmp_url, loop_count, resolution))
    thread.start()

    return jsonify({"message": "Stream started", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
