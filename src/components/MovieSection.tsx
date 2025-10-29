import React from 'react';
import { getPopularMovies } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import { FireFlame } from 'iconoir-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default async function MovieSection() {
  const data = await getPopularMovies();
  const movies = data.results;

  return (
    <section className="px-6 mt-10">
      <h2 className="text-xl font-semibold mb-5 px-6 text-foreground flex items-center gap-2"><FireFlame color="#7c3aed" width={24} height={24} />지금 인기 폭발 중인 영화들</h2>
      <div className="flex overflow-x-auto gap-5 px-6 scrollbar-hide pt-5 pb-12">
        {movies.map((movie: Movie, index: number) =>
          movie.poster_path ? (
          <MovieCard key={movie.id}
          title={movie.title} 
          posterPath={movie.poster_path} 
          isFirst={index === 0} />
          ) : null
        )}
      </div>
    </section>
  );
}
