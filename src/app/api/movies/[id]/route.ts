import {NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const movieId = Number(id);
  if (!movieId) {
    return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
  }
  try {
    // 1️⃣ DB에서 먼저 해당 영화 검색
    const existingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    if (existingMovie) {
      return NextResponse.json(existingMovie);
    }
    // 2️⃣ 없으면 TMDB에서 가져오기
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=ko-KR`);
    if (!tmdbRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch movie from TMDB' }, { status: 500 });
    }
    const tmdbData = await tmdbRes.json();  
    console.log(tmdbData);
    // 3️⃣ DB에 저장
    const newMovie = await prisma.movie.create({
      data: {
        id: movieId,
        title: tmdbData.title,
        overview: tmdbData.overview || '',
        posterUrl: tmdbData.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` : '',
        backdropUrl: tmdbData.backdrop_path ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}` : '',
        releaseDate: tmdbData.release_date || '',
        runtime: tmdbData.runtime || null,
        voteAverage: tmdbData.vote_average || 0,
      },
    });
    // 4️⃣ 클라이언트로 응답
    return NextResponse.json(newMovie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
