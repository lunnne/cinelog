import Image from 'next/image';
import { Play } from 'lucide-react';
import MovieOverview from './MovieOverview';

interface MovieContentsProps {
  tagline: string;
  overview: string;
  title: string;
  originalTitle: string;
  releaseDate: string;
  runtime: number;
  genres: string[];
  posterUrl: string;
}
export default function MovieContents({ title, originalTitle, releaseDate, runtime, genres, posterUrl, tagline, overview }: MovieContentsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-row gap-4 items-start">
          <div className="flex-1 space-y-2 md:space-y-4 py-2">
            {/* 타이틀 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h1>
            {originalTitle && <p className="text-gray-400 text-xs sm:text-sm italic">{originalTitle}</p>}
            <p className="text-xs sm:text-sm text-gray-400">
              {releaseDate?.slice(0, 4)} · {runtime ? `${runtime}분` : 'N/A'}
            </p>
            {/* 장르 */}
            <div className="flex flex-wrap gap-2 mt-1">
              {genres?.map((g) => (
                <span key={g} className="px-2 py-0.5 text-xs md:text-sm rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300">
                  {g}
                </span>
              ))}
            </div>
            {/* 트레일러 버튼 */}
            <button className="flex items-center gap-2 px-4 py-2 mt-5 bg-violet-600/20 hover:bg-violet-600/40 rounded-lg border border-violet-500/30 text-sm text-violet-300 transition">
              <Play className="w-4 h-4" />
              TRAILER
            </button>
          </div>

          {/* 🎞️ 오른쪽 포스터 */}
          <div className="relative shrink-0 w-[120px] h-[180px] sm:w-[150px] sm:h-[225px] md:w-[180px] md:h-[270px] rounded-xl overflow-hidden shadow-lg">
            <Image src={posterUrl || '/fallback.jpg'} alt={title} fill className="object-cover" />
          </div>
        </div>
        <MovieOverview tagline={tagline} overview={overview} />
      </div>
    </div>
  );
}
