




import os
from pydub.utils import which


os.environ["PATH"] += os.pathsep + r"C:\ffmpeg-8.0-full_build\bin"

from pydub import AudioSegment
AudioSegment.converter = which("ffmpeg") or r"C:\ffmpeg-8.0-full_build\bin\ffmpeg.exe"

from pydub.utils import which
print("FFmpeg detected at:", which("ffmpeg"))



from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cv2
import numpy as np
import base64
import webrtcvad
import io
import soundfile as sf

import warnings
warnings.filterwarnings("ignore", category=RuntimeWarning, module="pydub.utils")





class AudioClip(BaseModel):
    audio_data: str 

class ImageFrame(BaseModel):
    image_data: str

app = FastAPI(
    title="Proctoring AI Service",
    description="This service handles real-time video and audio analysis for proctoring.",
    version="0.1.0",
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
    
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
   
    allow_methods=["*"],
    allow_headers=["*"],
)



cascade_path = os.path.join(cv2.data.haarcascades, 'haarcascade_frontalface_default.xml')
if not os.path.exists(cascade_path):
    raise RuntimeError(f"Could not find Haar Cascade file at {cascade_path}")
face_cascade = cv2.CascadeClassifier(cascade_path)

@app.get("/")
def read_root():
    return {"message": "Hello from the Proctoring AI Service!"}



@app.get("/ping")
def ping():
    """
    Lightweight endpoint to wake up the service and check health.
    """
    return {"status": "ok", "service": "ai-proctor"}


@app.post("/analyze-video-frame")
def analyze_video_frame(frame: ImageFrame):
    try:
        header, encoded = frame.image_data.split(",", 1)
        image_data = base64.b64decode(encoded)

        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Could not decode image.")

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )

        num_faces = len(faces)
        violation_type = None

        if num_faces == 0:
            violation_type = "no_face_detected"
        elif num_faces > 1:
            violation_type = "multiple_faces_detected"

        return {
            "face_count": num_faces,
            "violation_type": violation_type,
            "detail": "Analysis successful"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during analysis: {str(e)}")



@app.post("/analyze-audio-clip")
def analyze_audio_clip(clip: AudioClip):
    try:
        header, encoded = clip.audio_data.split(",", 1)
        audio_data = base64.b64decode(encoded)

        audio_buffer = io.BytesIO(audio_data)
        audio = AudioSegment.from_file(audio_buffer, format="webm")

        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        data, samplerate = sf.read(wav_io, dtype="int16")
        vad = webrtcvad.Vad()
        vad.set_mode(3)

        frame_duration_ms = 30
        frame_size = int(samplerate * frame_duration_ms / 1000)

        def frame_rms(frame):
            return (frame.astype(np.float32) ** 2).mean() ** 0.5

        rms_threshold = 1000  
        consecutive_speech_required = 2  
        speech_count = 0
        speech_detected = False

        for start in range(0, len(data) - frame_size, frame_size):
            frame = data[start:start + frame_size]
            if frame_rms(frame) < rms_threshold:
                speech_count = 0
                continue
            if vad.is_speech(frame.tobytes(), samplerate):
                speech_count += 1
                if speech_count >= consecutive_speech_required:
                    speech_detected = True
                    break
            else:
                speech_count = 0

        return {
            "speech_detected": speech_detected,
            "violation_type": "voice_activity_detected" if speech_detected else None,
            "detail": "Audio analysis successful"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio analysis failed: {str(e)}")













