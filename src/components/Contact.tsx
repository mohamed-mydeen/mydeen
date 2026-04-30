import React, { useState } from 'react';
import {
  Send, Phone, Mail, MapPin, Github, Linkedin, MessageCircle,
  CheckCircle, Timer, Loader2, Sparkles, Globe
} from 'lucide-react';

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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'At least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const msg = `New Contact Message 🚀\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage:\n${formData.message}`;
    setTimeout(() => {
      window.open(`https://wa.me/919344990461?text=${encodeURIComponent(msg)}`, '_blank');
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 800);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-300
    bg-white/80 dark:bg-slate-900/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50
    ${errors[field]
      ? 'border-red-400 dark:border-red-500/50 ring-2 ring-red-500/10'
      : 'border-slate-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30'
    }`;

  return (
    <section id="contact" className="pt-12 pb-20 bg-white dark:bg-[#0a0a0f] relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Modern Header Design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 mb-6">
            <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">Available for Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-['Space_Grotesk'] tracking-tight">
            Let's Start a <span className="text-indigo-600 dark:text-indigo-400">Conversation</span>
          </h2>
          <div className="w-16 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="glass-card p-8 border border-slate-200 dark:border-white/5 rounded-3xl bg-white/50 dark:bg-slate-900/30 backdrop-blur-xl group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 font-['Space_Grotesk']">
                Contact Details
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail size={18} />, label: 'Email Me', value: 'mohamedmydeen.sd@gmail.com', href: 'mailto:mohamedmydeen.sd@gmail.com', color: 'text-indigo-500' },
                  { icon: <Phone size={18} />, label: 'Call Me', value: '+91 93449 90461', href: 'tel:+919344990461', color: 'text-violet-500' },
                  { icon: <Globe size={18} />, label: 'Location', value: 'Tamil Nadu, India', color: 'text-emerald-500' }
                ].map((item, i) => (
                  <div key={i} className="group/item">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        <div className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center ${item.color} group-hover/item:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium truncate">{item.value}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                        <div className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center ${item.color}`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Links Sub-Panel */}
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/5">
                <div className="flex gap-3">
                  {[
                    { icon: <Github size={18} />, href: 'https://github.com/mohamed-mydeen' },
                    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/mohamed-mydeen4262' }
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all shadow-sm">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          
          <div className="lg:col-span-8">
            <div className="glass-card p-8 sm:p-10 border border-slate-200 dark:border-white/5 rounded-[2rem] bg-white dark:bg-slate-900/40 shadow-2xl relative">
              <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Send a Message
                </h3>
                {submitSuccess && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100 dark:border-emerald-500/20">
                    <CheckCircle size={14} /> Sent Successfully
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
                    <input
                      type="text" name="name"
                      value={formData.name} onChange={handleChange}
                      className={inputClass('name')}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
                    <input
                      type="email" name="email"
                      value={formData.email} onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="hello@example.com"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Subject</label>
                  <input
                    type="text" name="subject"
                    value={formData.subject} onChange={handleChange}
                    className={inputClass('subject')}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message} onChange={handleChange}
                    rows={4}
                    className={inputClass('message')}
                    placeholder="Tell me more about your project..."
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.message}</p>}
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 dark:bg-white px-8 py-4 font-bold text-white dark:text-slate-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-gradient text-white" />
                    
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Initializing WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle size={20} />
                          <span>Submit via WhatsApp</span>
                          <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </div>
                  </button>
                  <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">
                    Direct response within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
