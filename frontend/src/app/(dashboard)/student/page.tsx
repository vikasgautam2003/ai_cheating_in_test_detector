







// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // --- Interfaces ---
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

// // --- SVG Icon Components ---
// const NoTestsIcon = () => (
//     <svg className="w-16 h-16 mx-auto text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.5 0v2.25m3-2.25v2.25m3-2.25v2.25m3-2.25v2.25M3 17.25v-2.25c0-.621.504-1.125 1.125-1.125h16.5c.621 0 1.125.504 1.125 1.125v2.25" />
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25v-3.75a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v3.75m-16.5 0h16.5" />
//     </svg>
// );


// export default function StudentDashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [tests, setTests] = useState<Test[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedTest, setSelectedTest] = useState<Test | null>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         window.location.href = '/auth/login';
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

//         if (!userResponse.ok || !testsResponse.ok) {
//             const userError = userResponse.statusText;
//             const testsError = testsResponse.statusText;
//             throw new Error(`Failed to fetch data. User: ${userError}, Tests: ${testsError}`);
//         }
        
//         const userData: User = await userResponse.json();
//         const testsData: Test[] = await testsResponse.json();

//         setUser(userData);
//         setTests(testsData);

//       } catch (err: any) {
//         setError(err.message);
//         localStorage.removeItem('token');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/auth/login';
//   };

//   const handleStartTest = () => {
//       if(selectedTest) {
//           // Here you would navigate to the test page, e.g.:
//           // window.location.href = `/tests/${selectedTest._id}`;
//           console.log(`Starting test: ${selectedTest.title}`);
//           setSelectedTest(null); // Close modal after starting
//       }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-slate-900 text-purple-300">
//         <p className="text-xl">Loading your dashboard...</p>
//       </div>
//     );
//   }
  
//   if (error) {
//      return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-red-400 p-4">
//         <p className="text-xl font-bold mb-2">An Error Occurred</p>
//         <p className="text-center">{error}</p>
//         <button onClick={() => window.location.href = '/auth/login'} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">
//             Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-100 font-sans bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
//       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
//         <header className="flex justify-between items-center mb-10 pb-4 border-b border-purple-900/30">
//           <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
//             Welcome, <span className="text-purple-400">{user?.email}!</span>
//           </h1>
//           <button 
//             onClick={handleLogout}
//             className="border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
//           >
//             Logout
//           </button>
//         </header>

//         <main>
//           <h2 className="text-2xl font-semibold mb-8 text-slate-200">Available Assessments</h2>

//           {tests.length === 0 ? (
//             <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
//                 <NoTestsIcon />
//                 <p className="text-slate-400 mt-6 text-lg">No assessments are available right now.</p>
//                 <p className="text-slate-500 mt-1">Please check back later.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {tests.map((test) => (
//                 <div 
//                   key={test._id} 
//                   className="bg-slate-900/70 rounded-2xl p-6 border border-purple-900/50 hover:border-purple-600 transition-all duration-300 transform hover:scale-[1.02] flex flex-col shadow-lg shadow-black/20"
//                 >
//                   <div className="flex-grow">
//                     <h3 className="text-lg font-bold text-slate-100 mb-2">{test.title}</h3>
//                     <p className="text-sm text-slate-400 mb-4">
//                       Duration: {test.duration} minutes
//                     </p>
//                      <p className="text-xs text-slate-500 mb-6">
//                       Created by: <span className="font-medium text-slate-400">{test.createdBy.email}</span>
//                     </p>
//                   </div>
//                   <button 
//                     onClick={() => router.push(`/test/${test._id}`)}
//                     className="w-full mt-auto bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
//                   >
//                     Start Test
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {selectedTest && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//             <div className="bg-slate-900 border border-purple-800 rounded-2xl shadow-2xl shadow-black/40 p-8 text-center max-w-sm w-full">
//                <h2 className="text-2xl font-bold text-slate-100">{selectedTest.title}</h2>
//                <p className="text-slate-400 mt-2">Duration: {selectedTest.duration} minutes</p>
//                <p className="text-slate-400 mt-4 mb-6">Are you ready to begin this assessment?</p>
//                <div className="flex justify-center gap-4">
//                     <button
//                         onClick={() => setSelectedTest(null)}
//                         className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleStartTest}
//                         className="w-full bg-purple-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
//                     >
//                         Confirm & Start
//                     </button>
//                </div>
//             </div>
//         </div>
//     )}
//     </div>
//   );
// }






'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);

const FileJsonIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);

const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const NoTestsIcon = () => (
    <svg className="w-16 h-16 mx-auto text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.5 0v2.25m3-2.25v2.25m3-2.25v2.25m3-2.25v2.25M3 17.25v-2.25c0-.621.504-1.125 1.125-1.125h16.5c.621 0 1.125.504 1.125 1.125v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.25v-3.75a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v3.75m-16.5 0h16.5" />
    </svg>
);

const Sidebar = ({ onNavigate, activeView }: { onNavigate: (path: string) => void; activeView: string; }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/student' },
        { id: 'tests', label: 'My Tests', icon: FileJsonIcon, path: '/student/tests' },
        { id: 'profile', label: 'Profile', icon: UserIcon, path: '/student/profile' },
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
        </aside>
    );
};

export default function StudentDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [tests, setTests] = useState<Test[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/auth/login');
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
                    throw new Error(`Failed to fetch dashboard data.`);
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
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-cyan-300">
                <p className="text-xl animate-pulse">Loading Dashboard...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-red-400 p-4">
                <p className="text-xl font-bold mb-2">An Error Occurred</p>
                <p className="text-center">{error}</p>
                <button onClick={() => router.push('/auth/login')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            <Sidebar onNavigate={(path) => router.push(path)} activeView="dashboard" />
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome, <span className="text-cyan-400">{user?.email}!</span>
                    </h1>
                    <button 
                        onClick={handleLogout}
                        className="border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-all"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Available Assessments</h2>
                        {tests.length === 0 ? (
                            <div className="text-center py-20 bg-black/30 rounded-2xl border border-gray-800">
                                <NoTestsIcon />
                                <p className="text-gray-400 mt-6 text-lg">No assessments are available right now.</p>
                                <p className="text-gray-500 mt-1">Please check back later.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tests.map((test) => (
                                    <div 
                                        key={test._id} 
                                        className="bg-black/50 rounded-2xl p-6 border border-gray-800 hover:border-cyan-600 transition-all duration-300 flex flex-col group"
                                    >
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-white mb-2">{test.title}</h3>
                                            <p className="text-sm text-gray-400 mb-4">Duration: {test.duration} minutes</p>
                                            <p className="text-xs text-gray-500">Created by: <span className="font-medium text-gray-400">{test.createdBy.email}</span></p>
                                        </div>
                                        <button 
                                            onClick={() => router.push(`/test/${test._id}`)}
                                            className="w-full mt-6 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500 transition-all transform group-hover:scale-105"
                                        >
                                            Start Test
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-white">Performance</h2>
                            <div className="bg-black/30 rounded-2xl border border-gray-800 p-6 h-48 flex items-center justify-center animate-pulse">
                                <p className="text-gray-600">Performance chart coming soon...</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-white">Recent Activity</h2>
                            <div className="bg-black/30 rounded-2xl border border-gray-800 p-6 h-64 flex items-center justify-center animate-pulse">
                                <p className="text-gray-600">Activity feed coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

