








// 'use client'

// import { useState, FormEvent, ChangeEvent, useRef } from 'react';

// // No changes to the interface
// interface Question {
//     questionText: string;
//     options: string[];
//     correctAnswer: string;
// }

// // --- SVG Icon Components for a cleaner UI ---
// const UploadIcon = () => (
//     <svg className="w-12 h-12 mx-auto text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//         <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
// );

// const FileJsonIcon = () => (
//     <svg className="w-12 h-12 mx-auto text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0_12.75h7.5m-7.5_3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
//     </svg>
// );

// const SpinnerIcon = () => (
//      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//     </svg>
// );

// const SuccessIcon = () => (
//     <svg className="h-16 w-16 text-purple-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>
// );


// export default function AdminTestsPage() {
//     const [title, setTitle] = useState('');
//     const [duration, setDuration] = useState(60);
//     const [questions, setQuestions] = useState<Question[] | null>(null);
//     const [fileName, setFileName] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isDragOver, setIsDragOver] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // --- No functionality changes in handlers ---
//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         processFile(file);
//     };

//     const handleDragEvents = (e: React.DragEvent<HTMLLabelElement>, action: 'enter' | 'leave' | 'drop') => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (action === 'enter') setIsDragOver(true);
//         if (action === 'leave' || action === 'drop') setIsDragOver(false);
//         if (action === 'drop') {
//             const file = e.dataTransfer.files?.[0];
//             processFile(file);
//         }
//     };
    
//     const processFile = (file?: File) => {
//         if (!file) {
//             setQuestions(null);
//             setFileName('');
//             return;
//         }

//         if (file.type !== 'application/json') {
//             setError('Invalid file type. Please upload a .json file.');
//             setQuestions(null);
//             setFileName('');
//             return;
//         }

//         setFileName(file.name);
//         const reader = new FileReader();

//         reader.onload = (ev) => {
//             try {
//                 const fileContent = ev.target?.result as string;
//                 const parsedQuestions: Question[] = JSON.parse(fileContent);

//                 if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
//                     throw new Error("JSON must be a non-empty array of questions.");
//                 }
                
//                 parsedQuestions.forEach((q, i) => {
//                     if (!q.questionText || !Array.isArray(q.options) || typeof q.correctAnswer === 'undefined') {
//                         throw new Error(`Question at index ${i} has an invalid structure.`);
//                     }
//                 });

//                 setQuestions(parsedQuestions);
//                 setError('');
//             } catch (jsonError: any) {
//                 setError(jsonError.message || 'Failed to parse JSON. Please check file format.');
//                 setQuestions(null);
//                 setFileName('');
//                  if (fileInputRef.current) fileInputRef.current.value = "";
//             }
//         };

//         reader.onerror = () => {
//             setError('Failed to read the file.');
//             setQuestions(null);
//              if (fileInputRef.current) fileInputRef.current.value = "";
//         };

//         reader.readAsText(file);
//     };
    
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setError('');

//         if (!title.trim()) {
//             setError('Test title cannot be empty.');
//             return;
//         }
//         if (!questions || questions.length === 0) {
//             setError('Please upload and validate a questions file before creating the test.');
//             return;
//         }

//         setLoading(true);
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError('Authentication error. Please log in again.');
//             setLoading(false);
//             window.location.href = '/auth/login';
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5000/api/tests', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ title, duration, questions }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to create test.');
//             }

//             setIsModalOpen(true);

//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         window.location.href = '/admin';
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans p-4 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
//             <div className="w-full max-w-3xl mx-auto">
//                 <div className="bg-slate-900/70 border border-purple-900/50 rounded-2xl shadow-2xl shadow-black/40 p-8 space-y-8 backdrop-blur-xl">
                    
