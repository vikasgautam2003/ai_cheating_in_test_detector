// 'use client';

// import { useState, useRef } from 'react';

// interface AudioRecorderProps {
//   onAudioRecorded: (audioBlob: Blob) => void;
// }

// export default function AudioRecorder({ onAudioRecorded }: AudioRecorderProps) {
//   const [permission, setPermission] = useState(false);
//   const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'finished'>('idle');
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const mediaRecorder = useRef<MediaRecorder | null>(null);
//   const audioChunks = useRef<Blob[]>([]);

//   const getMicrophonePermission = async () => {
//     if ("MediaRecorder" in window) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         setPermission(true);
//         mediaRecorder.current = new MediaRecorder(stream);
//         mediaRecorder.current.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             audioChunks.current.push(event.data);
//           }
//         };
//         mediaRecorder.current.onstop = () => {
//           const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
//           const url = URL.createObjectURL(audioBlob);
//           setAudioUrl(url);
//           onAudioRecorded(audioBlob);
//           audioChunks.current = [];
//         };
//       } catch (err: any) {
//         alert(err.message);
//       }
//     } else {
//       alert("The MediaRecorder API is not supported in your browser.");
//     }
//   };

//   const startRecording = () => {
//     if (mediaRecorder.current) {
//       setRecordingStatus("recording");
//       mediaRecorder.current.start();
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current) {
//       setRecordingStatus("finished");
//       mediaRecorder.current.stop();
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-4 border rounded-lg bg-white shadow-sm">
//       <h3 className="font-semibold text-center mb-3">Audio Verification</h3>
//       {!permission ? (
//         <button onClick={getMicrophonePermission} className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
//           Get Mic Permission
//         </button>
//       ) : (
//         <div className="flex flex-col items-center gap-4">
//           {recordingStatus === 'idle' && (
//             <button onClick={startRecording} className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
//               Start Recording
//             </button>
//           )}
//           {recordingStatus === 'recording' && (
//             <button onClick={stopRecording} className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 animate-pulse">
//               Stop Recording
//             </button>
//           )}
//           {recordingStatus === 'finished' && (
//             <div className="w-full text-center">
//               <p className="text-green-600 mb-2">Recording complete. You can review it below.</p>
//               <audio src={audioUrl || undefined} controls className="w-full" />
//               <button onClick={() => setRecordingStatus('idle')} className="text-sm text-blue-500 mt-2">Record Again</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


















'use client';

import { useState, useRef } from 'react';

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
}

export default function AudioRecorder({ onAudioRecorded }: AudioRecorderProps) {
  const [permission, setPermission] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'finished'>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermission(true);
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          onAudioRecorded(audioBlob);
          audioChunks.current = [];
        };
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (mediaRecorder.current) {
      setRecordingStatus("recording");
      mediaRecorder.current.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      setRecordingStatus("finished");
      mediaRecorder.current.stop();
    }
  };

  return (
    <div className="w-full max-w-md p-6 border border-gray-300 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-xl backdrop-blur-md">
      <h3 className="font-bold text-xl text-center text-white mb-4 tracking-wide">Audio Verification</h3>
      {!permission ? (
        <button
          onClick={getMicrophonePermission}
          className="w-full bg-cyan-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-cyan-400 transition-all transform hover:scale-105"
        >
          Get Microphone Permission
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          {recordingStatus === 'idle' && (
            <button
              onClick={startRecording}
              className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-400 transition-all transform hover:scale-105"
            >
              Start Recording
            </button>
          )}
          {recordingStatus === 'recording' && (
            <button
              onClick={stopRecording}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-red-400 transition-all animate-pulse"
            >
              Stop Recording
            </button>
          )}
          {recordingStatus === 'finished' && (
            <div className="w-full flex flex-col items-center gap-3">
              <p className="text-green-400 font-medium text-center">Recording complete. Review it below:</p>
              <audio src={audioUrl || undefined} controls className="w-full rounded-lg" />
              <button
                onClick={() => setRecordingStatus('idle')}
                className="text-sm text-blue-400 font-semibold hover:text-blue-300 transition-colors mt-1"
              >
                Record Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
