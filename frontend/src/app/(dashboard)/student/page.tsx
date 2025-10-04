







// 'use client';

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // --- Interfaces (Untouched) ---
// interface User {
//     _id: string;
//     email: string;
//     role: string;
// }

// interface Test {
//     _id: string;
//     title: string;
//     duration: number;
//     questions: any[];
//     createdBy: {
//         _id: string;
//         email: string;
//     };
// }

// // --- SVG Icons (Untouched, with new icons for UI) ---
// const LayoutDashboardIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
// );

// const FileJsonIcon = ({ className }: { className?: string }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
// );

// const UserIcon = ({ className }: { className?: string }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
// );

// const NoTestsIcon = () => (
//     <svg className="w-20 h-20 mx-auto text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
//        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
//     </svg>
// );

// // --- Component for Global Styles & Animations ---
// const GlobalStyles = () => (
//     <style jsx global>{`
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
//         .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
//         .bg-sentinel-animated {
//             background: linear-gradient(90deg, #020617, #082f49, #020617);
//             background-size: 200% 200%;
//             animation: backgroundPan 15s ease infinite;
//         }
//     `}</style>
// );


// // --- Sidebar Component (Styling tweaked for consistency) ---
// const Sidebar = ({ onNavigate, activeView }: { onNavigate: (path: string) => void; activeView: string; }) => {
//     const navItems = [
//         { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/student' },
//         { id: 'tests', label: 'My Tests', icon: FileJsonIcon, path: '/student/mytests' },
//         { id: 'profile', label: 'Profile', icon: UserIcon, path: '/student/profile' },
//     ];

//     return (
//         <aside className="w-64 bg-black/50 text-white flex-col p-4 border-r border-gray-800 hidden md:flex backdrop-blur-lg">
//             <div className="text-2xl font-bold text-white mb-10 flex items-center space-x-3">
//                 <span className="bg-cyan-500 w-3 h-3 rounded-full"></span>
//                 <span>Sentinel.ai</span>
//             </div>
//             <nav className="flex flex-col space-y-2">
//                 {navItems.map(item => (
//                     <button
//                         key={item.id}
//                         onClick={() => onNavigate(item.path)}
//                         className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
//                             activeView === item.id 
//                             ? 'bg-cyan-500/10 text-cyan-300' 
//                             : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                         }`}
//                     >
//                         <item.icon className={`w-5 h-5 transition-colors ${activeView === item.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-white'}`} />
//                         <span className="font-semibold">{item.label}</span>
//                     </button>
//                 ))}
//             </nav>
//         </aside>
//     );
// };

// export default function StudentDashboardPage() {
//     // --- All State and Logic Hooks are UNTOUCHED ---
//     const router = useRouter();
//     const [user, setUser] = useState<User | null>(null);
//     const [tests, setTests] = useState<Test[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // --- All handler functions and useEffects are UNTOUCHED ---
//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 router.push('/auth/login');
//                 return;
//             }

//             try {
//                 const [userResponse, testsResponse] = await Promise.all([
//                     fetch('http://localhost:5000/api/user', {
//                         headers: { 'Authorization': `Bearer ${token}` },
//                     }),
//                     fetch('http://localhost:5000/api/tests', {
//                         headers: { 'Authorization': `Bearer ${token}` },
//                     }),
//                 ]);

//                 if (!userResponse.ok || !testsResponse.ok) {
//                     throw new Error(`Failed to fetch dashboard data.`);
//                 }
                
//                 const userData: User = await userResponse.json();
//                 const testsData: Test[] = await testsResponse.json();

//                 setUser(userData);
//                 setTests(testsData);

//             } catch (err: any) {
//                 setError(err.message);
//                 localStorage.removeItem('token');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchDashboardData();
//     }, [router]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         window.location.href = '/';
//     };

//     if (isLoading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-cyan-300">
//                 <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
//                 <p className="text-xl mt-4">Loading Dashboard...</p>
//             </div>
//         );
//     }
    
