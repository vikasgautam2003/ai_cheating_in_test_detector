// 'use client'

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";


// interface User {
//     _id: string;
//     email: string;
//     role: string;
// }

// export default function StudentDashboardPage(){
//     const router = useRouter();

//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchUser = async () => {

//             const token = localStorage.getItem('token');

//             if(!token) {
//                 router.push('/auth/login');
//                 return;
//             }

//             try {

//                 const response = await fetch('https://localhost:3000/api/users', {
//                      method: 'GET',
//                      headers: {
//                          'Content-Type': 'application/json',
//                          'Authorization': `Bearer ${token}`
//                      },
//                 });
                
                
//                 if(!response.ok) {
//                     throw new Error('Failed to fetch user');
//                 }

//                 const userData = await response.json();
//                 setUser(userData);
//             } catch (err: any) {
//                 localStorage.removeItem('token');
//                 router.push('/auth/login');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchUser();
//     }, [router]);


//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         router.push('/auth/login');
//     }

//     if(isLoading) {
//         return <div>Loading...</div>
//     }

//     if(error) {
//         return <div>Error: {error}</div>
//     }


//     return (

//         <div>
//             <p>Hello, {user?.email}</p>
//             <p>This is your protected account</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );

// }





'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  role: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/user', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
        localStorage.removeItem('token');
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <p>Hello, {user?.email}</p>
      <p>Your role: {user?.role}</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
