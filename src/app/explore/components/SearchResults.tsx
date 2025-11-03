import Image from 'next/image';

export default function SearchResults({ results }: { results: any[] }) {
  if(results.length === 0) 
    return <p className="text-gray-400 text-sm text-center py-4">검색 결과가 없습니다.</p>

  return (
    <ul className="max-h-[400px] overflow-y-auto divide-y divide-white/10">
      {results.map((movie) => (
        <li key={movie.id} className="flex items-center gap-4 p-3 hover:bg-violet-500/10 cursor-pointer transition">
          <div className="relative w-[40px] h-[60px] rounded-md overflow-hidden shrink-0">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "/no-image.png"}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-100 font-medium text-sm">{movie.title}</p>
            <span className="text-xs text-gray-500">{movie.release_date?.slice(0, 4) || "연도 미상"}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}