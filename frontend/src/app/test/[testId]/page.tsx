

















// 'use client';

// import { useEffect, useState, ChangeEvent } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { io, Socket } from 'socket.io-client';
// import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
// import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
// import PhotoCapture from '@/app/component/proctoring/PhotoCapture';

// interface Question { _id: string; questionText: string; options: string[]; }
// interface Test { _id: string; title: string; duration: number; questions: Question[]; }
// type Answers = { [key: number]: string; };

// export default function TestPage() {
//   const router = useRouter();
//   const params = useParams();
//   const testId = params.testId as string;

//   const [test, setTest] = useState<Test | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [stage, setStage] = useState<'instructions' | 'verification' | 'in_progress'>('instructions');
//   const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
//   const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Answers>({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [warning, setWarning] = useState<{ title: string; message: string } | null>(null);



//   const [attemptId, setAttemptId] = useState<string | null>(null);

//   // --- Fetch Test ---
//   useEffect(() => {
//     if (!testId) return;
//     const fetchTest = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) { router.push('/login'); return; }
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:5000/api/tests/${testId}`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (!response.ok) throw new Error('Failed to load the test.');
//         const data: Test = await response.json();
//         setTest(data);
//         setTimeLeft(data.duration * 60);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTest();
//   }, [testId, router]);

//   // --- Countdown Timer ---
//   useEffect(() => {
//     if (stage !== 'in_progress' || !test) return;
//     if (timeLeft <= 0) {
//       handleSubmission();
//       return;
//     }
//     const timerId = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timerId);
//   }, [stage, timeLeft, test]);

//   // --- Tab Switch Violation ---
//   useEffect(() => {
//     if (stage !== 'in_progress' || !attemptId) return;

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         console.log("Violation: Tab switch detected, logging...");
//         const token = localStorage.getItem('token');
//         fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//           body: JSON.stringify({ violationType: 'tab_switch' }),
//         });
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, [stage, attemptId]);



//   useEffect(() => {
//   if (stage !== 'in_progress' || !attemptId) return;

//   const socket: Socket = io('http://localhost:3000');

//   socket.on('connect', () => {
//     console.log('Connected to socket server!');
//     socket.emit('join_attempt_room', attemptId);
//   });

//   socket.on('fatal_strike_warning', (data) => {
//     setWarning({ title: `Fatal Warning (${data.strikes}/3)`, message: data.message });
//   });

//   socket.on('force_submit', (data) => {
//     alert(data.message);
//     handleSubmission();
//   });

//   return () => {
//     console.log('Disconnecting from socket server.');
//     socket.disconnect();
//   };
// }, [stage, attemptId]);



//    const renderWarningPopup = () => {
//   if (!warning) return null;
//   return (
//     <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md text-center">
//         <h2 className="text-2xl font-bold text-red-600 mb-4">{warning.title}</h2>
//         <p className="text-gray-700 mb-6">{warning.message}</p>
//         <button
//           onClick={() => setWarning(null)}
//           className="bg-red-500 text-white py-2 px-8 rounded-lg hover:bg-red-600"
//         >
//           I Understand
//         </button>
//       </div>
//     </div>
//   );
// };




//   // --- Handlers ---
//   const handleProceedToVerification = () => setStage('verification');

//   const handleStartTest = async () => {
//     if (!capturedPhoto || !recordedAudio) {
//       alert("Please complete both photo and audio verification.");
//       return;
//     }
//     setLoading(true);
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:5000/api/tests/${testId}/start`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (!response.ok) throw new Error("Could not start the test session.");
//       const data = await response.json();
//       setAttemptId(data.attemptId);
//       setStage('in_progress');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setCapturedPhoto(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };




// //   const handleFrameAnalysis = async (imageData: string) => {
// //   if (!attemptId) return;
// //   try {
// //     const aiResponse = await fetch('http://localhost:8000/analyze-video-frame', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ image_data: imageData }),
// //     });
// //     if (!aiResponse.ok) {
// //       console.error("AI service analysis failed. Status:", aiResponse.status);
// //       return;
// //     }
// //     const analysisResult = await aiResponse.json();
// //     if (analysisResult.violation_type) {
// //       console.log(`Violation Detected by AI: ${analysisResult.violation_type}`);
// //       const token = localStorage.getItem('token');
// //       await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
// //         method: 'POST',
// //         headers: { 
// //           'Content-Type': 'application/json', 
// //           'Authorization': `Bearer ${token}` 
// //         },
// //         body: JSON.stringify({ violationType: analysisResult.violation_type }),
// //       });
// //     }
// //   } catch (error) {
// //     console.error("An error occurred during the frame analysis process:", error);
// //   }
// // };




