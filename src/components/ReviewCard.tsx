"use client";

import Image from "next/image";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

interface ReviewCardProps {
  posterUrl: string;
  title: string;
  emotion: string; // 💜 💛 💙 💚 ...
  rating: number;
  comment: string;
  userAvatar: string;
  userName: string;
  likes: number;
  replies: number;
}

export default function ReviewCard({
  posterUrl,
  title,
  emotion,
  rating,
  comment,
  userAvatar,
  userName,
  likes,
  replies,
}: ReviewCardProps) {
  return (
    <div className="glass w-full max-w-md rounded-2xl p-4 shadow-md transition hover:shadow-[0_0_15px_rgba(180,180,255,0.15)]">
    {/* 유저 정보 */}
    <div className="flex items-center gap-2 mb-3">
      <Image
        src={userAvatar}
        alt={userName}
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-sm font-medium text-gray-200">{userName}</span>
    </div>
<hr className="my-2 border-white/10" />
    {/* 영화 정보 */}
    <div className="flex gap-3">
      <Image
        src={posterUrl}
        alt={title}
        width={60}
        height={85}
        className="rounded-md object-cover"
      />

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-gray-100">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{comment}</p>
        </div>

        {/* 별점 */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>

    {/* 좋아요 & 댓글 */}
    <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
      <div className="flex items-center gap-1">
        <ThumbsUp className="w-4 h-4" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle className="w-4 h-4" />
        <span>{replies}</span>
      </div>
    </div>
  </div>
  );
}
