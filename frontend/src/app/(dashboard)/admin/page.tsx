// 'use client'

// import React from 'react'
// import { useRouter } from 'next/navigation'

// function AdminPage() {
//   const router = useRouter();

//   const goToTests = () => {
//     router.push('/admin/tests');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">This is the Admin Page</h1>
//       <button
//         onClick={goToTests}
//         className="bg-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-all duration-300"
//       >
//         Go to Tests
//       </button>
//     </div>
//   )
// }

// export default AdminPage





'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- SVG ICONS (self-contained components for easy use) ---
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

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ onNavigate, activeView }: { onNavigate: (path: string) => void; activeView: string; }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
        { id: 'tests', label: 'Tests', icon: FileTextIcon, path: '/admin/tests' },
        { id: 'users', label: 'Users', icon: UsersIcon, path: '/admin/users' },
        { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 bg-black text-white flex flex-col p-4 border-r border-gray-800">
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
            <div className="mt-auto text-center text-gray-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Sentinel.ai</p>
                <p>All rights reserved.</p>
            </div>
        </aside>
    );
};

// --- MAIN ADMIN PAGE ---
function AdminPage() {
    const router = useRouter();
    // This state would determine which view is active.
    // In a real app, this might come from the URL.
    const [activeView, setActiveView] = useState('dashboard');

    const handleNavigation = (path: string) => {
        // Here you can set the view, but for now we'll just navigate
        // For example: setActiveView(path.split('/').pop() || 'dashboard');
        router.push(path);
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white font-sans">
            <Sidebar onNavigate={handleNavigation} activeView={activeView} />
            
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-400">Welcome back, Admin. Here's your overview.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Placeholder for future buttons */}
                        <div className="w-32 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
                         <div className="w-10 h-10 bg-gray-800 rounded-full animate-pulse"></div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="space-y-8">
                    {/* Placeholder for Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-black border border-gray-800 p-6 rounded-xl h-36 animate-pulse"></div>
                        <div className="bg-black border border-gray-800 p-6 rounded-xl h-36 animate-pulse"></div>
                        <div className="bg-black border border-gray-800 p-6 rounded-xl h-36 animate-pulse"></div>
                        <div className="bg-black border border-gray-800 p-6 rounded-xl h-36 animate-pulse"></div>
                    </div>

                    {/* Placeholder for larger charts or tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* A larger placeholder for a chart */}
                        <div className="lg:col-span-2 bg-black border border-gray-800 p-6 rounded-xl h-80 animate-pulse">
                             {/* Intentionally left blank for a future chart */}
                        </div>
                        {/* A smaller placeholder for recent activity */}
                        <div className="bg-black border border-gray-800 p-6 rounded-xl h-80 animate-pulse">
                            {/* Intentionally left blank for a future activity feed */}
                        </div>
                    </div>

                    {/* Placeholder for a full-width data table */}
                    <div className="bg-black border border-gray-800 rounded-xl p-6 h-96 animate-pulse">
                        {/* Intentionally left blank for a future data table */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminPage;
