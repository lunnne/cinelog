import FeedCard from '@/components/FeedCard';
import WriteModal from '@/components/WriteModal';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">SIGN 🌌</h1>
      <WriteModal />
      {reviews.map((review) => (
        <FeedCard
          key={review.id}
          title={review.title}
          emotion={review.emotion}
          rating={review.rating}
          comment={review.comment}
          poster={review.posterUrl}
          username={review.username}
        />
      ))}
    </main>
  );
}
