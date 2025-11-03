'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchResults from './SearchResults';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setResults(data.results || []);
    };
    const delay = setTimeout(fetchMovies, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="w-full relative">
      <div className="flex items-center gap-3 border border-violet-500/30 rounded-2xl bg-white/5 px-4 py-2 focus-within:border-violet-400 transition-all">
        <Search className="text-violet-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="영화 제목을 검색하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="bg-transparent border-0 text-gray-200 placeholder:text-gray-500 focus:ring-0"
        />
      </div>

      {/* 🔍 포커스 + 입력 시 결과 표시 */}
      {isFocused && query && (
        <div className="absolute top-14 left-0 w-full bg-[#12121f]/95 border border-violet-400/20 rounded-2xl shadow-xl z-10 backdrop-blur-md">
          <SearchResults results={results} />
        </div>
      )}
    </div>
  );
}
