import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck, FileText, Maximize2, X, Award, Image as ImageIcon } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; src: string; cid?: string } | null>(null);

  return (
    <section id="experience" className="py-28 bg-[#000000] text-[#F5F5F7] relative overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="02"
          category="Work & Entrepreneurial Experience"
          title="PROFESSIONAL EXPERIENCE."
          subtitle="Hands-on experience in business dataset analysis, Power BI reporting, and small-scale business operations."
          darkTheme={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {WORK_EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="apple-card-dark p-8 border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-[#0071E3] font-mono text-xs font-semibold uppercase bg-[#0071E3]/10 px-3 py-1 rounded-full border border-[#0071E3]/20">
                    <Briefcase className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1A6]">
                    <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      <Calendar className="w-3 h-3 text-[#0071E3]" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold font-display text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#A1A1A6] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Government & CID Verification Badge (if present) */}
                {exp.credentialId && (
                  <div className="p-3.5 rounded-2xl bg-[#0071E3]/10 border border-[#0071E3]/30 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Verified MSME Accreditation</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#A1A1A6]">Issued {exp.issuedDate}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-300 flex flex-wrap items-center gap-3">
                      <span>CID: <strong className="text-white">{exp.credentialId}</strong></span>
                      {exp.welcomeId && <span>Welcome CID: <strong className="text-white">{exp.welcomeId}</strong></span>}
                    </div>

                    {/* Document Thumbnails Row */}
                    {(exp.certificateImg || exp.welcomeLetterImg) && (
                      <div className="pt-2 grid grid-cols-2 gap-2">
                        {exp.welcomeLetterImg && (
                          <button
                            onClick={() => setSelectedDoc({
                              title: "LetsGrowMore Internship Welcome Letter",
                              src: exp.welcomeLetterImg!,
                              cid: exp.welcomeId
                            })}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 transition-all flex items-center justify-between text-left group/btn cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#0071E3]" />
                              <div>
                                <div className="text-xs font-semibold text-white">Welcome Letter</div>
                                <div className="text-[10px] font-mono text-[#A1A1A6]">Nov 2025</div>
                              </div>
                            </div>
                            <Maximize2 className="w-3.5 h-3.5 text-[#0071E3] opacity-60 group-hover/btn:opacity-100" />
                          </button>
                        )}

                        {exp.certificateImg && (
                          <button
                            onClick={() => setSelectedDoc({
                              title: "LetsGrowMore Data Analyst Certificate of Completion",
                              src: exp.certificateImg!,
                              cid: exp.credentialId
                            })}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 transition-all flex items-center justify-between text-left group/btn cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-amber-400" />
                              <div>
                                <div className="text-xs font-semibold text-white">Completion Cert</div>
                                <div className="text-[10px] font-mono text-[#A1A1A6]">June 2026</div>
                              </div>
                            </div>
                            <Maximize2 className="w-3.5 h-3.5 text-[#0071E3] opacity-60 group-hover/btn:opacity-100" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Entrepreneurial / Venture Operational Images Showcase */}
                {exp.ventureImages && exp.ventureImages.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0071E3] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#0071E3]" />
                        <span>Venture Production & Packaging Gallery</span>
                      </span>
                      <span className="text-[10px] text-[#A1A1A6] font-normal">Click to enlarge</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {exp.ventureImages.map((vImg, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => setSelectedDoc({
                            title: vImg.title,
                            src: vImg.src
                          })}
                          className="group/vImg relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video cursor-pointer hover:border-[#0071E3]/60 transition-all text-left"
                        >
                          <img
                            src={vImg.src}
                            alt={vImg.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/vImg:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2 flex flex-col justify-end">
                            <div className="text-[11px] font-semibold text-white truncate">{vImg.title}</div>
                            <div className="text-[9px] font-mono text-[#0071E3] truncate">Malappuram, Kerala</div>
                          </div>
                          <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md text-white opacity-0 group-hover/vImg:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3 text-[#0071E3]" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 pt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm font-sans text-[#A1A1A6] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ETL Stages Pipeline Footer */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#0071E3] mb-3 font-semibold">
                  Analytical & Operational Workflow Stages
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exp.etlStages.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-mono text-[#0071E3] font-semibold">{st.stage}</div>
                      <div className="text-xs font-semibold font-display text-white">{st.title}</div>
                      <div className="text-[11px] font-sans text-[#A1A1A6] leading-relaxed">{st.description}</div>
                    </div>
                  ))}
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D0E12] rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/20 flex flex-col text-white"
            >
              <div className="p-4 sm:p-6 bg-[#14151C] border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">{selectedDoc.title}</h3>
                  {selectedDoc.cid && <span className="text-xs font-mono text-[#0071E3]">CID: {selectedDoc.cid}</span>}
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-center overflow-auto max-h-[75vh]">
                <img
                  src={selectedDoc.src}
                  alt={selectedDoc.title}
                  className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
