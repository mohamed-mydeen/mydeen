import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Zap, CheckCircle, Loader2, ArrowRight } from 'lucide-react';

const PERKS = [
  { icon: '📬', text: 'New articles delivered to your inbox' },
  { icon: '🔬', text: 'Behind-the-scenes engineering insights' },
  { icon: '🚀', text: 'Early access to new projects & tools' },
  { icon: '🤫', text: 'Subscriber-only notes and ideas' },
];

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'subscribed'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('subscribed');
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/30">
            <Mail size={28} className="text-white" />
          </div>
          <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-3">Newsletter</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-4">
            The Engineering Digest
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Bi-weekly dispatches on AI engineering, full-stack architecture, and building products that matter. No noise — just signal.
          </p>
        </motion.div>

        {/* Perks grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
        >
          {PERKS.map((perk) => (
            <div
              key={perk.text}
              className="flex items-center gap-3 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 bg-slate-50 dark:bg-ink-900"
            >
              <span className="text-xl flex-shrink-0">{perk.icon}</span>
              <p className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">{perk.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Form or Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white dark:bg-ink-900 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        >
          {status === 'subscribed' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">You're subscribed! 🎉</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                Welcome aboard. You'll receive the next issue in your inbox. Check your email to confirm.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-5">
                <Zap size={16} className="text-indigo-500" />
                <h2 className="font-display font-bold text-slate-900 dark:text-white text-lg">Subscribe for free</h2>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-ink-800 text-[14px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold disabled:opacity-60 transition-all duration-200 shadow-lg shadow-indigo-500/20 whitespace-nowrap"
                >
                  {status === 'sending' ? (
                    <><Loader2 size={14} className="animate-spin" /> Subscribing...</>
                  ) : (
                    <>Subscribe <ArrowRight size={13} /></>
                  )}
                </button>
              </form>
              <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-3">
                No spam, ever. Unsubscribe anytime with one click. Your email stays private.
              </p>
            </>
          )}
        </motion.div>

      </div>
    </main>
  );
};

export default Newsletter;
