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
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
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
    <div className="w-full max-w-md p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-center mb-3">Audio Verification</h3>
      {!permission ? (
        <button onClick={getMicrophonePermission} className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
          Get Mic Permission
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {recordingStatus === 'idle' && (
            <button onClick={startRecording} className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Start Recording
            </button>
          )}
          {recordingStatus === 'recording' && (
            <button onClick={stopRecording} className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 animate-pulse">
              Stop Recording
            </button>
          )}
          {recordingStatus === 'finished' && (
            <div className="w-full text-center">
              <p className="text-green-600 mb-2">Recording complete. You can review it below.</p>
              <audio src={audioUrl || ''} controls className="w-full" />
              <button onClick={() => setRecordingStatus('idle')} className="text-sm text-blue-500 mt-2">Record Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
