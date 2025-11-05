import ReviewSection from '@/components/ReviewSection';
import MovieSection from '@/components/MovieSection';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20 pb-24 max-w-5xl mx-auto">
        <ReviewSection />
        <MovieSection />
      </main>
    </>
  );
}
