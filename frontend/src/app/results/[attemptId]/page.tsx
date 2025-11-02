




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// // --- Interfaces (Untouched) ---
// interface ProctoringLog {
//   type: string;
//   timestamp: string;
//   _id: string;
// }

// interface Result {
//   _id: string;
//   score: number;
//   totalMarks: number;
//   fatalStrikes: number;
//   suspicionScore: number;
//   proctoringLogs: ProctoringLog[];
//   testId: { title: string };
// }

// // --- SVG Icons (Untouched) ---
// const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
// const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
// const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
// const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;


// // --- Score Circular Progress Component (Untouched Logic) ---
// const ScoreCircle = ({ percentage }: { percentage: number }) => {
//     const sqSize = 140;
//     const strokeWidth = 12;
//     const radius = (sqSize - strokeWidth) / 2;
//     const viewBox = `0 0 ${sqSize} ${sqSize}`;
//     const dashArray = radius * Math.PI * 2;
//     const dashOffset = dashArray - (dashArray * percentage) / 100;

//     let strokeColor = "#22c55e"; // green-500
//     if (percentage < 75) strokeColor = "#f59e0b"; // amber-500
//     if (percentage < 50) strokeColor = "#ef4444"; // red-500

//     return (
//         <div className="relative" style={{ width: sqSize, height: sqSize }}>
//              <svg width={sqSize} height={sqSize} viewBox={viewBox}>
//                 <circle className="text-gray-700/50" cx={sqSize / 2} cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} stroke="currentColor" fill="none" />
//                 <circle
//                     className="transition-all duration-1000 ease-in-out"
//                     cx={sqSize / 2}
//                     cy={sqSize / 2}
//                     r={radius}
//                     strokeWidth={`${strokeWidth}px`}
//                     transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
//                     style={{
//                         strokeDasharray: dashArray,
//                         strokeDashoffset: dashOffset,
//                         stroke: strokeColor,
//                     }}
//                     strokeLinecap="round"
//                     fill="none"
//                 />
//             </svg>
//             <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className="text-4xl font-bold" style={{ color: strokeColor }}>
//                     {percentage}
//                 </span>
//                 <span className="text-sm text-gray-400 -mt-1">%</span>
//             </div>
//         </div>
//     );
// };

// // --- Global Styles Component ---
// const GlobalStyles = () => (
//     <style jsx global>{`
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

//         .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
//         .bg-sentinel-animated {
//             background: linear-gradient(90deg, #020617, #082f49, #020617);
//             background-size: 200% 200%;
//             animation: backgroundPan 15s ease infinite;
//         }
//     `}</style>
// );


// export default function ResultPage({ params }: { params: { attemptId: string } }) {
//   const router = useRouter();
//   const attemptId = params.attemptId;

//   const [result, setResult] = useState<Result | null>(null);
//   const [loading, setLoading] = useState(true);

//   // --- All original logic is preserved ---
//   useEffect(() => {
//     if (!attemptId) return;
//     const fetchResult = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await fetch(`http://localhost:5000/api/results/${attemptId}`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('Could not fetch results.');
//         const data = await res.json();
//         setResult(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResult();
//   }, [attemptId]);

//   const formatLogMessage = (logType: string) => {
//     switch (logType) {
//       case 'tab_switch':
//         return { message: 'Navigated away from the test tab.', level: 'Suspicious', icon: AlertTriangleIcon };
//       case 'no_face_detected':
//         return { message: 'User was not detected in the camera frame.', level: 'Fatal', icon: XCircleIcon };
//       case 'multiple_faces_detected':
//         return { message: 'Multiple people were detected in the camera frame.', level: 'Fatal', icon: XCircleIcon };
//       case 'voice_activity_detected':
//         return { message: 'Voice or speech was detected during the test.', level: 'Fatal', icon: XCircleIcon };
//       default:
//         return { message: 'An unknown event was logged.', level: 'Info', icon: () => null };
//     }
//   };

