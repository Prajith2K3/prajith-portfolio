import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onOpenResume?: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'dark-nav py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[rgba(99,146,255,0.3)] glow-sm group-hover:glow-blue transition-all duration-300">
              <img
                src="/prajith_profile.jpg"
                alt="Prajith P."
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-display font-bold text-base tracking-tight text-white group-hover:gradient-text transition-all">
              PRAJITH P.
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[rgba(11,20,38,0.75)] backdrop-blur-xl px-2 py-1.5 rounded-full border border-[rgba(148,163,184,0.18)]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-body font-semibold rounded-full cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#CBD5E1] hover:text-white font-medium'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[rgba(59,130,246,0.25)] border border-[rgba(96,165,250,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 rounded-full bg-[rgba(11,20,38,0.85)] hover:bg-[rgba(59,130,246,0.2)] text-[#93C5FD] hover:text-white border border-[rgba(148,163,184,0.2)] hover:border-[rgba(96,165,250,0.5)] transition-all cursor-pointer shadow-sm group"
                title="View Official Resume"
                aria-label="View Resume"
              >
                <FileText className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                <span>Resume</span>
              </button>
            )}

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-primary px-5 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full cursor-pointer transition-colors bg-[rgba(255,255,255,0.06)] border border-[rgba(148,163,184,0.2)] text-white hover:bg-[rgba(59,130,246,0.15)] hover:border-[rgba(96,165,250,0.5)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 lg:hidden p-5 shadow-2xl bg-[rgba(5,10,20,0.98)] backdrop-blur-xl border-b border-[rgba(148,163,184,0.18)]"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-left text-sm font-semibold cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[rgba(59,130,246,0.2)] text-white border border-[rgba(96,165,250,0.5)] font-bold'
                        : 'text-[#CBD5E1] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />}
                  </button>
                );
              })}

              {onOpenResume && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-between p-3.5 rounded-xl text-left text-sm font-semibold cursor-pointer transition-all bg-[rgba(59,130,246,0.12)] border border-[rgba(96,165,250,0.3)] text-[#93C5FD] hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#38BDF8]" />
                    <span>View Resume</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#38BDF8]" />
                </button>
              )}

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="mt-2 btn-primary py-3.5 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
