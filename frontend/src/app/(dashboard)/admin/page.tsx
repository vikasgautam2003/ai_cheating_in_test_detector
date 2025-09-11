'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

function AdminPage() {
  const router = useRouter();

  const goToTests = () => {
    router.push('/admin/tests');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">This is the Admin Page</h1>
      <button
        onClick={goToTests}
        className="bg-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-all duration-300"
      >
        Go to Tests
      </button>
    </div>
  )
}

export default AdminPage
