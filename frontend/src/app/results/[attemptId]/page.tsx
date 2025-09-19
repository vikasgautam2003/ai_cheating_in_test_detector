



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

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

// export default function ResultPage({ params }: { params: { attemptId: string } }) {
//   const router = useRouter();
//   const attemptId = params.attemptId;

//   const [result, setResult] = useState<Result | null>(null);
//   const [loading, setLoading] = useState(true);

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
//         return { message: 'Navigated away from the test tab.', level: 'Suspicious' };
//       case 'no_face_detected':
//         return { message: 'User was not detected in the camera frame.', level: 'Fatal' };
//       case 'multiple_faces_detected':
//         return { message: 'Multiple people were detected in the camera frame.', level: 'Fatal' };
//       case 'voice_activity_detected':
//         return { message: 'Voice or speech was detected during the test.', level: 'Fatal' };
//       default:
//         return { message: 'An unknown event was logged.', level: 'Info' };
//     }
//   };

//   if (loading) return <div className="text-center p-10">Loading Your Results...</div>;
//   if (!result) return <div className="text-center p-10">Results not found.</div>;

//   const percentage = Math.round((result.score / result.totalMarks) * 100);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white p-8 rounded-xl shadow-lg text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-700">Test Completed!</h1>
//           <h2 className="text-xl text-gray-600 mt-2 mb-6">Results for: {result.testId.title}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
//             <div>
//               <p className="text-lg font-semibold text-gray-500">Score</p>
//               <p className="text-4xl font-bold text-blue-600">{result.score} / {result.totalMarks}</p>
//             </div>
//             <div>
//               <p className="text-lg font-semibold text-gray-500">Percentage</p>
//               <p className="text-4xl font-bold text-green-600">{percentage}%</p>
//             </div>
//             <div>
//               <p className="text-lg font-semibold text-gray-500">Suspicion Score</p>
//               <p className="text-4xl font-bold text-yellow-600">{result.suspicionScore} / 20</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Proctoring Report</h2>
//           <p className="mb-6 text-gray-600">
//             This is a log of all events recorded during your test session. 
//             <span className="font-semibold"> Fatal Strikes: {result.fatalStrikes} / 3</span>
//           </p>

//           {result.proctoringLogs.length === 0 ? (
//             <p className="text-green-600 font-semibold">No suspicious activity was detected. Great job!</p>
//           ) : (
//             <div className="space-y-4">
//               {result.proctoringLogs.map((log) => {
//                 const { message, level } = formatLogMessage(log.type);
//                 const isFatal = level === 'Fatal';
//                 const isSuspicious = level === 'Suspicious';
//                 return (
//                   <div
//                     key={log._id}
//                     className={`p-4 rounded-lg border-l-4 ${
//                       isFatal
//                         ? 'bg-red-50 border-red-500'
//                         : isSuspicious
//                         ? 'bg-yellow-50 border-yellow-500'
//                         : 'bg-gray-50 border-gray-400'
//                     }`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p
//                           className={`font-semibold ${
//                             isFatal ? 'text-red-700' : isSuspicious ? 'text-yellow-700' : 'text-gray-700'
//                           }`}
//                         >
//                           {level} Event Detected
//                         </p>
//                         <p className="text-gray-800">{message}</p>
//                       </div>
//                       <p className="text-sm text-gray-500">
//                         {new Date(log.timestamp).toLocaleTimeString()}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         <div className="text-center mt-8">
//           <button
//             onClick={() => router.push('/dashboard/student')}
//             className="bg-blue-600 text-white py-3 px-12 rounded-lg hover:bg-blue-700 transition"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Interfaces ---
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

// --- SVG Icons ---
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-yellow-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;

