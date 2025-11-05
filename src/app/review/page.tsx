'use client';
import { useState } from 'react';
import SearchBar from '@/app/explore/components/searchBar';
import ReviewForm from '@/app/review/ReviewForm';
import ReviewHeader from '@/app/movies/[id]/components/ReviewHeader';

export default function WriewPage() {
  const [movie, setMovie] = useState(null); // 선택된 영화 정보

  const handleMovieSelect = (selectedMovie: any) => {
    setMovie(selectedMovie); // 영화 정보 업데이트
  };

  return (
    <>
      <ReviewHeader />
      <div className="min-h-screen bg-background text-gray-100 px-6 pt-20 py-10 flex flex-col items-center">
        {!movie ? (
          // 영화가 없으면 검색창을 보여준다.
          <SearchBar onMovieSelect={handleMovieSelect} />
        ) : (
          // 영화가 있으면 리뷰 폼을 보여준다.
          <ReviewForm movie={movie} />
        )}
      </div>
    </>
  );
}
