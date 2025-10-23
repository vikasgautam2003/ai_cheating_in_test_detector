

'use client';

import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
import AudioRecorder from '@/app/component/proctoring/AudioRecorder';
import PhotoCapture from '@/app/component/proctoring/PhotoCapture';
import AudioMonitor from '@/app/component/proctoring/AudioMonitor';

const variants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 }, 
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    scale: 0.95, 
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
  },
};


// --- Interfaces (Untouched) ---
interface Question { _id: string; questionText: string; options: string[]; }
interface Test { _id: string; title: string; duration: number; questions: Question[]; }
type Answers = { [key: number]: string; };

// --- SVG Icons (Untouched) ---
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 inline-block mr-2 text-cyan-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-cyan-400"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-cyan-400"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>;
const WarningIcon = ({ colorClass }: { colorClass: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-12 h-12 mx-auto mb-4 ${colorClass}`}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
 const CheckCircleIcon = ({ size = 48, color = "#10B981", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.2l-3.5-3.5L4 14l5 5 12-12-1.5-1.5L9 16.2z" />
  </svg>
);

 const AlertTriangleIcon = ({ size = 48, color = "#EF4444", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10.29 3.86L1.82 18a1.5 1.5 0 001.29 2.25h18.78a1.5 1.5 0 001.29-2.25L13.71 3.86a1.5 1.5 0 00-2.42 0zM12 9v4M12 17h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Component to inject global styles and animations ---
const GlobalStyles = () => (
    <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        
        .bg-sentinel-grid {
            background-color: #020617;
            background-image: linear-gradient(rgba(0, 180, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 255, 0.07) 1px, transparent 1px);
            background-size: 3rem 3rem;
            background-position: center center;
        }

        .bg-sentinel-animated {
            background: linear-gradient(90deg, #020617, #082f49, #020617);
            background-size: 200% 200%;
            animation: backgroundPan 15s ease infinite;
        }

        /* Custom scrollbar for question navigator */
        .question-navigator::-webkit-scrollbar {
            width: 6px;
        }
        .question-navigator::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.2);
            border-radius: 3px;
        }
        .question-navigator::-webkit-scrollbar-thumb {
            background: #0891b2; /* cyan-600 */
            border-radius: 3px;
        }
        .question-navigator::-webkit-scrollbar-thumb:hover {
            background: #06b6d4; /* cyan-500 */
        }
    `}</style>
);


