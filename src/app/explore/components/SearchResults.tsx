import Image from "next/image"

export default function SearchResults({ query, data }: { query: string, data: any }) {
  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="text-violet-300 text-lg mb-4">“{query}” 검색 결과</h2>
      {data.results.length === 0 ? (
        <p className="text-gray-500 text-center w-full mt-10 animate-fadeIn">
          검색 결과가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
          {data.results.map((movie: any) => (
            <div key={movie.id} className="flex flex-col items-center group">
              <div className="relative w-[120px] h-[180px] rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-center mt-2 text-gray-300 group-hover:text-violet-300 transition">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
