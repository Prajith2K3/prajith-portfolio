import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Code, BarChart2, CheckCircle, Lightbulb, FileText, ChevronRight, Image as ImageIcon, Maximize2 } from 'lucide-react';
import type { Project } from '../../types';
import { CodeBlock } from '../common/CodeBlock';
import { MetricCounter } from '../common/MetricCounter';
import { GithubIcon } from '../common/SocialIcons';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const SECTIONS = [
  { id: '01', title: 'BUSINESS QUESTION', icon: Lightbulb },
  { id: '02', title: 'DATA', icon: Database },
  { id: '03', title: 'ANALYSIS', icon: BarChart2 },
  { id: '04', title: 'FINDINGS & CHARTS', icon: ImageIcon },
  { id: '05', title: 'SQL', icon: Code },
  { id: '06', title: 'PYTHON', icon: Code },
  { id: '07', title: 'POWER BI', icon: BarChart2 },
  { id: '08', title: 'INSIGHTS', icon: CheckCircle },
  { id: '09', title: 'RECOMMENDATIONS', icon: FileText },
];

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('01');
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [previewImg, setPreviewImg] = useState<{ src: string; title: string; caption: string } | null>(null);

  if (!project) return null;

  const sqlSnippet = project.codeSnippets.find((s) => s.language === 'sql');
  const pythonSnippet = project.codeSnippets.find((s) => s.language === 'python');
  const daxSnippet = project.codeSnippets.find((s) => s.language === 'dax');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#0A0A0C] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 text-[#F5F5F7]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#121217] border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#0071E3] text-white font-mono font-bold flex items-center justify-center text-xs">
                {project.number}
              </span>
              <div>
                <h3 className="text-lg font-semibold font-display text-white truncate max-w-xs sm:max-w-md md:max-w-xl">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-sans text-[#A1A1A6]">
                  <span className="text-[#0071E3] font-mono">{project.datasetScale}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Prajith2K3"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-sans border border-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="px-6 py-3 bg-[#0A0A0C] border-b border-white/10 overflow-x-auto scrollbar-none flex items-center gap-2">
            {SECTIONS.map((sec) => {
              if (sec.id === '04' && !project.projectImages?.length) return null;
              const isActive = activeTab === sec.id;
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0071E3] text-white font-semibold shadow-md'
                      : 'bg-white/5 text-[#A1A1A6] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{sec.id}</span>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-sans">{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin">
            {/* TAB 01: BUSINESS QUESTION */}
            {activeTab === '01' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#141419] border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-2 font-medium">
                    <Lightbulb className="w-4 h-4 text-[#0071E3]" /> 01 — Core Business Challenge
                  </h4>
                  <p className="text-lg md:text-xl font-sans font-medium text-white leading-relaxed">
                    {project.businessProblem}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {project.keyMetrics.map((m, idx) => (
                    <MetricCounter key={idx} value={m.value} label={m.label} sublabel={m.description} darkTheme={true} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 02: DATA */}
            {activeTab === '02' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-2 font-medium">
                  <Database className="w-4 h-4" /> 02 — Dataset & Scale Specifications
                </h4>
                <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-4 font-sans">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-[#A1A1A6]">Dataset Volume:</span>
                    <span className="text-lg font-bold font-mono text-white">{project.datasetScale}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-[#A1A1A6]">Primary Headline Metric:</span>
                    <span className="text-lg font-bold font-mono text-emerald-400">{project.primaryMetricValue} ({project.primaryMetricLabel})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#A1A1A6]">Technology Stack:</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 03: ANALYSIS */}
            {activeTab === '03' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-2 font-medium">
                  <BarChart2 className="w-4 h-4" /> 03 — Analytical Methodology
                </h4>
                <div className="space-y-3 font-sans">
                  {project.analyticalApproach.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[#141419] border border-white/10 items-start">
                      <span className="w-7 h-7 rounded-full bg-[#0071E3] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-sm text-slate-200 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 04: FINDINGS & CHARTS */}
            {activeTab === '04' && project.projectImages && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] flex items-center gap-2 font-medium">
                    <ImageIcon className="w-4 h-4 text-[#0071E3]" /> 04 — Key Analytical Finding Charts ({project.projectImages.length} Visuals)
                  </h4>
                  <span className="text-xs font-mono text-[#A1A1A6]">Click any chart to enlarge</span>
                </div>

                {/* Main Selected Image Showcase */}
                {project.projectImages[activeImgIndex] && (
                  <div className="p-6 rounded-2xl bg-[#141419] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h5 className="text-base font-semibold font-display text-white">
                        {project.projectImages[activeImgIndex].title}
                      </h5>
                      <button
                        onClick={() => setPreviewImg(project.projectImages![activeImgIndex])}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#0071E3] text-xs font-mono text-white transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </button>
                    </div>

                    <div
                      onClick={() => setPreviewImg(project.projectImages![activeImgIndex])}
                      className="bg-white rounded-xl overflow-hidden p-3 cursor-pointer group hover:opacity-95 transition-opacity border border-white/10 flex items-center justify-center"
                    >
                      <img
                        src={project.projectImages[activeImgIndex].src}
                        alt={project.projectImages[activeImgIndex].title}
                        className="max-h-[380px] w-auto object-contain rounded-lg shadow-md"
                      />
                    </div>

                    <p className="text-sm font-sans text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                      {project.projectImages[activeImgIndex].caption}
                    </p>
                  </div>
                )}

                {/* Thumbnails Selector Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {project.projectImages.map((img, idx) => {
                    const isSelected = activeImgIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`p-2 rounded-xl bg-[#141419] border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'border-[#0071E3] ring-2 ring-[#0071E3]/40 bg-white/10'
                            : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                        }`}
                      >
                        <div className="bg-white rounded-lg overflow-hidden h-16 p-1 flex items-center justify-center">
                          <img src={img.src} alt={img.title} className="h-full w-auto object-contain" />
                        </div>
                        <div className="text-[11px] font-sans font-medium text-slate-300 truncate text-center">
                          {img.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB 05: SQL */}
            {activeTab === '05' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-2 font-medium">
                  <Code className="w-4 h-4" /> 05 — SQL Query & Schema Highlights
                </h4>
                <ul className="space-y-2 mb-4 text-sm font-sans text-slate-300">
                  {project.sqlWork.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {sqlSnippet && <CodeBlock language={sqlSnippet.language} title={sqlSnippet.title} code={sqlSnippet.code} />}
              </motion.div>
            )}

            {/* TAB 06: PYTHON */}
            {activeTab === '06' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2 font-medium">
                  <Code className="w-4 h-4" /> 06 — Python Data Cleaning & ML Scripting
                </h4>
                <ul className="space-y-2 mb-4 text-sm font-sans text-slate-300">
                  {project.pythonWork.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {pythonSnippet && <CodeBlock language={pythonSnippet.language} title={pythonSnippet.title} code={pythonSnippet.code} />}
              </motion.div>
            )}

            {/* TAB 07: POWER BI */}
            {activeTab === '07' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2 font-medium">
                  <BarChart2 className="w-4 h-4" /> 07 — Power BI Executive Suite ({project.dashboardPagesCount} Pages)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 font-sans">
                  {project.dashboardPages.map((page, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#141419] border border-white/10 text-xs text-amber-300 flex items-center gap-2 font-mono">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{page}</span>
                    </div>
                  ))}
                </div>
                {daxSnippet && <CodeBlock language={daxSnippet.language} title={daxSnippet.title} code={daxSnippet.code} />}
              </motion.div>
            )}

            {/* TAB 08: INSIGHTS */}
            {activeTab === '08' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4" /> 08 — Quantified Business Impact
                </h4>
                <div className="p-6 rounded-2xl bg-[#141419] border border-emerald-500/30 font-sans">
                  <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                    {project.businessImpact}
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 09: RECOMMENDATIONS */}
            {activeTab === '09' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] mb-2 flex items-center gap-2 font-medium">
                  <FileText className="w-4 h-4" /> 09 — Strategic Recommendations
                </h4>
                <div className="space-y-3 font-sans">
                  {project.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#141419] border border-white/10 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {rec}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#121217] border-t border-white/10 flex items-center justify-between text-xs font-sans text-[#A1A1A6]">
            <span>Explore analytical workflow & charts</span>
            <button
              onClick={onClose}
              className="apple-btn-blue px-4 py-1.5 text-xs font-medium cursor-pointer"
            >
              Close case study
            </button>
          </div>
        </motion.div>

        {/* Full Image Preview Lightbox */}
        {previewImg && (
          <div
            onClick={() => setPreviewImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh] bg-[#121217] border border-white/20 rounded-3xl p-6 relative overflow-hidden flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-lg font-semibold font-display text-white">{previewImg.title}</h4>
                <button
                  onClick={() => setPreviewImg(null)}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 flex items-center justify-center overflow-auto max-h-[65vh]">
                <img src={previewImg.src} alt={previewImg.title} className="max-h-[60vh] w-auto object-contain rounded-lg" />
              </div>

              <p className="text-sm font-sans text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">
                {previewImg.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
