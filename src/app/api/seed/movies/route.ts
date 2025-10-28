import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const GET = async () => {
  try {
    const movies = [
      {
        tmdbId: 238,
        title: 'The Godfather',
        posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
        genre: 'Crime, Drama',
        releaseDate: new Date('1972-03-14'),
      },
      {
        tmdbId: 680,
        title: 'Pulp Fiction',
        posterUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        genre: 'Crime, Drama',
        releaseDate: new Date('1994-09-10'),
      },
      {
        tmdbId: 550,
        title: 'Fight Club',
        posterUrl: 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
        genre: 'Drama',
        releaseDate: new Date('1999-10-15'),
      },
      {
        tmdbId: 515042,
        title: 'The Green Book',
        posterUrl: 'https://image.tmdb.org/t/p/w500/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg',
        genre: 'Drama, Biography',
        releaseDate: new Date('2018-11-16'),
      },
      {
        tmdbId: 872585,
        title: 'Oppenheimer',
        posterUrl: 'https://image.tmdb.org/t/p/w500/bAFmcr0dk9N0Zl8KqjJmB1YtZ8A.jpg',
        genre: 'History, Drama',
        releaseDate: new Date('2023-07-21'),
      },
    ]

    const result = await prisma.movie.createMany({
      data: movies,
      skipDuplicates: true, // 같은 tmdbId면 중복 삽입 방지
    })

    return NextResponse.json({ message: '더미 영화 데이터 생성 완료 🎬', result })
  } catch (error) {
    console.error('영화 데이터 생성 오류:', error)
    return NextResponse.json({ error: '영화 데이터 생성 실패' }, { status: 500 })
  }
}   