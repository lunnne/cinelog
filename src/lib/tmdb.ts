const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ko-KR&page=1`,
    { next: { revalidate: 3600 } } // 1시간마다 캐싱 갱신
  );

  if (!res.ok) throw new Error('Failed to fetch movies');

  return res.json();
}
