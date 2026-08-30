import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import type { Certification } from '../types';
import {
  Calendar,
  Maximize2,
  X,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

type FilterCategory = 'all' | 'ai' | 'data' | 'cloud-bi';

function getIssuerMeta(issuer: string) {
  if (issuer.includes('OpenAI')) return { monogram: 'OA', name: 'OpenAI', color: '#10A37F' };
  if (issuer.includes('Microsoft')) return { monogram: 'MS', name: 'Microsoft', color: '#0078D4' };
  if (issuer.includes('Anthropic')) return { monogram: 'ANT', name: 'Anthropic', color: '#D97706' };
  if (issuer.includes('Oracle')) return { monogram: 'ORA', name: 'Oracle', color: '#EA580C' };
  if (issuer.includes('BCG')) return { monogram: 'BCG', name: 'BCG X', color: '#059669' };
  if (issuer.includes('Deloitte')) return { monogram: 'D.', name: 'Deloitte', color: '#86BC25' };
  if (issuer.includes('Simplilearn')) return { monogram: 'SL', name: 'Simplilearn', color: '#0284C7' };
  if (issuer.includes('LetsGrowMore')) return { monogram: 'LGM', name: 'LetsGrowMore', color: '#38BDF8' };
  return { monogram: 'CERT', name: issuer, color: '#38BDF8' };
}

function getCertCategory(cert: Certification): FilterCategory[] {
  switch (cert.id) {
    case 'openai-agents':
    case 'openai-applied-ai':
    case 'openai-ai-foundations':
    case 'anthropic-ai-fluency':
    case 'simplilearn-n8n-ai':
    case 'simplilearn-ai-marketing':
      return ['ai'];
    case 'bcg-ds':
    case 'deloitte-da':
    case 'letsgrowmore-cert':
      return ['data'];
    case 'oracle-db':
    case 'microsoft-power-bi-suite':
      return ['cloud-bi'];
    default:
      return ['data'];
  }
}

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Credentials' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'data', label: 'Data Analytics' },
  { id: 'cloud-bi', label: 'BI & Databases' },
];

