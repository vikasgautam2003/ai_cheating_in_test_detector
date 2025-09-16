from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import cv2
import numpy as np
import base64
import os
from fastapi.middleware.cors import CORSMiddleware



class ImageFrame(BaseModel):
    image_data: str

app = FastAPI(
    title="Proctoring AI Service",
    description="This service handles real-time video and audio analysis for proctoring.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
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
