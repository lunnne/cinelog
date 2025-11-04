'use client';

import ReviewCard from './ReviewCard';
import { MultiBubble } from 'iconoir-react';
export default function ReviewSection() {
  const reviews = [
    {
      posterUrl: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      title: 'La La Land',
      emotion: '💜',
      rating: 5,
      comment: '감정선이 너무 아름다웠다. 음악이 여운으로 남는다.',
      userAvatar: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      userName: 'Moon',
      likes: 10,
      replies: 5,
    },
    {
      posterUrl: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
      title: 'Your Name',
      emotion: '💗',
      rating: 4,
      comment: '꿈과 현실의 교차가 이렇게 슬플 수 있을까.',
      userAvatar: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
      userName: 'Star',
      likes: 10,
      replies: 5,
    },
    {
      posterUrl: 'https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg',
      title: 'Oppenheimer',
      emotion: '💙',
      rating: 5,
      comment: '압도적이면서도 조용히 무너지는 긴장감.',
      userAvatar: 'https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg',
      userName: 'Moon',
      likes: 10,
      replies: 5,
    },
  ];

  return (
    <section className="px-6 md:mt-10 mt-5">
      <h2 className="text-lg md:text-xl font-semibold  md:px-6 md:mb-5 mb-2 px-3text-foreground flex items-center gap-2">
        <MultiBubble color="#7c3aed" width={24} height={24} />
        따끈한 리뷰 도착!
      </h2>
      <div className="flex gap-5 md:px-6 overflow-x-auto snap-x scrollbar-hide pb-6 pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap justify-center items-center ">
        {reviews.map((review, i) => (
          <ReviewCard
            key={i}
            title={review.title}
            comment={review.comment}
            rating={review.rating}
            posterUrl={review.posterUrl}
            emotion={review.emotion}
            userAvatar={review.userAvatar}
            userName={review.userName}
            likes={review.likes}
            replies={review.replies}
          />
        ))}
      </div>
    </section>
  );
}
