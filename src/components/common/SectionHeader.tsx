import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string; // e.g. "01", "02", "03"
  category: string; // e.g. "ABOUT", "EXPERIENCE", "PROJECTS"
  title: string; // e.g. "DATA MEETS DECISION."
  subtitle?: string;
  darkTheme?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  subtitle,
  darkTheme = false,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${className}`}
    >
      {/* Category Pill Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase font-medium ${
            darkTheme
              ? 'bg-white/10 text-[#F5F5F7] border border-white/15'
              : 'bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20'
          }`}
        >
          <span>{number}</span>
          <span>•</span>
          <span>{category}</span>
        </span>
      </div>

      {/* Main Title */}
      <h2
        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold font-display tracking-tight uppercase leading-[1.05] ${
          darkTheme ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
        }`}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-5 text-lg md:text-xl max-w-3xl leading-relaxed font-sans font-normal ${
            darkTheme ? 'text-[#A1A1A6]' : 'text-[#6E6E73]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
