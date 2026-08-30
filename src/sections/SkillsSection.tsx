import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { SKILLS_DATA } from '../data/portfolioData';
import { Cpu, Terminal, Database, BarChart2, Code2, Layers, Server, CheckCircle2 } from 'lucide-react';

const CATEGORY_ICONS = [Terminal, Database, BarChart2, Code2, Layers, Server];
const LEVEL_CLASSES: Record<string, string> = {
  Expert: 'badge-expert',
  Advanced: 'badge-advanced',
  Proficient: 'badge-proficient',
  'Daily Use': 'badge-daily',
};

const PRIMARY_SKILLS = ['Python', 'SQL', 'Power BI'];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(SKILLS_DATA[0].id);
  const active = SKILLS_DATA.find(c => c.id === activeCategory) || SKILLS_DATA[0];
  const IconComp = CATEGORY_ICONS[SKILLS_DATA.findIndex(c => c.id === activeCategory) % CATEGORY_ICONS.length];

  return (
    <section id="skills" className="py-28 bg-[#050A14] text-[#F0F4FF] section-separator relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="04"
          category="Technical Stack"
          title="CORE TECHNICAL COMPETENCIES."
          subtitle="My hands-on technical skills across data extraction, relational database architecture, statistical modeling, and Power BI dashboarding."
        />

        <div className="space-y-10">
          {/* Hero tech banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-lg p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-transparent opacity-70" />
            <div className="space-y-3 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                Primary Technical Stack
              </div>
              <h3 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight gradient-text-hero">
                Python • SQL • Power BI
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] max-w-xl leading-relaxed">
                Specialized in ETL pipelines, statistical exploratory data analysis, DAX time-intelligence metrics, and predictive machine learning models.
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-2.5 z-10 w-full md:w-auto">
              <div className="p-4 rounded-2xl bg-[rgba(11,20,38,0.8)] border border-[rgba(148,163,184,0.2)] text-sm font-mono font-semibold text-white flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Production SQL Window Functions & CTEs</span>
              </div>
              <div className="p-4 rounded-2xl bg-[rgba(11,20,38,0.8)] border border-[rgba(148,163,184,0.2)] text-sm font-mono font-semibold text-white flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>0.925 ROC-AUC Keras Neural Network</span>
              </div>
              <div className="p-4 rounded-2xl bg-[rgba(11,20,38,0.8)] border border-[rgba(148,163,184,0.2)] text-sm font-mono font-semibold text-white flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>6x Microsoft Power BI Suite Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Category Tab Strip */}
          <div className="flex flex-wrap gap-2">
            {SKILLS_DATA.map((cat, idx) => {
              const CatIcon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[rgba(59,130,246,0.2)] text-[#93C5FD] border border-[rgba(96,165,250,0.5)] glow-sm'
                      : 'bg-[rgba(11,20,38,0.75)] text-[#CBD5E1] border border-[rgba(148,163,184,0.2)] hover:text-white hover:border-[rgba(96,165,250,0.5)]'
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Active Category Detail Panel */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card-lg p-8"
          >
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[rgba(148,163,184,0.15)]">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)]">
                <IconComp className="w-6 h-6 text-[#93C5FD]" />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-white">{active.title}</h4>
                <p className="text-xs text-[#93C5FD] font-mono font-medium">{active.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {active.items.map((item, idx) => {
                const levelClass = LEVEL_CLASSES[item.level] || 'badge-proficient';
                const isPrimary = PRIMARY_SKILLS.includes(item.name) || item.isPrimary;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-4 rounded-xl border transition-all ${
                      isPrimary
                        ? 'bg-[rgba(59,130,246,0.1)] border-[rgba(96,165,250,0.35)] hover:border-[rgba(96,165,250,0.6)]'
                        : 'bg-[rgba(11,20,38,0.6)] border-[rgba(148,163,184,0.16)] hover:border-[rgba(96,165,250,0.4)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isPrimary && <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />}
                        <span className={`font-bold text-sm ${isPrimary ? 'text-white font-black' : 'text-white'}`}>
                          {item.name}
                        </span>
                      </div>
                      <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${levelClass}`}>
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* All categories compact grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS_DATA.map((cat, idx) => {
              const CatIcon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`glass-card p-5 cursor-pointer transition-all ${
                    activeCategory === cat.id ? 'border-[rgba(96,165,250,0.5)] bg-[rgba(59,130,246,0.12)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.25)]">
                      <CatIcon className="w-4.5 h-4.5 text-[#93C5FD]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-display font-bold text-white">{cat.title}</h5>
                      <p className="text-xs text-[#93C5FD] font-mono font-medium">{cat.items.length} skills</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.slice(0, 4).map((item) => (
                      <span key={item.name} className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${LEVEL_CLASSES[item.level] || 'badge-proficient'}`}>
                        {item.name}
                      </span>
                    ))}
                    {cat.items.length > 4 && (
                      <span className="text-xs font-mono text-[#93C5FD] font-semibold">+{cat.items.length - 4} more</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
