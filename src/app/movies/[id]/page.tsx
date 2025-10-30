"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  overview: string;
  releaseDate: string;
  runtime?: number;
  voteAverage: number;
  genres?: { id: number; name: string }[];
}

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
 
  console.log(id);


  useEffect(() => {
    async function fetchMovie() {
      try {
        // ✅ 너의 프로젝트용 API (cinelog)
        const res = await fetch(`${baseUrl}/api/movies/${id}`); // <-- 로컬 백엔드 호출
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-400">
        Movie not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-gray-100">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
      src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover opacity-40 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/80 to-black" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-20 flex flex-col md:flex-row gap-10 items-start">
        {/* 포스터 */}
        <div className="relative w-full md:w-[280px] aspect-2/3 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={`https://image.tmdb.org/t/original/${movie.posterUrl}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex-1 flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {movie.title}
          </h1>

          <p className="text-gray-400 text-sm">
            {movie.releaseDate?.slice(0, 4)} ·{" "}
            {movie.genres?.map((g) => g.name).join(", ")}{" "}
            {movie.runtime ? `${movie.runtime}분` : ""}
          </p>

          {/* 별점 */}
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-semibold">
           { movie.voteAverage?.toFixed(1) ?? "N/A"}
            </span>
          </div>

          {/* 줄거리 */}
          <p className="text-gray-300 mt-4 leading-relaxed">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
}