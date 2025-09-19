







// 'use client';

// import { useEffect, useState, ChangeEvent } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { io, Socket } from 'socket.io-client';
// import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
// import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
// import PhotoCapture from '@/app/component/proctoring/PhotoCapture';
// import AudioMonitor from '@/app/component/proctoring/AudioMonitor';

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

//   // --- Socket.IO Connection for Fatal Warnings ---
//   useEffect(() => {
//     if (!attemptId) return;

//     const socket = io('http://localhost:5000', {
//       transports: ['websocket', 'polling'], // ensures proper connection
//     });

//     socket.on('connect', () => {
//       console.log('Connected to socket server!');
//       socket.emit('join_attempt_room', attemptId);
//     });

//     // Trigger popup when fatal strike occurs
//     socket.on('fatal_strike_warning', (data) => {
//       setWarning({ title: `Fatal Warning (${data.strikes}/3)`, message: data.message });
//     });

//     // Force submission if too many fatal strikes
//     socket.on('force_submit', (data) => {
//       setWarning({ title: 'Test Terminated', message: data.message });
//       handleSubmission();
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [attemptId]);

//   const renderWarningPopup = () => {
//     if (!warning) return null;
//     return (
//       <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//         <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">{warning.title}</h2>
//           <p className="text-gray-700 mb-6">{warning.message}</p>
//           <button
//             onClick={() => setWarning(null)}
//             className="bg-red-500 text-white py-2 px-8 rounded-lg hover:bg-red-600"
//           >
//             I Understand
//           </button>
//         </div>
//       </div>
//     );
//   };

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

//   const handleFrameAnalysis = async (imageData: string) => {
//     if (!attemptId) return;
//     try {
//       const aiResponse = await fetch('http://localhost:8000/analyze-video-frame', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image_data: imageData }),
//       });

//       if (!aiResponse.ok) {
//         console.error("AI service analysis failed. Status:", aiResponse.status);
//         return;
//       }

//       const analysisResult = await aiResponse.json();
//       console.log("AI Response:", analysisResult);

//       if (analysisResult.violation_type) {
//         console.log(`Violation Detected by AI: ${analysisResult.violation_type}`);
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}` 
//           },
//           body: JSON.stringify({ violationType: analysisResult.violation_type }),
//         });
//       }
//     } catch (error) {
//       console.error("An error occurred during the frame analysis process:", error);
//     }
//   };

//   const handleAudioAnalysis = async (audioData: string) => {
//     if (!attemptId) return;
//     try {
//       const aiResponse = await fetch('http://localhost:8000/analyze-audio-clip', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ audio_data: audioData }),
//       });

//       if (!aiResponse.ok) {
//         console.error("AI audio analysis failed. Status:", aiResponse.status);
//         return;
//       }

//       const result = await aiResponse.json();
//       console.log("Audio AI Response:", result);

//       if (result.violation_type) {
//         console.log(`Violation Detected by AI: ${result.violation_type}`);
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}` 
//           },
//           body: JSON.stringify({ violationType: result.violation_type }),
//         });
//       }
//     } catch (error) {
//       console.error("Error during audio analysis:", error);
//     }
//   };

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

//   // --- Stage: In Progress ---
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

//         {/* Proctoring Components */}
//         <WebcamMonitor
//           captureMode={false}
//           onFrameCaptured={handleFrameAnalysis}
//         />
//         <AudioMonitor onAudioClipRecorded={handleAudioAnalysis} />

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





// // packages/web/src/app/test/[testId]/page.tsx

// 'use client';

// import { useEffect, useState, ChangeEvent } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { io, Socket } from 'socket.io-client';
// import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
// import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
// import PhotoCapture from '@/app/component/proctoring/PhotoCapture';
// import AudioMonitor from '@/app/component/proctoring/AudioMonitor';

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
//     if (!attemptId) return;
//     const socket = io('http://localhost:5000', { transports: ['websocket', 'polling'] });

//     socket.on('connect', () => {
//       console.log('Connected to socket server!');
//       socket.emit('join_attempt_room', attemptId);
//     });

//     socket.on('fatal_strike_warning', (data) => {
//       setWarning({ title: `Fatal Warning (${data.strikes}/4)`, message: data.message });
//     });

//     socket.on('suspicion_score_warning', (data) => {
//       setWarning({ title: `Suspicion Score: ${data.score}/20`, message: data.message });
//     });

