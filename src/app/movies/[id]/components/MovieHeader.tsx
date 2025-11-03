import Image from 'next/image';

interface MovieHeaderProps {
  backdropUrl: string;
  title: string;
}

export default function MovieHeader({ backdropUrl, title }: MovieHeaderProps) {
  return (
    <div className="relative h-[55vh] w-full overflow-hidden">
      <Image src={backdropUrl || '/fallback.jpg'} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
      {/* 🔮 블러 + 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-[#0a0a0f] backdrop-blur-[1px]" />
    </div>
  );
}