// const handleFrameAnalysis = async (imageData: string) => {
//   if (!attemptId) return;
//   try {
//     const aiResponse = await fetch('http://localhost:8000/analyze-video-frame', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ image_data: imageData }),
//     });

//     if (!aiResponse.ok) {
//       console.error("AI service analysis failed. Status:", aiResponse.status);
//       return;
//     }

//     const analysisResult = await aiResponse.json();
//     console.log("AI Response:", analysisResult); // 👈 always log full response

//     if (analysisResult.violation_type) {
//       console.log(`Violation Detected by AI: ${analysisResult.violation_type}`);
//       const token = localStorage.getItem('token');
//       await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` 
//         },
//         body: JSON.stringify({ violationType: analysisResult.violation_type }),
//       });
//     }
//   } catch (error) {
//     console.error("An error occurred during the frame analysis process:", error);
//   }
// };








//   const handleAnswerSelect = (option: string) =>
//     setAnswers({ ...answers, [currentQuestionIndex]: option });

//   const handleNextQuestion = () => {
//     if (test && currentQuestionIndex < test.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSubmission = async () => {
//     if (!attemptId) {
//       setError("Cannot submit: No attempt ID found.");
//       return;
//     }
//     setLoading(true);
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:5000/api/attempts/${attemptId}/submit`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({ answers }),
//       });
//       if (!response.ok) throw new Error('Failed to submit the test.');
//       const result = await response.json();
//       router.push(`/results/${result._id}`);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // --- UI States ---
//   if (loading && !test) return <div className="flex justify-center items-center h-screen">Loading Test...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
//   if (!test) return <div className="flex justify-center items-center h-screen">Test not found.</div>;

//   // --- Stage: Instructions ---
//   if (stage === 'instructions') {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//         <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
//           <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
//           <hr className="my-4"/>
//           <div className="text-left space-y-4">
//               <p><span className="font-semibold">Duration:</span> {test.duration} Minutes</p>
//               <p><span className="font-semibold">Number of Questions:</span> {test.questions.length}</p>
//               <p className="font-semibold">Instructions:</p>
//               <ul className="list-disc list-inside text-gray-700">
//                   <li>This is a proctored exam.</li>
//                   <li>You must complete a verification step first.</li>
//                   <li>Ensure you have a stable internet connection.</li>
//               </ul>
//           </div>
//           <button onClick={handleProceedToVerification} className="mt-8 bg-blue-600 text-white py-3 px-12 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
//             Proceed to Verification
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- Stage: Verification ---
//   if (stage === 'verification') {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
//         <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
//           <h1 className="text-3xl font-bold mb-6 text-center">Identity Verification</h1>
//           <div className="space-y-8">
//             <div>
//                 <h2 className="text-xl font-semibold mb-4 text-center">Photo Verification</h2>
//                 <div className="p-4 border-2 border-dashed rounded-lg">
//                     <PhotoCapture onPhotoCaptured={setCapturedPhoto} />
//                     <p className="text-center my-4 font-semibold">OR</p>
//                     <div className="flex flex-col items-center">
//                         <label className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300">
//                             Upload Photo from Gallery
//                             <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
//                         </label>
//                     </div>
//                 </div>
//             </div>
//             <AudioRecorder onAudioRecorded={setRecordedAudio} />
//           </div>
//           <button
//             onClick={handleStartTest}
//             disabled={!capturedPhoto || !recordedAudio || loading}
//             className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
//             {loading ? "Starting..." : "Confirm and Begin Test"}
//           </button>
//         </div>
//       </div>
//     );
//   }

 

// if (stage === 'in_progress') {
//   const currentQuestion = test.questions[currentQuestionIndex];
//   return (
//     <>
//       {renderWarningPopup()}

//       <div className="flex flex-col h-screen bg-gray-50 relative">
//         <header className="flex justify-between items-center p-4 bg-white shadow-md z-10">
//           <h1 className="text-2xl font-bold text-gray-800">{test.title}</h1>
//           <div className="text-2xl font-mono bg-gray-800 text-white px-4 py-2 rounded-lg">
//             {formatTime(timeLeft)}
//           </div>
//         </header>

//         <main className="flex-grow p-6 md:p-10">
//           {loading && (
//             <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-20">
//               <p className="text-2xl font-semibold animate-pulse">Submitting your test...</p>
//             </div>
//           )}

//           <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//             <div className="mb-6">
//               <p className="text-lg font-semibold text-gray-700">
//                 Question {currentQuestionIndex + 1} of {test.questions.length}
//               </p>
//               <h2 className="text-2xl mt-2">{currentQuestion.questionText}</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {currentQuestion.options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswerSelect(option)}
//                   className={`p-4 rounded-lg text-left border-2 transition-colors ${
//                     answers[currentQuestionIndex] === option
//                       ? 'bg-blue-500 border-blue-500 text-white'
//                       : 'bg-white border-gray-300 hover:bg-gray-100'
//                   }`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </main>

//         <WebcamMonitor
//           captureMode={false}
//           onFrameCaptured={handleFrameAnalysis}
//         />

//         <footer className="flex justify-between items-center p-4 bg-white border-t z-10">
//           <button
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestionIndex === 0}
//             className="bg-gray-600 text-white py-2 px-8 rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
//           >
//             Previous
//           </button>

