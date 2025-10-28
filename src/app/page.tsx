import ReviewSection from '@/components/ReviewSection';
import MovieSection from '@/components/MovieSection';

export default async function HomePage() {
  return (
    <main className="pt-20 pb-24">
      <ReviewSection />
      <MovieSection />
    </main>
  );
}
