import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { SKILLS_DATA } from '../data/portfolioData';
import { Cpu, Terminal, Database, BarChart2, CheckCircle2, Sparkles, Code2, Layers, Server } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-28 bg-[#F8F9FC] text-[#1D1D1F] border-t border-[#E2E8F0] relative overflow-hidden scroll-mt-28">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="04"
          category="Technical Stack"
          title="CONNECTED TECHNOLOGY ECOSYSTEM."
          subtitle="Explore technical skills centered around data analytics, database engineering, and business intelligence."
        />

        {/* Central Core & Ecosystem Network Grid */}
        <div className="space-y-12">
          {/* Ecosystem Featured Core Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071E3]/20 border border-[#0071E3]/40 text-[#0071E3] text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-[#0071E3]" />
                <span>Primary Technical Stack</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
                Python • SQL • Power BI
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl">
                Specialized in ETL pipelines, statistical exploratory data analysis, DAX time-intelligence metrics, and predictive machine learning models.
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-2 z-10 w-full md:w-auto">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-200 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Production SQL Window Functions & CTEs</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-200 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                <span>0.68 ROC-AUC Scikit-Learn Model</span>
              </div>
            </div>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILLS_DATA.map((cat, idx) => {
              const iconMap = [Terminal, Database, BarChart2, Code2, Layers, Server];
              const IconComp = iconMap[idx % iconMap.length];

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 hover:border-[#0071E3]/50 transition-all duration-300 flex flex-col justify-between group shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,113,227,0.12)] hover:-translate-y-1"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                      <div className="p-3 rounded-2xl bg-blue-50 text-[#0071E3] border border-blue-100 group-hover:bg-[#0071E3] group-hover:text-white transition-colors duration-300 shadow-sm">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold font-display text-slate-900">{cat.title}</h4>
                        <p className="text-xs text-slate-500 font-sans">{cat.subtitle}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {cat.items.map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold font-sans text-slate-800 flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3]" />
                              {item.name}
                            </span>
                            <span className="font-mono text-[10px] text-[#0071E3] font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/80">
                              {item.level}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-sans leading-relaxed pl-5">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
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
