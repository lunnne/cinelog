import Image from 'next/image';
import ReviewHeader from '@/app/movies/[id]/components/ReviewHeader';
import ReviewForm from '@/app/review/ReviewForm';
import { notFound } from 'next/navigation';

export default async function ReviewPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  //fetch movie data from TMDB API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`, { next: { revalidate: 3600 } });
  const data = await res.json();
  if (!data) return notFound();
  const movie = data;

  return (
    <>
      <ReviewHeader />
      <div className=" bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] text-gray-100 px-6 pt-20 py-10 flex flex-col items-center">
        <div className="max-w-lg w-full flex flex-col items-center gap-6">
          {/* 🎞️ 영화 포스터 */}
          <div className="w-[125px] h-[180px] md:w-[200px] md:h-[300px] md:mt-8 relative rounded-lg overflow-hidden shadow-lg">
            <Image src={movie.posterUrl} alt={movie.title} fill sizes="(max-width: 768px) 125px, 200px" className="object-cover" priority />
          </div>

          {/* 🎬 제목 */}
          <h1 className="text-lg md:text-2xl md:m-4 font-semibold text-white text-center">{movie.title}</h1>
          <ReviewForm movie={movie} />
        </div>
      </div>
    </>
  );
}
