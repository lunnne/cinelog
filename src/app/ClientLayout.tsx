'use client';
import BottomNav from '@/components/BottomNav';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
    {children}
    <BottomNav />
  </div>
  );
}
