'use client';

import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-linear-to-b from-[#0b0b0e]/80 to-[#0b0b0e]/40 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Cinelog 타이틀 */}
        <h1 className="text-2xl font-semibold tracking-tight text-violet-300 drop-shadow-[0_0_6px_rgba(167,139,250,0.6)] select-none">Cinelog</h1>

        {/* 탐색 아이콘 */}
        <button className="p-2 rounded-full bg-white/5 hover:bg-violet-500/15 transition-all duration-300 border border-white/10">
          <Search size={20} className="text-gray-300 hover:text-violet-300 transition-colors" />
        </button>
      </div>
    </header>
  );
}
