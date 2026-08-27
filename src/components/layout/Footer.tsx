import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/SocialIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 bg-[#000000] text-[#F5F5F7] border-t border-white/10 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <span className="font-display font-semibold text-[#F5F5F7] text-xl tracking-tight block">PRAJITH P.</span>
            <p className="text-[#A1A1A6] text-sm font-sans max-w-md leading-relaxed">{PERSONAL_INFO.title}</p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0071E3] bg-[#0071E3]/10 border border-[#0071E3]/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
              <span>{PERSONAL_INFO.availabilityStatus}</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-4 font-medium">Connect</h4>
            <div className="flex items-center gap-3">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#0071E3] hover:border-[#0071E3] text-[#F5F5F7] flex items-center justify-center transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-[#0071E3] hover:border-[#0071E3] text-[#F5F5F7] flex items-center justify-center transition-colors"><GithubIcon className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A1A1A6]">
          <div>© 2026 Prajith P. All rights reserved. Designed for data impact.</div>
          <button onClick={scrollToTop} className="flex items-center gap-1.5 text-[#F5F5F7] hover:text-[#0071E3] transition-colors font-medium" aria-label="Back to top"><span>Back to top</span><ArrowUp className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </footer>
  );
};