// --- Score Circular Progress Component ---
const ScoreCircle = ({ percentage }: { percentage: number }) => {
    const sqSize = 120;
    const strokeWidth = 10;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    let strokeColor = "#10B981"; // Green
    if (percentage < 75) strokeColor = "#F59E0B"; // Yellow
    if (percentage < 50) strokeColor = "#EF4444"; // Red

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
             <svg width={sqSize} height={sqSize} viewBox={viewBox}>
                <circle className="text-gray-700" cx={sqSize / 2} cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} stroke="currentColor" fill="none" />
                <circle
                    className="transition-all duration-1000 ease-in-out"
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                        stroke: strokeColor,
                    }}
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
            <span className="absolute text-3xl font-bold" style={{ color: strokeColor }}>
                {percentage}%
            </span>
        </div>
    );
};

export default function ResultPage({ params }: { params: { attemptId: string } }) {
  const router = useRouter();
  const attemptId = params.attemptId;

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  // --- All original logic is preserved ---
  useEffect(() => {
    if (!attemptId) return;
    const fetchResult = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:5000/api/results/${attemptId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not fetch results.');
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

  const formatLogMessage = (logType: string) => {
    switch (logType) {
      case 'tab_switch':
        return { message: 'Navigated away from the test tab.', level: 'Suspicious', icon: AlertTriangleIcon };
      case 'no_face_detected':
        return { message: 'User was not detected in the camera frame.', level: 'Fatal', icon: XCircleIcon };
      case 'multiple_faces_detected':
        return { message: 'Multiple people were detected in the camera frame.', level: 'Fatal', icon: XCircleIcon };
      case 'voice_activity_detected':
        return { message: 'Voice or speech was detected during the test.', level: 'Fatal', icon: XCircleIcon };
      default:
        return { message: 'An unknown event was logged.', level: 'Info', icon: () => null };
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-cyan-300 text-xl animate-pulse">Loading Your Results...</div>;
  if (!result) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-red-400 p-4"><p className="text-xl font-bold">Results Not Found</p><button onClick={() => router.push('/student')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Back to Dashboard</button></div>;

  const percentage = Math.round((result.score / result.totalMarks) * 100);

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/50 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-black/40 p-8 backdrop-blur-xl text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Test Completed!</h1>
          <h2 className="text-xl text-cyan-400 mt-2 mb-8">Results for: {result.testId.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-gray-400">Final Score</p>
              <p className="text-5xl font-bold text-white mt-2">{result.score}<span className="text-3xl text-gray-500">/{result.totalMarks}</span></p>
            </div>
            
            <div className="flex items-center justify-center">
                <ScoreCircle percentage={percentage} />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-gray-400">Suspicion Score</p>
              <p className="text-5xl font-bold text-yellow-400 mt-2">{result.suspicionScore}<span className="text-3xl text-gray-500">/20</span></p>
            </div>
          </div>
        </div>

        <div className="bg-black/50 border border-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Proctoring Report</h2>
           <p className="mb-6 text-gray-400">
             This is a log of all events recorded during your test session. 
             <span className="font-semibold text-red-400"> Fatal Strikes: {result.fatalStrikes} / 3</span>
           </p>

          {result.proctoringLogs.length === 0 ? (
            <div className="text-center py-12">
                <CheckCircleIcon />
                <p className="text-green-400 font-semibold mt-4 text-lg">No suspicious activity was detected. Great job!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {result.proctoringLogs.map((log) => {
                const { message, level, icon: LogIcon } = formatLogMessage(log.type);
                const isFatal = level === 'Fatal';
                const isSuspicious = level === 'Suspicious';
                return (
                  <div key={log._id} className={`bg-gray-900/70 p-4 rounded-lg border-l-4 flex justify-between items-center ${
                      isFatal ? 'border-red-500' : isSuspicious ? 'border-yellow-500' : 'border-gray-600'
                  }`}>
                    <div className="flex items-center">
                        <LogIcon />
                        <div>
                            <p className={`font-semibold ${
                                isFatal ? 'text-red-400' : isSuspicious ? 'text-yellow-400' : 'text-gray-300'
                            }`}>{level} Event</p>
                            <p className="text-gray-300">{message}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/student')}
            className="bg-cyan-600 text-white py-3 px-12 rounded-lg font-semibold hover:bg-cyan-500 transition-all transform hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

