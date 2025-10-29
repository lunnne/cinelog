import React from 'react';
import { getPopularMovies } from '@/lib/tmdb';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default async function MovieSection() {
  const data = await getPopularMovies();
  console.log(data);
  const movies = data.results;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-5 px-6 text-foreground">🔥 인기 영화</h2>
      <div className="flex overflow-x-auto gap-5 px-6 scrollbar-hide">
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