export default function TestPage() {
    // --- All State and Logic Hooks are UNTOUCHED ---
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

    const [briefingStep, setBriefingStep] = useState(0);
  
    const handleSubmission = useCallback(async () => {
        if (!attemptId) { setError("Cannot submit: No attempt ID found."); return; }
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attempts/${attemptId}/submit`, {
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${testId}`, {
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
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attempts/${attemptId}/log`, {
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
        const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, { transports: ['websocket', 'polling'] });
        socket.on('connect', () => {
            console.log('Connected to socket server!');
            socket.emit('join_attempt_room', attemptId);
        });
        socket.on('fatal_strike_warning', (data) => setWarning({ title: `Fatal Warning (${data.strikes}/5)`, message: data.message }));
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${testId}/start`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
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
            const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/analyze-video-frame`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image_data: imageData }), });
            if (!aiResponse.ok) return;
            const analysisResult = await aiResponse.json();
            if (analysisResult.violation_type) {
                const token = localStorage.getItem('token');
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attempts/${attemptId}/log`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ violationType: analysisResult.violation_type }), });
            }
        } catch (error) { console.error(error); }
    };

    const handleAudioAnalysis = async (audioData: string) => {
        if (!attemptId) return;
        try {
            const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}/analyze-audio-clip`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ audio_data: audioData }), });
            if (!aiResponse.ok) return;
            const result = await aiResponse.json();
            if (result.violation_type) {
                const token = localStorage.getItem('token');
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attempts/${attemptId}/log`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ violationType: result.violation_type }), });
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
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm animate-fadeIn">
                <div className="relative w-full max-w-md bg-slate-900 border border-red-800/50 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center animate-scaleIn">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"></div>
                    <WarningIcon colorClass={colorClass} />
                    <h2 className={`text-2xl font-bold mb-2 tracking-tight ${colorClass}`}>PROCTORING ALERT</h2>
                    <p className="text-lg text-white font-semibold mb-4">{warning.title}</p>
                    <p className="text-gray-300 mb-6">{warning.message}</p>
                    <button onClick={() => setWarning(null)} className={`w-full text-white py-2 px-8 rounded-lg font-semibold transition-transform transform hover:scale-105 ${buttonClass}`}>I Understand</button>
                </div>
            </div>
        );
    };

    if (loading && !test) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-cyan-300 text-xl"><div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div><p className="mt-4">Loading Test Environment...</p></div>;
    if (error) return <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-red-400 p-4"><p className="text-xl font-bold">Error: {error}</p><button onClick={() => router.push('/student')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">Back to Dashboard</button></div>;
    if (!test) return <div className="flex justify-center items-center min-h-screen bg-gray-900">Test not found.</div>;

    // if (stage === 'instructions') {
    //     return (
    //         <>
    //             <GlobalStyles />
    //             <div className="flex flex-col items-center justify-center min-h-screen bg-sentinel-animated p-4 font-sans text-white">
    //                 <div className="w-full max-w-3xl mx-auto animate-fadeInUp">
    //                     <div className="relative bg-black/70 border border-cyan-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 backdrop-blur-xl">
    //                        <div className="absolute -top-px -left-px -right-px h-1/2 rounded-t-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent"></div>
    //                         <div className="text-center mb-6">
    //                             <h1 className="text-4xl font-extrabold text-white tracking-tight">{test.title}</h1>
    //                             <p className="text-cyan-400 mt-2">Assessment Instructions</p>
    //                         </div>
    //                         <div className="grid grid-cols-2 gap-4 text-center my-8 text-lg">
    //                             <p className="bg-cyan-900/20 border border-cyan-800/30 rounded-lg py-3"><span className="font-bold text-gray-400 block text-sm">Duration</span> {test.duration} Minutes</p>
    //                             <p className="bg-cyan-900/20 border border-cyan-800/30 rounded-lg py-3"><span className="font-bold text-gray-400 block text-sm">Questions</span> {test.questions.length}</p>
    //                         </div>
    //                         <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
    //                             <h2 className="font-semibold text-xl mb-3 flex items-center"><InfoIcon /> Important Rules</h2>
    //                             <ul className="list-disc list-inside space-y-2 text-gray-300">
    //                                 <li>This is a remotely proctored exam. Your webcam and microphone will be monitored.</li>
    //                                 <li>You must complete an identity verification step before starting.</li>
    //                                 <li>Ensure you have a stable and uninterrupted internet connection.</li>
    //                                 <li>Switching tabs or opening other applications is strictly prohibited and will be flagged.</li>
    //                             </ul>
    //                         </div>
    //                         <button onClick={handleProceedToVerification} className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
    //                             Proceed to Verification
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }





