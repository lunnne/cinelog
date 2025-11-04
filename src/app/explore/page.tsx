import SearchBar from "./components/searchBar"
import SearchSuggestions from "./components/SearchSuggestions"
import SearchResults from "./components/SearchResults"

async function getMovies(query: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}`,
    { next: { revalidate: 3600 } }
  )
  return res.json()
}

export default async function ExplorePage({ searchParams }: { searchParams: { query?: string } }) {
  const query = (await searchParams).query || ""
  const data = query ? await getMovies(query) : null

  return (
    <main className="min-h-screen bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] text-gray-100 px-6 pt-20 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        {/* 🔍 검색창 */}
        <SearchBar />

        {/* ✨ 부드러운 전환 영역 */}
        <div className="relative w-full mt-6 min-h-[300px]">
          {!query ? (
            <div className="animate-fadeIn absolute inset-0">
              <SearchSuggestions />
            </div>
          ) : (
            <div className="animate-fadeIn absolute inset-0">
              <SearchResults query={query} data={data} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