//     socket.on('force_submit', (data) => {
//       setWarning({ title: 'Test Terminated', message: data.message });
//       handleSubmission();
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [attemptId]);

//   const renderWarningPopup = () => {
//     if (!warning) return null;
//     const isFatal = warning.title.includes('Fatal');
//     const isSuspicion = warning.title.includes('Suspicion');
//     const color = isFatal ? 'red' : isSuspicion ? 'yellow' : 'gray';
//     return (
//       <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//         <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md text-center">
//           <h2 className={`text-2xl font-bold mb-4 ${color === 'red' ? 'text-red-600' : 'text-yellow-600'}`}>
//             {warning.title}
//           </h2>
//           <p className="text-gray-700 mb-6">{warning.message}</p>
//           <button
//             onClick={() => setWarning(null)}
//             className={`text-white py-2 px-8 rounded-lg ${color === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
//           >
//             I Understand
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const handleProceedToVerification = () => setStage('verification');

//   const handleStartTest = async () => {
//     if (!capturedPhoto || !recordedAudio) { alert("Please complete both photo and audio verification."); return; }
//     setLoading(true);
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch(`http://localhost:5000/api/tests/${testId}/start`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
//       if (!response.ok) throw new Error("Could not start the test session.");
//       const data = await response.json();
//       setAttemptId(data.attemptId);
//       setStage('in_progress');
//     } catch (err: any) { setError(err.message); }
//     finally { setLoading(false); }
//   };

//   const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setCapturedPhoto(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFrameAnalysis = async (imageData: string) => {
//     if (!attemptId) return;
//     try {
//       const aiResponse = await fetch('http://localhost:8000/analyze-video-frame', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image_data: imageData }),
//       });
//       if (!aiResponse.ok) return;
//       const analysisResult = await aiResponse.json();
//       if (analysisResult.violation_type) {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//           body: JSON.stringify({ violationType: analysisResult.violation_type }),
//         });
//       }
//     } catch (error) { console.error(error); }
//   };

//   const handleAudioAnalysis = async (audioData: string) => {
//     if (!attemptId) return;
//     try {
//       const aiResponse = await fetch('http://localhost:8000/analyze-audio-clip', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ audio_data: audioData }),
//       });
//       if (!aiResponse.ok) return;
//       const result = await aiResponse.json();
//       if (result.violation_type) {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//           body: JSON.stringify({ violationType: result.violation_type }),
//         });
//       }
//     } catch (error) { console.error(error); }
//   };

//   const handleAnswerSelect = (option: string) => setAnswers({ ...answers, [currentQuestionIndex]: option });
//   const handleNextQuestion = () => { if (test && currentQuestionIndex < test.questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1); };
//   const handlePreviousQuestion = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1); };

//   const handleSubmission = async () => {
//     if (!attemptId) { setError("Cannot submit: No attempt ID found."); return; }
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
//     } catch (err: any) { setError(err.message); }
//     finally { setLoading(false); }
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading && !test) return <div className="flex justify-center items-center h-screen">Loading Test...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
//   if (!test) return <div className="flex justify-center items-center h-screen">Test not found.</div>;

