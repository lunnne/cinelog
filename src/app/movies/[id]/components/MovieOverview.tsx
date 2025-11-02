'use client';
import { useState } from 'react';

interface MovieOverviewProps {
  tagline: string;
  overview: string;
}

export default function MovieOverview({ tagline, overview }: MovieOverviewProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-4">
      {/* overview */}
      {tagline && <p className="text-violet-400 text-lg sm:text-xl italic font-semibold mb-2 leading-snug">{'"' + tagline + '"'}</p>}
      <div
        className={`text-gray-300 text-sm sm:text-base leading-relaxed transition-all duration-300 ${expanded ? 'line-clamp-none' : 'line-clamp-5'}`}
      >
        {overview || '이 영화는 아직 소개가 없어요🫣'}
      </div>
      {overview && overview.length > 300 && (
        <button onClick={() => setExpanded(!expanded)} className="mt-2 text-violet-400 text-sm font-medium hover:text-violet-300 transition">
          {expanded ? '접기 ▲' : '더읽기 ▼'}
        </button>
      )}
    </div>
  );
}
