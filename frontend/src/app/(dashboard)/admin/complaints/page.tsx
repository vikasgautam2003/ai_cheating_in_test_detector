// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// const LayoutDashboardIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
// );
// const FileTextIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
// );
// const UsersIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
// );
// const SettingsIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.3.27.69.44 1.1.49H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
// );
// const MessageSquareIcon = ({ className }: { className?: string }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
// );

// const Sidebar = () => {
//   const navItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
//     { id: 'tests', label: 'Create Test', icon: FileTextIcon, path: '/admin/create-test' },
//     { id: 'attempts', label: 'Attempts', icon: UsersIcon, path: '/admin/attempts' },
//     { id: 'complaints', label: 'Complaints', icon: MessageSquareIcon, path: '/admin/complaints' },
//     { id: 'settings', label: 'Manage Tests', icon: SettingsIcon, path: '/admin/settings' },
//   ];
//   const activeView = 'complaints';
//   return (
//     <aside className="w-64 bg-black text-white flex-col p-4 border-r border-gray-800 hidden md:flex">
//       <div className="text-2xl font-bold text-white mb-10 flex items-center space-x-2">
//         <span className="bg-cyan-500 w-3 h-3 rounded-full"></span>
//         <span>Sentinel.ai</span>
//       </div>
//       <nav className="flex flex-col space-y-2">
//         {navItems.map(item => (
//           <Link
//             key={item.id}
//             href={item.path}
//             className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
//               activeView === item.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//             }`}
//           >
//             <item.icon className="w-5 h-5" />
//             <span className="font-medium">{item.label}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// interface Complaint {
//   _id: string;
//   studentId: { email: string };
//   attemptId: { _id: string; testId: { title: string } };
//   message: string;
//   status: 'Pending' | 'In-Progress' | 'Resolved';
//   createdAt: string;
// }

// export default function ComplaintsPage() {
//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