export const CertificationsSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [suiteIdxMap, setSuiteIdxMap] = useState<Record<string, number>>({});

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filtered = filter === 'all'
    ? CERTIFICATIONS_DATA
    : CERTIFICATIONS_DATA.filter(c => getCertCategory(c).includes(filter));

  // Display 3 cards per view on desktop, 2 on tablet, 1 on mobile
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(0, totalPages - 1));
  const visibleItems = filtered.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage);

  const getSuiteIdx = (id: string) => suiteIdxMap[id] || 0;
  const setSuiteIdx = (id: string, idx: number) => setSuiteIdxMap(p => ({ ...p, [id]: idx }));

  const nextPage = () => setCurrentPage(p => (p + 1) % totalPages);
  const prevPage = () => setCurrentPage(p => (p - 1 + totalPages) % totalPages);

  return (
    <section id="certifications" className="py-14 section-alt text-white section-separator relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="05"
          category="Credentials & Accreditations"
          title="PROFESSIONAL CERTIFICATIONS."
          subtitle={`${CERTIFICATIONS_DATA.length} verified credentials from OpenAI, Microsoft, Anthropic, Oracle, BCG, Deloitte, and MSME.`}
        />

        {/* Compact Toolbar: Category Filters + Slider Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {FILTER_TABS.map((tab) => {
              const count = tab.id === 'all'
                ? CERTIFICATIONS_DATA.length
                : CERTIFICATIONS_DATA.filter(c => getCertCategory(c).includes(tab.id)).length;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[rgba(59,130,246,0.3)] text-white border border-[rgba(96,165,250,0.6)] shadow-sm'
                      : 'bg-[rgba(11,20,38,0.75)] text-[#CBD5E1] border border-[rgba(148,163,184,0.18)] hover:text-white hover:border-[rgba(96,165,250,0.4)]'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-1.5 py-0.2 rounded-full text-[11px] font-bold ${isActive ? 'bg-[rgba(59,130,246,0.5)] text-white' : 'bg-[rgba(255,255,255,0.08)] text-[#93C5FD]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slider Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-mono text-[#93C5FD] font-semibold mr-1">
                {safePage + 1} of {totalPages}
              </span>
              <button
                onClick={prevPage}
                className="w-8 h-8 rounded-full bg-[rgba(11,20,38,0.85)] border border-[rgba(148,163,184,0.2)] flex items-center justify-center text-[#CBD5E1] hover:text-white hover:border-[rgba(96,165,250,0.5)] transition-all cursor-pointer"
                aria-label="Previous credentials"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextPage}
                className="w-8 h-8 rounded-full bg-[rgba(11,20,38,0.85)] border border-[rgba(148,163,184,0.2)] flex items-center justify-center text-[#CBD5E1] hover:text-white hover:border-[rgba(96,165,250,0.5)] transition-all cursor-pointer"
                aria-label="Next credentials"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Linear/Apple-Style Horizontal Credential Cards Rail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          <AnimatePresence mode="wait">
            {visibleItems.map((cert) => {
              const meta = getIssuerMeta(cert.issuer);
              const hasSuite = cert.suiteImages && cert.suiteImages.length > 0;
              const suiteIdx = getSuiteIdx(cert.id);
              const displayImage = hasSuite ? cert.suiteImages![suiteIdx].src : cert.image;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card-lg p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-[rgba(96,165,250,0.45)] hover:shadow-xl"
                  style={{
                    background: 'rgba(11, 20, 38, 0.85)',
                    border: '1px solid rgba(148, 163, 184, 0.18)'
                  }}
                >
                  {/* Top glowing accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-75 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
                  />

                  <div>
                    {/* Issuer Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg shrink-0"
                          style={{ color: meta.color, background: `${meta.color}20`, border: `1px solid ${meta.color}50` }}
                        >
                          {meta.monogram}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#93C5FD] truncate">
                          {meta.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {cert.score && (
                          <span className="text-[11px] font-mono font-bold text-[#10B981] bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] px-2 py-0.5 rounded-full">
                            {cert.score}
                          </span>
                        )}
                        {cert.featured && !cert.score && (
                          <span className="text-[10px] font-mono font-bold text-[#34D399] bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Certificate Image Preview */}
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className="aspect-[16/9] rounded-xl overflow-hidden bg-[rgba(5,10,20,0.6)] border border-[rgba(148,163,184,0.15)] relative cursor-pointer group/img mb-3"
                    >
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={cert.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: `${meta.color}15` }}>
                          <Award className="w-10 h-10" style={{ color: meta.color }} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent opacity-60" />

                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-white/90 bg-black/70 backdrop-blur px-2 py-0.5 rounded opacity-0 group-hover/img:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3 text-[#38BDF8]" />
                        <span>Enlarge</span>
                      </div>
                    </div>

                    {/* Multi-Trophy Switcher for MS Suite */}
                    {hasSuite && cert.suiteImages!.length > 1 && (
                      <div className="flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-lg bg-[rgba(5,10,20,0.6)] border border-[rgba(148,163,184,0.15)] mb-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSuiteIdx(cert.id, (suiteIdx - 1 + cert.suiteImages!.length) % cert.suiteImages!.length);
                          }}
                          className="p-0.5 rounded text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-mono text-[#93C5FD] font-semibold truncate text-center flex-1">
                          {cert.suiteImages![suiteIdx].title} ({suiteIdx + 1}/{cert.suiteImages!.length})
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSuiteIdx(cert.id, (suiteIdx + 1) % cert.suiteImages!.length);
                          }}
                          className="p-0.5 rounded text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Credential Title & Description */}
                    <div>
                      <h4 className="text-base font-display font-bold text-white leading-snug line-clamp-2 mb-1 group-hover:text-[#38BDF8] transition-colors">
                        {cert.title}
                      </h4>
                      {cert.description && (
                        <p className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-2 font-normal">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="pt-3 mt-3 border-t border-[rgba(148,163,184,0.15)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#93C5FD] min-w-0">
                      {cert.verificationCode ? (
                        <div className="flex items-center gap-1 text-[#34D399] font-medium truncate" title={cert.verificationCode}>
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{cert.verificationCode}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#38BDF8]" />
                          <span>{cert.date}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[rgba(59,130,246,0.15)] hover:bg-[rgba(59,130,246,0.3)] text-[#93C5FD] hover:text-white border border-[rgba(96,165,250,0.3)] text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Dots Strip */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  safePage === i
                    ? 'w-7 bg-gradient-to-r from-[#2563EB] to-[#06B6D4]'
                    : 'w-2 bg-[rgba(148,163,184,0.25)] hover:bg-[rgba(148,163,184,0.5)]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const meta = getIssuerMeta(cert.issuer);
  const [suiteIdx, setSuiteIdx] = useState(0);
  const hasSuite = cert.suiteImages && cert.suiteImages.length > 0;
  const displayImage = hasSuite ? cert.suiteImages![suiteIdx].src : cert.image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card-lg max-w-3xl w-full overflow-hidden flex flex-col"
        style={{ background: 'rgba(8, 15, 30, 0.97)' }}
      >
        {/* Header */}
        <div className="p-5 border-b border-[rgba(148,163,184,0.15)] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1.5 rounded-full shrink-0 mt-0.5"
              style={{ color: meta.color, background: `${meta.color}25`, border: `1px solid ${meta.color}50` }}
            >
              {meta.monogram}
            </span>
            <div>
              <h3 className="text-lg font-display font-bold text-white">{cert.title}</h3>
              <div className="text-xs font-mono text-[#93C5FD] font-semibold mt-0.5">{cert.issuer}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(148,163,184,0.2)] text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Viewport */}
        <div className="p-4 flex items-center justify-center bg-[rgba(0,0,0,0.3)] overflow-auto max-h-[60vh]">
          {displayImage && (
            <img src={displayImage} alt={cert.title} className="max-h-[55vh] max-w-full object-contain rounded-xl border border-[rgba(148,163,184,0.18)]" />
          )}
        </div>

        {/* Suite navigation */}
        {hasSuite && cert.suiteImages!.length > 1 && (
          <div className="flex items-center gap-2 px-5 py-3 bg-[rgba(0,0,0,0.2)] border-t border-[rgba(148,163,184,0.15)]">
            <button
              onClick={() => setSuiteIdx(i => (i - 1 + cert.suiteImages!.length) % cert.suiteImages!.length)}
              className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#CBD5E1] hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#CBD5E1] font-medium flex-1 text-center">{cert.suiteImages![suiteIdx].title}</span>
            <span className="text-xs font-mono text-[#93C5FD] font-semibold">{suiteIdx + 1}/{cert.suiteImages!.length}</span>
            <button
              onClick={() => setSuiteIdx(i => (i + 1) % cert.suiteImages!.length)}
              className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#CBD5E1] hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="p-5 border-t border-[rgba(148,163,184,0.15)] space-y-3">
          {cert.description && <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">{cert.description}</p>}
          {cert.verificationCode && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#34D399] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span className="truncate">{cert.verificationCode}</span>
            </div>
          )}
          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map(s => <span key={s} className="tech-pill">{s}</span>)}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs font-mono text-[#93C5FD] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{cert.date}</span>
            {cert.score && <span className="ml-2 badge-expert px-2 py-0.5 rounded-full font-bold">{cert.score}</span>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
