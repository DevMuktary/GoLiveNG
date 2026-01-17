# Use a lightweight Python base
FROM python:3.10-slim

# 1. Install System Dependencies (FFmpeg & Python tools)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# 2. Set the working directory
WORKDIR /app

# 3. Copy only requirements first (Better caching)
COPY requirements.txt .

# 4. Install Python Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port
EXPOSE 8000

# 7. Start the server using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--timeout", "120", "main:app"]