// /*************  ✨ Windsurf Command 🌟  *************/
//   const fetchComplaints = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('token');
//     try {
//       const res = await (await fetch('http://localhost:5000/api/admin/complaints', {
//         headers: { Authorization: `bearer ${token}` },
//       })).json();
//       const res = await fetch('http://localhost:5000/api/admin/complaints', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('Failed to fetch complaints.');
//       setComplaints(res);
//       const data: Complaint[] = await res.json();
//       setComplaints(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
// /*******  0a106ca4-f28b-430d-9329-51dc6f6935d2  *******/

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleUpdateStatus = async (complaintId: string, status: string) => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`http://localhost:5000/api/admin/complaints/${complaintId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ status }),
//       });
//       if (!res.ok) throw new Error('Failed to update status.');
//       fetchComplaints();
//     } catch (err: any) {
//       alert(`Error: ${err.message}`);
//     }
//   };

//   const StatusBadge = ({ status }: { status: string }) => {
//     const styles = {
//       Pending: 'bg-yellow-500/20 text-yellow-400',
//       'In-Progress': 'bg-blue-500/20 text-blue-400',
//       Resolved: 'bg-green-500/20 text-green-400',
//     };
//     return (
//       <span className={`px-2 py-1 text-xs font-bold rounded-full ${styles[status] || 'bg-gray-500/20 text-gray-400'}`}>
//         {status}
//       </span>
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white font-sans">
//       <Sidebar />
//       <main className="flex-1 p-8 overflow-y-auto">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Manage Complaints</h1>
//         </header>
//         {loading && <p className="text-gray-400">Loading complaints...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}
//         {!loading && !error && (
//           <div className="bg-black border border-gray-800 rounded-xl p-6">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead className="border-b border-gray-700">
//                   <tr>
//                     <th className="p-4 text-xs uppercase text-gray-400">Student</th>
//                     <th className="p-4 text-xs uppercase text-gray-400">Test</th>
//                     <th className="p-4 text-xs uppercase text-gray-400">Message</th>
//                     <th className="p-4 text-xs uppercase text-gray-400">Date</th>
//                     <th className="p-4 text-xs uppercase text-gray-400">Status</th>
//                     <th className="p-4 text-xs uppercase text-gray-400">Update Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {complaints.map(complaint => (
//                     <tr
//                       key={complaint._id}
//                       className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50"
//                     >
//                       <td className="p-4 font-medium">{complaint.studentId.email}</td>
//                       <td className="p-4 text-gray-400">{complaint.attemptId.testId.title}</td>
//                       <td className="p-4 text-sm text-gray-300 max-w-sm truncate" title={complaint.message}>
//                         {complaint.message}
//                       </td>
//                       <td className="p-4 text-gray-400">
//                         {new Date(complaint.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="p-4">
//                         <StatusBadge status={complaint.status} />
//                       </td>
//                       <td className="p-4">
//                         <select
//                           onChange={e => handleUpdateStatus(complaint._id, e.target.value)}
//                           value={complaint.status}
//                           className="bg-gray-800 border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="In-Progress">In-Progress</option>
//                           <option value="Resolved">Resolved</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {complaints.length === 0 && (
//                 <p className="text-center p-8 text-gray-500">No complaints have been submitted.</p>
//               )}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }






















'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/******** ICON COMPONENTS ********/
const LayoutDashboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);
const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.3.27.69.44 1.1.49H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const WandSparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 13-1-1L15 6l1-1L22 13zM10.5 10.5 8 8 2 14l6 6 2.5-2.5M14 14l6-6"/><path d="m10.5 10.5 2.5 2.5"/><path d="m14 14 2.5 2.5"/><path d="m6 6 3 3"/><path d="m3 3 3 3"/><path d="M19 6l-3 3"/></svg>
);

/******** SIDEBAR ********/
const Sidebar = () => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
    { id: 'tests', label: 'Create Test', icon: FileTextIcon, path: '/admin/tests' },
    { id: 'generate', label: 'AI Generator', icon: WandSparklesIcon, path: '/admin/generate-questions' },
    { id: 'attempts', label: 'Attempts', icon: UsersIcon, path: '/admin/attempts' },
    { id: 'settings', label: 'Manage Tests', icon: SettingsIcon, path: '/admin/settings' },
      { id: 'complaints', label: 'Complaints', icon: MessageSquareIcon, path: '/admin/complaints' },
  ];
  const activeView = 'complaints';

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
              activeView === item.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
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

/******** TYPES ********/
interface Complaint {
  _id: string;
  studentId: { email: string };
  attemptId: { _id: string; testId: { title: string } };
  message: string;
  status: 'Pending' | 'In-Progress' | 'Resolved';
  createdAt: string;
}

/******** MAIN PAGE ********/
export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/complaints`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch complaints.');

      const data: Complaint[] = await res.json();
      setComplaints(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (complaintId: string, status: Complaint['status']) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/complaints/${complaintId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status.');
      fetchComplaints();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const StatusBadge = ({ status }: { status: Complaint['status'] }) => {
    const styles: Record<Complaint['status'], string> = {
      Pending: 'bg-yellow-500/20 text-yellow-400',
      'In-Progress': 'bg-blue-500/20 text-blue-400',
      Resolved: 'bg-green-500/20 text-green-400',
    };
    return (
      <span className={`px-2 py-1 text-xs font-bold rounded-full ${styles[status] || 'bg-gray-500/20 text-gray-400'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Complaints</h1>
        </header>

        {loading && <p className="text-gray-400">Loading complaints...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="p-4 text-xs uppercase text-gray-400">Student</th>
                    <th className="p-4 text-xs uppercase text-gray-400">Test</th>
                    <th className="p-4 text-xs uppercase text-gray-400">Message</th>
                    <th className="p-4 text-xs uppercase text-gray-400">Date</th>
                    <th className="p-4 text-xs uppercase text-gray-400">Status</th>
                    <th className="p-4 text-xs uppercase text-gray-400">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(complaint => (
                    <tr
                      key={complaint._id}
                      className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50"
                    >
                      <td className="p-4 font-medium">{complaint.studentId.email}</td>
                      <td className="p-4 text-gray-400">{complaint.attemptId.testId.title}</td>
                      <td className="p-4 text-sm text-gray-300 max-w-sm truncate" title={complaint.message}>
                        {complaint.message}
                      </td>
                      <td className="p-4 text-gray-400">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="p-4">
                        <select
                          onChange={e => handleUpdateStatus(complaint._id, e.target.value as Complaint['status'])}
                          value={complaint.status}
                          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In-Progress">In-Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {complaints.length === 0 && (
                <p className="text-center p-8 text-gray-500">No complaints have been submitted.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
