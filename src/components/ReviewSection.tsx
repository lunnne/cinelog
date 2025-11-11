'use client';

import ReviewCard from './ReviewCard';
import { ChevronRight, MessageCircleMore } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReviewSection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // ✅ 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const reviews = [
    {
      posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      title: 'La La Land',
      emotion: '💜',
      rating: 5,
      comment: '감정선이 너무 아름다웠다. 음악이 여운으로 남는다.',
      userAvatar: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      userName: 'Moon',
      likes: 10,
      replies: 5,
    },
    {
      posterUrl: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
      title: 'Your Name',
      emotion: '💗',
      rating: 4,
      comment: '꿈과 현실의 교차가 이렇게 슬플 수 있을까.',
      userAvatar: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
      userName: 'Star',
      likes: 10,
      replies: 5,
    },
    {
      posterUrl: 'https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg',
      title: 'Oppenheimer',
      emotion: '💙',
      rating: 5,
      comment: '압도적이면서도 조용히 무너지는 긴장감.',
      userAvatar: 'https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg',
      userName: 'Moon',
      likes: 10,
      replies: 5,
    },
  ];

  return (
    <section className="px-6 w-full mt-6 md:mt-10">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <div className="flex items-center gap-2">
          <MessageCircleMore className="w-5 h-5 text-violet-400" />
          <h2 className="text-lg font-semibold text-gray-100">따끈한 리뷰 도착!</h2>
        </div>
        <button onClick={() => router.push('/reviews/trending')} className="text-sm text-gray-400 hover:text-violet-300 flex items-center gap-1">
          더보기 <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 💻 웹일 때 — 가로 스크롤 리스트 */}
      <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide py-5 md:py-6">
        {reviews.map((review, index) => (
          <div key={index} className="shrink-0 w-[320px] snap-start">
            <ReviewCard {...review} />
          </div>
        ))}
      </div>
    </section>
  );
}
