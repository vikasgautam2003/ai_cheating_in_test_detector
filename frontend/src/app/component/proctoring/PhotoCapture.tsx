// 'use client';

// import { useEffect, useRef, useState } from 'react';

// interface PhotoCaptureProps {
//   onPhotoCaptured: (photo: string) => void;
// }

// export default function PhotoCapture({ onPhotoCaptured }: PhotoCaptureProps) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [photo, setPhoto] = useState<string | null>(null);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//         setStream(mediaStream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream;
//         }
//       } catch (err) {
//         console.error("Error accessing webcam:", err);
//       }
//     };

//     startCamera();

//     return () => {
//       stream?.getTracks().forEach(track => track.stop());
//     };
//   }, []);

//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext('2d');
//     if (ctx) {
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL('image/png');
//       setPhoto(imageData);
//       onPhotoCaptured(imageData);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       {photo ? (
//         <img
//           src={photo}
//           alt="Captured"
//           className="w-64 h-48 object-cover rounded-lg border"
//         />
//       ) : (
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="w-64 h-48 bg-black rounded-lg border"
//         />
//       )}

//       <button
//         onClick={capturePhoto}
//         className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
//       >
//         Capture Photo
//       </button>

//       <canvas ref={canvasRef} className="hidden" />
//     </div>
//   );
// }






'use client';

import { useEffect, useRef, useState } from 'react';

interface PhotoCaptureProps {
  onPhotoCaptured: (photo: string) => void;
}

export default function PhotoCapture({ onPhotoCaptured }: PhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setPhoto(imageData);
      onPhotoCaptured(imageData);
      stream?.getTracks().forEach(track => track.stop());
    }
  };

  const recapture = async () => {
    setPhoto(null);
    await startCamera();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {photo ? (
        <>
          <img
            src={photo}
            alt="Captured"
            className="w-64 h-48 object-cover rounded-lg border"
          />
          <button
            onClick={recapture}
            className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
          >
            Recapture
          </button>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-64 h-48 bg-black rounded-lg border"
          />
          <button
            onClick={capturePhoto}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Capture Photo
          </button>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
