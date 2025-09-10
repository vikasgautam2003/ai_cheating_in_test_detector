// 'use client'

// import { useRouter } from 'next/router';
// import { useState, FormEvent }  from 'react';


// export default function LoginPage(){

//     const router = useRouter();

//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');

//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);
    


//     try{

//         const response = await fetch('https://localhost:3000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();

//         if(!response.ok) {
//             throw new Error(data.message || 'Something went wrong');
//         }

//         if(data.token){
//             localStorage.setItem('token', data.token);
//         }

//         router.push('/dashboard/student');


//     } catch (err: any) {
//         setError(err.message);
//     } finally {
//         setIsLoading(false);
//     }

//     }

// };



'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid credentials');

      localStorage.setItem('token', data.token);
      router.push('/student');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2 rounded">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