//     if (error) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-red-400 p-4">
//                 <p className="text-xl font-bold mb-2">An Error Occurred</p>
//                 <p className="text-center">{error}</p>
//                 <button onClick={() => router.push('/auth/login')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">
//                     Go to Login
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <>
//             <GlobalStyles />
//             <div className="flex min-h-screen bg-sentinel-animated text-white font-sans">
//                 <Sidebar onNavigate={(path) => router.push(path)} activeView="dashboard" />
//                 <main className="flex-1 p-8">
//                     {/* --- REDESIGNED HEADER (NO NEW FUNCTIONALITY) --- */}
//                     <header className="flex justify-between items-center mb-10 pb-6 border-b border-cyan-500/10">
//                         <div>
//                             <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
//                             <p className="text-gray-400">Welcome, <span className="text-cyan-400 font-semibold">{user?.email}</span></p>
//                         </div>
//                         <button 
//                             onClick={handleLogout}
//                             className="bg-gray-800/50 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 hover:border-red-500/50 transition-all"
//                         >
//                             Logout
//                         </button>
//                     </header>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         <div className="lg:col-span-2">
//                             <h2 className="text-2xl font-semibold mb-6 text-white animate-fadeInUp" style={{ animationDelay: '100ms' }}>Available Assessments</h2>
//                             {tests.length === 0 ? (
//                                 <div className="text-center py-20 bg-black/50 rounded-2xl border border-dashed border-gray-800 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
//                                     <NoTestsIcon />
//                                     <p className="text-gray-400 mt-6 text-lg font-semibold">No Assessments Available</p>
//                                     <p className="text-gray-500 mt-1">Please check back later for new tests.</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {tests.map((test, index) => (
//                                         <div 
//                                             key={test._id} 
//                                             className="bg-black/50 rounded-2xl p-6 border border-gray-800 hover:border-cyan-600 transition-all duration-300 flex flex-col group relative overflow-hidden animate-fadeInUp"
//                                             style={{ animationDelay: `${200 + index * 100}ms` }}
//                                         >
//                                             <div className="absolute top-0 left-0 h-1 w-0 bg-cyan-500 transition-all duration-500 group-hover:w-full"></div>
//                                             <div className="flex-grow">
//                                                 <h3 className="text-lg font-bold text-white mb-2">{test.title}</h3>
//                                                 <div className="flex space-x-4 text-sm text-gray-400 mb-4">
//                                                     <span>Duration: {test.duration} min</span>
//                                                     <span>Questions: {test.questions.length}</span>
//                                                 </div>
//                                                 <p className="text-xs text-gray-500">Created by: <span className="font-medium text-gray-400">{test.createdBy.email}</span></p>
//                                             </div>
//                                             <button 
//                                                 onClick={() => router.push(`/test/${test._id}`)}
//                                                 className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all transform group-hover:scale-105"
//                                             >
//                                                 Start Test
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

                       
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// }














