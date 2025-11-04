"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  title: string;
  content: string;
  rating: number;
}

export default function ReviewCard({ title, content, rating }: ReviewCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative p-5 rounded-2xl border transition-all duration-500
        ${hovered
          ? "border-accent/50 shadow-[0_0_35px_rgba(124,58,237,0.25)] scale-[1.02]"
          : "border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"}
        bg-linear-to-br from-[#101012]/70 to-[#0a0a0c]/40 backdrop-blur-xl
      `}
    >
      {/* 부드러운 글래스 빛 테두리 효과 */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />

      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>

      {/* 별점 영역 */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={20}
            fill={i <= rating ? "fill" : "regular"}
            className={`
              transition-all duration-300
              ${i <= rating
                ? "text-[#e2b714] drop-shadow-[0_0_8px_rgba(226,183,20,0.25)]"
                : "text-[#555]"}`}
          />
        ))}
      </div>

      {/* 리뷰 본문 */}
      <p className="text-muted text-sm leading-relaxed">
        {content}
      </p>

      {/* 보라빛 글래스 반사 효과 */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none ${
          hovered ? "opacity-20 bg-linear-to-tr from-accent/20 to-transparent" : "opacity-0"
        }`}
      />
    </div>
  );
}