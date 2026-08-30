import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Code, BarChart2, CheckCircle, Lightbulb, FileText, ChevronRight, Image as ImageIcon, Maximize2 } from 'lucide-react';
import type { Project } from '../../types';
import { CodeBlock } from '../common/CodeBlock';
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
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col z-10 text-[#F0F4FF]"
          style={{ background: 'rgba(8, 15, 30, 0.97)', border: '1px solid rgba(99, 146, 255, 0.15)', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-transparent" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-[rgba(99,146,255,0.1)] flex items-center justify-between gap-4 bg-[rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                {project.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-display font-bold text-white truncate max-w-xs sm:max-w-md">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-[#93C5FD]">
                  <span className="gradient-text font-bold">{project.datasetScale}</span>
                  <span>•</span>
                  <span className="text-[#CBD5E1]">{project.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://github.com/Prajith2K3"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(59,130,246,0.15)] text-[#CBD5E1] hover:text-white text-xs font-mono border border-[rgba(148,163,184,0.2)] hover:border-[rgba(96,165,250,0.5)] transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] text-white border border-[rgba(148,163,184,0.2)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="px-4 py-2.5 border-b border-[rgba(148,163,184,0.15)] overflow-x-auto flex items-center gap-1.5 bg-[rgba(5,10,20,0.5)] scrollbar-none">
            {SECTIONS.map((sec) => {
              if (sec.id === '04' && !project.projectImages?.length) return null;
              const isActive = activeTab === sec.id;
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-black shadow-md'
                      : 'bg-[rgba(11,20,38,0.75)] text-[#CBD5E1] hover:text-white border border-[rgba(148,163,184,0.2)] hover:border-[rgba(96,165,250,0.5)] font-semibold'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#38BDF8] font-bold'}>{sec.id}</span>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {/* TAB 01: BUSINESS QUESTION */}
            {activeTab === '01' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="p-6 rounded-2xl bg-[rgba(59,130,246,0.08)] border border-[rgba(96,165,250,0.25)]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-3 flex items-center gap-2 font-bold">
                    <Lightbulb className="w-4 h-4 text-[#38BDF8]" /> 01 — Core Business Challenge
                  </h4>
                  <p className="text-lg sm:text-xl text-white leading-relaxed font-medium">
                    {project.businessProblem}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.keyMetrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] space-y-1">
                      <div className="text-xl font-display font-black gradient-text">{m.value}</div>
                      <div className="text-xs font-bold text-white">{m.label}</div>
                      <div className="text-xs text-[#93C5FD] font-mono font-medium">{m.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 02: DATA */}
            {activeTab === '02' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <Database className="w-4 h-4 text-[#38BDF8]" /> 02 — Dataset & Scale Specifications
                </h4>
                <div className="p-6 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] space-y-4">
                  {[
                    { label: 'Dataset Volume', value: project.datasetScale },
                    { label: 'Primary Metric', value: `${project.primaryMetricValue} (${project.primaryMetricLabel})` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between border-b border-[rgba(148,163,184,0.15)] pb-4 last:border-0 last:pb-0">
                      <span className="text-sm sm:text-base text-[#CBD5E1] font-medium">{label}:</span>
                      <span className="text-sm sm:text-base font-bold font-mono gradient-text">{value}</span>
                    </div>
                  ))}
                  <div>
                    <span className="text-sm sm:text-base text-[#CBD5E1] font-medium block mb-2">Technology Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech-pill">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 03: ANALYSIS */}
            {activeTab === '03' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <BarChart2 className="w-4 h-4 text-[#38BDF8]" /> 03 — Analytical Methodology
                </h4>
                <div className="space-y-3">
                  {project.analyticalApproach.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] items-start">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed pt-0.5 font-normal">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 04: FINDINGS & CHARTS */}
            {activeTab === '04' && project.projectImages && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] flex items-center gap-2 font-bold">
                    <ImageIcon className="w-4 h-4 text-[#38BDF8]" /> 04 — Key Analytical Finding Charts ({project.projectImages.length} Visuals)
                  </h4>
                  <span className="text-xs font-mono text-[#93C5FD] font-semibold">Click any chart to enlarge</span>
                </div>

                {project.projectImages[activeImgIndex] && (
                  <div className="p-5 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[rgba(148,163,184,0.15)]">
                      <h5 className="text-base font-display font-bold text-white">
                        {project.projectImages[activeImgIndex].title}
                      </h5>
                      <button
                        onClick={() => setPreviewImg(project.projectImages![activeImgIndex])}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(59,130,246,0.15)] hover:bg-[rgba(59,130,246,0.25)] text-[#93C5FD] hover:text-white text-xs font-mono font-bold border border-[rgba(96,165,250,0.3)] transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge</span>
                      </button>
                    </div>
                    <div
                      onClick={() => setPreviewImg(project.projectImages![activeImgIndex])}
                      className="bg-[rgba(0,0,0,0.35)] rounded-xl overflow-hidden p-3 cursor-pointer hover:opacity-90 transition-opacity border border-[rgba(148,163,184,0.18)] flex items-center justify-center"
                    >
                      <img
                        src={project.projectImages[activeImgIndex].src}
                        alt={project.projectImages[activeImgIndex].title}
                        className="max-h-[350px] w-auto object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed bg-[rgba(5,10,20,0.4)] p-4 rounded-xl border border-[rgba(148,163,184,0.15)] font-normal">
                      {project.projectImages[activeImgIndex].caption}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {project.projectImages.map((img, idx) => {
                    const isSelected = activeImgIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                          isSelected
                            ? 'border-[rgba(96,165,250,0.6)] bg-[rgba(59,130,246,0.15)]'
                            : 'border-[rgba(148,163,184,0.16)] bg-[rgba(11,20,38,0.75)] hover:border-[rgba(96,165,250,0.4)]'
                        }`}
                      >
                        <div className="bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden h-14 flex items-center justify-center">
                          <img src={img.src} alt={img.title} className="h-full w-auto object-contain" />
                        </div>
                        <div className="text-xs font-mono text-[#CBD5E1] truncate text-center font-medium">{img.title}</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB 05: SQL */}
            {activeTab === '05' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <Code className="w-4 h-4 text-[#38BDF8]" /> 05 — SQL Query & Schema Highlights
                </h4>
                <ul className="space-y-2.5 mb-4">
                  {project.sqlWork.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-[#CBD5E1] font-normal">
                      <ChevronRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {sqlSnippet && <CodeBlock language={sqlSnippet.language} title={sqlSnippet.title} code={sqlSnippet.code} />}
              </motion.div>
            )}

            {/* TAB 06: PYTHON */}
            {activeTab === '06' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <Code className="w-4 h-4 text-[#38BDF8]" /> 06 — Python Data Cleaning & ML Scripting
                </h4>
                <ul className="space-y-2.5 mb-4">
                  {project.pythonWork.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-[#CBD5E1] font-normal">
                      <ChevronRight className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {pythonSnippet && <CodeBlock language={pythonSnippet.language} title={pythonSnippet.title} code={pythonSnippet.code} />}
              </motion.div>
            )}

            {/* TAB 07: POWER BI */}
            {activeTab === '07' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <BarChart2 className="w-4 h-4 text-[#38BDF8]" /> 07 — Power BI Executive Suite ({project.dashboardPagesCount} Pages)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {project.dashboardPages.map((page, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] text-xs sm:text-sm text-[#CBD5E1] font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8] shrink-0" />
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
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" /> 08 — Quantified Business Impact
                </h4>
                <div className="p-6 rounded-2xl bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)]">
                  <p className="text-base sm:text-lg text-white leading-relaxed font-medium">
                    {project.businessImpact}
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 09: RECOMMENDATIONS */}
            {activeTab === '09' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-2 flex items-center gap-2 font-bold">
                  <FileText className="w-4 h-4 text-[#38BDF8]" /> 09 — Strategic Recommendations
                </h4>
                <div className="space-y-3">
                  {project.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">{rec}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-[rgba(148,163,184,0.15)] flex items-center justify-between text-xs font-mono text-[#CBD5E1] bg-[rgba(5,10,20,0.5)] font-medium">
            <span>Explore analytical workflow & charts</span>
            <button
              onClick={onClose}
              className="btn-primary px-4 py-1.5 text-xs font-semibold cursor-pointer"
            >
              Close case study
            </button>
          </div>
        </motion.div>

        {/* Full Image Preview Lightbox */}
        {previewImg && (
          <div
            onClick={() => setPreviewImg(null)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh] rounded-3xl p-6 relative overflow-hidden flex flex-col space-y-4 shadow-2xl"
              style={{ background: 'rgba(8, 15, 30, 0.97)', border: '1px solid rgba(99,146,255,0.15)' }}
            >
              <div className="flex items-center justify-between border-b border-[rgba(148,163,184,0.15)] pb-3">
                <h4 className="text-base sm:text-lg font-display font-bold text-white">{previewImg.title}</h4>
                <button
                  onClick={() => setPreviewImg(null)}
                  className="p-1.5 rounded-full bg-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(255,255,255,0.15)] border border-[rgba(148,163,184,0.2)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-[rgba(0,0,0,0.35)] rounded-2xl p-4 flex items-center justify-center overflow-auto max-h-[65vh] border border-[rgba(148,163,184,0.18)]">
                <img src={previewImg.src} alt={previewImg.title} className="max-h-[60vh] w-auto object-contain rounded-lg" />
              </div>
              <p className="text-sm sm:text-base text-[#CBD5E1] bg-[rgba(5,10,20,0.4)] p-4 rounded-xl border border-[rgba(148,163,184,0.15)] leading-relaxed font-normal">
                {previewImg.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