if (stage === 'instructions') {
        const briefingSteps = [
            // Step 1: Welcome & Overview
            {
                title: test.title,
                subtitle: "Assessment Overview & Integrity Protocol",
                content: (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }}
                        className="text-center space-y-8"
                    >
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-6 text-xl">
                            <div className="bg-gradient-to-br from-cyan-900/40 via-slate-900/40 to-slate-900/40 border border-cyan-800/50 rounded-xl py-5 px-3 shadow-inner shadow-cyan-900/20">
                                <span className="font-semibold text-gray-400 block text-base uppercase tracking-wider mb-1">Duration</span>
                                <span className="text-white text-4xl font-bold">{test.duration}</span> <span className="text-gray-400">Min</span>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-900/40 via-slate-900/40 to-slate-900/40 border border-cyan-800/50 rounded-xl py-5 px-3 shadow-inner shadow-cyan-900/20">
                                <span className="font-semibold text-gray-400 block text-base uppercase tracking-wider mb-1">Questions</span>
                                <span className="text-white text-4xl font-bold">{test.questions.length}</span>
                            </div>
                        </motion.div>
                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-300 text-xl leading-loose max-w-prose mx-auto px-4">
                            Welcome. This assessment is monitored by <span className="font-semibold text-cyan-400">Sentinel.ai</span> to ensure academic integrity. Please dedicate your full attention and follow the protocol outlined in the next steps.
                        </motion.p>
                    </motion.div>
                )
            },
            // Step 2: Fatal Strike System
            {
                title: "Fatal Strike Protocol",
                subtitle: "Zero Tolerance for Critical Violations",
                icon: <AlertTriangleIcon className="w-24 h-24 mx-auto mb-6 text-red-500 opacity-80" />,
                content: (
                     <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }}
                         className="space-y-6 text-left text-gray-300 text-xl leading-loose px-4" // Increased font size and line height
                     >
                         <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>Certain actions are critical violations, resulting in an immediate <strong className="text-red-400 font-semibold">Fatal Strike</strong>. Accumulating <strong className="text-red-400 font-semibold">Five (5)</strong> strikes automatically terminates your session.</motion.p>
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-800/40 border border-red-800/40 rounded-lg p-5 mt-4">
                             <h4 className="font-semibold text-red-400 mb-3 text-lg uppercase tracking-wider">Critical Violations:</h4>
                             <ul className="list-decimal list-outside space-y-3 pl-6 text-lg"> {/* Changed list style and size */}
                                <li><strong>Multiple Individuals Detected:</strong> Ensure you remain the sole person visible within the camera's view.</li>
                                <li><strong>Audible Speech Detected:</strong> The testing environment must be silent. Any conversation or distinct non-ambient noise is prohibited.</li>
                                <li><strong>Candidate Not Visible / Significantly Averted:</strong> Remain clearly visible, facing forward. Leaving your seat or prolonged, significant turning away is forbidden.</li>
                             </ul>
                         </motion.div>
                     </motion.div>
                )
            },
            // Step 3: Suspicion Score System
            {
                title: "Suspicion Monitoring",
                subtitle: "Minor Infractions Accumulate Score (Max 20)",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6 text-yellow-400 opacity-80"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l.06-1.26c.09-.9.4-1.7.94-2.36.6-.7 1.4-.9 2.3-.8l.23.03"></path></svg>,
                content: (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }}
                        className="space-y-6 text-left text-gray-300 text-xl leading-loose px-4"
                    >
                         <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>Less critical actions contribute points to your <strong className="text-yellow-400 font-semibold">Suspicion Score</strong>. On-screen warnings are issued at thresholds (5, 10, 15 points).</motion.p>
                         <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>Reaching <strong className="text-yellow-400 font-semibold">20 points</strong> indicates a pattern of non-compliance and results in automatic assessment termination.</motion.p>
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-800/40 border border-yellow-800/40 rounded-lg p-5 mt-4">
                              <h4 className="font-semibold text-yellow-400 mb-3 text-lg uppercase tracking-wider">Scored Violations:</h4>
                              <ul className="list-decimal list-outside space-y-3 pl-6 text-lg">
                                <li><strong>Leaving the Test Window (+2 Points):</strong> Do not switch browser tabs, minimize, or access other applications. Maintain singular focus.</li>
                                {/* Add future violations here */}
                              </ul>
                         </motion.div>
                     </motion.div>
                )
            },
             // Step 4: Final Check & Guidelines
            {
                title: "Final Environment Check",
                subtitle: "Ready to Begin Verification",
                icon: <CheckCircleIcon className="w-24 h-24 mx-auto mb-6 text-green-500 opacity-80" />,
                content: (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }}
                        className="space-y-6 text-left text-gray-300 text-xl leading-loose px-4"
                     >
                         <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>Confirm your testing environment adheres to these final requirements:</motion.p>
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-800/40 border border-green-800/40 rounded-lg p-5 mt-4">
                             <ul className="list-disc list-outside space-y-3 pl-6 text-lg">
                                <li>**Private & Quiet:** Alone in a room, free from disruptions.</li>
                                <li>**Clear Workspace:** Desk clear of unauthorized items (phones, notes, etc.).</li>
                                <li>**Stable Connection:** Verified, reliable internet access.</li>
                                <li>**Device Readiness:** Webcam and microphone enabled and unobstructed for mandatory identity verification.</li>
                             </ul>
                         </motion.div>
                         <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 font-semibold text-cyan-300 text-2xl text-center">By proceeding, you confirm your understanding and agreement to all protocols.</motion.p>
                     </motion.div>
                )
            },
        ];

        const currentStepData = briefingSteps[briefingStep];
        const isLastStep = briefingStep === briefingSteps.length - 1;

        // Enhanced Framer Motion Variants for a more fluid, anticipatory feel
       const variants: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 }, // x as number
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeInOut" } // string instead of number array
  },
  exit: { 
    opacity: 0, 
    x: -50, 
    scale: 0.95, 
    transition: { duration: 0.3, ease: "easeIn" } 
  },
};

        return (
            <>
                <GlobalStyles />
                <div className="flex flex-col items-center justify-center min-h-screen bg-sentinel-animated p-6 font-sans text-white overflow-hidden">
                     {/* Increased width, padding, added relative for shine */}
                    <div className="relative w-full max-w-5xl bg-gradient-to-b from-slate-900/90 to-black/90 border border-cyan-800/60 rounded-3xl shadow-2xl shadow-cyan-500/20 p-12 md:p-20 backdrop-blur-xl overflow-hidden">
                        {/* More prominent border + Subtle Shine Effect */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-cyan-700/50 pointer-events-none overflow-hidden">
                           <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"
                           ></motion.div>
                        </div>
                        {/* Inner content */}
                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={briefingStep}
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="min-h-[550px] flex flex-col" // Increased min-height further
                                >
                                    <div className="text-center mb-10 flex-shrink-0">
                                        {/* Icon animation */}
                                        {currentStepData.icon && <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4}} className="mb-4">{currentStepData.icon}</motion.div>}
                                        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">{currentStepData.title}</motion.h1>
                                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-cyan-400 mt-2 text-xl md:text-2xl font-medium">{currentStepData.subtitle}</motion.p>
                                    </div>
                                    <div className="flex-grow flex flex-col justify-center px-2 md:px-10">{currentStepData.content}</div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex flex-col md:flex-row items-center justify-between mt-16 pt-8 border-t border-gray-800/60">
                                {/* Enhanced Progress Dots */}
                                <div className="flex space-x-5 mb-6 md:mb-0">
                                    {briefingSteps.map((_, index) => (
                                        <motion.div
                                            key={index}
                                            animate={{ scale: index === briefingStep ? 1.3 : 1, opacity: index === briefingStep ? 1 : 0.5 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            className={`w-4 h-4 rounded-full ${index === briefingStep ? 'bg-cyan-400 shadow-lg shadow-cyan-500/40' : 'bg-gray-600'}`}
                                        ></motion.div>
                                    ))}
                                </div>
                                {/* Larger, more detailed Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={isLastStep ? handleProceedToVerification : () => setBriefingStep(s => s + 1)}
                                    className={`w-full md:w-auto bg-gradient-to-r ${
                                        isLastStep ? 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500' : 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
                                    } text-white py-4 px-12 rounded-lg font-bold transition-shadow shadow-lg ${
                                        isLastStep ? 'hover:shadow-green-500/40' : 'hover:shadow-cyan-500/40'
                                    } text-xl flex items-center justify-center gap-2`}
                                >
                                    <span>{isLastStep ? "Proceed to Verification" : "Next Rule"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    if (stage === 'verification') {
        return (
             <>
                <GlobalStyles />
                <div className="flex flex-col items-center justify-center min-h-screen bg-sentinel-animated p-8 font-sans text-white">
                    <div className="w-full max-w-4xl bg-black/70 border border-cyan-800/50 rounded-2xl shadow-2xl p-8 backdrop-blur-xl animate-fadeInUp">
                        <h1 className="text-3xl font-bold mb-8 text-center text-white tracking-tight">Identity Verification</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center flex flex-col items-center justify-between">
                                <div className="text-center">
                                   <CameraIcon />
                                   <h2 className="text-xl font-semibold my-4">Photo Verification</h2>
                                </div>
                                <PhotoCapture onPhotoCaptured={setCapturedPhoto} />
                                <p className="text-center my-4 text-gray-500 font-semibold text-xs">OR</p>
                                <label className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">Upload Photo<input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" /></label>
                            </div>
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 text-center flex flex-col items-center justify-between">
                                <div className="text-center">
                                   <MicIcon />
                                   <h2 className="text-xl font-semibold my-4">Audio Verification</h2>
                                </div>
                               <AudioRecorder onAudioRecorded={setRecordedAudio} />
                            </div>
                        </div>
                        <button onClick={handleStartTest} disabled={!capturedPhoto || !recordedAudio || loading} className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg text-lg font-bold hover:from-green-400 hover:to-emerald-500 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 transform hover:scale-105">
                            {loading ? "Initializing..." : "Confirm and Begin Test"}
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / test.questions.length) * 100;

    return (
        <>
            <GlobalStyles />
            {renderWarningPopup()}
           

<div className="fixed top-20 right-6 w-64 h-50 z-50 rounded-lg overflow-hidden border-0 border-cyan-500 shadow-lg">
  <div className="relative w-full h-full webcam-overlay">
    <WebcamMonitor captureMode={false} onFrameCaptured={handleFrameAnalysis} />
  </div>
</div>




            <div className="h-screen w-screen bg-slate-900 text-white font-sans flex flex-col overflow-hidden bg-sentinel-grid">
                <header className="flex-shrink-0 flex justify-between items-center p-4 bg-black/50 border-b border-gray-800 z-10 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <span className="bg-cyan-500 w-3 h-3 rounded-full animate-pulse"></span>
                        <h1 className="text-xl font-bold text-white tracking-wider">{test.title}</h1>
                    </div>
                    <div className="text-2xl font-mono bg-cyan-900/30 text-cyan-300 border border-cyan-500/30 px-4 py-1 rounded-lg">
                        {formatTime(timeLeft)}
                    </div>
                </header>

                <div className="flex-grow flex flex-col md:flex-row min-h-0">
                    <aside className="w-full md:w-72 flex-shrink-0 bg-black/30 border-r border-gray-800 p-6 flex flex-col backdrop-blur-sm">
                        <h2 className="text-lg font-semibold text-cyan-400 mb-4 tracking-wider">STATUS</h2>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                             <p className="text-3xl font-bold text-white">{currentQuestionIndex + 1} <span className="text-xl text-gray-500">/ {test.questions.length}</span></p>
                             <p className="text-sm text-gray-400">Question Progress</p>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                        </div>
                        
                        
                        <div className="flex-grow my-4 overflow-y-auto question-navigator pr-2">
                             <h3 className="text-sm font-semibold text-gray-400 mb-3 tracking-wider">Navigator</h3>
                             <div className="grid grid-cols-5 gap-2">
                                {Array.from({ length: test.questions.length }, (_, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setCurrentQuestionIndex(i)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-200
                                            ${answers[i] 
                                                ? 'bg-green-500 text-white border-2 border-green-400' 
                                                : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-cyan-500'}
                                            ${currentQuestionIndex === i 
                                                ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-cyan-400' 
                                                : ''}
                                        `}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* <div className="mt-auto">
                            <WebcamMonitor captureMode={false} onFrameCaptured={handleFrameAnalysis} />
                        </div> */}
                    </aside>

                    <main className="flex-grow p-6 md:p-12 flex items-center justify-center min-h-0 animate-fadeIn">
                        {loading && (
                            <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-20">
                                <p className="text-2xl font-semibold animate-pulse">Submitting your test...</p>
                            </div>
                        )}
                        <div className="max-w-4xl w-full animate-fadeInUp">
                            <p className="font-semibold text-cyan-400 mb-2">Question {currentQuestionIndex + 1}</p>
                            <h2 className="text-4xl font-bold text-white leading-tight tracking-wide">{currentQuestion.questionText}</h2>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, index) => (
                                    <button key={index} onClick={() => handleAnswerSelect(option)}
                                        className={`group relative p-5 rounded-lg text-left border-2 transition-all duration-200 transform hover:-translate-y-1 ${
                                            answers[currentQuestionIndex] === option
                                            ? 'bg-cyan-600 border-cyan-500 text-white font-semibold shadow-2xl shadow-cyan-500/20'
                                            : 'bg-gray-800/50 border-gray-700 hover:border-cyan-700'
                                        }`}>
                                        <span className="font-mono mr-4 opacity-50">{String.fromCharCode(65 + index)}.</span>{option}
                                         <div className={`absolute -right-2 -top-2 w-6 h-6 rounded-full border-2 bg-gray-800 flex items-center justify-center transition-all duration-200 ${
                                            answers[currentQuestionIndex] === option 
                                            ? 'bg-cyan-500 border-cyan-300' 
                                            : 'border-gray-600 group-hover:border-cyan-600'
                                         }`}>
                                             {answers[currentQuestionIndex] === option && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                         </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>

                <AudioMonitor onAudioClipRecorded={handleAudioAnalysis} />
                
                <footer className="flex-shrink-0 flex justify-between items-center p-4 bg-black/50 border-t border-gray-800 z-10 backdrop-blur-sm">
                    <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="bg-gray-700 text-white py-2 px-8 rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-semibold">
                        Previous
                    </button>
                    {currentQuestionIndex === test.questions.length - 1 ? (
                        <button onClick={handleSubmission} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-8 rounded-lg hover:from-green-400 hover:to-emerald-500 font-semibold transition-all transform hover:scale-105">
                            Submit Test
                        </button>
                    ) : (
                        <button onClick={handleNextQuestion} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-8 rounded-lg hover:from-cyan-400 hover:to-blue-500 font-semibold transition-all transform hover:scale-105">
                            Next
                        </button>
                    )}
                </footer>
            </div>
        </>
    );
}







