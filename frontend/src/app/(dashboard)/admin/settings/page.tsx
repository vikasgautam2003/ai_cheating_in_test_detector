










'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16"rx="1"></rect></svg>
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



const Sidebar = () => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
        { id: 'tests', label: 'Create Test', icon: FileTextIcon, path: '/admin/tests' },
        { id: 'generate', label: 'AI Generator', icon: WandSparklesIcon, path: '/admin/generate-questions' },
        { id: 'attempts', label: 'Attempts', icon: UsersIcon, path: '/admin/attempts' },
        { id: 'settings', label: 'Manage Tests', icon: SettingsIcon, path: '/admin/settings' },
        { id: 'complaint', label: 'Complaints', icon: MessageSquareIcon, path: '/admin/complaints' }
    ];

    const activeView = 'settings';

    return (
        <aside className="w-64 bg-black text-white flex-col p-4 border-r border-gray-800 hidden md:flex">
            <div className="text-2xl font-bold text-white mb-10 flex items-center space-x-2">
                <span className="bg-cyan-500 w-3 h-3 rounded-full"></span>
                <span>Sentinel.ai</span>
            </div>
            <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <Link
                        key={item.id}
                        href={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                            activeView === item.id 
                            ? 'bg-gray-800 text-white' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Sentinel.ai</p>
            </div>
        </aside>
    );
};

interface Test {
    _id: string;
    title: string;
    duration: number;
    questions: any[];
    createdAt: string;
}

export default function SettingsPage() {
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const fetchTests = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/tests`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to fetch tests.');
            const data: Test[] = await res.json();
            setTests(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    const confirmDelete = (testId: string) => {
        setDeleteId(testId);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/tests/${deleteId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Failed to delete the test.');
            fetchTests();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setDeleteId(null);
        }
    };
    
    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Tests (Settings)</h1>
                </header>

                {loading && <p className="text-gray-400">Loading tests...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                
                {!loading && !error && (
                    <div className="bg-black border border-gray-800 rounded-xl p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-gray-700">
                                    <tr>
                                        <th className="p-4 text-xs uppercase text-gray-400">Title</th>
                                        <th className="p-4 text-xs uppercase text-gray-400">Questions</th>
                                        <th className="p-4 text-xs uppercase text-gray-400">Duration</th>
                                        <th className="p-4 text-xs uppercase text-gray-400">Created On</th>
                                        <th className="p-4 text-xs uppercase text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tests.map(test => (
                                        <tr key={test._id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 transition-colors">
                                            <td className="p-4 font-medium">{test.title}</td>
                                            <td className="p-4">{test.questions.length}</td>
                                            <td className="p-4">{test.duration} mins</td>
                                            <td className="p-4">{new Date(test.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <button onClick={() => confirmDelete(test._id)} className="text-red-500 hover:text-red-400 font-semibold">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {tests.length === 0 && <p className="text-center p-8 text-gray-500">No tests created yet.</p>}
                        </div>
                    </div>
                )}

                {deleteId && (
                   <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">

                        <div className="bg-gray-900 rounded-lg p-6 w-96">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p className="mb-6">Are you sure you want to delete this test and all its attempts? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-4">
                                <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Cancel</button>
                                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
