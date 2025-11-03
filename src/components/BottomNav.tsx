"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CirclePlus, Search, BookOpen, User } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/explore", label: "탐색", icon: Search },
  { href: "/review", label: "리뷰", icon: CirclePlus },
  { href: "/archive", label: "아카이브", icon: BookOpen },
  { href: "/profile", label: "프로필", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 backdrop-blur-xl bg-linear-to-t from-[#0b0b0e]/90 to-[#0b0b0e]/40 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
      <ul className="flex justify-around items-center h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`group flex flex-col items-center text-sm transition-all duration-300 ${
                  isActive
                    ? "text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                    : "text-gray-400 hover:text-violet-300/80"
                }`}
              >
                <div
                  className={`flex items-center justify-center md:w-10 md:h-10 w-8 h-8 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-violet-500/15 backdrop-blur-md border border-violet-400/20 shadow-inner"
                      : "hover:bg-white/5"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <span
                  className={`text-[10px] md:text-sm md:mt-1 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
