import { Search } from "lucide-react";

export default function Header() {
    return (
      <header className="w-full flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Cinelog
        </h1>
        <button className="text-muted-foreground hover:text-violet-400 transition-colors text-sm">
          <Search size={20} />
        </button>
      </header>
    );
  }