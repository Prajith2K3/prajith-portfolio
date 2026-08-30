import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const TYPING_PHRASES = [
  'Python & SQL Analytics',
  'Interactive Power BI Dashboards',
  'Predictive Machine Learning',
  'ETL & Data Pipeline Engineering',
  'Executive Business Intelligence',
  'Statistical Exploratory Data Analysis',
];

const FLOATING_METRICS = [
  { label: 'ROC-AUC', value: '0.925', sub: 'Clinical Risk Model', color: 'from-[#3B82F6] to-[#06B6D4]' },
  { label: 'Revenue Analyzed', value: '$4.64M', sub: 'Sales Analytics', color: 'from-[#8B5CF6] to-[#3B82F6]' },
  { label: 'Blended ROAS', value: '7.06x', sub: 'Marketing ROI', color: 'from-[#06B6D4] to-[#10B981]' },
  { label: 'Peak Accuracy', value: '97.4%', sub: 'Crop Recommendation', color: 'from-[#F59E0B] to-[#EF4444]' },
];

interface HeroSectionProps {
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentPhrase.length) {
      timeout = setTimeout(() => setDisplayText(currentPhrase.slice(0, displayText.length + 1)), 80);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
    } else if (!isDeleting && displayText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-mesh grid-pattern"
    >
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-28 pb-16">
        <div className="flex flex-col items-center text-center space-y-8">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-xs font-mono font-bold text-[#34D399]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              {PERSONAL_INFO.availabilityStatus}
              <Sparkles className="w-3 h-3 opacity-70" />
            </div>
          </motion.div>

          {/* Profile photo with glow ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] bg-gradient-to-br from-[#3B82F6] via-[#06B6D4] to-[#8B5CF6] glow-blue">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#050A14] p-[2px]">
                <img
                  src="/prajith_profile.jpg"
                  alt="Prajith P."
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-[#10B981] border-2 border-[#050A14] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tight leading-[0.9]">
              <span className="text-[#F0F4FF]">DATA THAT</span>
              <br />
              <span className="gradient-text-hero">DRIVES</span>
              <br />
              <span className="text-[#F0F4FF]">DECISIONS.</span>
            </h1>
          </motion.div>

          {/* Name + Typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-3"
          >
            <p className="text-lg sm:text-xl text-[#CBD5E1] font-medium">
              <span className="text-white font-bold">Prajith P.</span>
              {' — '}Data Analyst specializing in{' '}
              <span className="gradient-text font-bold font-mono">
                {displayText}
                <span className="inline-block w-[2px] h-5 bg-[#3B82F6] ml-[1px] animate-pulse align-middle" />
              </span>
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {PERSONAL_INFO.quickTags.map((tag) => (
                <span
                  key={tag}
                  className="tech-pill"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary px-8 py-3.5 text-sm font-semibold flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="px-5 py-3.5 text-sm font-semibold flex items-center gap-2 rounded-full bg-[rgba(11,20,38,0.85)] border border-[rgba(96,165,250,0.3)] hover:border-[rgba(96,165,250,0.6)] text-[#93C5FD] hover:text-white hover:bg-[rgba(59,130,246,0.2)] transition-all cursor-pointer shadow-md group"
                title="View Official Resume"
              >
                <FileText className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                <span>Resume</span>
              </button>
            )}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-ghost px-7 py-3.5 text-sm font-semibold flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#60A5FA]" />
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Floating Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl pt-6"
          >
            {FLOATING_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-card p-4 text-left rounded-xl"
              >
                <div className={`text-2xl font-display font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-white mt-1">{metric.label}</div>
                <div className="text-xs font-mono text-[#93C5FD] mt-0.5 font-medium">{metric.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#93C5FD] hover:text-white transition-colors cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-xs font-mono tracking-widest uppercase font-semibold text-[#93C5FD]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
