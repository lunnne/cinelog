import Image from "next/image";
import { emotions } from "@/lib/emotions";

interface FeedCardProps {
  title: string;
  emotion: keyof typeof emotions;
  rating: number;
  comment: string;
  poster: string;
  username: string;
}

export default function FeedCard({
  title,
  emotion,
  rating,
  comment,
  poster,
  username,
}: FeedCardProps) {
  const colorClass = emotions[emotion];

  return (
    <div
      className={`rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-border ${colorClass}`}
    >
      <Image
        src={poster}
        alt={title}
        width={70}
        height={100}
        className="rounded-lg object-cover"
      />
      <div className="flex flex-col flex-1">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground">{comment}</p>
        <p className="text-xs mt-1 text-foreground/70">by {username}</p>
        <div className="mt-2">
          {"⭐️".repeat(rating)}{" "}
          <span className="text-xs text-foreground/60">{emotion}</span>
        </div>
      </div>
    </div>
  );
}
