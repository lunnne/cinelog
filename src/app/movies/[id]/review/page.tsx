'use client';

import Image from 'next/image';
import ReviewHeader from '@/app/movies/[id]/components/ReviewHeader';
import ReviewForm from '@/app/review/ReviewForm';
import { notFound } from 'next/navigation';

export default function ReviewPage({ params }: { params: { id: string } }) {

  const movie = {
    title: '노인을 위한 나라는 없다',
    posterUrl:
      'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1935',
  };


  return (
    <>
      <ReviewHeader />
      <div className=" bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] text-gray-100 px-6 pt-20 py-10 flex flex-col items-center">
        <div className="max-w-lg w-full flex flex-col items-center gap-6">
          {/* 🎞️ 영화 포스터 */}
          <div className="w-[125px] h-[180px] md:w-[200px] md:h-[300px] md:mt-8 relative rounded-lg overflow-hidden shadow-lg">
            <Image src={movie.posterUrl} alt={movie.title} fill className="object-cover" priority />
          </div>

          {/* 🎬 제목 */}
          <h1 className="text-lg md:text-2xl md:m-4 font-semibold text-white text-center">{movie.title}</h1>

        <ReviewForm movie={movie} />
        </div>
      </div>
    </>
  );
}
