// packages/web/src/app/(dashboard)/student/profile/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProfileStats {
    totalTestsTaken: number;
    averageScore: number;
    totalFatalStrikes: number;
}

// --- SVG ICONS ---
const LayoutDashboardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);
const FileJsonIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);
const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const TrophyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
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

const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <div className="bg-black/50 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center space-x-4">
            <div className="bg-gray-800/50 p-3 rounded-lg">{icon}</div>
            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <p className="text-white text-3xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);


export default function ProfilePage() {
    const router = useRouter();
    const [stats, setStats] = useState<ProfileStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '';

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/profile-stats`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`Failed to fetch your profile stats.`);
                const data: ProfileStats = await res.json();
                setStats(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [router]);
    
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-cyan-300">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xl mt-4">Loading Your Profile...</p>
            </div>
        );
    }

    return (
        <>
            <GlobalStyles />
            <div className="flex min-h-screen bg-sentinel-animated text-white font-sans">
                <Sidebar onNavigate={(path) => router.push(path)} activeView="profile" />
                <main className="flex-1 p-8">
                    <header className="mb-10 pb-6 border-b border-cyan-500/10">
                        <h1 className="text-3xl font-bold text-white">My Profile</h1>
                        <p className="text-gray-400">A summary of your performance and activity.</p>
                    </header>
                    
                    {error && <p className="text-red-400 p-4 bg-red-500/10 rounded-lg">{error}</p>}

                    {stats && !error && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp">
                                <StatCard 
                                    title="Total Tests Taken" 
                                    value={stats.totalTestsTaken}
                                    icon={<FileJsonIcon className="w-6 h-6 text-cyan-400" />} 
                                />
                                <StatCard 
                                    title="Average Score" 
                                    value={`${stats.averageScore}%`}
                                    icon={<TrophyIcon className="w-6 h-6 text-green-400" />} 
                                />
                                <StatCard 
                                    title="Total Fatal Strikes" 
                                    value={stats.totalFatalStrikes}
                                    icon={<AlertTriangleIcon className="w-6 h-6 text-red-400" />} 
                                />
                            </div>

                            <div className="bg-black/50 rounded-2xl border border-gray-800 p-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                                <h2 className="text-2xl font-semibold mb-6 text-white">Account Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 font-semibold uppercase">Email Address</p>
                                        <p className="text-lg text-gray-300">{userEmail || 'Not available'}</p>
                                    </div>
                                    <div className="pt-4">
                                         <p className="text-sm text-gray-500 font-semibold uppercase">Account Settings</p>
                                         <button className="mt-2 text-cyan-400 hover:text-cyan-300 transition text-sm">Change Password (coming soon)</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}