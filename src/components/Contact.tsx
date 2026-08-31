import React from 'react';
import {
  Mail, Phone, Github, Linkedin,
  Sparkles, Globe, ArrowUpRight
} from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: <Mail size={14} />,
    label: 'Email',
    value: 'mohamedmydeen.sd@gmail.com',
    href: 'mailto:mohamedmydeen.sd@gmail.com',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100/50',
  },
  {
    icon: <Phone size={14} />,
    value: '+91 93449 90461',
    label: 'Phone',
    href: 'tel:+919344990461',
    color: 'bg-violet-50 text-violet-600 border-violet-100/50',
  },
  {
    icon: <Globe size={14} />,
    value: 'Tamil Nadu, India',
    label: 'Location',
    href: undefined,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100/50',
  },
];

const SOCIAL = [
  { icon: <Github size={15} />, href: 'https://github.com/mohamed-mydeen', label: 'GitHub' },
  { icon: <Linkedin size={15} />, href: 'https://linkedin.com/in/mohamed-mydeen4262', label: 'LinkedIn' },
];

const Contact: React.FC = () => {

  return (
    <section
      id="contact"
      className="py-14 bg-white dark:bg-[#0a0a0f] relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle ambient blobs */}
      <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-emerald-500/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-4">
            <Sparkles size={11} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-400">Available for Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight mb-3">
            Let's Build Something <span className="text-indigo-600 dark:text-indigo-400">Together</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Open to internships, freelance projects, and full-time opportunities.
          </p>
        </div>

        {/* ── Content Container ── */}
        <div className="max-w-xl mx-auto">

          {/* Contact Information */}
          <div
            className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-shadow duration-300 card-3d"
            data-reveal data-delay="100"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Direct Contact
            </p>

            {/* Contact rows */}
            <div className="space-y-3 mb-5">
              {CONTACT_INFO.map((item, i) => {
                const content = (
                  <div className="flex items-center gap-3 group/row">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/row:scale-105 ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider leading-none mb-0.5">{item.label}</p>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{item.value}</p>
                    </div>
                    {item.href && (
                      <ArrowUpRight size={12} className="ml-auto text-slate-300 dark:text-slate-600 group-hover/row:text-indigo-500 transition-colors duration-200 flex-shrink-0" />
                    )}
                  </div>
                );
                return item.href ? (
                  <a key={i} href={item.href} className="block hover:bg-slate-50 dark:hover:bg-white/3 rounded-xl px-2 py-1.5 -mx-2 transition-colors duration-200">
                    {content}
                  </a>
                ) : (
                  <div key={i} className="px-2 py-1.5 -mx-2">{content}</div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Socials</p>
              <div className="flex gap-2">
                {SOCIAL.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="mt-5 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl px-3 py-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">Available · Responds within 24h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
