import os
import subprocess
import threading
import sys
import yt_dlp  #
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

# --- Helper: Extract Real URL from YouTube ---
def get_real_source(url):
    # Simple check for YouTube
    if "youtube.com" in url or "youtu.be" in url:
        print(f"🔎 Detected YouTube URL: {url} - Extracting feed...", flush=True)
        ydl_opts = {
            'format': 'best', # Get best quality
            'noplaylist': True,
            'quiet': True,
        }
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                real_url = info['url']
                print(f"✅ Extracted Real URL: {real_url[:50]}...", flush=True)
                return real_url
        except Exception as e:
            print(f"❌ yt-dlp Extraction Failed: {e}", flush=True)
            return url # Fallback to original
    return url

# --- Background Streamer ---
def run_ffmpeg(source_raw, destination, loop_count):
    print(f"🚀 Stream Worker Started for target: {destination[:30]}...", flush=True)
    
    # 1. Get the actual video feed (Handle YouTube)
    source = get_real_source(source_raw)

    # 2. Build Command
    # -re : Read input at native framerate (Prevent rushing)
    cmd = ['ffmpeg', '-re']

    # Add loop if requested
    if loop_count != 0:
        # Note: -stream_loop must be BEFORE -i
        cmd.extend(['-stream_loop', str(loop_count)])

    cmd.extend([
        '-i', source,
        '-c:v', 'libx264',   # Re-encode to ensure compatibility
        '-preset', 'veryfast',
        '-b:v', '3000k',     # Bitrate
        '-maxrate', '3000k',
        '-bufsize', '6000k',
        '-pix_fmt', 'yuv420p',
        '-g', '60',          # Keyframe interval (2s at 30fps)
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ar', '44100',
        '-f', 'flv',
        destination
    ])

    print(f"🎞️ Executing FFmpeg: {' '.join(cmd)}", flush=True)

    # 3. Run and Capture Logs
    try:
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Read logs line by line
        while True:
            line = process.stderr.readline()
            if not line:
                break
            # Only print key stats to avoid log spam, or print everything for debug
            if "frame=" in line or "Error" in line:
                print(f"FFMPEG: {line.strip()}", flush=True)
        
        process.wait()
        print("🏁 FFmpeg Process Finished", flush=True)

    except Exception as e:
        print(f"🔥 CRITICAL FFmpeg Error: {e}", flush=True)

# --- API Endpoint ---
@app.route('/start_stream', methods=['POST'])
def start_stream():
    data = request.json
    source_url = data.get('source_url')
    rtmp_url = data.get('rtmp_url')
    loop_count = data.get('loop_count', 0)

    if not source_url or not rtmp_url:
        print("❌ Rejecting request: Missing parameters", flush=True)
        return jsonify({"error": "Missing source or RTMP URL"}), 400

    print(f"📥 Received Start Request: {source_url} -> {rtmp_url}", flush=True)

    # Run in background
    thread = threading.Thread(target=run_ffmpeg, args=(source_url, rtmp_url, loop_count))
    thread.start()

    return jsonify({"message": "Stream initialized", "status": "processing"}), 200

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online", "service": "GoLiveNG Backend"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
