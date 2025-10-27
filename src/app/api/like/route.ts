import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 💖 좋아요 생성 (POST)
export async function POST(req: Request) {
  try {
    const { userId, reviewId } = await req.json();
    if (!userId || !reviewId) {
      return NextResponse.json({ error: 'userId와 reviewId가 필요합니다.' }, { status: 400 });
    }
    // 이미 Like가 있는지 확인
    const existingLike = await prisma.like.findFirst({
      where: { userId, reviewId },
    });
    if (existingLike) {
      return NextResponse.json({ error: '이미 좋아요가 있습니다.' }, { status: 400 });
    }
    // Like 추가
    const newLike = await prisma.like.create({
      data: { userId, reviewId },
    });
    return NextResponse.json({ message: '좋아요 완료!', newLike }, { status: 201 });
  } catch (error) {
    console.error('좋아요 생성 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 💔 Like 취소 (DELETE)
export async function DELETE(req: Request) {
  try {
    const { userId, reviewId } = await req.json();

    if (!userId || !reviewId) {
      return NextResponse.json({ error: 'userId와 reviewId가 필요합니다.' }, { status: 400 });
    }

    await prisma.like.deleteMany({
      where: { userId, reviewId },
    });

    return NextResponse.json({ message: '좋아요가 취소되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Like 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
