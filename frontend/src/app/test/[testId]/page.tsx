




// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';

// interface Question {
//   _id: string;
//   questionText: string;
//   options: string[];
// }


// interface Test {
//   _id: string;
//   title: string;
//   duration: number;
//   questions: Question[];
// }



// type Answers = {
//   [key: number]: string;
// };



// export default function TestPage() {
//     const router = useRouter();
//     const params = useParams();
//     const testId = params.testId as string;

//     const [test, setTest] = useState<Test | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);


//     const [testStarted, setTestStarted] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState<Answers>({});
//     const [timeLeft, setTimeLeft] = useState(0);


//     useEffect(() => {
//         if (!testId) return;

//          const fetchTest = async () => {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 setError('Authentication error. Please log in again.');
//                 setLoading(false);
//                 window.location.href = '/auth/login';
//                 return;
//             }

//             try{
//                  setLoading(true);
//                   const response = await fetch(`http://localhost:5000/api/tests/${testId}`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                  if (!response.ok) { throw new Error('Failed to load the test.'); }
//                     const data: Test = await response.json();
//                     setTest(data);

//                     setTimeLeft(data.duration * 60);

//             } catch (err: any) { setError(err.message); } 
            
//             finally { setLoading(false); }


//          };
         
//          fetchTest();

//     },  [testId, router]);


//     useEffect(() => {

//          if (!testStarted || !test) return;


//          if(timeLeft <= 0) {
//             handleSubmission();
//             return;
//          }

//          const timeId = setInterval(() => {
//             setTimeLeft((prevTime) => prevTime - 1);
//          }, 1000);

//          return () => clearInterval(timeId);

//     }, [testStarted, timeLeft, test]);


//     const handleBeginTest = () => {
//         setTestStarted(true);
//     }

//     const handleAnswerSelect = (option: string) => {
//         setAnswers((prevAnswers) => ({
//             ...prevAnswers,
//             [currentQuestionIndex]: option,
//         }));
//     };

//     const handleNextQuestion = () => {
//         if(test && currentQuestionIndex < test.questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         }
//     };

//     const handlePreviousQuestion = () => {
//         if(test && currentQuestionIndex > 0) {
//             setCurrentQuestionIndex(currentQuestionIndex - 1);
//         }
//     };

   
//     const handleSubmission = async () => {

//         setLoading(true);
//         const token = localStorage.getItem('token');

//         try{
//             const response = await fetch(`http://localhost:5000/api/tests/${testId}/submit`, {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ answers }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit the test.');
//             }

//             const result = await response.json();

//             router.push(`/results/${result._id}`);
//         } catch (err: any) {
//             setError(err.message);
//             setLoading(false);
//         }

//     }


//     const formatTime = (seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };


//     if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading Test...</p></div>;
//     if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Error: {error}</p></div>;
//     if (!test) return <div className="flex justify-center items-center h-screen"><p>Test not found.</p></div>;

    
//     const currentQuestion = test.questions[currentQuestionIndex];

//     if(!testStarted) {
//         return (
//             <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
//               <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
//                  <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
//                     <hr className="my-4"/>
//                     <div className="text-left space-y-4">
//                         <p><span className="font-semibold">Duration:</span> {test.duration} Minutes</p>
//                         <p><span className="font-semibold">Number of Questions:</span> {test.questions.length}</p>
//                         <p className="font-semibold">Instructions:</p>
//                         <ul className="list-disc list-inside text-gray-700">
//                             <li>Ensure you have a stable internet connection.</li>
//                             <li>Once the test begins, the timer will not stop.</li>
//                             <li>Do not refresh the page during the test.</li>
//                         </ul>
//                     </div>
//                     <button
//                         onClick={handleBeginTest}
//                         className="mt-8 bg-blue-600 text-white py-3 px-12 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
//                     >
//                         Begin Test
//                     </button>
//                 </div>
//             </div>
//         );
//     }



//     return (
        
//         <div className="flex flex-col h-screen bg-gray-50">
//             <WebcamMonitor />
//             <header className="flex justify-between items-center p-4 bg-white shadow-md">
//                  <h1 className="text-2xl font-bold text-gray-800">{test.title}</h1>
//                   <div className="text-2xl font-mono bg-gray-800 text-white px-4 py-2 rounded-lg">
//                      {formatTime(timeLeft)}
//                   </div>
//             </header>


