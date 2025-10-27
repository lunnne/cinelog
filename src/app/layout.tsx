import "./globals.css";
import { Inter } from "next/font/google";
import BottomNav from "@/components/BottomNav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIGN",
  description: "Emotion-based cinema archive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