//   if (loading) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-cyan-300 text-xl"><div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div><p className="mt-4">Loading Your Results...</p></div>;
//   if (!result) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-red-400 p-4"><p className="text-xl font-bold">Results Not Found</p><button onClick={() => router.push('/student')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Back to Dashboard</button></div>;

//   const percentage = Math.round((result.score / result.totalMarks) * 100);

//   return (
//     <>
//         <GlobalStyles />
//         <div className="min-h-screen bg-sentinel-animated font-sans text-white p-4 sm:p-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-black/70 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-xl text-center mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
//               <h1 className="text-3xl font-extrabold text-white tracking-tight">Test Completed!</h1>
//               <h2 className="text-xl text-cyan-400 mt-2 mb-8">Results for: {result.testId.title}</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//                 <div className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-800">
//                   <p className="text-lg font-semibold text-gray-400">Final Score</p>
//                   <p className="text-5xl font-bold text-white mt-2">{result.score}<span className="text-3xl text-gray-500">/{result.totalMarks}</span></p>
//                 </div>
                
//                 <div className="flex items-center justify-center">
//                     <ScoreCircle percentage={percentage} />
//                 </div>

//                 <div className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-800">
//                   <p className="text-lg font-semibold text-gray-400">Suspicion Score</p>
//                   <p className="text-5xl font-bold text-yellow-400 mt-2">{result.suspicionScore}<span className="text-3xl text-gray-500">/20</span></p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-black/70 border border-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-xl animate-fadeInUp" style={{ animationDelay: '300ms' }}>
//               <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-2xl font-bold text-white">Proctoring Report</h2>
//                   <p className="text-sm font-semibold bg-red-900/50 text-red-400 border border-red-700/50 px-3 py-1 rounded-full">
//                     Fatal Strikes: {result.fatalStrikes} / 3
//                   </p>
//               </div>

//               {result.proctoringLogs.length === 0 ? (
//                 <div className="text-center py-12">
//                     <ShieldCheckIcon />
//                     <p className="text-green-400 font-semibold mt-4 text-lg">System Integrity Nominal</p>
//                     <p className="text-gray-400 text-sm">No suspicious activity was detected during the session.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {result.proctoringLogs.map((log) => {
//                     const { message, level, icon: LogIcon } = formatLogMessage(log.type);
//                     const isFatal = level === 'Fatal';
//                     const isSuspicious = level === 'Suspicious';
//                     return (
//                       <div key={log._id} className={`bg-gray-900/70 p-4 rounded-lg border-l-4 flex justify-between items-center transition-all hover:bg-gray-800/50 ${
//                           isFatal ? 'border-red-500' : isSuspicious ? 'border-yellow-500' : 'border-gray-600'
//                       }`}>
//                         <div className="flex items-center">
//                             <div className={`mr-4 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
//                                 isFatal ? 'bg-red-500/10' : 'bg-yellow-500/10'
//                             }`}>
//                                 <LogIcon />
//                             </div>
//                             <div>
//                                 <p className={`font-semibold ${
//                                     isFatal ? 'text-red-400' : isSuspicious ? 'text-yellow-400' : 'text-gray-300'
//                                 }`}>{level} Event</p>
//                                 <p className="text-gray-300">{message}</p>
//                             </div>
//                         </div>
//                         <p className="text-sm text-gray-500 font-mono">
//                           {new Date(log.timestamp).toLocaleTimeString()}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             <div className="text-center mt-8 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
//               <button
//                 onClick={() => router.push('/student')}
//                 className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-12 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
//               >
//                 Back to Dashboard
//               </button>
//             </div>
//           </div>
//         </div>
//     </>
//   );
// }
















// // packages/web/src/app/results/[attemptId]/page.tsx

// 'use client';

// import { useEffect, useState, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';

