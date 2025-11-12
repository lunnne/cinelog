'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl: '/' });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] px-4">
      <Card className="w-full max-w-sm p-6 bg-[#111] text-gray-100 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">🎬 Cinelog Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-gray-700 focus:ring-gray-500 text-gray-100"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-gray-700 focus:ring-gray-500 text-gray-100"
          />
          <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
            Sign In
          </Button>
        </form>
        <div className="flex items-center my-4">
          <span className="grow border-t border-gray-700"></span>
          <span className="mx-2 text-gray-500 text-sm uppercase">or</span>
          <span className="grow border-t border-gray-700"></span>
        </div>
        <div className="space-y-2">
          <Button onClick={() => signIn('google')} variant="outline" className="w-full bg-white text-black hover:bg-gray-100">
            Continue with Google
          </Button>
          {/* 나중에 Naver, Kakao 버튼 추가 가능 */}
        </div>
      </Card>
    </main>
  );
}