//              <main className="flex-grow p-6 md:p-10">
//                  <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//                      <div className="mb-6">
//                          <p className="text-lg font-semibold text-gray-700">
//                             Question {currentQuestionIndex + 1} of {test.questions.length}
//                         </p>
//                          <h2 className="text-2xl mt-2">{currentQuestion.questionText}</h2>

//                      </div>

//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentQuestion.options.map((option, index) => (
//                            <button 
//                            key={index}
//                            onClick={() => handleAnswerSelect(option)}
                           
//                             className={`p-4 rounded-lg text-left border-2 transition-colors
//                                 ${answers[currentQuestionIndex] === option
//                                     ? 'bg-blue-500 border-blue-500 text-white'
//                                     : 'bg-white border-gray-300 hover:bg-gray-100'
//                                 }`}
//                             >
//                                 {option}
//                             </button>
                           
//                         ))}
//                      </div>
//                  </div>
//              </main>

//               <footer className="flex justify-between items-center p-4 bg-white border-t">
//                 <button
//                     onClick={handlePreviousQuestion}
//                     disabled={currentQuestionIndex === 0}
//                     className="bg-gray-600 text-white py-2 px-8 rounded-lg hover:bg-gray-700 disabled:bg-gray-300"
//                    > Previous
//                </button>

//                     {currentQuestionIndex === test.questions.length - 1 ? (
//                 <button
//                     onClick={handleSubmission}
//                     className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700"
//                 >
//                     Submit Test
//                 </button>
//                 ) : (
//                 <button
//                     onClick={handleNextQuestion}
//                     disabled={currentQuestionIndex === test.questions.length - 1}
//                     className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
//                 >
//                     Next
//                 </button>
//                 )}

//               </footer>

//         </div>
//     )


// }







'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import WebcamMonitor from '@/app/component/proctoring/WebcamMonitor';
import AudioRecorder from '@/app/component/proctoring/AudioRecorder';

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
        if (!response.ok) { throw new Error('Failed to load the test.'); }
        const data: Test = await response.json();
        setTest(data);
        setTimeLeft(data.duration * 60);
      } catch (err: any) { setError(err.message); } 
      finally { setLoading(false); }
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
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [stage, timeLeft, test]);

  const handleProceedToVerification = () => setStage('verification');
  const handleStartTest = () => {
    if (!capturedPhoto || !recordedAudio) {
      alert("Please complete both photo and audio verification.");
      return;
    }
    setStage('in_progress');
  };
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCapturedPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleAnswerSelect = (option: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };
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
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) { throw new Error('Failed to submit the test.'); }
      const result = await response.json();
      router.push(`/results/${result._id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading && !test) return <div className="flex justify-center items-center h-screen">Loading Test...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  if (!test) return <div className="flex justify-center items-center h-screen">Test not found.</div>;

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

  if (stage === 'verification') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Identity Verification</h1>
          <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold mb-4 text-center">Photo Verification</h2>
                <div className="p-4 border-2 border-dashed rounded-lg">
                    <WebcamMonitor onPhotoCaptured={setCapturedPhoto} captureMode={true} />
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
            disabled={!capturedPhoto || !recordedAudio}
            className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            Confirm and Begin Test
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'in_progress') {
    const currentQuestion = test.questions[currentQuestionIndex];
    return (
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
                    <p className="text-lg font-semibold text-gray-700">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
                    <h2 className="text-2xl mt-2">{currentQuestion.questionText}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswerSelect(option)}
                        className={`p-4 rounded-lg text-left border-2 transition-colors ${answers[currentQuestionIndex] === option ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}>
                        {option}
                    </button>
                    ))}
                </div>
            </div>
        </main>
        <footer className="flex justify-between items-center p-4 bg-white border-t z-10">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}
            className="bg-gray-600 text-white py-2 px-8 rounded-lg hover:bg-gray-700 disabled:bg-gray-300">
            Previous
          </button>
          {currentQuestionIndex === test.questions.length - 1 ? (
            <button onClick={handleSubmission} className="bg-green-600 text-white py-2 px-8 rounded-lg hover:bg-green-700">
              Submit Test
            </button>
          ) : (
            <button onClick={handleNextQuestion}
              className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700">
              Next
            </button>
          )}
        </footer>
        <WebcamMonitor captureMode={false} />
      </div>
    );
  }
}
