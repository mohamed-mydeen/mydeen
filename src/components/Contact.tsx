import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  Building2,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  MessageSquare,
  Tag,
  ChevronDown,
  Check,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const ENQUIRY_CATEGORIES = [
  'Website Development',
  'Freelance Project',
  'Collaboration',
  'Job Opportunity',
  'General Enquiry',
  'Other',
] as const;

type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  enquiry_category: EnquiryCategory;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  full_name: '',
  email: '',
  phone: '',
  company: '',
  enquiry_category: 'Website Development',
  subject: '',
  message: '',
};

const DEVELOPER_SVG_PATH =
  'M 0 0 L 40 0 L 40 10 L 50 10 L 50 20 L 60 20 L 60 70 L 50 70 L 50 80 L 40 80 L 40 90 L 0 90 Z M 30 20 L 20 20 L 20 70 L 40 70 L 40 20 Z M 74 0 L 134 0 L 134 20 L 94 20 L 94 40 L 124 40 L 124 50 L 94 50 L 94 70 L 134 70 L 134 90 L 74 90 Z M 148 0 L 168 0 L 168 60 L 188 60 L 188 0 L 208 0 L 208 60 L 198 60 L 198 80 L 188 80 L 188 90 L 168 90 L 168 80 L 158 80 L 158 60 L 148 60 Z M 222 0 L 282 0 L 282 20 L 242 20 L 242 40 L 272 40 L 272 50 L 242 50 L 242 70 L 282 70 L 282 90 L 222 90 Z M 296 0 L 316 0 L 316 70 L 356 70 L 356 90 L 296 90 Z M 380 0 L 420 0 L 420 10 L 430 10 L 430 80 L 420 80 L 420 90 L 380 90 L 380 80 L 370 80 L 370 10 L 380 10 Z M 400 20 L 390 20 L 390 70 L 410 70 L 410 20 Z M 444 0 L 494 0 L 494 10 L 504 10 L 504 50 L 494 50 L 494 60 L 464 60 L 464 90 L 444 90 Z M 474 20 L 464 20 L 464 40 L 484 40 L 484 20 Z M 518 0 L 578 0 L 578 20 L 538 20 L 538 40 L 568 40 L 568 50 L 538 50 L 538 70 L 578 70 L 578 90 L 518 90 Z M 592 0 L 642 0 L 642 10 L 652 10 L 652 40 L 642 40 L 642 50 L 632 50 L 632 60 L 642 60 L 642 70 L 652 70 L 652 90 L 632 90 L 632 70 L 622 70 L 622 60 L 612 60 L 612 90 L 592 90 Z M 622 20 L 612 20 L 612 40 L 632 40 L 632 20 Z';

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function getContactEndpoint(): string {
  const configured = import.meta.env.VITE_CONTACT_API_URL as string | undefined;
  if (configured) return configured;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5174/api/contact';
  }
  return 'https://mydeenlabs.vercel.app/api/contact';
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inFlightRef = useRef<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const isMobileViewport = (): boolean =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    const isMobile = isMobileViewport();

    if (!form.full_name.trim() || form.full_name.trim().length < 2) {
      errors.full_name = 'Please enter your full name (at least 2 characters).';
    }
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!isMobile && (!form.subject.trim() || form.subject.trim().length < 2)) {
      errors.subject = 'Please enter a subject for your enquiry.';
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      errors.message = 'Please write a message (at least 5 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
    if (submitSuccess) setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current || submitting) return;

    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validate()) return;

    inFlightRef.current = true;
    setSubmitting(true);

    const isMobile = isMobileViewport();
    const trimmedMessage = form.message.trim();
    const preview = trimmedMessage.replace(/\s+/g, ' ').slice(0, 60);
    const effectiveSubject = isMobile
      ? `Mobile Enquiry: ${preview}${trimmedMessage.length > 60 ? '...' : ''}`
      : form.subject.trim();
    const effectiveCategory = isMobile ? 'General Enquiry' : form.enquiry_category;

    try {
      const response = await fetch(getContactEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: isMobile ? undefined : form.phone.trim() || undefined,
          company: isMobile ? undefined : form.company.trim() || undefined,
          enquiry_category: effectiveCategory,
          subject: effectiveSubject,
          message: trimmedMessage,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.ok) {
        throw new Error(
          payload?.error || 'Unable to send your message right now. Please try again.'
        );
      }

      trackEvent('contact_clicked', {
        category: effectiveCategory,
        method: 'contact_form',
      });

      setSubmitSuccess(true);
      setForm(INITIAL_FORM);
      setFieldErrors({});

      // Reset button state back after 4 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to send your message right now. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
      inFlightRef.current = false;
    }
  };

  return (
    <section
      id="contact"
      className="relative pt-16 sm:pt-20 pb-0 bg-[#A5A79B] dark:bg-[#141414] text-[#181818] dark:text-[#f2efe9] border-t border-black/10 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-left max-w-2xl" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D2B5]/40 dark:bg-white/5 border border-black/15 dark:border-white/10 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={12} className="text-[#181818] dark:text-[#E8D2B5]" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] tracking-tight leading-tight">
            Have an idea? Let&apos;s make it happen.
          </h2>
          <p className="text-sm sm:text-base opacity-80 mt-3 leading-relaxed">
            Whether you&apos;re planning a new web product, looking for a freelance full-stack engineer, or want to collaborate — drop a message below and I&apos;ll get back to you personally.
          </p>
        </div>

        {/* Main Grid: Form Window + Exact Pixel "DEVELOPER" Cutout Flush to Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left: OS-Inspired Contact Form Card */}
          <div
            className="lg:col-span-7 mb-12 sm:mb-16 rounded-2xl bg-[#E8D2B5]/95 dark:bg-[#1a1a1a] border border-black/15 dark:border-white/10 shadow-2xl overflow-visible backdrop-blur-md relative z-20"
            data-reveal
          >
            {/* Window Header Bar */}
            <div className="h-10 rounded-t-2xl bg-[#dbc3a4] dark:bg-[#252525] border-b border-black/10 dark:border-white/10 px-4 sm:px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-xs font-mono font-semibold opacity-75">
                  ~/contact/new-message.tsx
                </span>
              </div>
              <span className="text-[11px] font-mono opacity-65 hidden sm:inline">
                Direct to Inbox
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-7 space-y-5">
              {/* Error Banner */}
              {submitError && (
                <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/35 text-xs sm:text-sm text-red-900 dark:text-red-300 flex items-start gap-3">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Full Name <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="text"
                      required
                      value={form.full_name}
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border border-[#A5A79B]/50 dark:border-white/15 text-sm text-[#181818] dark:text-[#f2efe9] placeholder:opacity-45 focus:outline-none focus:border-[#181818] dark:focus:border-[#E8D2B5] transition-colors"
                    />
                  </div>
                  {fieldErrors.full_name && (
                    <p className="text-[11px] text-red-700 dark:text-red-400 mt-1 font-medium">
                      {fieldErrors.full_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Email Address <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border border-[#A5A79B]/50 dark:border-white/15 text-sm text-[#181818] dark:text-[#f2efe9] placeholder:opacity-45 focus:outline-none focus:border-[#181818] dark:focus:border-[#E8D2B5] transition-colors"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-700 dark:text-red-400 mt-1 font-medium">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone / WhatsApp & Company (Optional, hidden on mobile) */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Phone / WhatsApp <span className="opacity-50 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border border-[#A5A79B]/50 dark:border-white/15 text-sm text-[#181818] dark:text-[#f2efe9] placeholder:opacity-45 focus:outline-none focus:border-[#181818] dark:focus:border-[#E8D2B5] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Company / Organization <span className="opacity-50 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder="Acme Labs"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border border-[#A5A79B]/50 dark:border-white/15 text-sm text-[#181818] dark:text-[#f2efe9] placeholder:opacity-45 focus:outline-none focus:border-[#181818] dark:focus:border-[#E8D2B5] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Enquiry Type & Subject (Hidden on mobile for quick messaging) */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                <div ref={dropdownRef} className="relative">
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Type of Enquiry
                  </label>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="listbox"
                    className={`w-full flex items-center justify-between gap-2 pl-3.5 pr-3.5 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border text-sm text-[#181818] dark:text-[#f2efe9] transition-all cursor-pointer ${dropdownOpen
                      ? 'border-[#181818] dark:border-[#E8D2B5] ring-2 ring-[#A5A79B]/25'
                      : 'border-[#A5A79B]/50 dark:border-white/15 hover:border-[#181818]/40 dark:hover:border-white/30'
                      }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Tag size={15} className="opacity-50 shrink-0" />
                      <span className="truncate">{form.enquiry_category}</span>
                    </span>
                    <ChevronDown
                      size={15}
                      className={`opacity-60 shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute left-0 right-0 mt-2 p-1.5 rounded-2xl bg-[#fdfcf9]/95 dark:bg-[#1e1e1e]/95 backdrop-blur-xl border border-[#A5A79B]/45 dark:border-white/15 shadow-[0_18px_40px_rgba(24,24,24,0.18)] z-50 space-y-0.5"
                    >
                      {ENQUIRY_CATEGORIES.map((cat) => {
                        const isSelected = form.enquiry_category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              handleChange('enquiry_category', cat);
                              setDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left text-sm transition-colors cursor-pointer ${isSelected
                              ? 'bg-[#A5A79B]/30 dark:bg-[#E8D2B5]/15 font-semibold text-[#181818] dark:text-[#E8D2B5]'
                              : 'text-[#181818]/85 dark:text-[#f2efe9]/85 hover:bg-[#A5A79B]/15 dark:hover:bg-white/10'
                              }`}
                          >
                            <span>{cat}</span>
                            {isSelected && (
                              <Check size={14} className="text-[#181818] dark:text-[#E8D2B5] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                    Subject <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Full-stack web application project"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border border-[#A5A79B]/50 dark:border-white/15 text-sm text-[#181818] dark:text-[#f2efe9] placeholder:opacity-45 focus:outline-none focus:border-[#181818] dark:focus:border-[#E8D2B5] transition-colors"
                  />
                  {fieldErrors.subject && (
                    <p className="text-[11px] text-red-700 dark:text-red-400 mt-1 font-medium">
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Message <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 opacity-50" />
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell me about your project, timeline, goals, or how we can work together..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#fdfcf9] dark:bg-[#141414] border border-[#A5A79B]/50 dark:border-white/15 text-sm text-[#181818] dark:text-[#f2efe9] placeholder:opacity-45 focus:outline-none focus:border-[#181818] dark:focus:border-[#E8D2B5] transition-colors resize-y"
                  />
                </div>
                {fieldErrors.message && (
                  <p className="text-[11px] text-red-700 dark:text-red-400 mt-1 font-medium">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-[11px] font-mono opacity-65">
                  Protected &amp; delivered directly to Mohamed&apos;s inbox.
                </span>
                <button
                  type="submit"
                  disabled={submitting || submitSuccess}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md cursor-pointer disabled:cursor-not-allowed ${
                    submitSuccess
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500/50 scale-[1.02]'
                      : submitting
                      ? 'bg-[#181818] text-[#E8D2B5] dark:bg-[#E8D2B5] dark:text-[#181818] opacity-60'
                      : 'bg-[#181818] text-[#E8D2B5] dark:bg-[#E8D2B5] dark:text-[#181818] hover:opacity-90 active:scale-[0.99]'
                  }`}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <CheckCircle2 size={16} className="text-white" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Exact Reference-Style Pixel "DEVELOPER" Layered Cutout Flush at Bottom */}
          <div
            className="lg:col-span-5 self-end relative z-30 flex items-end justify-center pt-8 lg:pt-0 select-none"
            data-reveal
          >
            <div className="relative w-full max-w-[540px] flex items-end justify-center">
              {/* LAYER 1 (BEHIND PORTRAIT): Filled Pixel-Art SVG "DEVELOPER" */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[37%] -translate-y-1/2 flex justify-center z-0 pointer-events-none"
              >
                <svg
                  viewBox="0 0 652 90"
                  className="w-full max-w-[540px] h-auto"
                  fill="rgba(255, 255, 255, 0.44)"
                >
                  <path d={DEVELOPER_SVG_PATH} fillRule="evenodd" />
                </svg>
              </div>

              {/* LAYER 2 (MIDDLE): Static High-Res Cutout (Full Head & Face Always Visible, Soft Bottom Blend) */}
              <div className="relative z-10 flex items-end justify-center">
                <img
                  src="/contact-avatar.png"
                  alt="Mohamed Mydeen - Full Stack Developer"
                  className="h-[460px] sm:h-[520px] lg:h-[540px] xl:h-[620px] w-auto max-w-none object-contain object-bottom"
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(to bottom, black 0%, black 88%, rgba(0,0,0,0.65) 95%, transparent 100%)',
                    maskImage:
                      'linear-gradient(to bottom, black 0%, black 88%, rgba(0,0,0,0.65) 95%, transparent 100%)',
                  }}
                />
              </div>

              {/* LAYER 3 (IN FRONT OF PORTRAIT): Crisp Pixel-Art Outline "DEVELOPER" */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[37%] -translate-y-1/2 flex justify-center z-20 pointer-events-none"
              >
                <svg
                  viewBox="0 0 652 90"
                  className="w-full max-w-[540px] h-auto"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.88)"
                  strokeWidth="1.25"
                  strokeLinejoin="miter"
                >
                  <path d={DEVELOPER_SVG_PATH} fillRule="evenodd" />
                </svg>
              </div>

              {/* LAYER 4: Left Callout (Dot Anchored on Right Sleeve -> Line -> Two-line Label Clear of Card) */}
              <div className="hidden sm:flex items-center gap-1.5 absolute right-[72%] top-[47%] z-30 pointer-events-none">
                <span className="text-[11px] font-sans font-medium tracking-wide text-[#fdfcf9] drop-shadow-sm text-right leading-tight max-w-[92px]">
                  10+ Completed Projects
                </span>
                <svg width="24" height="14" viewBox="0 0 24 14" className="text-[#fdfcf9]/85 shrink-0">
                  <polyline points="0,5 12,5 24,11" fill="none" stroke="currentColor" strokeWidth="1.15" />
                </svg>
                <span className="w-2.5 h-2.5 rounded-full bg-[#fdfcf9] ring-4 ring-[#fdfcf9]/30 shrink-0" />
              </div>

              {/* LAYER 4: Right Callout (Dot Anchored on Left Arm -> Diagonal Line -> Translucent Box) */}
              <div className="hidden sm:flex items-start gap-1.5 absolute right-0 xl:right-auto xl:left-[73%] top-[50%] z-30 pointer-events-none w-[160px] xl:w-[192px]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fdfcf9] ring-4 ring-[#fdfcf9]/30 shrink-0 mt-4" />
                <svg width="20" height="18" viewBox="0 0 20 18" className="text-[#fdfcf9]/85 shrink-0 mt-1">
                  <polyline points="0,15 9,5 20,5" fill="none" stroke="currentColor" strokeWidth="1.15" />
                </svg>
                <div className="px-2.5 py-2 rounded-lg border border-[#fdfcf9]/30 bg-[#181818]/28 backdrop-blur-md text-left shadow-lg">
                  <p className="text-[11px] font-semibold text-[#fdfcf9] leading-tight">
                    4 Software Internships
                  </p>
                  <p className="text-[10px] text-[#fdfcf9]/85 leading-snug mt-1">
                    With a strong foundation in full-stack development, I build scalable web apps and AI systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