//           {currentQuestionIndex === test.questions.length - 1 ? (
//             <button
//               onClick={handleSubmission}
//               className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700"
//             >
//               Submit Test
//             </button>
//           ) : (
//             <button
//               onClick={handleNextQuestion}
//               className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700"
//             >
//               Next
//             </button>
//           )}
//         </footer>
//       </div>
//     </>
//   );
// }

// }






'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
import PhotoCapture from '@/app/component/proctoring/PhotoCapture';
import AudioMonitor from '@/app/component/proctoring/AudioMonitor';

interface Question { _id: string; questionText: string; options: string[]; }
interface Test { _id: string; title: string; duration: number; questions: Question[]; }
type Answers = { [key: number]: string; };

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<'instructions' | 'verification' | 'in_progress'>('instructions');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [warning, setWarning] = useState<{ title: string; message: string } | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  // --- Fetch Test ---
  useEffect(() => {
    if (!testId) return;
    const fetchTest = async () => {
      const token = localStorage.getItem('token');
      if (!token) { router.push('/login'); return; }
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/tests/${testId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to load the test.');
        const data: Test = await response.json();
        setTest(data);
        setTimeLeft(data.duration * 60);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [testId, router]);

  // --- Countdown Timer ---
  useEffect(() => {
    if (stage !== 'in_progress' || !test) return;
    if (timeLeft <= 0) {
      handleSubmission();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [stage, timeLeft, test]);

  // --- Tab Switch Violation ---
  useEffect(() => {
    if (stage !== 'in_progress' || !attemptId) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Violation: Tab switch detected, logging...");
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ violationType: 'tab_switch' }),
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [stage, attemptId]);

  // --- Socket.IO Connection ---
  useEffect(() => {
    if (stage !== 'in_progress' || !attemptId) return;

    const socket: Socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to socket server!');
      socket.emit('join_attempt_room', attemptId);
    });

    socket.on('fatal_strike_warning', (data) => {
      setWarning({ title: `Fatal Warning (${data.strikes}/3)`, message: data.message });
    });

    socket.on('force_submit', (data) => {
      alert(data.message);
      handleSubmission();
    });

    return () => {
      console.log('Disconnecting from socket server.');
      socket.disconnect();
    };
  }, [stage, attemptId]);

  const renderWarningPopup = () => {
    if (!warning) return null;
    return (
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{warning.title}</h2>
          <p className="text-gray-700 mb-6">{warning.message}</p>
          <button
            onClick={() => setWarning(null)}
            className="bg-red-500 text-white py-2 px-8 rounded-lg hover:bg-red-600"
          >
            I Understand
          </button>
        </div>
      </div>
    );
  };

  // --- Handlers ---
  const handleProceedToVerification = () => setStage('verification');

  const handleStartTest = async () => {
    if (!capturedPhoto || !recordedAudio) {
      alert("Please complete both photo and audio verification.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/tests/${testId}/start`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Could not start the test session.");
      const data = await response.json();
      setAttemptId(data.attemptId);
      setStage('in_progress');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCapturedPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFrameAnalysis = async (imageData: string) => {
    if (!attemptId) return;
    try {
      const aiResponse = await fetch('http://localhost:8000/analyze-video-frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: imageData }),
      });

      if (!aiResponse.ok) {
        console.error("AI service analysis failed. Status:", aiResponse.status);
        return;
      }

      const analysisResult = await aiResponse.json();
      console.log("AI Response:", analysisResult);

      if (analysisResult.violation_type) {
        console.log(`Violation Detected by AI: ${analysisResult.violation_type}`);
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ violationType: analysisResult.violation_type }),
        });
      }
    } catch (error) {
      console.error("An error occurred during the frame analysis process:", error);
    }
  };

  // --- NEW: Audio Analysis ---
  const handleAudioAnalysis = async (audioData: string) => {
    if (!attemptId) return;
    try {
      const aiResponse = await fetch('http://localhost:8000/analyze-audio-clip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio_data: audioData }),
      });

      if (!aiResponse.ok) {
        console.error("AI audio analysis failed. Status:", aiResponse.status);
        return;
      }

      const result = await aiResponse.json();
      console.log("Audio AI Response:", result);

      if (result.violation_type) {
        console.log(`Violation Detected by AI: ${result.violation_type}`);
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ violationType: result.violation_type }),
        });
      }
    } catch (error) {
      console.error("Error during audio analysis:", error);
    }
  };

  const handleAnswerSelect = (option: string) =>
    setAnswers({ ...answers, [currentQuestionIndex]: option });

  const handleNextQuestion = () => {
    if (test && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmission = async () => {
    if (!attemptId) {
      setError("Cannot submit: No attempt ID found.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error('Failed to submit the test.');
      const result = await response.json();
      router.push(`/results/${result._id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- UI States ---
  if (loading && !test) return <div className="flex justify-center items-center h-screen">Loading Test...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  if (!test) return <div className="flex justify-center items-center h-screen">Test not found.</div>;

  // --- Stage: Instructions ---
  if (stage === 'instructions') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
          <hr className="my-4"/>
          <div className="text-left space-y-4">
              <p><span className="font-semibold">Duration:</span> {test.duration} Minutes</p>
              <p><span className="font-semibold">Number of Questions:</span> {test.questions.length}</p>
              <p className="font-semibold">Instructions:</p>
              <ul className="list-disc list-inside text-gray-700">
                  <li>This is a proctored exam.</li>
                  <li>You must complete a verification step first.</li>
                  <li>Ensure you have a stable internet connection.</li>
              </ul>
          </div>
          <button onClick={handleProceedToVerification} className="mt-8 bg-blue-600 text-white py-3 px-12 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Proceed to Verification
          </button>
        </div>
      </div>
    );
  }

  // --- Stage: Verification ---
  if (stage === 'verification') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Identity Verification</h1>
          <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-4 text-center">Photo Verification</h2>
                <div className="p-4 border-2 border-dashed rounded-lg">
                    <PhotoCapture onPhotoCaptured={setCapturedPhoto} />
                    <p className="text-center my-4 font-semibold">OR</p>
                    <div className="flex flex-col items-center">
                        <label className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300">
                            Upload Photo from Gallery
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                    </div>
                </div>
            </div>
            <AudioRecorder onAudioRecorded={setRecordedAudio} />
          </div>
          <button
            onClick={handleStartTest}
            disabled={!capturedPhoto || !recordedAudio || loading}
            className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            {loading ? "Starting..." : "Confirm and Begin Test"}
          </button>
        </div>
      </div>
    );
  }

  // --- Stage: In Progress ---
  if (stage === 'in_progress') {
    const currentQuestion = test.questions[currentQuestionIndex];
    return (
      <>
        {renderWarningPopup()}

        <div className="flex flex-col h-screen bg-gray-50 relative">
          <header className="flex justify-between items-center p-4 bg-white shadow-md z-10">
            <h1 className="text-2xl font-bold text-gray-800">{test.title}</h1>
            <div className="text-2xl font-mono bg-gray-800 text-white px-4 py-2 rounded-lg">
              {formatTime(timeLeft)}
            </div>
          </header>

          <main className="flex-grow p-6 md:p-10">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-20">
                <p className="text-2xl font-semibold animate-pulse">Submitting your test...</p>
              </div>
            )}

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">
                  Question {currentQuestionIndex + 1} of {test.questions.length}
                </p>
                <h2 className="text-2xl mt-2">{currentQuestion.questionText}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`p-4 rounded-lg text-left border-2 transition-colors ${
                      answers[currentQuestionIndex] === option
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </main>

          {/* Proctoring Components */}
          <WebcamMonitor
            captureMode={false}
            onFrameCaptured={handleFrameAnalysis}
          />
          <AudioMonitor onAudioClipRecorded={handleAudioAnalysis} />

          <footer className="flex justify-between items-center p-4 bg-white border-t z-10">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-600 text-white py-2 px-8 rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
            >
              Previous
            </button>

            {currentQuestionIndex === test.questions.length - 1 ? (
              <button
                onClick={handleSubmission}
                className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </footer>
        </div>
      </>
    );
  }
}
