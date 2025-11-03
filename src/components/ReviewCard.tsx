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
      className="
        relative w-[260px] min-w-[260px] snap-center overflow-hidden rounded-2xl
        p-3 md:p-4 flex flex-col gap-2
        bg-[rgba(20,20,25,0.45)] backdrop-blur-xl
        border border-[rgba(120,90,255,0.25)]
        shadow-[0_8px_30px_rgba(0,0,0,0.6)]
        transition-all duration-500
        hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]
        before:absolute before:inset-0
        before:rounded-2xl before:pointer-events-none
        before:border before:border-[rgba(180,160,255,0.25)]
        before:shadow-[inset_0_0_20px_rgba(124,58,237,0.2)]
        before:opacity-70
      "
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
      <h3 className="mt-2 text-sm md:text-base font-semibold text-foreground truncate">{title}</h3>

      {/* 별점 */}
      <div className="flex gap-1 text-[#e2b714] drop-shadow-[0_0_6px_rgba(226,183,20,0.15)]">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-[#e2b714] fill-current" : "text-gray-600"}
          />
        ))}
      </div>

      {/* 코멘트 */}
      <p className="text-sm text-gray-300 mt-1 line-clamp-2 italic">“{comment}”</p>

      {/* 작성자 */}
      {user && (
        <span className="text-xs text-gray-400 mt-1">
          by <span className="text-gray-200 font-medium">{user}</span>
        </span>
      )}
    </div>
  );
}
