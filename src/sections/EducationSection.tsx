import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-[#050A14] text-[#F0F4FF] section-separator relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="06"
          category="Academic Background"
          title="EDUCATION."
          subtitle="Formal academic foundation in data science, statistics, and analytical methods."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-lg p-8 sm:p-10 relative overflow-hidden max-w-3xl"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-transparent opacity-70" />

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] shrink-0">
              <GraduationCap className="w-8 h-8 text-[#93C5FD]" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] text-[#93C5FD] text-xs font-mono font-bold mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  Undergraduate Degree
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                  {EDUCATION_DATA.degree}
                </h3>
                <p className="text-lg text-[#CBD5E1] font-semibold mt-1">{EDUCATION_DATA.institution}</p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2 text-sm font-mono text-[#93C5FD] font-semibold">
                  <Calendar className="w-4 h-4 text-[#38BDF8]" />
                  {EDUCATION_DATA.duration}
                </div>
                <div className="flex items-center gap-2 text-sm font-mono text-[#93C5FD] font-semibold">
                  <MapPin className="w-4 h-4 text-[#38BDF8]" />
                  {EDUCATION_DATA.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Data Science', 'Analytics', 'Statistics', 'Machine Learning', 'Data Visualization', 'Python Programming'].map((subject) => (
                  <span key={subject} className="tech-pill">{subject}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
