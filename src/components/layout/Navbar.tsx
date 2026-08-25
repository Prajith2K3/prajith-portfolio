import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkSection = activeSection === 'experience' || activeSection === 'projects' || activeSection === 'contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isDarkSection
              ? 'apple-nav-dark py-3.5'
              : 'apple-nav-light py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src="/prajith_profile.jpg"
              alt="Prajith P."
              className="w-8 h-8 rounded-full object-cover object-top border border-black/10 dark:border-white/20 shadow-sm group-hover:scale-105 transition-transform"
            />
            <span
              className={`font-display font-semibold text-lg tracking-tight transition-colors ${
                isDarkSection ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
              }`}
            >
              PRAJITH P.
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/40 dark:bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1 text-sm font-sans font-medium transition-colors rounded-full cursor-pointer ${
                    isActive
                      ? isDarkSection
                        ? 'text-white font-semibold'
                        : 'text-[#1D1D1F] font-semibold'
                      : isDarkSection
                      ? 'text-[#A1A1A6] hover:text-white'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className={`absolute inset-0 rounded-full ${
                        isDarkSection ? 'bg-white/15' : 'bg-black/5'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="apple-btn-blue px-5 py-2 text-xs font-sans font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full cursor-pointer transition-colors ${
              isDarkSection
                ? 'bg-white/10 text-white'
                : 'bg-black/5 text-[#1D1D1F]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-[60px] z-30 lg:hidden p-6 border-b shadow-2xl ${
              isDarkSection
                ? 'bg-[#0A0A0C]/95 text-white border-white/10'
                : 'bg-[#F5F5F7]/95 text-[#1D1D1F] border-[#D2D2D7]'
            } backdrop-blur-xl`}
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left text-base font-sans cursor-pointer ${
                      isActive
                        ? isDarkSection
                          ? 'bg-white/15 text-white font-semibold'
                          : 'bg-black/5 text-[#1D1D1F] font-semibold'
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#0071E3]" />}
                  </button>
                );
              })}

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="mt-3 apple-btn-blue py-3.5 px-4 text-center font-sans text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
