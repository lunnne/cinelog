import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <main className="p-6 space-y-6">
      {/* <WriteModal /> */}
      
    </main>
  );
}
