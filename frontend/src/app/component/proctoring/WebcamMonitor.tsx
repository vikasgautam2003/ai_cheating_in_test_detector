

// 'use client';

// import { useEffect, useRef, useState } from 'react';

// interface WebcamMonitorProps {
//   onPhotoCaptured?: (imageData: string) => void;
//   captureMode?: boolean;
//   onFrameCaptured?: (imageData: string) => void; 
// }

// export default function WebcamMonitor({
//   onPhotoCaptured,
//   captureMode = false,
//   onFrameCaptured,
// }: WebcamMonitorProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const [error, setError] = useState<string | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   // --- Start webcam ---
//   useEffect(() => {
//     let stream: MediaStream | null = null;

//     const startWebcam = async () => {
//       try {
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error accessing webcam:", err);
//         setError("Webcam access was denied. Proctoring requires camera access.");
//       }
//     };

//     startWebcam();

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   // --- Frame capture for analysis ---
//   useEffect(() => {
//   if (captureMode || !onFrameCaptured) return;

//   const video = videoRef.current;
//   const canvas = canvasRef.current;
//   if (!video || !canvas) return;

//   const startCapture = () => {
//     console.log("✅ Video started, enabling frame capture...");

//     // Use number type for browser interval
//     const captureInterval: number = window.setInterval(() => {
//       if (video.videoWidth === 0 || video.videoHeight === 0) {
//         console.log("Video not ready yet, skipping frame");
//         return;
//       }

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext("2d");
//       if (!context) return;

//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL("image/jpeg");
//       console.log("📸 Frame captured, sending to analysis...");
//       onFrameCaptured(imageData);
//     }, 7000);

//     // Cleanup interval on unmount
//     return () => window.clearInterval(captureInterval);
//   };

//   video.addEventListener("playing", startCapture);

//   return () => {
//     video.removeEventListener("playing", startCapture);
//   };
// }, [captureMode, onFrameCaptured]);




//   // --- Manual photo capture ---
//   const handleCapturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext("2d");
//       context?.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL("image/jpeg");
//       setCapturedImage(imageData);
//       if (onPhotoCaptured) onPhotoCaptured(imageData);
//     }
//   };

//   // --- Render error ---
//   if (error) {
//     return (
//       <div className="absolute bottom-4 right-4 w-48 h-36 bg-red-200 border-2 border-red-500 rounded-md flex items-center justify-center p-2">
//         <p className="text-red-700 text-xs text-center">{error}</p>
//       </div>
//     );
//   }

//   // --- Render video ---
//   return (
//     <div className="absolute bottom-4 right-4 w-48 h-36 bg-black border-2 border-gray-400 rounded-md shadow-lg">
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         className="w-full h-full object-cover rounded-md"
//       />
//       <canvas ref={canvasRef} className="hidden" />
//     </div>
//   );
// }



'use client';

import { useEffect, useRef, useState } from 'react';

interface WebcamMonitorProps {
  onPhotoCaptured?: (imageData: string) => void;
  captureMode?: boolean;
  onFrameCaptured?: (imageData: string) => void;
}

export default function WebcamMonitor({
  onPhotoCaptured,
  captureMode = false,
  onFrameCaptured,
}: WebcamMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { aspectRatio: 4 / 3 }, // force 4:3 to match your w-48 h-36
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setError('Webcam access was denied. Proctoring requires camera access.');
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (captureMode || !onFrameCaptured) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const startCapture = () => {
      const captureInterval: number = window.setInterval(() => {
        if (video.videoWidth === 0 || video.videoHeight === 0) return;

        // match canvas to container size, not just natural size
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        onFrameCaptured(imageData);
      }, 7000);

      return () => window.clearInterval(captureInterval);
    };

    video.addEventListener('playing', startCapture);
    return () => {
      video.removeEventListener('playing', startCapture);
    };
  }, [captureMode, onFrameCaptured]);

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      if (onPhotoCaptured) onPhotoCaptured(imageData);
    }
  };

  if (error) {
    return (
      <div className="absolute bottom-4 right-4 w-48 aspect-[4/3] bg-red-200 border-2 border-red-500 rounded-md flex items-center justify-center p-2">
        <p className="text-red-700 text-xs text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 right-4 bg-black border-2 border-gray-400 rounded-md shadow-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-md"
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
