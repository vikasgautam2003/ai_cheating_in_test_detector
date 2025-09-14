'use client';

import { useEffect, useRef, useState } from 'react';

export default function WebcamMonitor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Webcam access was denied. Proctoring requires camera access.");
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (error) {
    return (
      <div className="absolute bottom-4 right-4 w-48 h-36 bg-red-200 border-2 border-red-500 rounded-md flex items-center justify-center p-2">
        <p className="text-red-700 text-xs text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 right-4 w-48 h-36 bg-black border-2 border-gray-400 rounded-md shadow-lg">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
}
