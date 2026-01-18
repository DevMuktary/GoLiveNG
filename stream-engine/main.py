import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta

# Initialize App
app = Flask(__name__)
CORS(app)

# Database Config (Uses Railway's Postgres URL if available, else local SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///local.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

# --- Routes ---

@app.route('/')
def health():
    return jsonify({"status": "Engine Online", "version": "1.0"})

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # 1. Extract Data
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    # 2. Validation
    if not all([full_name, email, password]):
        return jsonify({"error": "Missing fields"}), 400

    # 3. Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    # 4. Hash Password & Save
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(full_name=full_name, email=email, password_hash=hashed_pw)
    
    db.session.add(new_user)
    db.session.commit()

    # 5. Auto-Login (Generate Token immediately)
    access_token = create_access_token(identity=str(new_user.id))
    
    return jsonify({
        "message": "Welcome aboard",
        "user": {"id": new_user.id, "name": new_user.full_name},
        "access_token": access_token
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": token, "user": {"name": user.full_name}}), 200
    
    return jsonify({"error": "Invalid credentials"}), 401

# Auto-create DB tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