// // --- Interfaces ---
// interface ProctoringLog {
//   type: string;
//   timestamp: string;
//   _id: string;
// }

// interface Result {
//   _id: string;
//   score: number;
//   totalMarks: number;
//   fatalStrikes: number;
//   suspicionScore: number;
//   proctoringLogs: ProctoringLog[];
//   testId: { title: string };
// }

// // --- SVG Icons ---
// const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
// const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
// const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
// const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-16 h-16 mx-auto text-green-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>;

// // --- Score Circular Progress ---
// const ScoreCircle = ({ percentage }: { percentage: number }) => {
//   const sqSize = 140;
//   const strokeWidth = 12;
//   const radius = (sqSize - strokeWidth) / 2;
//   const viewBox = `0 0 ${sqSize} ${sqSize}`;
//   const dashArray = radius * Math.PI * 2;
//   const dashOffset = dashArray - (dashArray * percentage) / 100;

//   let strokeColor = "#22c55e";
//   if (percentage < 75) strokeColor = "#f59e0b";
//   if (percentage < 50) strokeColor = "#ef4444";

//   return (
//     <div className="relative" style={{ width: sqSize, height: sqSize }}>
//       <svg width={sqSize} height={sqSize} viewBox={viewBox}>
//         <circle className="text-gray-700/50" cx={sqSize / 2} cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} stroke="currentColor" fill="none" />
//         <circle
//           className="transition-all duration-1000 ease-in-out"
//           cx={sqSize / 2}
//           cy={sqSize / 2}
//           r={radius}
//           strokeWidth={`${strokeWidth}px`}
//           transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
//           style={{
//             strokeDasharray: dashArray,
//             strokeDashoffset: dashOffset,
//             stroke: strokeColor,
//           }}
//           strokeLinecap="round"
//           fill="none"
//         />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-4xl font-bold" style={{ color: strokeColor }}>
//           {percentage}
//         </span>
//         <span className="text-sm text-gray-400 -mt-1">%</span>
//       </div>
//     </div>
//   );
// };

// // --- Global Styles ---
// const GlobalStyles = () => (
//   <style jsx global>{`
//     @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//     @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//     @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//     .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
//     .bg-sentinel-animated {
//       background: linear-gradient(90deg, #020617, #082f49, #020617);
//       background-size: 200% 200%;
//       animation: backgroundPan 15s ease infinite;
//     }
//   `}</style>
// );

// export default function ResultPage({ params }: { params: { attemptId: string } }) {
//   const router = useRouter();
//   const attemptId = params.attemptId;

//   const [result, setResult] = useState<Result | null>(null);
//   const [loading, setLoading] = useState(true);

//   // --- Complaint modal state ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [complaintMessage, setComplaintMessage] = useState('');
//   const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

//   // --- Fetch result ---
//   useEffect(() => {
//     if (!attemptId) return;
//     const fetchResult = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/results/${attemptId}`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('Could not fetch results.');
//         const data = await res.json();
//         setResult(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResult();
//   }, [attemptId]);

