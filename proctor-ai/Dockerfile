# 1. Start with an official, lightweight Python image
FROM python:3.9-slim

# 2. Set a working directory inside the container
WORKDIR /app

# 3. Update the package list and install ffmpeg (this will work now)
RUN apt-get update && apt-get install -y ffmpeg

# 4. Copy your Python requirements file into the container
COPY requirements.txt .

# 5. Install your Python libraries
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copy the rest of your application code (main.py, etc.) into the container
COPY . .

# 7. Expose the port Render will use
EXPOSE 10000

# 8. Define the command to run your application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
