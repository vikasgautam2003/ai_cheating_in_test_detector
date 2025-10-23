'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Attempt {
    _id: string;
    score: number;
    totalMarks: number;
    fatalStrikes: number;
    suspicionScore: number;
    createdAt: string;
    testId: {
        title: string;
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
const NoHistoryIcon = () => (
    <svg className="w-20 h-20 mx-auto text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);
const AlertTriangleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
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
                        onClick={() => onNavigate(item.path)}
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

export default function MyTestsPage() {
    const router = useRouter();
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttempts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/my-attempts`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`Failed to fetch your test history.`);
                const data: Attempt[] = await res.json();
                setAttempts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAttempts();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-cyan-300">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl mt-4">Loading Your Test History...</p>
            </div>
        );
    }
    
    if (error) {
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
                <Sidebar onNavigate={(path) => router.push(path)} activeView="tests" />
                <main className="flex-1 p-8">
                    <header className="flex justify-between items-center mb-10 pb-6 border-b border-cyan-500/10">
                        <div>
                            <h1 className="text-3xl font-bold text-white">My Test History</h1>
                            <p className="text-gray-400">Review your past performance and proctoring reports.</p>
                        </div>
                       
                    </header>
                    
                    {attempts.length === 0 ? (
                        <div className="text-center py-20 bg-black/50 rounded-2xl border border-dashed border-gray-800 animate-fadeInUp">
                            <NoHistoryIcon />
                            <p className="text-gray-400 mt-6 text-lg font-semibold">No Completed Tests</p>
                            <p className="text-gray-500 mt-1">Your past test attempts will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {attempts.map((attempt, index) => (
                                <div 
                                    key={attempt._id} 
                                    className="bg-black/50 rounded-2xl p-6 border border-gray-800 hover:border-cyan-600 transition-all duration-300 flex flex-col group relative overflow-hidden animate-fadeInUp"
                                    style={{ animationDelay: `${100 + index * 100}ms` }}
                                >
                                    <div className="absolute top-0 left-0 h-1 w-0 bg-cyan-500 transition-all duration-500 group-hover:w-full"></div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-white mb-2">{attempt.testId.title}</h3>
                                            <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded">{new Date(attempt.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex space-x-6 text-sm text-gray-300 my-4 border-y border-gray-800 py-3">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Score</p>
                                                <p className="font-bold text-lg text-white">{attempt.score}/{attempt.totalMarks}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Strikes</p>
                                                <p className={`font-bold text-lg ${attempt.fatalStrikes > 0 ? 'text-red-400' : 'text-green-400'}`}>{attempt.fatalStrikes}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Suspicion</p>
                                                <p className={`font-bold text-lg ${attempt.suspicionScore > 5 ? 'text-yellow-400' : 'text-gray-300'}`}>{attempt.suspicionScore}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link 
                                        href={`/results/${attempt._id}`}
                                        className="w-full mt-4 bg-gray-800/50 text-cyan-300 font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500 border border-gray-800 transition-all transform group-hover:scale-105 text-center"
                                    >
                                        View Full Report
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}