//   // --- Complaint submit handler ---
//   const handleComplaintSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setSubmissionStatus('submitting');
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/complaints`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           attemptId,
//           message: complaintMessage,
//         }),
//       });
//       if (!res.ok) throw new Error('Failed to submit complaint.');
//       setSubmissionStatus('success');
//       setTimeout(() => {
//         setIsModalOpen(false);
//         setSubmissionStatus('idle');
//         setComplaintMessage('');
//       }, 2000);
//     } catch (error) {
//       console.error(error);
//       setSubmissionStatus('error');
//     }
//   };

//   // --- Log formatter ---
//   const formatLogMessage = (logType: string) => {
//     switch (logType) {
//       case 'tab_switch':
//         return { message: 'Navigated away from the test tab.', level: 'Suspicious', icon: AlertTriangleIcon };
//       case 'no_face_detected':
//         return { message: 'User was not detected in the camera frame.', level: 'Fatal', icon: XCircleIcon };
//       case 'multiple_faces_detected':
//         return { message: 'Multiple people were detected in the camera frame.', level: 'Fatal', icon: XCircleIcon };
//       case 'voice_activity_detected':
//         return { message: 'Voice or speech was detected during the test.', level: 'Fatal', icon: XCircleIcon };
//       default:
//         return { message: 'An unknown event was logged.', level: 'Info', icon: () => null };
//     }
//   };

//   if (loading) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-cyan-300 text-xl"><div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div><p className="mt-4">Loading Your Results...</p></div>;
//   if (!result) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-red-400 p-4"><p className="text-xl font-bold">Results Not Found</p><button onClick={() => router.push('/student')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Back to Dashboard</button></div>;

//   const percentage = Math.round((result.score / result.totalMarks) * 100);

//   return (
//     <>
//       <GlobalStyles />
//       <div className="min-h-screen bg-sentinel-animated font-sans text-white p-4 sm:p-8">
//         <div className="max-w-4xl mx-auto">
//           {/* --- Score Section --- */}
//           <div className="bg-black/70 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-xl text-center mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
//             <h1 className="text-3xl font-extrabold text-white tracking-tight">Test Completed!</h1>
//             <h2 className="text-xl text-cyan-400 mt-2 mb-8">Results for: {result.testId.title}</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
//               <div className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-800">
//                 <p className="text-lg font-semibold text-gray-400">Final Score</p>
//                 <p className="text-5xl font-bold text-white mt-2">{result.score}<span className="text-3xl text-gray-500">/{result.totalMarks}</span></p>
//               </div>
//               <div className="flex items-center justify-center">
//                 <ScoreCircle percentage={percentage} />
//               </div>
//               <div className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-800">
//                 <p className="text-lg font-semibold text-gray-400">Suspicion Score</p>
//                 <p className="text-5xl font-bold text-yellow-400 mt-2">{result.suspicionScore}<span className="text-3xl text-gray-500">/20</span></p>
//               </div>
//             </div>
//           </div>

//           {/* --- Proctoring Logs --- */}
//           <div className="bg-black/70 border border-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-xl animate-fadeInUp" style={{ animationDelay: '300ms' }}>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-white">Proctoring Report</h2>
//               <p className="text-sm font-semibold bg-red-900/50 text-red-400 border border-red-700/50 px-3 py-1 rounded-full">
//                 Fatal Strikes: {result.fatalStrikes} / 3
//               </p>
//             </div>
//             {result.proctoringLogs.length === 0 ? (
//               <div className="text-center py-12">
//                 <ShieldCheckIcon />
//                 <p className="text-green-400 font-semibold mt-4 text-lg">System Integrity Nominal</p>
//                 <p className="text-gray-400 text-sm">No suspicious activity was detected during the session.</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {result.proctoringLogs.map((log) => {
//                   const { message, level, icon: LogIcon } = formatLogMessage(log.type);
//                   const isFatal = level === 'Fatal';
//                   const isSuspicious = level === 'Suspicious';
//                   return (
//                     <div key={log._id} className={`bg-gray-900/70 p-4 rounded-lg border-l-4 flex justify-between items-center transition-all hover:bg-gray-800/50 ${
//                       isFatal ? 'border-red-500' : isSuspicious ? 'border-yellow-500' : 'border-gray-600'
//                     }`}>
//                       <div className="flex items-center">
//                         <div className={`mr-4 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
//                           isFatal ? 'bg-red-500/10' : 'bg-yellow-500/10'
//                         }`}>
//                           <LogIcon />
//                         </div>
//                         <div>
//                           <p className={`font-semibold ${isFatal ? 'text-red-400' : isSuspicious ? 'text-yellow-400' : 'text-gray-300'}`}>
//                             {level} Event
//                           </p>
//                           <p className="text-gray-300">{message}</p>
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-500 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* --- Action Buttons --- */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
//             <button
//               onClick={() => router.push('/student')}
//               className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-12 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-gray-700 text-white py-3 px-12 rounded-lg font-bold hover:bg-gray-600 transition-all transform hover:scale-105"
//             >
//               Report an Issue
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Complaint Modal --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-8 max-w-lg w-full">
//             <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
//             {submissionStatus === 'success' ? (
//               <div className="text-center py-10">
//                 <p className="text-xl font-semibold text-green-600">Complaint Submitted Successfully!</p>
//                 <p className="text-gray-600">Our team will review your issue shortly.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleComplaintSubmit}>
//                 <p className="text-gray-600 mb-4">Please describe the issue you experienced during the test "{result.testId.title}".</p>
//                 <textarea
//                   value={complaintMessage}
//                   onChange={(e) => setComplaintMessage(e.target.value)}
//                   required
//                   rows={5}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   placeholder="e.g., Question #5 had a typo, a proctoring violation was flagged incorrectly..."
//                 />
//                 {submissionStatus === 'error' && (
//                   <p className="text-red-500 mt-2 text-sm">Failed to submit. Please try again.</p>
//                 )}
//                 <div className="flex justify-end gap-4 mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="py-2 px-6 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={submissionStatus === 'submitting'}
//                     className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
//                   >
//                     {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Complaint'}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
















'use client';

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

// Interfaces
interface ProctoringLog {
  type: string;
  timestamp: string;
  _id: string;
}

interface Result {
  _id: string;
  score: number;
  totalMarks: number;
  fatalStrikes: number;
  suspicionScore: number;
  proctoringLogs: ProctoringLog[];
  testId: { title: string };
}

// SVG Icons
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto text-green-500">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-yellow-400">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-red-400">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth="2" className="w-16 h-16 mx-auto text-green-500">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

// Score Circle Component
const ScoreCircle = ({ percentage }: { percentage: number }) => {
  const sqSize = 140;
  const strokeWidth = 12;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  let strokeColor = "#22c55e";
  if (percentage < 75) strokeColor = "#f59e0b";
  if (percentage < 50) strokeColor = "#ef4444";

  return (
    <div className="relative" style={{ width: sqSize, height: sqSize }}>
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className="text-gray-700/50"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          stroke="currentColor"
          fill="none"
        />
        <circle
          className="transition-all duration-1000 ease-in-out"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset, stroke: strokeColor }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color: strokeColor }}>
          {percentage}
        </span>
        <span className="text-sm text-gray-400 -mt-1">%</span>
      </div>
    </div>
  );
};

