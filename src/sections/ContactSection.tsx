import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Send, CheckCircle2, ArrowRight, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/common/SocialIcons';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message || isSending) return;
    setIsSending(true);
    setSendError('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name || 'Website visitor'}`,
          _replyto: formData.email,
          _captcha: 'true',
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) throw new Error('Message could not be sent.');
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSendError('Unable to send the message right now. Please try again or use the email button above.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#000000] text-[#F5F5F7] relative overflow-hidden border-t border-white/10 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <SectionHeader number="07" category="Get in Touch" title="LET'S TURN DATA INTO DECISIONS." subtitle="Open to Data Analyst opportunities at Big 4 and global technology enterprises." darkTheme={true} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src="/prajith_profile.jpg" alt="Prajith P." className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#0071E3] shadow-md shrink-0" />
                <div><h3 className="text-2xl sm:text-3xl font-semibold font-display text-white">Connect directly with Prajith P.</h3><p className="text-[#0071E3] text-sm font-mono font-medium">Data Analyst & Business Intelligence Specialist</p></div>
              </div>
              <p className="text-[#A1A1A6] text-base font-sans leading-relaxed max-w-lg">Available for Data Analyst roles specializing in Python, SQL, Power BI, data pipeline cleaning, and predictive modeling.</p>
            </div>
            <div className="space-y-4 pt-2 font-sans">
              <div className="p-5 rounded-2xl bg-[#121217] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 truncate"><Mail className="w-5 h-5 text-[#0071E3] shrink-0" /><a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#0071E3] hover:text-[#0077ED] font-semibold text-base sm:text-lg flex items-center gap-1 transition-colors truncate"><span>Email Prajith</span><ArrowRight className="w-4 h-4" /></a></div>
                <button onClick={handleCopyEmail} className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 transition-colors cursor-pointer shrink-0 border border-white/10" title="Copy email address">{copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}</button>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl bg-[#121217] border border-white/10 hover:border-[#0071E3] flex items-center justify-between text-[#0071E3] font-semibold text-base transition-all group"><div className="flex items-center gap-2"><LinkedinIcon className="w-4 h-4" /><span>LinkedIn</span></div><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl bg-[#121217] border border-white/10 hover:border-[#0071E3] flex items-center justify-between text-[#0071E3] font-semibold text-base transition-all group"><div className="flex items-center gap-2"><GithubIcon className="w-4 h-4" /><span>GitHub</span></div><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></a>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-[#121217] border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#0071E3] font-medium mb-6">Send a Direct Message</h4>
              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 rounded-2xl bg-white/5 border border-white/10"><CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" /><h4 className="text-lg font-semibold font-display text-white">Message Sent Successfully</h4><p className="text-xs text-[#A1A1A6] font-sans">Your message has been sent to Prajith. Thank you for reaching out.</p><button type="button" onClick={() => setFormSubmitted(false)} className="text-xs text-[#0071E3] hover:underline">Send another message</button></div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-1.5 font-medium">Your Name</label><input type="text" required placeholder="e.g. Hiring Manager / Recruiter" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#0071E3] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors" /></div>
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-1.5 font-medium">Your Email Address</label><input type="email" required placeholder="name@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#0071E3] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors" /></div>
                  <div><label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1A6] mb-1.5 font-medium">Message / Project Scope</label><textarea required rows={4} placeholder="Discussing Data Analyst role or project requirement..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#0071E3] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-none" /></div>
                  {sendError && <div className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-xs text-red-300"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{sendError}</span></div>}
                  <button type="submit" disabled={isSending} className="w-full apple-btn-blue py-3.5 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed">{isSending ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></> : <><Send className="w-4 h-4" /><span>Send Message</span></>}</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