//                     <div className="text-center">
//                         <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Create a New Assessment</h1>
//                         <p className="text-purple-300 mt-2">Design and deploy a new test for your students.</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="title" className="block text-sm font-bold text-slate-300 mb-2">
//                                     Test Title
//                                 </label>
//                                 <input
//                                     id="title"
//                                     type='text'
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     placeholder='e.g., "Advanced JavaScript Quiz"'
//                                     required
//                                     className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="duration" className="block text-sm font-bold text-slate-300 mb-2">
//                                     Duration (minutes)
//                                 </label>
//                                 <input
//                                     id="duration"
//                                     type='number'
//                                     min="1"
//                                     value={duration}
//                                     onChange={(e) => setDuration(parseInt(e.target.value))}
//                                     required
//                                     className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                                 />
//                             </div>
//                         </div>
                        
//                         <div>
//                             <label className="block text-sm font-bold text-slate-300 mb-2">
//                                 Questions File
//                             </label>
//                             <label 
//                                 htmlFor="file-upload" 
//                                 className={`relative flex flex-col items-center justify-center w-full p-6 transition-all duration-300 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-purple-600 ${isDragOver ? 'border-purple-600 bg-purple-950/20' : ''}`}
//                                 onDragEnter={(e) => handleDragEvents(e, 'enter')}
//                                 onDragLeave={(e) => handleDragEvents(e, 'leave')}
//                                 onDragOver={(e) => e.preventDefault()}
//                                 onDrop={(e) => handleDragEvents(e, 'drop')}
//                             >
//                                 {!questions ? <UploadIcon /> : <FileJsonIcon />}
//                                 <span className="mt-4 text-center">
//                                     {fileName ? (
//                                         <p className="font-semibold text-purple-400">{fileName}</p>
//                                     ) : (
//                                         <p className="text-slate-400">
//                                             <span className="font-semibold text-purple-500">Click to upload</span> or drag and drop
//                                         </p>
//                                     )}
//                                     <p className="text-xs text-slate-500 mt-1">JSON file format only</p>
//                                 </span>
//                                 <input
//                                     ref={fileInputRef}
//                                     id="file-upload"
//                                     type='file'
//                                     accept='.json'
//                                     onChange={handleFileChange}
//                                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                 />
//                             </label>

//                             {questions && (
//                                 <div className="mt-3 text-center bg-green-950/50 border border-green-800 text-green-300 text-sm rounded-lg p-3">
//                                     <p>
//                                         <span className="font-bold">Success:</span> {questions.length} questions loaded and validated.
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
                        
//                         {error && (
//                             <div className="bg-red-950/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
//                                 <p><span className="font-bold">Error:</span> {error}</p>
//                             </div>
//                         )}
                        
//                         <button 
//                             type='submit' 
//                             disabled={loading || !questions || !title}
//                             className="w-full flex items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
//                         >
//                             {loading && <SpinnerIcon />}
//                             {loading ? 'Creating Assessment...' : 'Create Assessment'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//              {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//                     <div className="bg-slate-900 border border-purple-800 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center max-w-sm w-full">
//                        <SuccessIcon />
//                         <h2 className="text-2xl font-bold text-slate-100 mt-4">Success!</h2>
//                         <p className="text-slate-400 mt-2 mb-6">The new assessment has been created and is now available.</p>
//                         <button
//                             onClick={handleCloseModal}
//                             className="w-full bg-purple-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
//                         >
//                             Go to Dashboard
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }















'use client'

import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

// --- INTERFACE ---
interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

// --- SVG ICON COMPONENTS ---
const UploadIcon = () => (
    <svg className="w-12 h-12 mx-auto text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FileJsonIcon = () => (
    <svg className="w-12 h-12 mx-auto text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5_3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const SpinnerIcon = () => (
     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-cyan-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);


const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);



