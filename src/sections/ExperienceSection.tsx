import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, FileText, Maximize2, X, Award, Image as ImageIcon } from 'lucide-react';

const STAGE_COLORS: Record<string, string> = {
  DATA: '#3B82F6',
  CLEAN: '#8B5CF6',
  ANALYZE: '#06B6D4',
  VISUALIZE: '#F59E0B',
  INSIGHT: '#10B981',
};

export const ExperienceSection: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; src: string; cid?: string } | null>(null);

  return (
    <section id="experience" className="py-28 bg-[#050A14] text-[#F0F4FF] section-separator relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="02"
          category="Work & Entrepreneurial Experience"
          title="PROFESSIONAL EXPERIENCE."
          subtitle="Hands-on experience in business dataset analysis, Power BI reporting, and small-scale business operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card-lg p-8 flex flex-col gap-6 relative overflow-hidden group"
            >
              {/* Card top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-[#60A5FA] font-mono text-xs font-bold uppercase bg-[rgba(59,130,246,0.1)] px-3 py-1.5 rounded-full border border-[rgba(59,130,246,0.2)]">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                  <span className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.06)] border border-[rgba(148,163,184,0.18)] px-3 py-1 rounded-full text-xs font-mono text-[#CBD5E1] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                    {exp.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#93C5FD] font-medium mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* MSME Verification Badge */}
                {exp.credentialId && (
                  <div className="p-4 rounded-2xl bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)] space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#34D399]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verified MSME Accreditation</span>
                      </div>
                      <span className="text-xs font-mono text-[#93C5FD] font-semibold">Issued {exp.issuedDate}</span>
                    </div>
                    <div className="text-xs font-mono text-[#CBD5E1] flex flex-wrap items-center gap-3">
                      <span>CID: <strong className="text-white font-bold">{exp.credentialId}</strong></span>
                      {exp.welcomeId && <span>Welcome CID: <strong className="text-white font-bold">{exp.welcomeId}</strong></span>}
                    </div>

                    {(exp.certificateImg || exp.welcomeLetterImg) && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {exp.welcomeLetterImg && (
                          <button
                            onClick={() => setSelectedDoc({ title: 'LetsGrowMore Internship Welcome Letter', src: exp.welcomeLetterImg!, cid: exp.welcomeId })}
                            className="p-2.5 rounded-xl bg-[rgba(11,20,38,0.8)] hover:bg-[rgba(59,130,246,0.15)] border border-[rgba(148,163,184,0.18)] hover:border-[rgba(96,165,250,0.5)] transition-all flex items-center justify-between text-left group/btn cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#60A5FA]" />
                              <div>
                                <div className="text-xs font-bold text-white">Welcome Letter</div>
                                <div className="text-xs font-mono text-[#93C5FD] font-medium">Nov 2025</div>
                              </div>
                            </div>
                            <Maximize2 className="w-3.5 h-3.5 text-[#60A5FA] opacity-60 group-hover/btn:opacity-100" />
                          </button>
                        )}
                        {exp.certificateImg && (
                          <button
                            onClick={() => setSelectedDoc({ title: 'LetsGrowMore Data Analyst Certificate', src: exp.certificateImg!, cid: exp.credentialId })}
                            className="p-2.5 rounded-xl bg-[rgba(11,20,38,0.8)] hover:bg-[rgba(59,130,246,0.15)] border border-[rgba(148,163,184,0.18)] hover:border-[rgba(96,165,250,0.5)] transition-all flex items-center justify-between text-left group/btn cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#60A5FA]" />
                              <div>
                                <div className="text-xs font-bold text-white">Completion Cert</div>
                                <div className="text-xs font-mono text-[#93C5FD] font-medium">June 2026</div>
                              </div>
                            </div>
                            <Maximize2 className="w-3.5 h-3.5 text-[#60A5FA] opacity-60 group-hover/btn:opacity-100" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Venture Images */}
                {exp.ventureImages && exp.ventureImages.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.18)] space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#93C5FD] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4" />
                        Venture Production Gallery
                      </span>
                      <span className="text-[#93C5FD] font-medium">Click to enlarge</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {exp.ventureImages.map((vImg, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => setSelectedDoc({ title: vImg.title, src: vImg.src })}
                          className="group/vImg relative rounded-xl overflow-hidden border border-[rgba(148,163,184,0.18)] bg-[rgba(11,20,38,0.6)] aspect-video cursor-pointer hover:border-[rgba(96,165,250,0.5)] transition-all"
                        >
                          <img src={vImg.src} alt={vImg.title} className="w-full h-full object-cover transition-transform duration-300 group-hover/vImg:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                            <div className="text-xs font-bold text-white truncate">{vImg.title}</div>
                          </div>
                          <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 backdrop-blur text-white opacity-0 group-hover/vImg:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3 text-[#60A5FA]" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities */}
                <div className="space-y-3 pt-1">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0 mt-1" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ETL Stages */}
              <div className="pt-5 border-t border-[rgba(148,163,184,0.15)]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-3 font-bold">
                  Analytical & Operational Workflow Stages
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {exp.etlStages.map((st, i) => {
                    const stageColor = STAGE_COLORS[st.stage] || '#3B82F6';
                    return (
                      <div key={i} className="p-3 rounded-xl bg-[rgba(11,20,38,0.75)] border border-[rgba(148,163,184,0.16)] space-y-1">
                        <div className="text-xs font-mono font-bold" style={{ color: stageColor }}>{st.stage}</div>
                        <div className="text-xs font-display font-bold text-white">{st.title}</div>
                        <div className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">{st.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-lg max-w-4xl w-full flex flex-col overflow-hidden"
              style={{ background: 'rgba(8, 15, 30, 0.95)' }}
            >
              <div className="p-5 border-b border-[rgba(99,146,255,0.1)] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-[#F0F4FF]">{selectedDoc.title}</h3>
                  {selectedDoc.cid && <span className="text-xs font-mono text-[#60A5FA]">CID: {selectedDoc.cid}</span>}
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(99,146,255,0.15)] text-[#F0F4FF] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex items-center justify-center overflow-auto max-h-[75vh]">
                <img
                  src={selectedDoc.src}
                  alt={selectedDoc.title}
                  className="max-h-[70vh] max-w-full object-contain rounded-xl border border-[rgba(99,146,255,0.12)]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
