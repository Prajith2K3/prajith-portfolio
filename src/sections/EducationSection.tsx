import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-transparent text-white border-t border-white/10 relative overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#0071E3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="06"
          category="Academic Background"
          title="EDUCATION."
          subtitle="Formal academic degree in Data Science and Analytics."
          darkTheme={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="apple-card-dark p-8 sm:p-12 border border-white/10 max-w-4xl shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0071E3]/15 border border-[#0071E3]/30 flex items-center justify-center text-[#0071E3] shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white uppercase leading-tight">
                  {EDUCATION_DATA.degree}
                </h3>
                <p className="text-[#0071E3] font-sans font-medium text-base mt-1">
                  {EDUCATION_DATA.institution}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A1A6]">
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
                {EDUCATION_DATA.duration}
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
                {EDUCATION_DATA.location}
              </span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-sans text-[#A1A1A6]">
              <Award className="w-4 h-4 text-[#0071E3]" />
              <span>Degree Status:</span>
            </div>
            <div className="text-xs font-mono font-semibold text-[#0071E3] bg-[#0071E3]/15 px-4 py-1.5 rounded-full border border-[#0071E3]/30">
              Graduated / Degree Conferred
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
