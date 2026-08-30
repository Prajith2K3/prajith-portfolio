import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 bg-[#030710] text-[#CBD5E1] border-t border-[rgba(148,163,184,0.15)] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="text-[#CBD5E1]">
          © 2026 Prajith P. — Designed for data impact.
        </div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-[#93C5FD] hover:text-white transition-colors cursor-pointer group font-semibold"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
