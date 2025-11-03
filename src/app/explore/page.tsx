import SearchBar from './components/searchBar';
import SearchSuggestions from './components/SearchSuggestions';

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] text-gray-100 px-6 pt-20 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        {/* 🔍 검색창 */}
        <SearchBar />

        {/* 🎬 포커스 전 추천/인기 섹션 */}
        <SearchSuggestions />
      </div>
    </main>
  );
}
