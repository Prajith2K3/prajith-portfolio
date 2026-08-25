import React from 'react';
import { Mail, Phone, ArrowUp } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/SocialIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#000000] text-[#F5F5F7] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <span className="font-display font-semibold text-[#F5F5F7] text-xl tracking-tight block">
              PRAJITH P.
            </span>
            <p className="text-[#A1A1A6] text-sm font-sans max-w-md leading-relaxed">
              {PERSONAL_INFO.title}
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0071E3] bg-[#0071E3]/10 border border-[#0071E3]/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
              <span>{PERSONAL_INFO.availabilityStatus}</span>
            </div>
          </div>

          {/* Contact Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-4 font-medium">
              Contact
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-[#F5F5F7] hover:text-[#0071E3] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#0071E3]" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-[#F5F5F7] hover:text-[#0071E3] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#0071E3]" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-4 font-medium">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#0071E3] hover:border-[#0071E3] text-[#F5F5F7] flex items-center justify-center transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#0071E3] hover:border-[#0071E3] text-[#F5F5F7] flex items-center justify-center transition-all cursor-pointer"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A1A1A6]">
          <div>
            © 2026 Prajith P. All rights reserved. Designed for data impact.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#F5F5F7] hover:text-[#0071E3] transition-colors cursor-pointer group font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
