'use client';

import { useRouter } from 'next/navigation';
import { Plus, Heart, CheckCircle, Star } from 'lucide-react';
interface ReviewActionSectionProps {
  movieId: number;
}

export default function ReviewActionSection({ movieId }: ReviewActionSectionProps) {
  const router = useRouter();
  return (
    <section className="border-y border-gray-800 mt-10 pt-6 pb-6 md:pt-8 md:pb-8 text-center">
      {/* 🎬 액션 버튼 */}
      <div className="flex justify-around gap-8 mb-8 text-gray-300">
        <button className="flex flex-col items-center gap-2 hover:text-violet-400 transition transform hover:scale-105">
          <Plus className="w-6 h-6" />
          <span className="text-sm">볼래요</span>
        </button>
        <button className="flex flex-col items-center gap-2 hover:text-violet-400 transition transform hover:scale-105">
          <Heart className="w-6 h-6" />
          <span className="text-sm">좋아요</span>
        </button>
        <button className="flex flex-col items-center gap-2 hover:text-violet-400 transition transform hover:scale-105">
          <CheckCircle className="w-6 h-6" />
          <span className="text-sm">봤어요</span>
        </button>
      </div>
      <hr className="my-8 border-gray-800" />

      {/* ⭐ 별점 */}
      <div
        className="flex justify-center gap-x-4 md:gap-x-8 gap-y-2 text-3xl text-gray-600 mb-4 cursor-pointer"
        onClick={() => router.push(`/movies/${movieId}/reviews`)}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-7 h-7 md:w-10 md:h-10 hover:text-violet-400 hover:scale-110 transition" />
        ))}
      </div>

      {/* ✍️ 리뷰 쓰러 가기 */}
      <button onClick={() => router.push(`/movies/${movieId}/reviews`)} className="mt-8 md:mt-15 cinelog-btn">
      리뷰 쓰러 가기 →
      </button>
    </section>
  );
}
