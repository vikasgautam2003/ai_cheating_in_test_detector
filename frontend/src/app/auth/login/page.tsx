




















'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

// --- ICONS ---
const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 
         5.373 0 12h4zm2 5.291A7.962 
         7.962 0 014 12H0c0 3.042 
         1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const AtSymbolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 12a4 4 0 10-8 0 
         4 4 0 008 0zm0 0v1.5a2.5 
         2.5 0 005 0V12a9 9 0 
         10-9 9m4.5-1.206a8.959 
         8.959 0 01-4.5 1.206"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 
         2 0 002-2v-6a2 2 0 
         00-2-2H6a2 2 0 00-2 
         2v6a2 2 0 002 2zm10-10V7a4 
         4 0 00-8 0v4h8z"
    />
  </svg>
);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid credentials');

      localStorage.setItem('token', data.token);

      if (data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/student');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
      <div className="w-full max-w-md">
        <div className="bg-black/70 border border-cyan-800 rounded-3xl shadow-2xl p-8 backdrop-blur-lg">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center space-x-2">
              <span className="bg-cyan-500 w-3 h-3 rounded-full inline-block animate-pulse"></span>
              <span>Sentinel.ai</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AtSymbolIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 bg-gray-900/70 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 bg-gray-900/70 border border-gray-700 text-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-900/40 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm">
                <p><span className="font-semibold">Login Failed:</span> {error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading && <SpinnerIcon />}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Sign Up */}
          <p className="text-center text-sm text-gray-400">
            
            <button
              onClick={() => router.push('/auth/signup')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
