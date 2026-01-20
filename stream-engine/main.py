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

# --- HELPER: Resolve URL & Check if Live ---
def get_stream_info(url):
    """
    Returns tuple: (resolved_url, is_live_bool)
    """
    print(f"Resolving URL for: {url}")
    
    # Check for optional cookies.txt
    cookie_file = 'cookies.txt' if os.path.exists('cookies.txt') else None
    if cookie_file:
        print("Found cookies.txt! Using it for authentication.")

    try:
        ydl_opts = {
            'format': 'best',
            'quiet': True,
            'no_warnings': True,
            'noplaylist': True,
            # CRITICAL FIX: Use Android client to bypass "Sign in to confirm" on servers
            'extractor_args': {
                'youtube': {
                    'player_client': ['android', 'ios']
                }
            },
            'cookiefile': cookie_file
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            resolved_url = info.get('url', url)
            is_live = info.get('is_live', False)
            
            print(f"Resolved: {resolved_url[:60]}... (Live: {is_live})")
            return resolved_url, is_live
            
    except Exception as e:
        print(f"yt-dlp failed: {str(e)}")
        # If headers fail, we return None or original to fail gracefully
        return url, False

# --- 1. THE STREAMING FUNCTION ---
def run_ffmpeg(source, destination, loop_count):
    # 1. Get URL and Live Status
    real_source, is_live = get_stream_info(source)
    
    # 2. Build Command
    cmd = ['ffmpeg']

    # Use -re ONLY for VOD/Files. Never for Live.
    if not is_live:
        print("Source is VOD/File. Using -re (Real-time input simulation).")
        cmd.append('-re')
    else:
        print("Source is LIVE. Skipping -re.")

    if not is_live:
        cmd.extend(['-stream_loop', str(loop_count)])

    cmd.extend([
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

    print(f"Received Start Request: Source={source_url}, Target={rtmp_url}")

    if not source_url or not rtmp_url:
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    thread = threading.Thread(target=run_ffmpeg, args=(source_url, rtmp_url, loop_count))
    thread.start()

    return jsonify({"message": "Stream started", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 8000)))
