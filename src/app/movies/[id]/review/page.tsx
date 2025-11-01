'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Calendar } from 'lucide-react';
import ReviewHeader from '@/components/ReviewHeader';

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  // 나중에 실제 데이터로 교체 (fetch movie info)
  const movie = {
    title: 'No Country for Old Men',
    posterUrl:
      'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1935',
  };

  const handleSubmit = async () => {
    if (!rating || !comment) return alert('별점과 리뷰를 입력해주세요.');

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: id, rating, comment, watchedDate: date }),
    });

    if (res.ok) router.push(`/movies/${id}`);
    else alert('리뷰 저장 중 오류가 발생했습니다.');
  };

  return (
    <>
      <ReviewHeader />
      <div className="min-h-screen bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] text-gray-100 px-6 py-10 flex flex-col items-center">
        <div className="max-w-md w-full flex flex-col items-center gap-6">
          {/* 🎞️ 영화 포스터 */}
          <div className="w-[120px] h-[180px] relative rounded-lg overflow-hidden shadow-lg">
            <Image src={movie.posterUrl} alt={movie.title} fill className="object-cover" priority />
          </div>

          {/* 🎬 제목 */}
          <h1 className="text-xl font-semibold text-white text-center">{movie.title}</h1>

          {/* 📅 날짜 선택 */}
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Calendar className="w-4 h-4" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent border-b border-gray-700 focus:border-violet-400 outline-none text-sm text-gray-300"
            />
          </div>

          {/* ⭐ 별점 선택 */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                onClick={() => setRating(i + 1)}
                className={`w-8 h-8 cursor-pointer transition ${
                  i < rating ? 'text-violet-400 fill-violet-400' : 'text-gray-600 hover:text-violet-300'
                }`}
              />
            ))}
          </div>

          {/* 💭 리뷰 작성 */}
          <textarea
            placeholder="이 영화에 대한 당신의 감상을 적어보세요..."
            className="w-full h-40 bg-white/5 border border-violet-400/20 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-violet-400/50 resize-none backdrop-blur-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* 💾 저장 버튼 */}
          <button className="cinelog-btn" onClick={handleSubmit}>
            Cinelog 남기기 →
          </button>

          {/* ↩️ 뒤로가기 */}
          <button onClick={() => router.back()} className="mt-4 text-sm text-gray-400 hover:text-violet-300 transition">
            ← 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
