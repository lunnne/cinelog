'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReviewActionSection from './components/ReviewActionSection';
import MovieContents from './components/MovieContents';
import MovieHeader from './components/MovieHeader';
import Header from '@/components/Header';

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
    <>
      <Header />
      <div className="relative w-full min-h-screen bg-linear-to-b from-[#0a0a0f] via-[#0b0b14] to-[#0d0d19] text-gray-100">
        <MovieHeader backdropUrl={movie.backdropUrl} title={movie.title} />
        <div className="relative z-10 max-w-5xl mx-auto px-5 -mt-28 sm:-mt-36 pb-20">
          <MovieContents
            title={movie.title}
            originalTitle={movie.originalTitle}
            releaseDate={movie.releaseDate}
            runtime={movie.runtime}
            genres={movie.genres}
            posterUrl={movie.posterUrl}
            tagline={movie.tagline}
            overview={movie.overview}
          />
          <ReviewActionSection movieId={movie.id} />
        </div>
      </div>
    </>
  );
}
