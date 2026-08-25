import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Database, Filter, BarChart, PieChart, Lightbulb, Target, Sparkles, CheckCircle2, Award, FileCode2, TrendingUp } from 'lucide-react';

const WORKFLOW_STAGES = [
  { id: '01', name: 'RAW DATA', desc: 'Ingesting relational PostgreSQL tables, CSV datasets & unstructured logs', icon: Database },
  { id: '02', name: 'CLEANING', desc: 'Handling nulls, duplicates & outlier clipping in Python Pandas', icon: Filter },
  { id: '03', name: 'ANALYSIS', desc: 'Executing SQL CTEs, window functions & ML churn modeling (0.68 ROC-AUC)', icon: BarChart },
  { id: '04', name: 'VISUALIZATION', desc: 'Building multi-page Power BI executive reports with DAX measures', icon: PieChart },
  { id: '05', name: 'DECISION', desc: 'Translating data into quantified revenue-at-risk & growth recommendations', icon: Lightbulb },
];

const ANALYTICAL_HIGHLIGHTS = [
  { label: 'Analytics Case Studies', value: '3+', subtext: 'Churn, Sales & Marketing', icon: TrendingUp },
  { label: 'Sales Records Analyzed', value: '6,583+', subtext: 'SQL & Python Pipelines', icon: FileCode2 },
  { label: 'Microsoft Credentials', value: '6x Suite', subtext: 'Power BI & Analytics', icon: Award },
  { label: 'ML Churn Accuracy', value: '0.68 ROC-AUC', subtext: 'Scikit-Learn Classifier', icon: Sparkles },
];

export const AboutSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="about" className="py-28 bg-[#F8F9FC] text-[#1D1D1F] border-t border-[#E2E8F0] relative overflow-hidden scroll-mt-28">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="01"
          category="About Prajith"
          title="I ANALYZE DATA TO HELP BUSINESS MOVE FORWARD."
          subtitle="Specializing in Python, SQL querying, Power BI dashboard design, and translating complex data into clear strategic growth decisions."
        />

        {/* 4-Item Executive KPI Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {ANALYTICAL_HIGHLIGHTS.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,113,227,0.08)] hover:border-[#0071E3]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[#0071E3] mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 group-hover:bg-[#0071E3] group-hover:text-white transition-colors duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <Sparkles className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold font-sans text-slate-700 mt-1">
                    {item.label}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1 — Executive Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="relative h-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.05)] group flex flex-col justify-between">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="/prajith_profile.jpg"
                  alt="Prajith P - Professional Portrait"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-mono w-fit mb-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Prajith P.</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-white">Data Analyst & ML Specialist</h3>
                  <p className="text-xs text-slate-300 font-sans mt-1">Coimbatore / Calicut • Open to Remote & Onsite</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2 — Analytical Philosophy & Story */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 flex flex-col"
          >
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.05)] space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0071E3] text-xs font-mono font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analytical Mindset & Background</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight leading-snug">
                  Bridging the gap between raw datasets and executive decisions.
                </h3>

                <p className="text-base text-slate-600 font-sans leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Primary Career Goal Feature Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-transparent border-l-4 border-l-[#0071E3] border border-blue-100/80 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0071E3] font-bold uppercase tracking-wider">
                  <Target className="w-4 h-4 text-[#0071E3]" />
                  <span>Primary Career Goal</span>
                </div>
                <p className="text-sm text-slate-800 font-sans font-medium leading-relaxed">
                  {PERSONAL_INFO.careerGoal}
                </p>
              </div>

              {/* Core Analytics Competencies Pills */}
              <div className="pt-2">
                <span className="text-xs font-mono text-[#0071E3] uppercase tracking-wider font-bold block mb-3">
                  Core Analytics Competencies
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {PERSONAL_INFO.quickTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-xl text-xs font-mono bg-gradient-to-r from-blue-50 to-indigo-50/50 text-[#0071E3] border border-blue-200/60 font-semibold shadow-2xl hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all duration-200 cursor-default flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive End-to-End Workflow Pipeline Shelf */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.05)] space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono text-[#0071E3] uppercase tracking-wider font-bold block mb-1">
                5-Stage Analytical Pipeline
              </span>
              <h4 className="text-2xl font-bold font-display text-slate-900">How I Process Data Into Business Value</h4>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
              <span>Interactive Workflow</span>
            </div>
          </div>

          {/* Workflow Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const IconComp = stage.icon;
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between min-h-[110px] ${
                    isActive
                      ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-lg shadow-blue-500/20 scale-[1.03]'
                      : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      STAGE {stage.id}
                    </span>
                    <IconComp className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#0071E3]'}`} />
                  </div>
                  <div className="text-xs font-bold font-display uppercase tracking-tight mt-3">
                    {stage.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Workflow Stage Active Details Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-white border border-blue-100 text-xs font-mono text-slate-700 flex items-center gap-3.5 shadow-inner">
            <div className="p-2 rounded-xl bg-[#0071E3] text-white shrink-0 shadow-md">
              {React.createElement(WORKFLOW_STAGES[activeStage].icon, { className: "w-4 h-4" })}
            </div>
            <div>
              <span className="font-bold text-[#0071E3] uppercase text-[11px]">
                Stage {WORKFLOW_STAGES[activeStage].id} — {WORKFLOW_STAGES[activeStage].name}:
              </span>
              <p className="text-sm font-sans text-slate-800 font-medium mt-0.5">
                {WORKFLOW_STAGES[activeStage].desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
