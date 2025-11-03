'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReviewHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-linear-to-b from-[#0b0b0e]/80 to-[#0b0b0e]/40 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center px-6 py-4 gap-2 md:space-x-5">
        {/* 뒤로가기 */}
        <button onClick={() => router.back()} className="text-gray-300 hover:text-violet-400 transition flex items-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <p className="text-base md:text-lg font-semibold tracking-tight text-violet-300 drop-shadow-[0_0_6px_rgba(167,139,250,0.6)] select-none">
          내 리뷰 쓰기
        </p>
      </div>
    </header>
  );
}
