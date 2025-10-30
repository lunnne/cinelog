import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  isFirst?: boolean; // 첫 번째 카드일 때 priority 적용
}

export default function MovieCard({ id, title, posterPath, isFirst }: MovieCardProps) {
  return (
    <Link href={`/movies/${id}`} className="group block">
      <div className="relative w-[150px] h-[225px] shrink-0 text-center ">
        <div
          className="relative w-full h-full overflow-hidden rounded-2xl 
                   border border-white/10 backdrop-blur-xl 
                   bg-linear-to-t from-[#0b0b0e]/90 to-[#0b0b0e]/40 
                   shadow-[0_-4px_30px_rgba(0,0,0,0.5)] 
                   transition-all duration-300 hover:scale-[1.03] 
                   hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            fill
            priority={isFirst} // ✅ 첫 번째 카드만 priority 적용
            sizes="(max-width: 768px) 150px, 200px" // ✅ 반응형 크기 지정
            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <p className="mt-2 text-sm font-medium text-foreground truncate">{title}</p>
      </div>
    </Link>
  );
}
