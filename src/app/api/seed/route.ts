import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const GET = async () => {
  try {
    // 1️⃣ 유저 생성
    const user = await prisma.user.create({
      data: {
        username: 'moon_test',
        email: 'moon@test.com',
        password: 'test1234',
      },
    })

    // 2️⃣ 영화 생성
    const movie = await prisma.movie.create({
      data: {
        tmdbId: 100,
        title: 'La La Land',
        posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
        genre: 'Drama, Romance',
      },
    })

    // 3️⃣ 리뷰 생성
    const review = await prisma.review.create({
      data: {
        userId: user.id,
        movieId: movie.id,
        rating: 5,
        comment: '감정선이 너무 아름다웠다 🎬',
        emotion: '💜 울림',
      },
    })

    return NextResponse.json({
      message: '더미 데이터 생성 완료!',
      user,
      movie,
      review,
    })
  } catch (error) {
    console.error('시드 생성 오류:', error)
    return NextResponse.json({ error: '시드 생성 실패' }, { status: 500 })
  }
}
