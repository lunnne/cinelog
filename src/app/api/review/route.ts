import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


// 🎬 리뷰 생성 (POST)
export async function POST(req: Request) {
  try {
    const { userId, movieId, rating, comment, emotion } = await req.json()

    if (!userId || !movieId || !rating) {
      return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        userId,
        movieId,
        rating,
        comment,
        emotion,
      },
    })

    return NextResponse.json({ message: '리뷰가 저장되었습니다.', review }, { status: 201 })
  } catch (error) {
    console.error('리뷰 생성 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

// 🎞️ 리뷰 목록 조회 (GET)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { username: true, profileImage: true } },
        movie: { select: { title: true, posterUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('리뷰 조회 오류:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