// Global Styles
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
    .bg-sentinel-animated {
      background: linear-gradient(90deg, #020617, #082f49, #020617);
      background-size: 200% 200%;
      animation: backgroundPan 15s ease infinite;
    }
  `}</style>
);

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const attemptId = params?.attemptId as string;

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaintMessage, setComplaintMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!attemptId) return;
    const fetchResult = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/results/${attemptId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Could not fetch results.");
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [attemptId]);

  const handleComplaintSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ attemptId, message: complaintMessage }),
      });
      if (!res.ok) throw new Error("Failed to submit complaint.");
      setSubmissionStatus("success");
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmissionStatus("idle");
        setComplaintMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  const formatLogMessage = (logType: string) => {
    switch (logType) {
      case "tab_switch":
        return { message: "Navigated away from the test tab.", level: "Suspicious", icon: AlertTriangleIcon };
      case "no_face_detected":
        return { message: "User was not detected in the camera frame.", level: "Fatal", icon: XCircleIcon };
      case "multiple_faces_detected":
        return { message: "Multiple people were detected in the camera frame.", level: "Fatal", icon: XCircleIcon };
      case "voice_activity_detected":
        return { message: "Voice or speech was detected during the test.", level: "Fatal", icon: XCircleIcon };
      default:
        return { message: "An unknown event was logged.", level: "Info", icon: () => null };
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!result) return <div className="flex flex-col justify-center items-center min-h-screen">Results Not Found<button onClick={() => router.push("/student")}>Back</button></div>;

  const percentage = Math.round((result.score / result.totalMarks) * 100);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-sentinel-animated p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/70 p-8 rounded-2xl shadow-2xl backdrop-blur-xl text-center animate-fadeInUp">
            <h1 className="text-3xl font-extrabold">Test Completed!</h1>
            <h2 className="text-xl text-cyan-400 mt-2 mb-8">Results for: {result.testId.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex flex-col items-center p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <p className="text-lg font-semibold text-gray-400">Final Score</p>
                <p className="text-5xl font-bold">{result.score}<span className="text-3xl text-gray-500">/{result.totalMarks}</span></p>
              </div>
              <div className="flex items-center justify-center"><ScoreCircle percentage={percentage} /></div>
              <div className="flex flex-col items-center p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <p className="text-lg font-semibold text-gray-400">Suspicion Score</p>
                <p className="text-5xl font-bold text-yellow-400">{result.suspicionScore}<span className="text-3xl text-gray-500">/20</span></p>
              </div>
            </div>
          </div>

          <div className="bg-black/70 p-8 rounded-2xl shadow-2xl backdrop-blur-xl animate-fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Proctoring Report</h2>
              <p className="text-sm font-semibold bg-red-900/50 text-red-400 border border-red-700/50 px-3 py-1 rounded-full">
                Fatal Strikes: {result.fatalStrikes} / 3
              </p>
            </div>
            {result.proctoringLogs.length === 0 ? (
              <div className="text-center py-12">
                <ShieldCheckIcon />
                <p className="text-green-400 font-semibold mt-4 text-lg">System Integrity Nominal</p>
                <p className="text-gray-400 text-sm">No suspicious activity was detected during the session.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {result.proctoringLogs.map((log) => {
                  const { message, level, icon: LogIcon } = formatLogMessage(log.type);
                  const isFatal = level === "Fatal";
                  const isSuspicious = level === "Suspicious";
                  return (
                    <div key={log._id} className={`bg-gray-900/70 p-4 rounded-lg border-l-4 flex justify-between items-center ${isFatal ? "border-red-500" : isSuspicious ? "border-yellow-500" : "border-gray-600"}`}>
                      <div className="flex items-center">
                        <div className={`mr-4 w-10 h-10 rounded-full flex items-center justify-center ${isFatal ? "bg-red-500/10" : "bg-yellow-500/10"}`}><LogIcon /></div>
                        <div>
                          <p className={`font-semibold ${isFatal ? "text-red-400" : isSuspicious ? "text-yellow-400" : "text-gray-300"}`}>{level} Event</p>
                          <p className="text-gray-300">{message}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fadeInUp">
            <button onClick={() => router.push("/student")} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-12 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500">Back to Dashboard</button>
            <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 text-white py-3 px-12 rounded-lg font-bold hover:bg-gray-600">Report an Issue</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
            {submissionStatus === "success" ? (
              <div className="text-center py-10">
                <p className="text-xl font-semibold text-green-600">Complaint Submitted Successfully!</p>
                <p className="text-gray-600">Our team will review your issue shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleComplaintSubmit}>
                <p className="text-gray-600 mb-4">Please describe the issue you experienced during the test "{result.testId.title}".</p>
                <textarea value={complaintMessage} onChange={(e) => setComplaintMessage(e.target.value)} required rows={5} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Describe the issue..." />
                {submissionStatus === "error" && <p className="text-red-500 mt-2 text-sm">Failed to submit. Please try again.</p>}
                <div className="flex justify-end gap-4 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-6 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
                  <button type="submit" disabled={submissionStatus === "submitting"} className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400">{submissionStatus === "submitting" ? "Submitting..." : "Submit Complaint"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
