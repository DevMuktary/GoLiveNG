import os
from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from auth import auth_bp

# App Factory
app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')

# Initialize Extensions
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

# Register Routes
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/')
def health():
    return jsonify({"status": "Stream Engine Online", "version": "2.0"})

# Create Database Tables on Startup
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
