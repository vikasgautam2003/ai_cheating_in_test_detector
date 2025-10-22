'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const UsersIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 21v-2a4 4 0 0 0-3-3.87"/><path d="M7 21v-2a4 4 0 0 1 3-3.87"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const WandSparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 13-1-1L15 6l1-1L22 13zM10.5 10.5 8 8 2 14l6 6 2.5-2.5M14 14l6-6"/><path d="m10.5 10.5 2.5 2.5"/><path d="m14 14 2.5 2.5"/><path d="m6 6 3 3"/><path d="m3 3 3 3"/><path d="M19 6l-3 3"/></svg>
);
const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-4v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const CopyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
    const activeView = 'generate';
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
        </aside>
    );
};

export default function AIQuestionGeneratorPage() {
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [difficulty, setDifficulty] = useState('medium');
    const [generatedJson, setGeneratedJson] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleGenerate = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setGeneratedJson(null);
        setCopySuccess(false);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:5000/api/chatbot/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ topic, count, difficulty }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to generate questions.');
            }
            const data = await res.json();
            setGeneratedJson(JSON.stringify(data, null, 2));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (generatedJson) {
            navigator.clipboard.writeText(generatedJson);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const handleDownload = () => {
        if (generatedJson) {
            const blob = new Blob([generatedJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const filename = `${topic.replace(/\s+/g, '_') || 'generated'}_questions.json`;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            <Sidebar />
            

            <main className="flex-1 p-10 overflow-y-auto bg-gray-900">
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-white">AI Question Generator</h1>
        <p className="text-gray-400 text-sm md:text-base">Generate custom questions for your tests with ease.</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-md shadow-cyan-500/20 transition hover:shadow-cyan-500/40 ">
            <h2 className="text-2xl font-semibold mb-6 text-white">Create New Questions</h2>
            <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-400 mb-2">Topic</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        placeholder="e.g., React Hooks, World War II Causes"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                </div>

                <div>
                    <label htmlFor="count" className="block text-sm font-medium text-gray-400 mb-2">Number of Questions</label>
                    <input
                        type="number"
                        id="count"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, parseInt(e.target.value)))}
                        min="1"
                        max="180"
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                </div>

                <div>
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-400 mb-2">Difficulty</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none cursor-pointer"
                    >
                        <option value="easy" className="bg-gray-800 text-gray-200">Easy</option>
                        <option value="medium" className="bg-gray-800 text-gray-200">Medium</option>
                        <option value="hard" className="bg-gray-800 text-gray-200">Hard</option>
                    </select>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <WandSparklesIcon className="w-5 h-5" />
                            <span>Generate Questions</span>
                        </>
                    )}
                </button>

                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </form>
        </div>


        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 relative shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/30 transition">
            <h2 className="text-2xl font-semibold mb-4 text-white">Generated JSON</h2>
            
            {generatedJson && (
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                        title="Copy JSON"
                    >
                        {copySuccess ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5 text-gray-300" />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                        title="Download JSON"
                    >
                        <DownloadIcon className="w-5 h-5 text-gray-300" />
                    </button>
                </div>
            )}

            <pre className="bg-gray-800/60 p-6 rounded-xl overflow-x-auto h-96 text-sm whitespace-pre-wrap text-gray-200">
                {loading 
                    ? <span className="text-gray-500">Generating questions...</span>
                    : (generatedJson || <span className="text-gray-500">Generated JSON will appear here...</span>)
                }
            </pre>
        </div>
    </div>
</main>

        </div>
    );
}
