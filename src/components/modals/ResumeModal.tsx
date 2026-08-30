import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Printer, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrint = () => {
    const printWindow = window.open('/Prajith_P_Resume.pdf', '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#090E1A] border border-[rgba(96,165,250,0.3)] shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[rgba(11,20,38,0.95)] border-b border-[rgba(148,163,184,0.15)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] flex items-center justify-center text-[#38BDF8]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-display font-bold text-white block">Prajith P. — Resume</span>
                  <span className="text-xs font-mono text-[#93C5FD]">Original High-Resolution Document</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/Prajith_P_Resume.pdf"
                  download="Prajith_P_Resume.pdf"
                  className="px-3 py-1.5 rounded-lg bg-[rgba(59,130,246,0.15)] hover:bg-[rgba(59,130,246,0.25)] text-[#38BDF8] hover:text-white border border-[rgba(96,165,250,0.3)] text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Download Official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <a
                  href="/Prajith_P_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] text-[#CBD5E1] hover:text-white border border-[rgba(148,163,184,0.2)] transition-all cursor-pointer"
                  title="Open Original PDF in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={handlePrint}
                  className="p-1.5 rounded-lg bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] text-[#CBD5E1] hover:text-white border border-[rgba(148,163,184,0.2)] transition-all cursor-pointer"
                  title="Print Resume"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-[rgba(239,68,68,0.15)] hover:bg-[rgba(239,68,68,0.25)] text-[#F87171] hover:text-white border border-[rgba(239,68,68,0.3)] transition-all cursor-pointer ml-1"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resume Viewer Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#040810]/70 flex justify-center items-start">
              <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-300">
                <img
                  src="/Prajith_P_Resume.png"
                  alt="Prajith P. Official Resume"
                  className="w-full h-auto block select-none"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
