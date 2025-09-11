


// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // No changes to interfaces
// interface User {
//   _id: string;
//   email: string;
//   role: string;
// }

// interface Test {
//   _id: string;
//   title: string;
//   duration: number;
//   questions: any[];
//   createdBy: {
//     _id: string;
//     email: string;
//   };
// }


// export default function StudentDashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [tests, setTests] = useState<Test[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // No changes to the data fetching logic
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/auth/login');
//         return;
//       }

//       try {
//         const [userResponse, testsResponse] = await Promise.all([
//           fetch('http://localhost:5000/api/user', {
//             headers: { 'Authorization': `Bearer ${token}` },
//           }),
//           fetch('http://localhost:5000/api/tests', {
//             headers: { 'Authorization': `Bearer ${token}` },
//           }),
//         ]);


//         if (!userResponse.ok || !testsResponse.ok) throw new Error('Failed to fetch dashboard data.');
        
//         const userData: User = await userResponse.json();
//         const testsData: Test[] = await testsResponse.json();

//         setUser(userData);
//         setTests(testsData);

//       } catch (err: any) {
//         setError(err.message);
//         localStorage.removeItem('token');
//         router.push('/auth/login');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, [router]);


//   // No changes to the logout handler
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     router.push('/auth/login');
//   };

//   // Styled Loading State
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//         <p className="text-xl text-gray-400">Loading your dashboard...</p>
//       </div>
//     );
//   }
  
//   // Styled Error State
//   if (error) {
//      return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
//         <p className="text-xl">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
//         {/* === Header Section === */}
//         <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-700">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             Welcome, <span className="text-cyan-400">{user?.email}!</span>
//           </h1>
//           <button 
//             onClick={handleLogout}
//             className="bg-transparent border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
//           >
//             Logout
//           </button>
//         </header>

//         {/* === Available Tests Section === */}
//         <main>
//           <h2 className="text-xl md:text-2xl font-semibold mb-6">Available Mock Tests</h2>

//           {tests.length === 0 ? (
//             <div className="text-center py-20">
//                 <p className="text-gray-400">No tests are available at the moment. Please check back later.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {tests.map((test) => (
//                 <div 
//                   key={test._id} 
//                   className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col"
//                 >
//                   <div className="flex-grow">
//                     <h3 className="text-lg font-bold text-white mb-2">{test.title}</h3>
//                     <p className="text-sm text-gray-400 mb-4">
//                       Duration: {test.duration} minutes
//                     </p>
//                      <p className="text-xs text-gray-500 mb-6">
//                       Created by: <span className="font-medium text-gray-400">{test.createdBy.email}</span>
//                     </p>
//                   </div>
//                   <button 
//                     onClick={() => alert(`Starting test: ${test.title}`)}
//                     className="w-full mt-auto bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-colors duration-300"
//                   >
//                     Start Test
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }












'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// --- Interfaces ---
interface User {
  _id: string;
  email: string;
  role: string;
}

interface Test {
  _id: string;
  title: string;
  duration: number;
  questions: any[];
  createdBy: {
    _id: string;
    email: string;
  };
}

// --- SVG Icon Components ---
const NoTestsIcon = () => (
    <svg className="w-16 h-16 mx-auto text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.5 0v2.25m3-2.25v2.25m3-2.25v2.25m3-2.25v2.25M3 17.25v-2.25c0-.621.504-1.125 1.125-1.125h16.5c.621 0 1.125.504 1.125 1.125v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25v-3.75a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v3.75m-16.5 0h16.5" />
    </svg>
);


export default function StudentDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/auth/login';
        return;
      }

      try {
        const [userResponse, testsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/user', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/tests', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (!userResponse.ok || !testsResponse.ok) {
            const userError = userResponse.statusText;
            const testsError = testsResponse.statusText;
            throw new Error(`Failed to fetch data. User: ${userError}, Tests: ${testsError}`);
        }
        
        const userData: User = await userResponse.json();
        const testsData: Test[] = await testsResponse.json();

        setUser(userData);
        setTests(testsData);

      } catch (err: any) {
        setError(err.message);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  };

  const handleStartTest = () => {
      if(selectedTest) {
          // Here you would navigate to the test page, e.g.:
          // window.location.href = `/tests/${selectedTest._id}`;
          console.log(`Starting test: ${selectedTest.title}`);
          setSelectedTest(null); // Close modal after starting
      }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-purple-300">
        <p className="text-xl">Loading your dashboard...</p>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-red-400 p-4">
        <p className="text-xl font-bold mb-2">An Error Occurred</p>
        <p className="text-center">{error}</p>
        <button onClick={() => window.location.href = '/auth/login'} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">
            Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-purple-900/30">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            Welcome, <span className="text-purple-400">{user?.email}!</span>
          </h1>
          <button 
            onClick={handleLogout}
            className="border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </header>

        <main>
          <h2 className="text-2xl font-semibold mb-8 text-slate-200">Available Assessments</h2>

          {tests.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
                <NoTestsIcon />
                <p className="text-slate-400 mt-6 text-lg">No assessments are available right now.</p>
                <p className="text-slate-500 mt-1">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tests.map((test) => (
                <div 
                  key={test._id} 
                  className="bg-slate-900/70 rounded-2xl p-6 border border-purple-900/50 hover:border-purple-600 transition-all duration-300 transform hover:scale-[1.02] flex flex-col shadow-lg shadow-black/20"
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">{test.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Duration: {test.duration} minutes
                    </p>
                     <p className="text-xs text-slate-500 mb-6">
                      Created by: <span className="font-medium text-slate-400">{test.createdBy.email}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedTest(test)}
                    className="w-full mt-auto bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
                  >
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-slate-900 border border-purple-800 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center max-w-sm w-full">
               <h2 className="text-2xl font-bold text-slate-100">{selectedTest.title}</h2>
               <p className="text-slate-400 mt-2">Duration: {selectedTest.duration} minutes</p>
               <p className="text-slate-400 mt-4 mb-6">Are you ready to begin this assessment?</p>
               <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setSelectedTest(null)}
                        className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleStartTest}
                        className="w-full bg-purple-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                    >
                        Confirm & Start
                    </button>
               </div>
            </div>
        </div>
    )}
    </div>
  );
}
