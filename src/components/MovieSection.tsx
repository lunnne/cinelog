import React from 'react';
import { getPopularMovies } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import { FireFlame } from 'iconoir-react';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
}

export default async function MovieSection() {
  const data = await getPopularMovies();
  const movies = data.results;

  return (
    <section className="px-6 mt-10">
      <h2 className="text-lg font-semibold md:mb-5 mb-2 text-foreground flex items-center gap-2">
        <FireFlame color="#7c3aed" className="w-5 h-5 text-violet-400" />
        지금 인기 폭발 중인 영화들
      </h2>
      <div className="flex overflow-x-auto gap-5 scrollbar-hide pt-5 pb-12">
        {movies.map((movie: MovieCardProps) =>
          movie.poster_path ? <MovieCard key={movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path} /> : null
        )}
      </div>
    </section>
  );
}
