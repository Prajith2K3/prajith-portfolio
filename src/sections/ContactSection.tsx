import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Send, CheckCircle2, ArrowRight, Copy, MapPin, MessageSquare } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/common/SocialIcons';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message || submitting) return;

    setSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send your message. Please try again.');
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormError(error instanceof Error ? error.message : 'Unable to send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 section-alt text-[#F0F4FF] section-separator relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="07"
          category="Get in Touch"
          title="LET'S TURN DATA INTO DECISIONS."
          subtitle="Open to Data Analyst opportunities, analytics consulting, and data-driven roles."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-lg p-6 sm:p-8 mb-12 max-w-2xl mx-auto text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-70" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[rgba(59,130,246,0.4)] glow-sm">
              <img src="/prajith_profile.jpg" alt="Prajith P." className="w-full h-full object-cover object-top" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-display font-bold text-white">Prajith P.</h3>
              <p className="text-sm gradient-text font-mono font-bold">Data Analyst</p>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#93C5FD] font-medium mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                {PERSONAL_INFO.location}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#34D399] bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            {PERSONAL_INFO.availabilityStatus}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Connect Directly with <span className="gradient-text">Prajith P.</span>
              </h4>
              <p className="text-[#CBD5E1] text-base leading-relaxed font-normal">
                Available for Data Analyst roles specializing in Python, SQL, Power BI, data pipeline engineering, and predictive modeling.
              </p>
            </div>

            <div className="glass-card p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(59,130,246,0.15)] border border-[rgba(96,165,250,0.3)] shrink-0">
                  <Mail className="w-5 h-5 text-[#93C5FD]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[#93C5FD] font-semibold mb-0.5">Email Address</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[#38BDF8] hover:text-white font-bold text-sm sm:text-base flex items-center gap-1 transition-colors truncate"
                  >
                    {PERSONAL_INFO.email}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(59,130,246,0.15)] border border-[rgba(148,163,184,0.2)] hover:border-[rgba(96,165,250,0.5)] text-[#CBD5E1] hover:text-white transition-all cursor-pointer shrink-0"
                title="Copy email address"
                type="button"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-between text-[#93C5FD] hover:text-white font-bold group/link"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">LinkedIn</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-between text-[#93C5FD] hover:text-white font-bold group/link"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-5 h-5" />
                  <span className="text-sm sm:text-base">GitHub</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="glass-card p-5 space-y-3">
              <div className="text-xs font-mono text-[#93C5FD] uppercase tracking-wider font-bold mb-2">Quick Facts</div>
              {[
                { label: 'Availability', value: 'Immediate' },
                { label: 'Work Mode', value: 'Remote / On-site / Hybrid' },
                { label: 'Location', value: PERSONAL_INFO.location },
                { label: 'Response Time', value: '< 24 hours' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm sm:text-base">
                  <span className="text-[#CBD5E1] font-mono font-medium">{label}</span>
                  <span className="text-white font-bold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="glass-card-lg p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] opacity-80" />

              <div className="flex items-center gap-2 text-[#93C5FD] mb-6">
                <MessageSquare className="w-5 h-5 text-[#38BDF8]" />
                <h4 className="text-sm sm:text-base font-mono uppercase tracking-wider font-bold text-white">Send a Direct Message</h4>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 text-center space-y-3 rounded-2xl bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto" />
                  <h4 className="text-xl font-display font-bold text-white">Message Delivered!</h4>
                  <p className="text-sm sm:text-base text-[#CBD5E1]">
                    Thank you. Prajith will review your inquiry and get back within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: 'Your Name', type: 'text', key: 'name' as const, placeholder: 'e.g. Hiring Manager / Recruiter' },
                    { label: 'Your Email Address', type: 'email', key: 'email' as const, placeholder: 'name@company.com' },
                  ].map(({ label, type, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-1.5 font-bold">
                        {label}
                      </label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full px-4 py-3 text-sm font-medium input-dark"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#93C5FD] mb-1.5 font-bold">
                      Message / Project Scope
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Discussing Data Analyst role or project requirement..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm font-medium input-dark resize-none"
                    />
                  </div>

                  {formError && (
                    <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send className={`w-4 h-4 ${submitting ? 'animate-pulse' : ''}`} />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
