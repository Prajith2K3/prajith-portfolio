import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, category, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs font-bold gradient-text tracking-widest uppercase">
          {number}
        </span>
        <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#3B82F6] to-transparent opacity-80" />
        <span className="text-xs font-mono font-bold text-[#93C5FD] uppercase tracking-widest bg-[rgba(59,130,246,0.12)] px-2.5 py-1 rounded-md border border-[rgba(96,165,250,0.25)]">
          {category}
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight tracking-tight max-w-3xl">
        {title.split(' ').map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="gradient-text">{word}</span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#CBD5E1] max-w-2xl leading-relaxed font-normal">
          {subtitle}
        </p>
      )}

      <div className="mt-6 neon-line w-24" />
    </motion.div>
  );
};
