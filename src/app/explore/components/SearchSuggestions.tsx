export default function SearchSuggestions() {
  return (
    <div className="text-center text-gray-400 animate-fadeIn">
      <p className="text-sm mb-4">요즘 인기 있는 영화 🎬</p>
      <div className="flex flex-wrap justify-center gap-3 text-gray-300">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-violet-400/20 text-sm">
          오펜하이머
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-violet-400/20 text-sm">
          듄 2
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-violet-400/20 text-sm">
          파리, 텍사스
        </span>
        <span className="px-3 py-1 rounded-full bg-white/5 border border-violet-400/20 text-sm">
          노인을 위한 나라는 없다
        </span>
      </div>
    </div>
  )
}