//   if (stage === 'instructions') {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//         <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
//           <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
//           <hr className="my-4"/>
//           <div className="text-left space-y-4">
//             <p><span className="font-semibold">Duration:</span> {test.duration} Minutes</p>
//             <p><span className="font-semibold">Number of Questions:</span> {test.questions.length}</p>
//             <p className="font-semibold">Instructions:</p>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>This is a proctored exam.</li>
//               <li>You must complete a verification step first.</li>
//               <li>Ensure you have a stable internet connection.</li>
//             </ul>
//           </div>
//           <button onClick={handleProceedToVerification} className="mt-8 bg-blue-600 text-white py-3 px-12 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
//             Proceed to Verification
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (stage === 'verification') {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
//         <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
//           <h1 className="text-3xl font-bold mb-6 text-center">Identity Verification</h1>
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-xl font-semibold mb-4 text-center">Photo Verification</h2>
//               <div className="p-4 border-2 border-dashed rounded-lg">
//                 <PhotoCapture onPhotoCaptured={setCapturedPhoto} />
//                 <p className="text-center my-4 font-semibold">OR</p>
//                 <div className="flex flex-col items-center">
//                   <label className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300">
//                     Upload Photo from Gallery
//                     <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
//                   </label>
//                 </div>
//               </div>
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

//         <WebcamMonitor captureMode={false} onFrameCaptured={handleFrameAnalysis} />
//         <AudioMonitor onAudioClipRecorded={handleAudioAnalysis} />

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









'use client';

import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
import PhotoCapture from '@/app/component/proctoring/PhotoCapture';
import AudioMonitor from '@/app/component/proctoring/AudioMonitor';

// --- Interfaces ---
interface Question { _id: string; questionText: string; options: string[]; }
interface Test { _id: string; title: string; duration: number; questions: Question[]; }
type Answers = { [key: number]: string; };

// --- SVG Icons ---
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 inline-block mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-cyan-400"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-cyan-400"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>;
const WarningIcon = ({ colorClass }: { colorClass: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-12 h-12 mx-auto mb-4 ${colorClass}`}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;

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

    const handleSubmission = useCallback(async () => {
        if (!attemptId) { setError("Cannot submit: No attempt ID found."); return; }
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
        } catch (err: any) { setError(err.message); }
        finally { setLoading(false); }
    }, [attemptId, answers, router]);

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
    }, [stage, timeLeft, test, handleSubmission]);

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
    
    useEffect(() => {
        if (!attemptId) return;
        const socket = io('http://localhost:5000', { transports: ['websocket', 'polling'] });
        socket.on('connect', () => {
            console.log('Connected to socket server!');
            socket.emit('join_attempt_room', attemptId);
        });
        socket.on('fatal_strike_warning', (data) => setWarning({ title: `Fatal Warning (${data.strikes}/4)`, message: data.message }));
        socket.on('suspicion_score_warning', (data) => setWarning({ title: `Suspicion Score: ${data.score}/20`, message: data.message }));
        socket.on('force_submit', (data) => {
            setWarning({ title: 'Test Terminated', message: data.message });
            handleSubmission();
        });
        return () => { socket.disconnect(); };
    }, [attemptId, handleSubmission]);
    
    const handleProceedToVerification = () => setStage('verification');

    const handleStartTest = async () => {
        if (!capturedPhoto || !recordedAudio) { alert("Please complete both photo and audio verification."); return; }
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/api/tests/${testId}/start`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error("Could not start the test session.");
            const data = await response.json();
            setAttemptId(data.attemptId);
            setStage('in_progress');
        } catch (err: any) { setError(err.message); }
        finally { setLoading(false); }
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
            const aiResponse = await fetch('http://localhost:8000/analyze-video-frame', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image_data: imageData }), });
            if (!aiResponse.ok) return;
            const analysisResult = await aiResponse.json();
            if (analysisResult.violation_type) {
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ violationType: analysisResult.violation_type }), });
            }
        } catch (error) { console.error(error); }
    };

    const handleAudioAnalysis = async (audioData: string) => {
        if (!attemptId) return;
        try {
            const aiResponse = await fetch('http://localhost:8000/analyze-audio-clip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ audio_data: audioData }), });
            if (!aiResponse.ok) return;
            const result = await aiResponse.json();
            if (result.violation_type) {
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:5000/api/attempts/${attemptId}/log`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ violationType: result.violation_type }), });
            }
        } catch (error) { console.error(error); }
    };

    const handleAnswerSelect = (option: string) => setAnswers({ ...answers, [currentQuestionIndex]: option });
    const handleNextQuestion = () => { if (test && currentQuestionIndex < test.questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1); };
    const handlePreviousQuestion = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1); };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderWarningPopup = () => {
        if (!warning) return null;
        const isFatal = warning.title.includes('Fatal');
        const isSuspicion = warning.title.includes('Suspicion');
        const colorClass = isFatal ? 'text-red-500' : isSuspicion ? 'text-yellow-500' : 'text-gray-400';
        const buttonClass = isFatal ? 'bg-red-600 hover:bg-red-500' : isSuspicion ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-600 hover:bg-gray-500';
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-gray-900 border border-red-800/50 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center max-w-md w-full">
                    <WarningIcon colorClass={colorClass} />
                    <h2 className={`text-2xl font-bold mb-4 ${colorClass}`}>{warning.title}</h2>
                    <p className="text-gray-300 mb-6">{warning.message}</p>
                    <button onClick={() => setWarning(null)} className={`text-white py-2 px-8 rounded-lg font-semibold ${buttonClass}`}>I Understand</button>
                </div>
            </div>
        );
    };

    if (loading && !test) return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-cyan-300 text-xl animate-pulse">Loading Test Environment...</div>;
    if (error) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-red-400 p-4"><p className="text-xl font-bold">Error: {error}</p><button onClick={() => router.push('/student')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Back to Dashboard</button></div>;
    if (!test) return <div className="flex justify-center items-center min-h-screen bg-gray-900">Test not found.</div>;

    if (stage === 'instructions') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 font-sans text-white bg-gradient-to-br from-gray-900 via-black to-gray-900">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="bg-black/50 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-black/40 p-8 backdrop-blur-xl">
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">{test.title}</h1>
                            <p className="text-cyan-400 mt-2">Assessment Instructions</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center my-8 text-lg">
                            <p><span className="font-bold text-gray-400 block">Duration</span> {test.duration} Minutes</p>
                            <p><span className="font-bold text-gray-400 block">Questions</span> {test.questions.length}</p>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                            <h2 className="font-semibold text-xl mb-3 flex items-center"><InfoIcon /> Important Rules</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                <li>This is a remotely proctored exam. Your webcam and microphone will be monitored.</li>
                                <li>You must complete an identity verification step before starting.</li>
                                <li>Ensure you have a stable and uninterrupted internet connection.</li>
                                <li>Switching tabs or opening other applications is strictly prohibited and will be flagged.</li>
                            </ul>
                        </div>
                        <button onClick={handleProceedToVerification} className="w-full mt-8 bg-cyan-600 text-white py-3 px-12 rounded-lg text-lg font-semibold hover:bg-cyan-500 transition-all transform hover:scale-105">
                            Proceed to Verification
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (stage === 'verification') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 font-sans text-white">
                <div className="w-full max-w-4xl bg-black/50 border border-cyan-800/50 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
                    <h1 className="text-3xl font-bold mb-8 text-center">Identity Verification</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
                            <CameraIcon />
                            <h2 className="text-xl font-semibold my-4">Photo Verification</h2>
                            <PhotoCapture onPhotoCaptured={setCapturedPhoto} />
                            <p className="text-center my-4 text-gray-500 font-semibold">OR</p>
                            <label className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-600">Upload Photo<input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" /></label>
                        </div>
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center">
                           <MicIcon />
                           <h2 className="text-xl font-semibold my-4">Audio Verification</h2>
                           <AudioRecorder onAudioRecorded={setRecordedAudio} />
                        </div>
                    </div>
                    <button onClick={handleStartTest} disabled={!capturedPhoto || !recordedAudio || loading} className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400">
                        {loading ? "Starting..." : "Confirm and Begin Test"}
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];
    return (
        <>
            {renderWarningPopup()}
            <div className="flex flex-col h-screen bg-gray-900 text-white font-sans relative">
                <header className="flex justify-between items-center p-4 bg-black/50 border-b border-gray-800 z-10">
                    <h1 className="text-xl font-bold">{test.title}</h1>
                    <div className="text-2xl font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-lg">
                        {formatTime(timeLeft)}
                    </div>
                </header>

                <main className="flex-grow p-6 md:p-10 flex items-center justify-center">
                    {loading && (
                        <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-20">
                            <p className="text-2xl font-semibold animate-pulse">Submitting your test...</p>
                        </div>
                    )}
                    <div className="max-w-4xl w-full bg-black/50 p-8 rounded-2xl border border-gray-800">
                        <div className="mb-6">
                            <p className="font-semibold text-cyan-400">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
                            <h2 className="text-2xl mt-2 text-white">{currentQuestion.questionText}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswerSelect(option)}
                                    className={`p-4 rounded-lg text-left border-2 transition-all duration-200 ${
                                        answers[currentQuestionIndex] === option
                                        ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-cyan-700'
                                    }`}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
                
                <WebcamMonitor captureMode={false} onFrameCaptured={handleFrameAnalysis} />
                <AudioMonitor onAudioClipRecorded={handleAudioAnalysis} />

                <footer className="flex justify-between items-center p-4 bg-black/50 border-t border-gray-800 z-10">
                    <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="bg-gray-700 text-white py-2 px-8 rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    {currentQuestionIndex === test.questions.length - 1 ? (
                        <button onClick={handleSubmission} className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-500 font-semibold">
                            Submit Test
                        </button>
                    ) : (
                        <button onClick={handleNextQuestion} className="bg-cyan-600 text-white py-2 px-8 rounded-lg hover:bg-cyan-500 font-semibold">
                            Next
                        </button>
                    )}
                </footer>
            </div>
        </>
    );
}


