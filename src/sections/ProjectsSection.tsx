import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';
import { CaseStudyModal } from '../components/modals/CaseStudyModal';
import {
  ArrowRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  BarChart3,
  X,
  Lightbulb,
  TrendingUp,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const PROJECT_COLORS = [
  { accent: '#3B82F6', secondary: '#06B6D4', gradient: 'from-[#3B82F6] to-[#06B6D4]' },
  { accent: '#8B5CF6', secondary: '#3B82F6', gradient: 'from-[#8B5CF6] to-[#3B82F6]' },
  { accent: '#F59E0B', secondary: '#EF4444', gradient: 'from-[#F59E0B] to-[#EF4444]' },
  { accent: '#10B981', secondary: '#06B6D4', gradient: 'from-[#10B981] to-[#06B6D4]' },
  { accent: '#EC4899', secondary: '#8B5CF6', gradient: 'from-[#EC4899] to-[#8B5CF6]' },
];

function ImageGallery({ project, colors }: { project: Project; colors: typeof PROJECT_COLORS[0] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);
  const images = project.projectImages || [];
  if (images.length === 0) return null;

  const curr = images[imgIdx];

  return (
    <>
      <div className="rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.18)] bg-[rgba(11,20,38,0.75)] relative group/gallery">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[rgba(5,10,20,0.6)] border-b border-[rgba(148,163,184,0.15)]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
            </div>
            <span className="text-[11px] font-mono text-[#93C5FD] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {curr.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#CBD5E1] bg-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded-full font-medium">
              {imgIdx + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightbox(curr)}
              className="p-1 rounded-md text-[#93C5FD] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
              title="Enlarge visual"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Preview */}
        <div
          className="aspect-video relative overflow-hidden bg-[rgba(0,0,0,0.35)] cursor-pointer"
          onClick={() => setLightbox(curr)}
        >
          <img
            src={curr.src}
            alt={curr.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-80" />

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3.5">
            <div className="text-xs font-bold text-white leading-snug">{curr.title}</div>
            <div className="text-xs text-[#CBD5E1] mt-0.5 line-clamp-2 font-normal">{curr.caption}</div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx((i) => (i - 1 + images.length) % images.length);
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-white hover:bg-black/90 transition-colors opacity-0 group-hover/gallery:opacity-100 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx((i) => (i + 1) % images.length);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 backdrop-blur flex items-center justify-center text-white hover:bg-black/90 transition-colors opacity-0 group-hover/gallery:opacity-100 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-2.5 bg-[rgba(5,10,20,0.5)] border-t border-[rgba(148,163,184,0.12)] overflow-x-auto scrollbar-none">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={i === imgIdx ? { borderColor: colors.accent, boxShadow: `0 0 10px ${colors.accent}50` } : {}}
                className={`shrink-0 w-12 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  i === imgIdx
                    ? 'opacity-100'
                    : 'border-[rgba(148,163,184,0.18)] opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl p-4 bg-[rgba(11,20,38,0.95)] border border-[rgba(148,163,184,0.2)] shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(148,163,184,0.15)]">
                <h4 className="text-base font-display font-bold text-white">{lightbox.title}</h4>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.2)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img src={lightbox.src} alt={lightbox.title} className="w-full max-h-[75vh] object-contain rounded-xl" />
              <p className="text-center text-sm text-[#CBD5E1] mt-3">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WorkBreakdown({ project, colors }: { project: Project; colors: typeof PROJECT_COLORS[0] }) {
  const [activeTab, setActiveTab] = useState<'sql' | 'python' | 'powerbi'>('sql');

  const tabs = [
    { id: 'sql' as const, label: 'SQL Pipeline', icon: Database, items: project.sqlWork },
    { id: 'python' as const, label: 'Python Analytics', icon: Code2, items: project.pythonWork },
    { id: 'powerbi' as const, label: 'Power BI DAX', icon: BarChart3, items: project.powerBiWork },
  ];

  return (
    <div className="rounded-2xl border border-[rgba(148,163,184,0.18)] overflow-hidden bg-[rgba(11,20,38,0.75)]">
      <div className="flex border-b border-[rgba(148,163,184,0.15)] bg-[rgba(5,10,20,0.6)]">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? 'text-white font-black border-b-2'
                  : 'text-[#94A3B8] hover:text-white font-semibold'
              }`}
              style={
                isActive
                  ? {
                      background: `linear-gradient(135deg, ${colors.accent}25, ${colors.secondary}15)`,
                      borderBottomColor: colors.accent,
                      color: '#FFFFFF'
                    }
                  : {}
              }
            >
              <TabIcon className="w-3.5 h-3.5" style={isActive ? { color: colors.accent } : {}} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="p-4 bg-[rgba(5,10,20,0.4)] space-y-2.5">
        {tabs.find(t => t.id === activeTab)?.items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors.accent }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 section-alt text-white section-separator relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="03"
          category="Featured Analytics Work"
          title="SELECTED CASE STUDIES."
          subtitle="End-to-end analytical pipelines built with SQL, Python, and Power BI — transforming raw business datasets into executive insights."
        />

        {/* Quick Case Study Jump Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {PROJECTS_DATA.map((p, idx) => {
            const colors = PROJECT_COLORS[idx % PROJECT_COLORS.length];
            return (
              <a
                key={p.id}
                href={`#case-study-${p.id}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] hover:border-[rgba(96,165,250,0.5)] hover:bg-[rgba(11,20,38,0.95)] transition-all cursor-pointer group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                  style={{ background: colors.accent }}
                />
                <span className="text-xs font-mono font-bold text-white group-hover:text-[#93C5FD] transition-colors">
                  {p.number}. {p.title.split('—')[0].split('(')[0].trim()}
                </span>
                <span className="text-[11px] font-mono text-[#CBD5E1] bg-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded-full font-medium">
                  {p.primaryMetricValue}
                </span>
              </a>
            );
          })}
        </div>

        <div className="space-y-16">
          {PROJECTS_DATA.map((project, index) => {
            const colors = PROJECT_COLORS[index % PROJECT_COLORS.length];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                id={`case-study-${project.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="glass-card-lg p-6 sm:p-9 relative overflow-hidden group scroll-mt-28"
              >
                {/* Top accent gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

                {/* Project Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[rgba(148,163,184,0.15)]">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r ${colors.gradient} text-white shadow-sm`}>
                      CASE STUDY {project.number}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#93C5FD] font-bold">{project.category}</span>
                  </div>
                  <span className="text-xs font-mono text-[#CBD5E1] font-semibold bg-[rgba(255,255,255,0.06)] px-2.5 py-1 rounded-full">
                    {project.date}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed">{project.subtitle}</p>
                </div>

                {/* Consolidated Executive KPI Ribbon (4 Metrics) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  {project.keyMetrics.slice(0, 4).map((metric, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] flex flex-col justify-center"
                    >
                      <div className="text-xs font-mono text-[#93C5FD] font-semibold uppercase tracking-wider truncate mb-1">
                        {metric.label}
                      </div>
                      <div className={`text-base sm:text-lg font-display font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Symmetrical Two-Column Content Layout */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* COLUMN 1: Strategic Business Case & Impact */}
                  <div className="flex flex-col justify-between space-y-5 h-full">
                    <div className="space-y-4">
                      {/* Business Problem */}
                      <div className="p-4 rounded-xl bg-[rgba(11,20,38,0.75)] border-l-2 border-[rgba(99,146,255,0.3)] space-y-1.5" style={{ borderLeftColor: colors.accent }}>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: colors.accent }}>
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Core Business Challenge</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                          {project.businessProblem}
                        </p>
                      </div>

                      {/* Business Impact */}
                      <div className="p-4 rounded-xl space-y-1.5" style={{ background: `${colors.accent}15`, border: `1px solid ${colors.accent}35` }}>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: colors.accent }}>
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Quantified Business Impact</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                          {project.businessImpact}
                        </p>
                      </div>

                      {/* Executive Recommendations */}
                      {project.recommendations && project.recommendations.length > 0 && (
                        <div className="p-4 rounded-xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] space-y-2">
                          <div className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: colors.accent }}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Executive Strategic Recommendations</span>
                          </div>
                          <div className="space-y-1.5">
                            {project.recommendations.slice(0, 3).map((rec, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors.accent }} />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="p-4 rounded-xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] space-y-2">
                        <div className="text-xs font-mono text-[#93C5FD] uppercase tracking-wider font-bold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Pipeline Technologies & Tooling</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="tech-pill text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View Full Case Study CTA */}
                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn-primary px-6 py-3.5 text-xs sm:text-sm font-semibold flex items-center gap-2 w-full justify-center sm:w-auto cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                        <span>Explore Full Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* COLUMN 2: Visual Artifacts & Technical Breakdown */}
                  <div className="flex flex-col justify-between space-y-4 h-full">
                    {/* Live Visual Showcase */}
                    <ImageGallery project={project} colors={colors} />

                    {/* Technical Engineering Breakdown Tabs */}
                    <WorkBreakdown project={project} colors={colors} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