'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User { _id: string; email: string; }
interface Test {
    _id: string;
    title: string;
    duration: number;
    questions: any[];
    createdBy: { email: string; };
}
interface ProfileStats {
    totalTestsTaken: number;
    averageScore: number;
}
interface RecentAttempt {
    _id: string;
    score: number;
    totalMarks: number;
    testId: { title: string };
}

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
    </svg>
);
const FileJsonIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
);
const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
const NoTestsIcon = () => (
    <svg className="w-20 h-20 mx-auto text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

const GlobalStyles = () => (
    <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes backgroundPan { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
        .bg-sentinel-animated {
            background: linear-gradient(90deg, #020617, #082f49, #020617);
            background-size: 200% 200%;
            animation: backgroundPan 15s ease infinite;
        }
    `}</style>
);

const Sidebar = ({ onNavigate, activeView }: { onNavigate: (path: string) => void; activeView: string; }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/student' },
        { id: 'tests', label: 'My Tests', icon: FileJsonIcon, path: '/student/mytests' },
        { id: 'profile', label: 'Profile', icon: UserIcon, path: '/student/profile' },
    ];
    return (
        <aside className="w-64 bg-black/50 text-white flex-col p-4 border-r border-gray-800 hidden md:flex backdrop-blur-lg">
            <div className="text-2xl font-bold text-white mb-10 flex items-center space-x-3">
                <span className="bg-cyan-500 w-3 h-3 rounded-full"></span>
                <span>Sentinel.ai</span>
            </div>
            <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            console.log("📌 Navigating to", item.path);
                            onNavigate(item.path);
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                            activeView === item.id
                                ? 'bg-cyan-500/10 text-cyan-300'
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                        }`}
                    >
                        <item.icon className={`w-5 h-5 transition-colors ${activeView === item.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-white'}`} />
                        <span className="font-semibold">{item.label}</span>
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
    const [stats, setStats] = useState<ProfileStats | null>(null);
    const [lastAttempt, setLastAttempt] = useState<RecentAttempt | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("🚀 StudentDashboardPage rendered");

    useEffect(() => {
    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            console.log("🚀 Starting parallel fetch requests...");
            const [testsRes, statsRes, attemptsRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`, { headers }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/profile-stats`, { headers }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/my-attempts`, { headers }),
            ]);
            console.log("✅ All fetch requests completed");

            if (!testsRes.ok || !statsRes.ok || !attemptsRes.ok) {
                console.error("❌ One or more fetch requests failed:", {
                    testsResStatus: testsRes.status,
                    statsResStatus: statsRes.status,
                    attemptsResStatus: attemptsRes.status
                });
                throw new Error("Failed to fetch dashboard data.");
            }

            const testsData = await testsRes.json();
            const statsData = await statsRes.json();
            const attemptsData = await attemptsRes.json();

            console.log("📦 Fetch results:", { testsData, statsData, attemptsData });

            setTests(testsData);
            setStats(statsData);
            setLastAttempt(attemptsData.length > 0 ? attemptsData[0] : null);

        } catch (err: any) {
            console.error("💥 Error fetching dashboard data:", err);
            setError(err.message);
            localStorage.removeItem('token');
        } finally {
            console.log("⏹️ Finished fetching dashboard data");
            setIsLoading(false);
        }
    };

    console.log("🚀 StudentDashboardPage rendered");
    fetchDashboardData();
}, [router]);


    const getGreeting = () => {
        const hour = new Date().getHours();
        return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    };

    const handleLogout = () => {
        console.log("🚪 Logging out");
        localStorage.removeItem('token');
        router.push('/');
    };

    if (isLoading) {
        console.log("⏳ Dashboard is loading...");
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-cyan-300">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl mt-4">Loading Dashboard...</p>
            </div>
        );
    }
    
    if (error) {
        console.error("⚠️ Dashboard error:", error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-red-400 p-4">
                <p className="text-xl font-bold mb-2">An Error Occurred</p>
                <p className="text-center">{error}</p>
                <button onClick={() => router.push('/login')} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <>
            <GlobalStyles />
            <div className="flex min-h-screen bg-sentinel-animated text-white font-sans">
                <Sidebar onNavigate={(path) => router.push(path)} activeView="dashboard" />
                <main className="flex-1 p-8">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-10 pb-6 border-b border-cyan-500/10">
                        <div>
                            <h1 className="text-3xl font-bold text-white">{getGreeting()},</h1>
                            <p className="text-gray-400"><span className="text-cyan-400 font-semibold">{user?.email}</span></p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="bg-gray-800/50 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 hover:border-red-500/50 transition-all"
                        >
                            Logout
                        </button>
                    </header>

                    {/* Dashboard Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Tests */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-semibold mb-6 text-white animate-fadeInUp" style={{ animationDelay: '100ms' }}>Available Assessments</h2>
                            {tests.length === 0 ? (
                                <div className="text-center py-20 bg-black/50 rounded-2xl border border-dashed border-gray-800 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                                    <NoTestsIcon />
                                    <p className="text-gray-400 mt-6 text-lg font-semibold">No Assessments Available</p>
                                    <p className="text-gray-500 mt-1">Please check back later for new tests.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tests.map((test, index) => (
                                        <div key={test._id} className="bg-black/50 rounded-2xl p-6 border border-gray-800 hover:border-cyan-600 transition-all duration-300 flex flex-col group relative overflow-hidden animate-fadeInUp" style={{ animationDelay: `${200 + index * 100}ms` }}>
                                            <div className="absolute top-0 left-0 h-1 w-0 bg-cyan-500 transition-all duration-500 group-hover:w-full"></div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-bold text-white mb-2">{test.title}</h3>
                                                <div className="flex space-x-4 text-sm text-gray-400 mb-4">
                                                    <span>Duration: {test.duration} min</span>
                                                    <span>Questions: {test.questions.length}</span>
                                                </div>
                                                <p className="text-xs text-gray-500">Created by: <span className="font-medium text-gray-400">{test.createdBy.email}</span></p>
                                            </div>
                                            <button onClick={() => router.push(`/test/${test._id}`)} className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all transform group-hover:scale-105">
                                                Start Test
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                                <h2 className="text-2xl font-semibold mb-6 text-white">Your Statistics</h2>
                                <div className="bg-black/30 rounded-2xl border border-gray-800 p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400">Total Tests Taken</p>
                                        <p className="text-2xl font-bold text-white">{stats?.totalTestsTaken}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400">Average Score</p>
                                        <p className="text-2xl font-bold text-green-400">{stats?.averageScore}%</p>
                                    </div>
                                    <Link href="/student/profile" className="block text-center w-full mt-2 pt-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                                        View Full Profile &rarr;
                                    </Link>
                                </div>
                            </div>
                            <div className="animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                                <h2 className="text-2xl font-semibold mb-6 text-white">Last Result</h2>
                                <div className="bg-black/30 rounded-2xl border border-gray-800 p-6">
                                    {lastAttempt ? (
                                        <div>
                                            <p className="text-gray-400 text-sm">{lastAttempt.testId.title}</p>
                                            <p className="text-4xl font-bold my-2">{lastAttempt.score} <span className="text-2xl text-gray-500">/ {lastAttempt.totalMarks}</span></p>
                                            <Link href={`/results/${lastAttempt._id}`} className="block text-center w-full mt-4 bg-gray-800/50 text-cyan-300 font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500 border border-gray-800 transition-all">
                                                View Detailed Report
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-600 text-center py-8">
                                            <p>Your first test result will appear here.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
