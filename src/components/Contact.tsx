import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Send, Mail, Phone, Github, Linkedin,
  CheckCircle, Loader2, Sparkles, Globe, MessageCircle, ArrowUpRight, AlertCircle
} from 'lucide-react';

// ── EmailJS Configuration ──────────────────────────────────
// 1. Create a free account at https://www.emailjs.com
// 2. Add your Gmail as an Email Service  →  copy Service ID
// 3. Create a template (use variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}})
//    →  copy Template ID
// 4. Go to Account → copy Public Key
// 5. Credentials with robust hardcoded fallbacks so it works out-of-the-box on both local and production
const EJS_SERVICE_ID   = (import.meta.env.VITE_EJS_SERVICE_ID  as string) || 'service_aveslul';
const EJS_TEMPLATE_ID  = (import.meta.env.VITE_EJS_TEMPLATE_ID as string) || 'template_rtifeix';
const EJS_AUTOREPLY_ID = (import.meta.env.VITE_EJS_AUTOREPLY_ID as string) || 'template_62nz397';
const EJS_PUBLIC_KEY   = (import.meta.env.VITE_EJS_PUBLIC_KEY  as string) || 'QCZofzW70x9iVLTjq';
// ──────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

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
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    else if (formData.message.length < 10) newErrors.message = 'Min 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const templateParams = {
      from_name:  formData.name,
      from_email: formData.email,
      subject:    formData.subject,
      message:    formData.message,
      reply_to:   formData.email,
    };
    try {
      const options = { publicKey: EJS_PUBLIC_KEY };

      // 1️⃣ Send the critical notification to YOU first
      await emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, templateParams, options);

      // 2️⃣ Try sending the auto-reply to the visitor. If it fails, do NOT block the form success.
      try {
        await emailjs.send(EJS_SERVICE_ID, EJS_AUTOREPLY_ID, templateParams, options);
      } catch (autoReplyErr) {
        console.warn('Auto-reply failed to send, but notification was successful:', autoReplyErr);
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      console.error('Main notification email failed to send:', err);
      // Display the actual EmailJS error if available, otherwise a generic fallback
      const errorMsg = err?.text || err?.message || 'Failed to send. Try WhatsApp below.';
      setSubmitError(errorMsg);
      setTimeout(() => setSubmitError(null), 8000); // Increased timeout to read the error
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    'w-full px-3 py-2.5 rounded-xl border text-sm font-medium bg-white dark:bg-slate-900/60 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 dark:focus:border-indigo-500/50';
  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${errors[field]
      ? 'border-red-400 ring-2 ring-red-400/20'
      : 'border-slate-200 dark:border-white/8 hover:border-slate-300 dark:hover:border-white/15'}`;

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

        {/* ── Content Grid ── */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* Left: Contact Sidebar */}
          <div
            className="lg:col-span-2 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-shadow duration-300 card-3d"
            data-reveal data-reveal-left data-delay="100"
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

          {/* Right: Form */}
          <div
            className="lg:col-span-3 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl p-5 sm:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-shadow duration-300 card-3d"
            data-reveal data-reveal-right data-delay="200"
          >
            {/* Form header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">Send a Message</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Fill the form below — I'll get back ASAP.</p>
              </div>
              {submitSuccess && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-100 dark:border-emerald-500/20 flex-shrink-0">
                  <CheckCircle size={11} />
                  <span>Sent!</span>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass('name')}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-[9px] text-red-500 font-bold mt-1 ml-0.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass('email')}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-[9px] text-red-500 font-bold mt-1 ml-0.5">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClass('subject')}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-[9px] text-red-500 font-bold mt-1 ml-0.5">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass('message')} resize-none`}
                  placeholder="Share your project idea or opportunity..."
                />
                {errors.message && <p className="text-[9px] text-red-500 font-bold mt-1 ml-0.5">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full overflow-hidden rounded-xl font-bold text-sm px-5 py-3 transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed cursor-pointer z-10
                  ${submitSuccess
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]'
                    : submitError
                    ? 'bg-rose-600 dark:bg-rose-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.25)]'
                    : isSubmitting
                    ? 'bg-slate-800 dark:bg-slate-700 text-white/80'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_rgba(99,102,241,0.25)]'
                  }
                `}
              >
                {/* Gradient shimmer on hover (Only in default state) */}
                {!isSubmitting && !submitSuccess && !submitError && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient pointer-events-none" />
                )}

                <div className="relative flex items-center justify-center gap-2 pointer-events-none">
                  {submitSuccess ? (
                    <div className="flex items-center gap-2 animate-scaleUp">
                      <CheckCircle size={15} />
                      <span>Message Sent Successfully!</span>
                    </div>
                  ) : submitError ? (
                    <div className="flex items-center gap-2 animate-shake">
                      <AlertCircle size={15} />
                      <span>Failed to Send. Retry?</span>
                    </div>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={15} />
                      <span>Send Message</span>
                      <Send size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </div>
              </button>

              {/* Error Message */}
              {submitError && (
                <div className="flex items-center gap-2 text-[11px] text-red-500 font-semibold bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg px-3 py-2">
                  <AlertCircle size={13} />
                  {submitError}
                </div>
              )}

              {/* Secondary WhatsApp fallback */}
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-[10px] text-slate-400">Or reach out directly via</span>
                <a
                  href={`https://wa.me/919344990461`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors"
                >
                  <MessageCircle size={11} />
                  WhatsApp
                </a>
              </div>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scaleUp {
          0% { transform: scale(0.95); opacity: 0; }
          70% { transform: scale(1.02); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-gradient { animation: gradient 3s linear infinite; }
        .animate-scaleUp { animation: scaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </section>
  );
};

export default Contact;
