'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onMovieSelect?: (movie: any) => void; // 리뷰쓰기 페이지에서 사용될 prop
}

export default function SearchBar({ onMovieSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length < 2) return setResults([]);
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setResults(data.results.slice(0, 5));
    };
    const delay = setTimeout(fetchMovies, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    // 리뷰 쓰기 페이지에서는 onMovieSelect로 movie를 선택할 수 있게 처리
    if (onMovieSelect) {
      const selectedMovie = results.find((movie) => movie.title === query);
      if (selectedMovie) {
        onMovieSelect(selectedMovie);
      }
      setIsOpen(false);
    } else {
      // 탐색 페이지에서는 바로 router.push
      router.push(`/explore?query=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] focus-within:border-violet-400/40 transition">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(e.target.value.length > 0);
            }}
            placeholder="영화 제목을 입력하세요..."
            className="w-full bg-transparent text-gray-100 outline-none px-2 placeholder:text-gray-500 text-sm"
          />
        </div>

        {/* 자동완성 드롭다운 */}
        {isOpen && results.length > 0 && (
          <ul className="absolute w-full mt-2 bg-[#12121f]/95 border border-violet-400/20 rounded-xl shadow-lg overflow-hidden backdrop-blur-lg animate-fadeIn z-50">
            {results.map((movie) => (
              <li
                key={movie.id}
                onClick={() => {
                  if (onMovieSelect) {
                    onMovieSelect(movie);
                  } else {
                    router.push(`/explore?query=${encodeURIComponent(movie.title)}`);
                  }
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm text-gray-300 hover:bg-violet-500/20 cursor-pointer transition-colors"
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </form>
    );
  }
