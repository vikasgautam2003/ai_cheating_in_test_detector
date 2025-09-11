// 'use client'

// import { useState, FormEvent, ChangeEvent } from 'react';
// import { useRouter } from 'next/navigation';

// interface Question {
//     questionText: string;
//     options: string[];
//     correctAnswer: string;

  
// }


// const initialQuestionState: Question = {
//     questionText: '',
//     options: ['', '', '', ''],
//     correctAnswer: '',
// }


// export default function AdminTestsPage() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [duration, setDuration] = useState(60);
//   const [questions, setQuestions] = useState<Question[] | null>(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>)  => {
//     const file = e.target.files?.[0];
    
//     if(!file){
//         setQuestions(null);
//         setFileName('');
//         return;
//     }

//      if (file.type !== 'application/json') {
//       setError('Invalid file type. Please upload a .json file.');
//       setQuestions(null);
//       setFileName('');
//       return;
//     }

//     setFileName(file.name);
//     const reader = new FileReader();

    
//     reader.onload = (ev) => {
//        const fileContent = ev.target?.result as string;
//         const parsedQuestions: Question[] = JSON.parse(fileContent);

//        if (!Array.isArray(parsedQuestions)) {
//             throw new Error("JSON must be an array of questions.");
//         }

//          setQuestions(parsedQuestions);
//         setError('');


//     } 

//     reader.onerror = () => {
//         setError('Failed to read the file.');
//         setQuestions(null);
//     }


//      reader.readAsText(file);
//   }

//    const handleSubmit = async (e: FormEvent) => {

//      e.preventDefault();
//     setError('');


//      if (!questions || questions.length === 0) {
//       setError('Please upload a valid questions file.');
//       return;
//     }


//     setLoading(true);

//     const token = localStorage.getItem('token');
//     if (!token) {
//         setError('Authentication error. Please log in again.');
//         setLoading(false);
//         router.push('/login');
//         return;
//     }


//     try{

//         const response = await fetch('http://localhost:5000/api/tests', {
//              method: 'POST',
//              headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({ title, duration, questions }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Failed to create test.');
//       }

//        alert('Test created successfully!');

//     }catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }

//    };


//    return (
//     <div>
//         <h1>Welcome Admin - Create New Tests</h1>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Test Title</label>
//                 <input 
//                     type='text'
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
            
//             </div>
//             <div>
//                 <label>Test Duration (in minutes)</label>
//                 <input 
//                     type='number'
//                     value={duration}
//                     onChange={(e) => setDuration(parseInt(e.target.value))}
//                     required
//                 />
//             </div>

//             <hr />

//             <div>
//                 <label>Questions File (.json format)</label>
//                 <input 
//                     type='file'
//                     accept='.json'
//                     onChange={handleFileChange}
//                     required
//                 />

//             </div>

//             <hr />

//             <button type='submit' disabled={loading || !questions}>
//                 {loading ? 'Creating...' : 'Create Test'}
//             </button>


//         </form>
//     </div>
//    )





// }










'use client'

import { useState, FormEvent, ChangeEvent, useRef } from 'react';

// No changes to the interface
interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

// --- SVG Icon Components for a cleaner UI ---
const UploadIcon = () => (
    <svg className="w-12 h-12 mx-auto text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const FileJsonIcon = () => (
    <svg className="w-12 h-12 mx-auto text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0_12.75h7.5m-7.5_3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const SpinnerIcon = () => (
     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-purple-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export default function AdminTestsPage() {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(60);
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            setQuestions(null);
            setFileName('');
            return;
        }

        if (file.type !== 'application/json') {
            setError('Invalid file type. Please upload a .json file.');
            setQuestions(null);
            setFileName('');
            return;
        }

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (ev) => {
            try {
                const fileContent = ev.target?.result as string;
                const parsedQuestions: Question[] = JSON.parse(fileContent);

                if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
                    throw new Error("JSON must be a non-empty array of questions.");
                }
                
                parsedQuestions.forEach((q, i) => {
                    if (!q.questionText || !Array.isArray(q.options) || typeof q.correctAnswer === 'undefined') {
                        throw new Error(`Question at index ${i} has an invalid structure.`);
                    }
                });

                setQuestions(parsedQuestions);
                setError('');
            } catch (jsonError: any) {
                setError(jsonError.message || 'Failed to parse JSON. Please check file format.');
                setQuestions(null);
                setFileName('');
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
            setError('Test title cannot be empty.');
            return;
        }
        if (!questions || questions.length === 0) {
            setError('Please upload and validate a questions file before creating the test.');
            return;
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
            const response = await fetch('http://localhost:5000/api/tests', {
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
        <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans p-4 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-slate-900/70 border border-purple-900/50 rounded-2xl shadow-2xl shadow-black/40 p-8 space-y-8 backdrop-blur-xl">
                    
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Create a New Assessment</h1>
                        <p className="text-purple-300 mt-2">Design and deploy a new test for your students.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-slate-300 mb-2">
                                    Test Title
                                </label>
                                <input
                                    id="title"
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='e.g., "Advanced JavaScript Quiz"'
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="duration" className="block text-sm font-bold text-slate-300 mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    id="duration"
                                    type='number'
                                    min="1"
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                Questions File
                            </label>
                            <label 
                                htmlFor="file-upload" 
                                className={`relative flex flex-col items-center justify-center w-full p-6 transition-all duration-300 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-purple-600 ${isDragOver ? 'border-purple-600 bg-purple-950/20' : ''}`}
                                onDragEnter={(e) => handleDragEvents(e, 'enter')}
                                onDragLeave={(e) => handleDragEvents(e, 'leave')}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDragEvents(e, 'drop')}
                            >
                                {!questions ? <UploadIcon /> : <FileJsonIcon />}
                                <span className="mt-4 text-center">
                                    {fileName ? (
                                        <p className="font-semibold text-purple-400">{fileName}</p>
                                    ) : (
                                        <p className="text-slate-400">
                                            <span className="font-semibold text-purple-500">Click to upload</span> or drag and drop
                                        </p>
                                    )}
                                    <p className="text-xs text-slate-500 mt-1">JSON file format only</p>
                                </span>
                                <input
                                    ref={fileInputRef}
                                    id="file-upload"
                                    type='file'
                                    accept='.json'
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>

                            {questions && (
                                <div className="mt-3 text-center bg-green-950/50 border border-green-800 text-green-300 text-sm rounded-lg p-3">
                                    <p>
                                        <span className="font-bold">Success:</span> {questions.length} questions loaded and validated.
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        {error && (
                            <div className="bg-red-950/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
                                <p><span className="font-bold">Error:</span> {error}</p>
                            </div>
                        )}
                        
                        <button 
                            type='submit' 
                            disabled={loading || !questions || !title}
                            className="w-full flex items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading && <SpinnerIcon />}
                            {loading ? 'Creating Assessment...' : 'Create Assessment'}
                        </button>
                    </form>
                </div>
            </div>
             {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-purple-800 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center max-w-sm w-full">
                       <SuccessIcon />
                        <h2 className="text-2xl font-bold text-slate-100 mt-4">Success!</h2>
                        <p className="text-slate-400 mt-2 mb-6">The new assessment has been created and is now available.</p>
                        <button
                            onClick={handleCloseModal}
                            className="w-full bg-purple-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

