import os
from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from auth import auth_bp

# App Factory
app = Flask(__name__)
CORS(app)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')

# Initialize Tools
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

# --- THE FIX IS HERE ---
# Changed from '/api/auth' to '/auth' so it matches what Next.js sends
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online", "service": "GoLiveNG Backend"})

# Auto-Create Database Tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
