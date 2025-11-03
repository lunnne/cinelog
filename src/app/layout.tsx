import '@/app/globals.css';
import ClientLayout from './ClientLayout';
import { Space_Grotesk } from 'next/font/google';
const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata = {
  title: 'Cinelog',
  description: 'Emotion-based cinema archive',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${SpaceGrotesk.className} bg-background`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
