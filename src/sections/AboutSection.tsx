import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Database, Filter, BarChart, PieChart, Lightbulb, Target, Sparkles, CheckCircle2, Award, FileCode2, TrendingUp } from 'lucide-react';

const WORKFLOW_STAGES = [
  { id: '01', name: 'RAW DATA', desc: 'Ingesting relational PostgreSQL tables, CSV datasets & unstructured logs', icon: Database, color: 'from-[#3B82F6] to-[#2563EB]' },
  { id: '02', name: 'CLEANING', desc: 'Handling nulls, duplicates & outlier clipping in Python Pandas', icon: Filter, color: 'from-[#8B5CF6] to-[#6D28D9]' },
  { id: '03', name: 'ANALYSIS', desc: 'Executing SQL CTEs, window functions & ML churn modeling (0.68 ROC-AUC)', icon: BarChart, color: 'from-[#06B6D4] to-[#0891B2]' },
  { id: '04', name: 'VISUALIZATION', desc: 'Building multi-page Power BI executive reports with DAX measures', icon: PieChart, color: 'from-[#F59E0B] to-[#D97706]' },
  { id: '05', name: 'DECISION', desc: 'Translating data into quantified revenue-at-risk & growth recommendations', icon: Lightbulb, color: 'from-[#10B981] to-[#059669]' },
];

const HIGHLIGHTS = [
  { label: 'Analytics Projects', value: 5, suffix: '+', subtext: 'Churn, Sales, Marketing, ML', icon: TrendingUp, color: '#3B82F6' },
  { label: 'Sales Records Analyzed', value: 6583, suffix: '+', subtext: 'SQL & Python Pipelines', icon: FileCode2, color: '#06B6D4' },
  { label: 'Microsoft Credentials', value: 6, suffix: 'x', subtext: 'Power BI Suite', icon: Award, color: '#8B5CF6' },
  { label: 'Best ML Accuracy', value: 97.4, suffix: '%', subtext: 'Scikit-Learn Classifier', icon: Sparkles, color: '#10B981' },
];

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1400, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-display font-black" style={{ color }}>
      {value > 100 ? Math.floor(count).toLocaleString() : count.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
    </div>
  );
}

export const AboutSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="about" className="py-28 section-alt text-[#F0F4FF] section-separator relative overflow-hidden scroll-mt-24">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="01"
          category="About Prajith"
          title="I ANALYZE DATA TO DRIVE BUSINESS FORWARD."
          subtitle="Specializing in Python, SQL querying, Power BI dashboard design, and translating complex datasets into clear strategic growth decisions."
        />

        {/* KPI Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {HIGHLIGHTS.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-5 flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}
                >
                  <IconComp className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <AnimatedCounter value={item.value} suffix={item.suffix} color={item.color} />
                  <div className="text-sm font-bold text-white mt-1">{item.label}</div>
                  <div className="text-xs font-mono text-[#93C5FD] mt-0.5 font-medium">{item.subtext}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="relative h-full rounded-3xl overflow-hidden glass-card-lg group" style={{ minHeight: 420 }}>
              <img
                src="/prajith_profile.jpg"
                alt="Prajith P — Professional Portrait"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                style={{ minHeight: 420 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030710]/90 via-[#050A14]/30 to-transparent flex flex-col justify-end p-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.15)] text-xs font-mono w-fit mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[#F0F4FF]">Prajith P.</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Data Analyst & ML Specialist</h3>
                <p className="text-xs text-[rgba(255,255,255,0.7)] font-mono mt-1">Malappuram, Kerala • Open to Remote & Onsite</p>
              </div>
            </div>
          </motion.div>

          {/* Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <div className="glass-card-lg p-8 sm:p-10 flex-1 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analytical Mindset & Background</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug mb-4">
                  Bridging the gap between raw datasets and{' '}
                  <span className="gradient-text">executive decisions.</span>
                </h3>
                <p className="text-[#CBD5E1] text-base sm:text-lg leading-relaxed font-normal">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Career Goal */}
              <div className="p-5 rounded-2xl bg-[rgba(59,130,246,0.08)] border-l-2 border-[#3B82F6] border border-[rgba(96,165,250,0.2)]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#93C5FD] font-bold uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" />
                  <span>Primary Career Goal</span>
                </div>
                <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                  {PERSONAL_INFO.careerGoal}
                </p>
              </div>

              {/* Competency Pills */}
              <div>
                <span className="text-xs font-mono text-[#93C5FD] uppercase tracking-wider font-bold block mb-3">
                  Core Analytics Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.quickTags.map((tag) => (
                    <span
                      key={tag}
                      className="tech-pill"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] mr-1.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Workflow Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 glass-card-lg p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[rgba(148,163,184,0.15)]">
            <div>
              <span className="text-xs font-mono text-[#93C5FD] uppercase tracking-wider font-bold block mb-1">
                5-Stage Analytical Pipeline
              </span>
              <h4 className="text-2xl font-display font-bold text-white">How I Process Data Into Business Value</h4>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] text-xs font-mono text-[#93C5FD] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>Interactive Workflow</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const IconComp = stage.icon;
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-2xl text-left transition-all duration-250 cursor-pointer border flex flex-col justify-between min-h-[110px] ${
                    isActive
                      ? `bg-gradient-to-br ${stage.color} text-white border-transparent shadow-lg scale-[1.02]`
                      : 'bg-[rgba(11,20,38,0.75)] text-[#CBD5E1] border-[rgba(148,163,184,0.16)] hover:bg-[rgba(15,27,52,0.85)] hover:border-[rgba(96,165,250,0.4)]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-white' : 'text-[#93C5FD]'}`}>
                      STAGE {stage.id}
                    </span>
                    <IconComp className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#93C5FD]'}`} />
                  </div>
                  <div className={`text-xs font-display uppercase tracking-tight mt-3 ${isActive ? 'text-white font-black' : 'text-white font-bold'}`}>
                    {stage.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.16)] flex items-center gap-4">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${WORKFLOW_STAGES[activeStage].color} text-white shrink-0`}>
              {React.createElement(WORKFLOW_STAGES[activeStage].icon, { className: 'w-4 h-4' })}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#67E8F9] uppercase">
                Stage {WORKFLOW_STAGES[activeStage].id} — {WORKFLOW_STAGES[activeStage].name}:
              </span>
              <p className="text-sm sm:text-base text-[#F8FAFC] font-medium mt-0.5">
                {WORKFLOW_STAGES[activeStage].desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
