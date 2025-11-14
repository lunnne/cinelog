'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });

    if (res?.error) {
      setError('Invalid email or password');
      return;
    }

    window.location.href = '/';
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#0b0b0f] text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[320px] bg-[#14141f] p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-2">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-[#1c1c28] border border-gray-700 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-[#1c1c28] border border-gray-700 focus:outline-none"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button type="submit" className="bg-violet-600 hover:bg-violet-700 transition-all rounded p-2 font-medium">
          Login
        </button>
      </form>
    </main>
  );
}