// --- SIDEBAR COMPONENT ---
const Sidebar = ({ onNavigate, activeView }: { onNavigate: (path: string) => void; activeView: string; }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
        { id: 'tests', label: 'Tests', icon: FileJsonIcon, path: '/admin/tests' },
        { id: 'attempts', label: 'Attempts', icon: UsersIcon, path: '/admin/attempts' },
        { id: 'settings', label: 'Manage Tests', icon: SettingsIcon, path: '/admin/settings' },
        { id: 'complaint', label: 'Complaints', icon: MessageSquareIcon, path: '/admin/complaints' }
    ];

    return (
        <aside className="w-64 bg-black text-white flex-col p-4 border-r border-gray-800 hidden md:flex">
            <div className="text-2xl font-bold text-white mb-10 flex items-center space-x-2">
                <span className="bg-cyan-500 w-3 h-3 rounded-full"></span>
                <span>Sentinel.ai</span>
            </div>
            <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.path)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                            activeView === item.id 
                            ? 'bg-gray-800 text-white' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-auto text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Sentinel.ai</p>
                <p>All rights reserved.</p>
            </div>
        </aside>
    );
};


// --- DYNAMIC PREVIEW PANEL (Right Side) ---
const PreviewPanel = ({ questions, fileName, loading }: { questions: Question[] | null; fileName: string; loading: boolean; }) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <SpinnerIcon />
                <p className="mt-4 text-lg font-semibold text-gray-300">Deploying Assessment...</p>
                <p className="text-sm text-gray-500">Please wait while we set up the test environment.</p>
            </div>
        )
    }

    if (!questions) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <svg className="w-24 h-24 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                <h3 className="mt-4 text-xl font-bold text-white">Live Preview</h3>
                <p className="mt-2 text-gray-400">Upload a valid JSON file to see a preview of the questions and their structure here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Assessment Preview</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700">
                <p className="text-sm text-gray-400">Source File</p>
                <p className="font-mono text-cyan-400 truncate">{fileName}</p>
                <p className="text-sm text-gray-400 mt-2">Total Questions</p>
                <p className="font-bold text-white text-lg">{questions.length}</p>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                <h4 className="text-sm font-bold uppercase text-gray-500 tracking-wider">Sample Questions</h4>
                {questions.slice(0, 5).map((q, i) => (
                    <div key={i} className="bg-gray-900 p-3 rounded-md">
                        <p className="text-sm text-white truncate">{i + 1}. {q.questionText}</p>
                        <p className="text-xs text-cyan-400 mt-1">Correct Answer: <span className="font-mono">{q.correctAnswer}</span></p>
                    </div>
                ))}
                {questions.length > 5 && <p className="text-center text-xs text-gray-500">...and {questions.length - 5} more.</p>}
            </div>
        </div>
    );
};


