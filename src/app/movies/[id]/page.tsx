'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Play, Star } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  tagline: string;
  genres: string[];
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  runtime: number;
  voteAverage: number;
  productionCompanies: string[];
  productionCountries: string[];
  spokenLanguages: string[];
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="flex items-center justify-center h-screen text-gray-400">Loading...</div>;

  return (
    <div className="relative w-full min-h-screen bg-linear-to-b from-[#0a0a0f] via-[#0b0b14] to-[#0d0d19] text-gray-100">
      {/* 🖼️ 배경 이미지 */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <Image src={movie.backdropUrl || '/fallback.jpg'} alt={movie.title} fill className="object-cover" priority />
        {/* 🔮 블러 + 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-[#0a0a0f] backdrop-blur-[1px]" />
      </div>

      {/* 🎬 콘텐츠 영역 */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 -mt-28 sm:-mt-36 pb-20">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* 왼쪽 텍스트 영역 */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-row gap-4 items-start">
              <div className="flex-1 space-y-2 md:space-y-4">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">{movie.title}</h1>

                {movie.originalTitle && <p className="text-gray-400 text-xs sm:text-sm italic">{movie.originalTitle}</p>}

                <p className="text-xs sm:text-sm text-gray-400">
                  {movie.releaseDate?.slice(0, 4)} · {movie.runtime ? `${movie.runtime}분` : 'N/A'}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {movie.genres?.map((g) => (
                    <span key={g} className="px-2 py-0.5 text-xs rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300">
                      {g}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 mt-2 bg-violet-600/20 hover:bg-violet-600/40 rounded-lg border border-violet-500/30 text-sm text-violet-300 transition">
                  <Play className="w-4 h-4" />
                  TRAILER
                </button>
              </div>

              {/* 🎞️ 오른쪽 포스터 */}
              <div className="relative shrink-0 w-[120px] h-[180px] sm:w-[150px] sm:h-[225px] md:w-[180px] md:h-[270px] rounded-xl overflow-hidden shadow-lg">
                <Image src={movie.posterUrl || '/fallback.jpg'} alt={movie.title} fill className="object-cover" />
              </div>
            </div>
            {/* Tagline + Overview (연결형)
<div className="mt-4">
  <p className="text-sm sm:text-base leading-relaxed text-gray-300">
    {movie.tagline && (
      <span className="text-violet-400 text-xl sm:text-2xl font-semibold mr-2">
        {"\"" + movie.tagline + "\""}
      </span>
    )}
    {movie.overview || "No description available."}
  </p>
</div> */}
            <div className="mt-4">
              {movie.tagline && <p className="text-violet-400 text-lg sm:text-xl italic font-semibold mb-2 leading-snug">{'"' + movie.tagline + '"'}</p>}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{movie.overview || 'No description available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
