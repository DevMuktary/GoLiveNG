from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/')
def health_check():
    # Check if FFmpeg is actually installed
    try:
        ffmpeg_version = subprocess.check_output(['ffmpeg', '-version']).decode('utf-8').split('\n')[0]
        return jsonify({
            "status": "Online",
            "service": "Quadrox Stream Engine",
            "ffmpeg": ffmpeg_version
        })
    except Exception as e:
        return jsonify({"status": "Error", "error": str(e)})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
