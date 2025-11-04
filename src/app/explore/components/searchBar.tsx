"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length < 2) return setResults([])
      const res = await fetch(`/api/search?query=${query}`)
      const data = await res.json()
      setResults(data.results.slice(0, 5))
    }
    const delay = setTimeout(fetchMovies, 300)
    return () => clearTimeout(delay)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    router.push(`/explore?query=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] focus-within:border-violet-400/40 transition">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목을 입력하세요..."
          className="w-full bg-transparent text-gray-100 outline-none px-2 placeholder:text-gray-500 text-sm"
        />
      </div>

      {/* 자동완성 드롭다운 */}
      {results.length > 0 && (
        <ul className="absolute w-full mt-2 bg-[#12121f]/95 border border-violet-400/20 rounded-xl shadow-lg overflow-hidden backdrop-blur-lg animate-fadeIn z-50">
          {results.map((movie) => (
            <li
              key={movie.id}
              onClick={() => router.push(`/explore?query=${encodeURIComponent(movie.title)}`)}
              className="px-4 py-2 text-sm text-gray-300 hover:bg-violet-500/20 cursor-pointer transition-colors"
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}