export default function AdminTestsPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(60);
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeView, setActiveView] = useState('tests');

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    // --- No functionality changes in handlers ---
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const handleDragEvents = (e: React.DragEvent<HTMLLabelElement>, action: 'enter' | 'leave' | 'drop') => {
        e.preventDefault();
        e.stopPropagation();
        if (action === 'enter') setIsDragOver(true);
        if (action === 'leave' || action === 'drop') setIsDragOver(false);
        if (action === 'drop') {
            const file = e.dataTransfer.files?.[0];
            processFile(file);
        }
    };
    
    const processFile = (file?: File) => {
        if (!file) {
            setQuestions(null); setFileName(''); return;
        }
        if (file.type !== 'application/json') {
            setError('Invalid file type. Please upload a .json file.');
            setQuestions(null); setFileName(''); return;
        }
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const fileContent = ev.target?.result as string;
                const parsedQuestions: Question[] = JSON.parse(fileContent);
                if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) throw new Error("JSON must be a non-empty array of questions.");
                parsedQuestions.forEach((q, i) => {
                    if (!q.questionText || !Array.isArray(q.options) || typeof q.correctAnswer === 'undefined') {
                        throw new Error(`Question at index ${i} has an invalid structure.`);
                    }
                });
                setQuestions(parsedQuestions); setError('');
            } catch (jsonError: any) {
                setError(jsonError.message || 'Failed to parse JSON. Please check file format.');
                setQuestions(null); setFileName('');
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        };
        reader.onerror = () => {
            setError('Failed to read the file.');
            setQuestions(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        };
        reader.readAsText(file);
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError('Test title cannot be empty.'); return;
        }
        if (!questions || questions.length === 0) {
            setError('Please upload and validate a questions file before creating the test.'); return;
        }
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication error. Please log in again.');
            setLoading(false);
            window.location.href = '/auth/login';
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, duration, questions }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create test.');
            }
            setIsModalOpen(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.href = '/admin';
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            <Sidebar onNavigate={handleNavigation} activeView={activeView} />

            <main className="flex-1 flex flex-col md:flex-row">
                {/* Main Form Panel (Left) */}
                <div className="w-full md:w-1/2 lg:w-3/5 p-8 flex flex-col justify-center">
                    <div className="max-w-xl mx-auto w-full">
                        <div className="text-left mb-10">
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">Create Assessment</h1>
                            <p className="text-gray-400 mt-2">Build and configure a new test for your platform.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Test Title and Duration */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-bold text-gray-300 mb-2">Test Title</label>
                                    <input id="title" type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='e.g., "Advanced JavaScript"' required className="w-full bg-black border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300" />
                                </div>
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-bold text-gray-300 mb-2">Duration (minutes)</label>
                                    <input id="duration" type='number' min="1" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} required className="w-full bg-black border border-gray-700 text-gray-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300" />
                                </div>
                            </div>
                            
                            {/* File Upload Area */}
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Questions File</label>
                                <label htmlFor="file-upload" className={`relative flex flex-col items-center justify-center w-full p-6 transition-all duration-300 bg-black border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-cyan-600 ${isDragOver ? 'border-cyan-600 bg-cyan-950/20' : ''}`}
                                    onDragEnter={(e) => handleDragEvents(e, 'enter')}
                                    onDragLeave={(e) => handleDragEvents(e, 'leave')}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDragEvents(e, 'drop')}>
                                    {!questions ? <UploadIcon /> : <FileJsonIcon />}
                                    <span className="mt-4 text-center">
                                        {fileName ? (<p className="font-semibold text-cyan-400">{fileName}</p>) : (<p className="text-gray-400"><span className="font-semibold text-cyan-500">Click to upload</span> or drag and drop</p>)}
                                        <p className="text-xs text-gray-500 mt-1">JSON file format only</p>
                                    </span>
                                   <input
                                    ref={fileInputRef}
                                    id="file-upload"
                                    type='file'
                                    accept='.json'
                                    onChange={handleFileChange} // <-- corrected
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>
                                {questions && (
                                    <div className="mt-3 text-center bg-green-950/50 border border-green-800 text-green-300 text-sm rounded-lg p-3">
                                        <p><span className="font-bold">Success:</span> {questions.length} questions loaded and validated.</p>
                                    </div>
                                )}
                            </div>
                            
                            {error && (
                                <div className="bg-red-950/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
                                    <p><span className="font-bold">Error:</span> {error}</p>
                                </div>
                            )}
                            
                            <button type='submit' disabled={loading || !questions || !title} className="w-full flex items-center justify-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                                {loading && <SpinnerIcon />}
                                {loading ? 'Creating Assessment...' : 'Create & Deploy Assessment'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Preview Panel (Right) */}
                <div className="w-full md:w-1/2 lg:w-2/5 bg-black border-l-2 border-gray-800">
                    <PreviewPanel questions={questions} fileName={fileName} loading={loading} />
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-cyan-800 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center max-w-sm w-full">
                       <SuccessIcon />
                        <h2 className="text-2xl font-bold text-white mt-4">Deployment Successful!</h2>
                        <p className="text-gray-400 mt-2 mb-6">The new assessment has been created and is now available.</p>
                        <button
                            onClick={handleCloseModal}
                            className="w-full bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

