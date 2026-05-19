import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('sent');
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Contact</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-4">
            Let's Talk
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Whether it's a collaboration, project idea, feedback on an article, or just saying hello — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center mb-5">
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">Message sent!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">I'll get back to you within a day or two.</p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/20 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
                  <input
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me more..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[13px] font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 disabled:opacity-60 transition-all"
                >
                  {status === 'sending' ? (
                    <><Loader2 size={14} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50 dark:bg-ink-900">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center mb-4">
                <Mail size={18} className="text-indigo-500" />
              </div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white text-[14px] mb-1">Email</h3>
              <p className="text-[13px] text-slate-500 dark:text-slate-400">Best for detailed conversations and collaborations.</p>
            </div>

            {[
              { icon: Github, label: 'GitHub', desc: 'See my code & projects', href: 'https://github.com/mohamed-mydeen' },
              { icon: Linkedin, label: 'LinkedIn', desc: 'Connect professionally', href: '#' },
            ].map(({ icon: Icon, label, desc, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50 dark:bg-ink-900 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-ink-800 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  <Icon size={16} className="text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-[13px]">{label}</p>
                  <p className="text-[12px] text-slate-500 dark:text-slate-500">{desc}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
