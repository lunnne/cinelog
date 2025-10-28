"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewCardProps {
  posterUrl: string;
  title: string;
  emotion: string; // 💜 💛 💙 💚 ...
  rating: number;
  comment: string;
  user?: string;
}

export default function ReviewCard({
  posterUrl,
  title,
  emotion,
  rating,
  comment,
  user,
}: ReviewCardProps) {
  return (
    <div
      className="glass relative w-[260px] min-w-[260px] snap-center overflow-hidden rounded-2xl p-4 flex flex-col gap-2 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]"
    >
      {/* 포스터 */}
      <div className="relative w-full h-[150px] rounded-lg overflow-hidden">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* 감정 아이콘 */}
        <div className="absolute top-2 right-2 text-xl">{emotion}</div>
      </div>

      {/* 영화 제목 */}
      <h3 className="mt-2 text-base font-semibold text-white truncate">{title}</h3>

      {/* 별점 */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
          />
        ))}
      </div>

      {/* 코멘트 */}
      <p className="text-sm text-gray-300 mt-1 line-clamp-2 italic">“{comment}”</p>

      {/* 작성자 */}
      {user && (
        <span className="text-xs text-muted-foreground mt-1">
          by <span className="text-gray-200 font-medium">{user}</span>
        </span>
      )}
    </div>
  );
}
