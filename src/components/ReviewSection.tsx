"use client";

import ReviewCard from "./ReviewCard";

export default function ReviewSection() {
  const reviews = [
    {
      posterUrl:
        "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
      title: "La La Land",
      emotion: "💜",
      rating: 5,
      comment: "감정선이 너무 아름다웠다. 음악이 여운으로 남는다.",
      user: "Moon",
    },
    {
      posterUrl:
        "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
      title: "Your Name",
      emotion: "💗",
      rating: 4,
      comment: "꿈과 현실의 교차가 이렇게 슬플 수 있을까.",
      user: "Star",
    },
    {
      posterUrl:
        "https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg",
      title: "Oppenheimer",
      emotion: "💙",
      rating: 5,
      comment: "압도적이면서도 조용히 무너지는 긴장감.",
      user: "Moon",
    },
  ];

  return (
    <section className="px-6 mt-10">
      <h2 className="text-xl font-semibold mb-5 px-6 text-foreground">🎞 최근 리뷰</h2>
      <div className="flex gap-5 px-6 overflow-x-auto snap-x scrollbar-hide pb-4">
        {reviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
    </section>
  );
}
