// 'use client'

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// const ArrowUpRightIcon = ({ className }: { className?: string }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg>
// );

// const FileTextIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
// );

// interface Attempt {
//     _id: string;
//     studentId: { email: string };
//     testId: { title: string };
//     score: number;
//     totalMarks: number;
//     fatalStrikes: number;
//     suspicionScore: number;
//     createdAt: string;
// }

// const SkeletonLoader = () => (
//     <div className="bg-black border border-gray-800 rounded-xl p-6 animate-pulse">
//         <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//                 <div key={i} className="flex items-center space-x-4 p-4">
//                     <div className="h-4 bg-gray-700 rounded w-1/6"></div>
//                     <div className="h-4 bg-gray-700 rounded w-1/6"></div>
//                     <div className="h-4 bg-gray-700 rounded w-1/12"></div>
//                     <div className="h-4 bg-gray-700 rounded w-1/12"></div>
//                     <div className="h-4 bg-gray-700 rounded w-1/12"></div>
//                     <div className="h-4 bg-gray-700 rounded w-1/6"></div>
//                     <div className="h-4 bg-gray-700 rounded w-1/12"></div>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// export default function AllAttemptsPage() {
//     const [attempts, setAttempts] = useState<Attempt[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchAttempts = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const res = await fetch('http://localhost:5000/api/admin/attempts', {
//                     headers: { 'Authorization': `Bearer ${token}` },
//                 });
//                 if (!res.ok) throw new Error('Failed to fetch attempts.');
//                 const data: Attempt[] = await res.json();
//                 setAttempts(data);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         setTimeout(fetchAttempts, 500); 
//     }, []);

//     if (loading) {
//         return (
//             <div>
//                 <header className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold">Student Attempts</h1>
//                 </header>
//                 <SkeletonLoader />
//             </div>
//         );
//     }

//     if (error) {
//         return <p className="text-red-500">Error: {error}</p>;
//     }

//     return (
//         <div>
//             <header className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">All Student Attempts</h1>
//                 <p className="text-gray-400">{attempts.length} total attempts found</p>
//             </header>
//             <div className="bg-black border border-gray-800 rounded-xl">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead className="border-b border-gray-800">
//                             <tr>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider">Student</th>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider">Test</th>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider">Score</th>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider text-center">Fatal Strikes</th>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider text-center">Suspicion</th>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider">Date</th>
//                                 <th className="p-4 text-xs uppercase text-gray-400 tracking-wider">Report</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {attempts.map(attempt => (
//                                 <tr key={attempt._id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50 transition-colors">
//                                     <td className="p-4 font-medium">{attempt.studentId.email}</td>
//                                     <td className="p-4 text-gray-400">{attempt.testId.title}</td>
//                                     <td className="p-4 font-mono">{attempt.score} / {attempt.totalMarks}</td>
//                                     <td className="p-4 text-center">
//                                         <span className={`px-2 py-1 text-xs font-bold rounded-full ${attempt.fatalStrikes > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
//                                             {attempt.fatalStrikes}
//                                         </span>
//                                     </td>
//                                     <td className="p-4 text-center">
//                                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${attempt.suspicionScore > 5 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-300'}`}>
//                                             {attempt.suspicionScore} / 20
//                                         </span>
//                                     </td>
//                                     <td className="p-4 text-gray-400">{new Date(attempt.createdAt).toLocaleDateString()}</td>
//                                     <td className="p-4">
//                                         <Link href={`/results/${attempt._id}`} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300" target="_blank">
//                                             <span>View</span>
//                                             <ArrowUpRightIcon className="w-4 h-4" />
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     {attempts.length === 0 && 
//                         <div className="text-center p-12 text-gray-500">
//                             <FileTextIcon className="w-12 h-12 mx-auto mb-4" />
//                             <h3 className="text-lg font-semibold">No Student Attempts Found</h3>
//                             <p className="text-sm">When students complete tests, their attempts will appear here.</p>
//                         </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// }











'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7"height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);


const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const WandSparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 13-1-1L15 6l1-1L22 13zM10.5 10.5 8 8 2 14l6 6 2.5-2.5M14 14l6-6"/><path d="m10.5 10.5 2.5 2.5"/><path d="m14 14 2.5 2.5"/><path d="m6 6 3 3"/><path d="m3 3 3 3"/><path d="M19 6l-3 3"/></svg>
);


interface Attempt {
  _id: string;
  studentId: { email: string };
  testId: { title: string };
  score: number;
  totalMarks: number;
  fatalStrikes: number;
  suspicionScore: number;
  createdAt: string;
}

const SkeletonLoader = () => (
  <div className="bg-black border border-gray-800 rounded-xl p-6 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4">
        <div className="h-4 bg-gray-700 rounded w-1/6"></div>
        <div className="h-4 bg-gray-700 rounded w-1/6"></div>
        <div className="h-4 bg-gray-700 rounded w-1/12"></div>
        <div className="h-4 bg-gray-700 rounded w-1/12"></div>
        <div className="h-4 bg-gray-700 rounded w-1/12"></div>
        <div className="h-4 bg-gray-700 rounded w-1/6"></div>
        <div className="h-4 bg-gray-700 rounded w-1/12"></div>
      </div>
    ))}
  </div>
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
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${activeView === item.id ? 'bg-gray-800' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default function AdminAttemptsPage() {
  const router = useRouter();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('attempts');

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/attempts`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch attempts.');
        const data: Attempt[] = await res.json();
        setAttempts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(fetchAttempts, 500);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar onNavigate={handleNavigation} activeView={activeView} />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Student Attempts</h1>
          <p className="text-gray-400">{attempts.length} total attempts found</p>
        </header>

        {loading ? <SkeletonLoader /> : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="bg-black border border-gray-800 rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Student Email</th>
                  <th className="px-6 py-3">Test Title</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Total Marks</th>
                  <th className="px-6 py-3">Fatal Strikes</th>
                  <th className="px-6 py-3">Suspicion Score</th>
                  <th className="px-6 py-3">Attempted At</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a, i) => (
                  <tr key={a._id} className="border-b border-gray-800 hover:bg-gray-800">
                    <td className="px-6 py-3">{i + 1}</td>
                    <td className="px-6 py-3">{a.studentId.email}</td>
                    <td className="px-6 py-3">{a.testId.title}</td>
                    <td className="px-6 py-3">{a.score}</td>
                    <td className="px-6 py-3">{a.totalMarks}</td>
                    <td className="px-6 py-3">{a.fatalStrikes}</td>
                    <td className="px-6 py-3">{a.suspicionScore}</td>
                    <td className="px-6 py-3">{new Date(a.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
