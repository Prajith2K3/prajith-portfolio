import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { DataGalaxyScene } from '../components/3d/DataGalaxyScene';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center bg-gradient-to-b from-[#F8F9FC] via-white to-[#F8F9FC] text-[#1D1D1F] overflow-hidden">
      {/* Background Subtle Glow Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0071E3]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10 space-y-7">
        {/* Profile Avatar & Recruiter Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full p-1 bg-gradient-to-tr from-[#0071E3] via-blue-400 to-indigo-500 shadow-xl">
              <img
                src="/prajith_profile.jpg"
                alt="Prajith P."
                className="w-full h-full object-cover object-top rounded-full border-2 border-white shadow-inner"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-md" title="Available for immediate Data Analyst hiring" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D2D2D7]/70 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-[#1D1D1F] uppercase font-bold">
              {PERSONAL_INFO.availabilityStatus}
            </span>
          </div>
        </motion.div>

        {/* High-Impact Recruiter Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-display tracking-tight text-[#1D1D1F] uppercase leading-[0.95]">
            DATA <br />
            THAT <br />
            DRIVES <br />
            <span className="text-[#0071E3]">DECISIONS.</span>
          </h1>
        </motion.div>

        {/* Executive Subtitle & Skills Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <p className="text-lg sm:text-2xl text-slate-700 font-sans font-normal leading-relaxed">
            Prajith P • Data Analyst specializing in Python, SQL, Power BI, statistical analysis, and business intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {['Python (Pandas/NumPy)', 'SQL (PostgreSQL)', 'Power BI (DAX)', 'Scikit-Learn ML', 'ETL Pipelines'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-blue-50/70 text-[#0071E3] border border-blue-200/60 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dual Recruiter Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="apple-btn-blue px-7 py-3.5 text-sm font-sans font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span>Explore Analytics Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="apple-btn-secondary px-6 py-3.5 text-sm font-sans font-semibold inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#0071E3]" />
            <span>Get in Touch</span>
          </button>
        </motion.div>

        {/* 3D Precision Silver Data Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-4 max-w-4xl mx-auto"
        >
          <DataGalaxyScene />
        </motion.div>
      </div>
    </section>
  );
};
