import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import type { Certification } from '../types';
import { Calendar, CheckCircle, Maximize2, X, ShieldCheck, Folder, ChevronRight } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeSuiteIndexMap, setActiveSuiteIndexMap] = useState<Record<string, number>>({});

  const getSuiteIndex = (certId: string) => activeSuiteIndexMap[certId] || 0;
  const setSuiteIndex = (certId: string, index: number) => {
    setActiveSuiteIndexMap((prev) => ({ ...prev, [certId]: index }));
  };

  return (
    <section id="certifications" className="py-28 bg-[#F5F5F7] text-[#1D1D1F] border-t border-[#D2D2D7]/50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          category="Accredited Credentials"
          title="PROFESSIONAL CERTIFICATIONS."
          subtitle="Verified certifications in AI Architecture, Data Science, Data Analytics, and SQL Database Architecture."
        />

        {/* Apple Grid Shelf Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS_DATA.map((cert, index) => {
            const hasSuite = cert.suiteImages && cert.suiteImages.length > 0;
            const currentSuiteIdx = getSuiteIndex(cert.id);
            const displayImage = hasSuite ? cert.suiteImages![currentSuiteIdx].src : cert.image;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="apple-card p-6 sm:p-7 border border-[#D2D2D7]/70 hover:border-[#0071E3]/50 transition-all flex flex-col justify-between group shadow-md hover:shadow-xl bg-white rounded-3xl"
              >
                <div className="space-y-5">
                  {/* Header Badge & Date */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[#0071E3] uppercase bg-[#0071E3]/10 border border-[#0071E3]/20 px-3 py-1 rounded-full">
                      {cert.issuer}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#6E6E73]">
                      <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Interactive Certificate Image / Suite Folder Preview */}
                  {displayImage && (
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className="relative bg-slate-900 rounded-2xl overflow-hidden border border-[#D2D2D7]/60 group-hover:border-[#0071E3]/50 cursor-pointer transition-all shadow-inner aspect-[1.4/1] flex items-center justify-center p-2"
                    >
                      <img
                        src={displayImage}
                        alt={cert.title}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.03]"
                      />

                      {/* Folder Album Overlay Tag */}
                      {hasSuite && (
                        <div className="absolute top-3 left-3 bg-[#0071E3] text-white px-3 py-1 rounded-full text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-md">
                          <Folder className="w-3.5 h-3.5" />
                          <span>Folder: {cert.suiteImages!.length} Certificates</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center gap-2 text-white text-xs font-mono font-medium">
                        <Maximize2 className="w-4 h-4 text-[#0071E3]" />
                        <span>{hasSuite ? "Open Certificate Folder Album" : "View Official Certificate"}</span>
                      </div>
                    </div>
                  )}

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-semibold font-display text-[#1D1D1F] leading-snug tracking-tight mb-2">
                      {cert.title}
                    </h3>
                    {cert.description && (
                      <p className="text-xs text-[#6E6E73] font-sans leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* Key Skills Pills */}
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#F5F5F7] text-[#1D1D1F] border border-[#D2D2D7]/60 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Verification Info */}
                <div className="pt-5 mt-6 border-t border-[#D2D2D7]/50 flex items-center justify-between text-xs font-sans">
                  {cert.score ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cert.score}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[#0071E3] font-medium bg-[#0071E3]/10 border border-[#0071E3]/20 px-3 py-1.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span>{hasSuite ? `${cert.suiteImages!.length} Verified Certificates` : "Verified Credential"}</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-[#0071E3] hover:text-[#0077ED] font-mono text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{hasSuite ? "Open Folder" : "Zoom"}</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Certificate / Folder Album Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[92vh] shadow-2xl border border-[#D2D2D7] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 bg-[#F5F5F7] border-b border-[#D2D2D7]/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-[#0071E3] uppercase block">
                      {selectedCert.issuer}
                    </span>
                    {selectedCert.suiteImages && (
                      <span className="text-[10px] font-mono bg-[#0071E3] text-white px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Folder className="w-3 h-3" /> Suite Folder ({selectedCert.suiteImages.length} Certs)
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-[#1D1D1F] mt-1">
                    {selectedCert.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full bg-[#E5E5EA] hover:bg-[#D1D1D6] text-[#1D1D1F] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suite Folder Album Navigation Bar (if present) */}
              {selectedCert.suiteImages && selectedCert.suiteImages.length > 0 && (
                <div className="p-3 bg-[#E5E5EA]/60 border-b border-[#D2D2D7]/60 overflow-x-auto flex items-center gap-2 scrollbar-thin">
                  {selectedCert.suiteImages.map((_, sIdx) => {
                    const isSelected = getSuiteIndex(selectedCert.id) === sIdx;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => setSuiteIndex(selectedCert.id, sIdx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${isSelected
                          ? 'bg-[#0071E3] text-white font-semibold shadow-md'
                          : 'bg-white text-[#1D1D1F] hover:bg-white/80 border border-[#D2D2D7]/60'
                          }`}
                      >
                        <span>Cert {sIdx + 1} of {selectedCert.suiteImages!.length}</span>
                        {isSelected && <ChevronRight className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Modal Certificate Image */}
              <div className="p-4 sm:p-6 bg-slate-950 flex-1 overflow-auto flex flex-col items-center justify-center min-h-[350px]">
                {selectedCert.suiteImages ? (
                  <div className="space-y-3 w-full flex flex-col items-center">
                    <div className="text-xs font-mono text-slate-300 bg-black/60 px-3 py-1 rounded-full border border-white/10 text-center">
                      {selectedCert.suiteImages[getSuiteIndex(selectedCert.id)].title}
                    </div>
                    <img
                      src={selectedCert.suiteImages[getSuiteIndex(selectedCert.id)].src}
                      alt={selectedCert.suiteImages[getSuiteIndex(selectedCert.id)].title}
                      className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                    />
                  </div>
                ) : (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                  />
                )}
              </div>

              {/* Modal Footer Verification Code */}
              <div className="p-4 sm:p-5 bg-[#F5F5F7] border-t border-[#D2D2D7]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#6E6E73]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
                  <span>{selectedCert.verificationCode || "Verified Official Credential"}</span>
                </div>

                <div className="text-[#1D1D1F] font-sans font-medium">
                  Issued: {selectedCert.date}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
