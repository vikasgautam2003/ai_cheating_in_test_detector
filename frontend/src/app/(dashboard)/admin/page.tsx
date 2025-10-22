







'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Link from 'next/link';

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);
const UsersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const PlusCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const BarChartIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
);

const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const WandSparklesIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 3v4" />
    <path d="M23 5h-4" />
    <path d="M8 9l3 3L8 15l-3-3z" />
    <path d="M9 5v2" />
    <path d="M5 5h2" />
    <path d="M19 11v2" />
    <path d="M17 13h4" />
    <path d="M11 19v2" />
    <path d="M9 21h4" />
  </svg>
);




const Sidebar = ({ onNavigate, activeView }: { onNavigate: (path: string) => void; activeView: string; }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
        { id: 'tests', label: 'Tests', icon: FileTextIcon, path: '/admin/tests' },
        { id: 'generate', label: 'AI Generator', icon: WandSparklesIcon, path: '/admin/generate-questions' },
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
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 
                        ${activeView === item.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
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

interface DashboardStats {
  totalTests: number;
  totalAttempts: number;
  averageScore: number;
  passFailData: { pass: number; fail: number; };
}
interface RecentActivity {
    _id: string;
    studentId: { email: string };
    testId: { title: string };
    createdAt: string;
}

const StatCard = ({ title, value, icon, colorClass }: { title: string; value: string | number; icon: React.ReactNode; colorClass: string; }) => (
    <div className={`bg-black border border-gray-800 p-6 rounded-xl hover:border-${colorClass}-500 transition-colors`}>
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
            <div className={`text-${colorClass}-400`}>{icon}</div>
        </div>
        <p className="text-5xl font-bold mt-2 text-white">{value}</p>
    </div>
);





function AdminPage() {
    const router = useRouter();
    const [activeView, setActiveView] = useState('dashboard');
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            try {
                const [statsRes, activityRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard-stats`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/recent-activity`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                if (!statsRes.ok) throw new Error('Failed to fetch dashboard stats.');
                if (!activityRes.ok) throw new Error('Failed to fetch recent activity.');
                
                setStats(await statsRes.json());
                setRecentActivity(await activityRes.json());

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const pieData = stats ? [{ name: 'Pass', value: stats.passFailData.pass }, { name: 'Fail', value: stats.passFailData.fail }] : [];
    const COLORS = ['#00C49F', '#FF8042'];


   const handleLogout = () => {
        localStorage.removeItem('token'); 
        router.push('/');
    };



    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
           <Sidebar 
                onNavigate={(path) => { 
                    setActiveView(path.split('/').pop() || 'dashboard'); 
                    router.push(path); 
                }} 
                activeView={activeView} 
            />

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{getGreeting()}, Admin</h1>
                        <p className="text-gray-400">Here's what's happening with your tests today.</p>
                    </div>
                     <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                {loading && <p>Loading dashboard...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && stats && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard title="Total Tests Created" value={stats.totalTests} icon={<FileTextIcon className="w-6 h-6"/>} colorClass="cyan" />
                            <StatCard title="Total Test Attempts" value={stats.totalAttempts} icon={<UsersIcon className="w-6 h-6"/>} colorClass="purple" />
                            <StatCard title="Average Score" value={`${stats.averageScore}%`} icon={<BarChartIcon className="w-6 h-6"/>} colorClass="green" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-black border border-gray-800 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold mb-4">Overall Pass/Fail Performance</h3>
                                {stats.totalAttempts > 0 ? (
                                    <ResponsiveContainer width="100%" height={350}>
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" 
                                                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ background: "#1a1a1a", borderColor: "#4a4a4a", borderRadius: "10px" }}/>
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : <div className="h-full flex items-center justify-center text-gray-500">No attempt data available.</div> }
                            </div>
                            
                            <div className="bg-black border border-gray-800 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                                <div className="space-y-4">
                                    {recentActivity.length > 0 ? recentActivity.map(activity => (
                                        <div key={activity._id} className="flex items-start space-x-3">
                                            <div className="bg-gray-800 p-2 rounded-full mt-1">
                                                <CheckCircleIcon className="w-4 h-4 text-green-400"/>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">
                                                    <span className="font-bold text-white">{activity.studentId.email}</span> just completed the <span className="font-bold text-cyan-400">{activity.testId.title}</span> test.
                                                </p>
                                                <p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    )) : <div className="h-full flex items-center justify-center text-gray-500">No recent activity.</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminPage;
