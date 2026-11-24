import React, { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Award, 
  ExternalLink, 
  X, 
  ArrowUpRight, 
  Bookmark,
  CheckCircle2,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface Internship {
  period: string;
  title: string;
  company: string;
  location: string;
  desc: string;
  highlights: string[];
  tech: string[];
}

interface Degree {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  desc: string;
  honors?: string;
}

interface Certification {
  name: string;
  issuer: string;
  detail: string;
}

const INTERNSHIPS: Internship[] = [
  {
    period: 'Remote USA • 1 Month',
    title: 'Software Developer Intern',
    company: 'Skill Software Inc',
    location: 'USA (Remote)',
    desc: 'Migrated legacy Selenium automation suites to Python Playwright, significantly improving automated test execution speed and pipeline reliability across cloud deployment workflows.',
    highlights: [
      'Migrated Selenium test suites to Playwright in Python',
      'Enhanced automated test execution speed & pipeline reliability',
      'Configured cloud deployment workflows and AWS infrastructure'
    ],
    tech: ['Python', 'Playwright', 'Selenium', 'AWS']
  },
  {
    period: 'Jun 2024 – Jul 2024',
    title: 'Full Stack Developer Intern',
    company: 'Asta Systech Pvt. Ltd',
    location: 'Tamil Nadu, India',
    desc: 'Architected and engineered a full-stack CRUD web application with Java Spring Boot backend and React.js frontend, integrated with high-performance RESTful APIs.',
    highlights: [
      'Architected CRUD application with Spring Boot & React.js',
      'Designed REST API endpoints and JPA/Hibernate persistence layer',
      'Optimized MySQL queries for efficient data retrieval'
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST API']
  },
  {
    period: 'Jun 2025 – Jul 2025',
    title: 'Full Stack Web Development Intern',
    company: 'Gateway Software Solutions',
    location: 'Coimbatore, India',
    desc: 'Completed an intensive full-stack internship developing modern web platforms across frontend and backend technologies. Handled database layers and responsive client interfaces.',
    highlights: [
      'Developed responsive web interfaces using modern frontend frameworks',
      'Integrated REST APIs and engineered server-side database handling',
      'Followed end-to-end Agile software development lifecycle practices'
    ],
    tech: ['React.js', 'JavaScript', 'REST API', 'MySQL', 'Node.js']
  },
  {
    period: '2024 (1 Month)',
    title: 'Data Application Intern',
    company: 'IPCS Global',
    location: 'Tamil Nadu, India',
    desc: 'Engineered a data-driven web application using Python, Streamlit, and MySQL with responsive custom interface design and automated data processing.',
    highlights: [
      'Built end-to-end data-driven web product from scratch',
      'Managed database migrations and SQL schema design'
    ],
    tech: ['Python', 'Streamlit', 'MySQL', 'HTML/CSS']
  }
];

const EDUCATION: Degree[] = [
  {
    period: '2023 – 2027',
    degree: 'B.Tech in Computer Science & Business Systems',
    institution: 'Francis Xavier Engineering College',
    location: 'Tirunelveli, Tamil Nadu',
    score: 'CGPA: 7.81',
    desc: 'Rigorous computer science curriculum spanning Algorithms, Software Engineering, Database Architecture, Distributed Systems, Cloud Infrastructure, and Artificial Intelligence.'
  },
  {
    period: '2021 – 2023',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Time Matric Higher Secondary School',
    location: 'Tamil Nadu, India',
    score: 'Percentage: 83.17%',
    desc: 'Mathematics & Computer Science major. Built fundamental computer programming logic and algorithms.',
    honors: 'Awarded Best Student of the Year (2022–2023) for outstanding character, discipline, consistency, and academic excellence.'
  }
];

const CERTIFICATIONS: Certification[] = [
  { name: 'Internet of Things – IIT Kharagpur', issuer: 'NPTEL', detail: '80% Score (Elite)' },
  { name: 'Java Essentials', issuer: 'LinkedIn Learning', detail: 'Verified' },
  { name: 'Git Essential Training', issuer: 'LinkedIn Learning', detail: 'Verified' },
  { name: 'Web Development & C Programming', issuer: 'Udemy', detail: 'Verified' },
  { name: 'Python Programming', issuer: 'Cisco Networking Academy', detail: 'Verified' }
];

export const Education: React.FC = () => {
  const [showCertsModal, setShowCertsModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');

  return (
    <section
      id="education"
      className="relative w-full bg-[#E8D2B5] dark:bg-[#141414] text-[#181818] dark:text-[#f2efe9] transition-colors duration-200 border-t border-[#A5A79B]/20 dark:border-white/10 lg:min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden flex flex-col justify-center py-16 lg:py-0 px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-0 select-none"
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl w-full flex flex-col justify-center lg:h-full lg:pt-14 lg:pb-6 relative z-10">
        
        {/* Section Header — Clean Left-Aligned Hierarchy Matching About Section */}
        <div className="mb-3 lg:mb-4 text-left shrink-0 flex flex-col sm:flex-row sm:items-end justify-between gap-3" data-reveal>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A5A79B]/20 dark:bg-white/5 border border-[#A5A79B]/40 dark:border-white/10 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
              <BookOpen size={12} className="text-[#A5A79B]" />
              <span>Developer Chronicle &bull; Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] tracking-tight text-[#181818] dark:text-[#f2efe9]">
              Experience &amp; Education
            </h2>
            <p className="text-xs sm:text-sm opacity-75 mt-1 max-w-2xl font-normal text-left">
              An open book chronicle &mdash; 4 engineering internships, computer science education, and verified credentials presented in full detail.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#A5A79B] text-[#181818] border-[#A5A79B] font-semibold shadow-xs'
                  : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              All Chronicle Spread
            </button>
            <button
              onClick={() => setShowCertsModal(true)}
              className="px-3 py-1.5 rounded-lg border border-[#A5A79B]/40 text-[#181818] dark:text-[#E8D2B5] bg-[#A5A79B]/20 hover:bg-[#A5A79B]/30 font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <Award size={12} className="text-[#A5A79B]" />
              <span>5 Verified Credentials</span>
            </button>
          </div>
        </div>

        {/* ─── REALISTIC EXPANSIVE HARDCOVER BOOK SPREAD ─────────────────────────── */}
        <div 
          className="relative rounded-3xl bg-[#A5A79B]/30 dark:bg-[#161616] p-3 sm:p-4 border border-[#A5A79B]/40 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col shrink min-h-0 lg:h-[580px] xl:h-[630px]"
          data-reveal
        >
          {/* Hanging Ribbon Bookmark (Top Right Edge) */}
          <div 
            onClick={() => setShowCertsModal(true)}
            className="absolute top-0 right-14 sm:right-20 w-7 h-12 sm:h-14 bg-[#A5A79B] shadow-md z-30 cursor-pointer hover:h-16 transition-all duration-200 flex flex-col items-center justify-end pb-1"
            title="Click ribbon to view verified credentials"
          >
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[8px] border-b-[#A5A79B]/30 dark:border-b-[#161616]" />
          </div>

          {/* Inner Pages Spread (Two Facing Parchment Pages) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative rounded-2xl bg-[#fdfcf9] dark:bg-[#1c1c1c] border border-black/10 dark:border-white/10 shadow-inner overflow-hidden flex-1 min-h-0">
            
            {/* Center Book Spine Binding Line & Shadow (Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 pointer-events-none z-20 shadow-[inset_0_0_18px_rgba(0,0,0,0.14)] dark:shadow-[inset_0_0_24px_rgba(0,0,0,0.5)] border-x border-black/5 dark:border-white/5" />

            {/* =========================================================================
                LEFT PAGE: COMPLETE PROFESSIONAL EXPERIENCE (ALL 4 INTERNSHIPS)
                ========================================================================= */}
            <div className="p-5 sm:p-6 lg:p-7 xl:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 relative overflow-hidden flex-1 min-h-0">
              
              {/* Running Page Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-[#A5A79B]" />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-black/70 dark:text-white/70">
                    Chapter I &bull; Professional Experience (4 Roles)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#A5A79B] dark:text-[#E8D2B5] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                  p. 01
                </span>
              </div>

              {/* Scrollable Internships Parchment Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain pr-2 space-y-3.5 scrollbar-thin">
                {INTERNSHIPS.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:border-[#A5A79B]/50 transition-colors"
                  >
                    {/* Period & Tech Highlights */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#A5A79B] dark:text-[#E8D2B5]">
                        {item.period}
                      </span>
                      <span className="text-[10px] font-mono opacity-60">
                        {item.location}
                      </span>
                    </div>

                    {/* Job Title & Company */}
                    <h4 className="text-base font-bold font-['Space_Grotesk'] text-[#181818] dark:text-[#f2efe9] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-black/80 dark:text-white/80 mt-0.5 flex items-center gap-1.5">
                      <Building2 size={13} className="text-[#A5A79B]" />
                      <span>{item.company}</span>
                    </p>

                    {/* Overview description */}
                    <p className="text-xs text-black/75 dark:text-white/75 mt-2 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Full Bullet Points Highlights (No Data Missed!) */}
                    <ul className="mt-2.5 space-y-1 pt-2 border-t border-black/5 dark:border-white/5">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-black/70 dark:text-white/70 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A5A79B] mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tech.map((t, i) => (
                        <span 
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Page Footer */}
              <div className="pt-3 mt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono opacity-60 shrink-0">
                <span>Mohamed Mydeen &bull; Software Engineering Career</span>
                <span className="hidden sm:inline">Turn right for Academic Degrees &rarr;</span>
              </div>
            </div>

            {/* =========================================================================
                RIGHT PAGE: ACADEMIC DEGREES + VERIFIED CREDENTIALS
                ========================================================================= */}
            <div className="p-5 sm:p-6 lg:p-7 xl:p-8 flex flex-col justify-between relative overflow-hidden flex-1 min-h-0">
              
              {/* Running Page Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#A5A79B]" />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-black/70 dark:text-white/70">
                    Chapter II &bull; Academics &amp; Verified Credentials
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#A5A79B] dark:text-[#E8D2B5] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                  p. 02
                </span>
              </div>

              {/* Scrollable Academics & Credentials Content */}
              <div className="flex-1 overflow-y-auto overscroll-contain pr-2 space-y-3.5 scrollbar-thin">
                
                {/* 1. Academic Degrees */}
                {EDUCATION.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 hover:border-[#A5A79B]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#A5A79B] dark:text-[#E8D2B5]">
                        {item.period}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {item.score}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-['Space_Grotesk'] text-[#181818] dark:text-[#f2efe9] leading-snug">
                      {item.degree}
                    </h4>
                    <p className="text-xs font-semibold text-black/80 dark:text-white/80 mt-0.5">
                      {item.institution} <span className="opacity-60 font-normal">({item.location})</span>
                    </p>

                    <p className="text-xs text-black/75 dark:text-white/75 mt-2 leading-relaxed">
                      {item.desc}
                    </p>

                    {item.honors && (
                      <div className="mt-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        <Award size={14} className="text-amber-500 shrink-0" />
                        <span>{item.honors}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* 2. Verified Technical Credentials Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-[#A5A79B]/10 to-transparent border border-[#A5A79B]/30">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#181818] dark:text-[#E8D2B5] uppercase tracking-wide">
                      <Award size={14} className="text-[#A5A79B]" />
                      <span>Verified Technical Credentials (5)</span>
                    </div>
                    <button
                      onClick={() => setShowCertsModal(true)}
                      className="text-[11px] font-mono font-bold text-[#A5A79B] dark:text-[#E8D2B5] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Expand All</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CERTIFICATIONS.map((cert, i) => (
                      <div 
                        key={i}
                        className="p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <p className="text-xs font-bold text-[#181818] dark:text-[#f2efe9] truncate">
                            {cert.name}
                          </p>
                          <p className="text-[10px] font-mono opacity-60">
                            {cert.issuer}
                          </p>
                        </div>
                        <span className="font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded shrink-0">
                          {cert.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Page Footer */}
              <div className="pt-3 mt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono shrink-0">
                <span className="opacity-60">Academic &amp; Skill Validations</span>
                <button
                  onClick={() => setShowCertsModal(true)}
                  className="font-bold text-[#A5A79B] dark:text-[#E8D2B5] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Verified Badges Modal</span>
                  <ExternalLink size={12} />
                </button>
              </div>

            </div>

          </div>

          {/* Book Bottom Outer Rim Bar */}
          <div className="h-9 px-4 flex items-center justify-between text-xs font-mono opacity-75 shrink-0 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A5A79B]" />
              <span>Developer Chronicle &bull; 4 Engineering Internships &amp; 2 Degrees</span>
            </div>
            <span className="hidden sm:inline">Hardbound Interactive Spread &bull; All Milestones Preserved</span>
          </div>
        </div>

      </div>

      {/* ─── FULL CREDENTIALS MODAL ────────────────────────────────────────────── */}
      {showCertsModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none" 
          onClick={() => setShowCertsModal(false)}
        >
          <div 
            className="bg-[#E8D2B5] dark:bg-[#1a1a1a] border border-[#A5A79B]/30 dark:border-white/15 w-full max-w-lg rounded-2xl shadow-2xl relative flex flex-col overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#A5A79B]/20 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#A5A79B]/20 flex items-center justify-center text-[#181818] dark:text-[#E8D2B5] border border-[#A5A79B]/30">
                  <Award size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-[#181818] dark:text-[#f2efe9] font-['Space_Grotesk'] leading-none">
                    Verified Technical Credentials
                  </h4>
                  <p className="text-[10px] text-black/60 dark:text-white/60 font-mono mt-1">
                    5 Specializations Validated
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCertsModal(false)}
                className="p-1.5 opacity-60 hover:opacity-100 rounded-lg transition-colors cursor-pointer text-[#181818] dark:text-[#f2efe9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              {CERTIFICATIONS.map((cert, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-[#A5A79B]/20 dark:bg-[#252525] border border-[#A5A79B]/30 dark:border-white/10 flex items-center justify-between gap-4 transition-all hover:border-[#A5A79B]/60 dark:hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#A5A79B]/20 text-[#181818] dark:text-[#E8D2B5] flex items-center justify-center shrink-0 border border-[#A5A79B]/30">
                      <Award size={15} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#181818] dark:text-[#f2efe9]">
                        {cert.name}
                      </p>
                      <p className="text-[11px] font-mono text-black/60 dark:text-white/60 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                    {cert.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;
