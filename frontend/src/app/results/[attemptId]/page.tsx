'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Result {
  score: number;
  totalMarks: number;
  testId: { title: string };
}

export default function ResultPage() {
  const router = useRouter();
  const { attemptId } = useParams();


  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!attemptId) return;
    const fetchResult = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:5000/api/results/${attemptId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not fetch results.');
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [attemptId]);

  if (loading) return <div className="text-center p-10">Loading Your Results...</div>;
  if (!result) return <div className="text-center p-10">Results not found.</div>;

  const percentage = Math.round((result.score / result.totalMarks) * 100);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-700">Test Completed!</h1>
        <h2 className="text-xl text-gray-600 mt-2 mb-6">Results for: {result.testId.title}</h2>
        
        <div className="my-8">
          <p className="text-lg">You Scored:</p>
          <p className="text-6xl font-bold text-blue-600 my-2">
            {result.score} / {result.totalMarks}
          </p>
          <p className="text-3xl font-semibold text-gray-800">{percentage}%</p>
        </div>

        <button
          onClick={() => router.push('/student')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}