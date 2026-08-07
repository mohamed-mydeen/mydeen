import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Award, ExternalLink, X, ArrowUpRight, CheckCircle2, Building2 } from 'lucide-react';

const Education: React.FC = () => {
  const [showCerts, setShowCerts] = useState(false);
  const workTimelineRef = useRef<HTMLDivElement>(null);
  const eduTimelineRef = useRef<HTMLDivElement>(null);
  
  const [workScrollProgress, setWorkScrollProgress] = useState(0);
  const [eduScrollProgress, setEduScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const calcProgress = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const startTrigger = viewportHeight * 0.65;
        const scrolledPast = startTrigger - rect.top;
        const totalHeight = rect.height;

        if (scrolledPast <= 0) return 0;
        if (scrolledPast >= totalHeight) return 100;
        return (scrolledPast / totalHeight) * 100;
      };

      setWorkScrollProgress(calcProgress(workTimelineRef));
      setEduScrollProgress(calcProgress(eduTimelineRef));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const internships = [
    {
      period: 'Remote (1 Month)',
      title: 'Software Developer Intern',
      company: 'Skill Software Inc',
      location: 'USA',
      desc: 'Migrated legacy Selenium automation suites to Playwright (Python), significantly improving test execution speed and reliability across project pipelines.',
      highlights: [
        'Migrated Selenium test suites to Playwright in Python',
        'Enhanced automated test execution speed & pipeline reliability',
        'Configured cloud deployment workflows and AWS infrastructure',
      ],
      tech: ['Python', 'Playwright', 'Selenium', 'AWS'],
    },
    {
      period: 'Jun 2024 – Jul 2024',
      title: 'Full Stack Developer Intern',
      company: 'Asta Systech Pvt. Ltd',
      location: 'India',
      desc: 'Developed a full-stack CRUD web application with Java Spring Boot backend and React.js frontend, integrated with RESTful APIs.',
      highlights: [
        'Architected CRUD application with Spring Boot & React.js',
        'Designed REST API endpoints and JPA/Hibernate persistence layer',
        'Optimized MySQL queries for efficient data retrieval',
      ],
      tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST API'],
    },
    {
      period: '2024 (1 Month)',
      title: 'Full Stack Developer Intern',
      company: 'IPCS Global',
      location: 'India',
      desc: 'Engineered a data-driven web application using Python, Streamlit, and MySQL with responsive custom interface design.',
      highlights: [
        'Built end-to-end data-driven web product from scratch',
        'Managed database migrations and SQL schema design',
      ],
      tech: ['Python', 'Streamlit', 'MySQL', 'HTML/CSS'],
    },
    {
      period: 'June 2025 – July 2025',
      title: 'Full Stack Developer Intern',
      company: 'Gateway Software Solutions',
      location: 'Coimbatore, India',
      desc: 'Completed a Full Stack Web Development internship developing modern web applications across frontend and backend technologies. Built responsive user interfaces, integrated APIs, and managed database layer components throughout the software development lifecycle.',
      highlights: [
        'Developed responsive web interfaces using modern frontend frameworks',
        'Integrated REST APIs and engineered server-side database handling',
        'Followed end-to-end Agile software development lifecycle practices',
      ],
      tech: ['React.js', 'JavaScript', 'REST API', 'MySQL', 'Node.js'],
    },
  ];

  const education = [
    {
      period: '2023 – 2027',
      degree: 'B.Tech in Computer Science & Business Systems',
      institution: 'Francis Xavier Engineering College',
      location: 'Tamil Nadu, India',
      score: 'CGPA: 7.81',
      desc: 'Rigorous coursework spanning Algorithms, Software Engineering, Database Architecture, Artificial Intelligence, and Systems Design.',
    },
    {
      period: '2021 – 2023',
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Time Matric Higher Secondary School',
      location: 'Tamil Nadu, India',
      score: 'Percentage: 83.17%',
      desc: 'Computer Science major. Awarded Best Student (2022–2023) for outstanding overall academic performance.',
    },
  ];

  const certifications = [
    { name: 'Internet of Things – IIT Kharagpur', issuer: 'NPTEL', detail: '80% Score' },
    { name: 'Java Essentials', issuer: 'LinkedIn Learning', detail: 'Verified' },
    { name: 'Git Essential Training', issuer: 'LinkedIn Learning', detail: 'Verified' },
    { name: 'Web Development & C Programming', issuer: 'Udemy', detail: 'Verified' },
    { name: 'Python Programming', issuer: 'Cisco Networking Academy', detail: 'Verified' },
  ];

  return (
    <section id="education" className="py-20 bg-slate-50/50 dark:bg-[#0b0c10] border-t border-slate-200/60 dark:border-slate-800/40 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-16" data-reveal>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Background & Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Experience & Education
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
            Proven track record across full-stack engineering internships, computer science education, and verified technical credentials.
          </p>
        </div>

        {/* 2-Column Minimalist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Column 1: Professional Experience */}
          <div data-reveal>
            <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-slate-200 dark:border-slate-800">
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Work Experience
              </h3>
            </div>

            <div ref={workTimelineRef} className="relative pl-6 space-y-10">
              {/* Track Line */}
              <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-slate-800/80 rounded-full" />
              
              {/* Progress Line */}
              <div 
                className="absolute left-0 top-2 w-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-200 ease-out z-10"
                style={{ height: `${workScrollProgress}%`, maxHeight: 'calc(100% - 16px)' }}
              />

              {internships.map((item, idx) => {
                const itemThreshold = (idx / (internships.length - 1 || 1)) * 100;
                const isActive = workScrollProgress >= itemThreshold;

                return (
                  <div key={idx} className="relative group">
                    <div 
                      className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-50 dark:border-[#0b0c10] transition-all duration-300 z-20 ${
                        isActive 
                          ? 'bg-indigo-600 dark:bg-indigo-400 scale-125 shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />

                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                          {item.period}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {item.location}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h4>
                      
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 mb-3">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {item.company}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      <ul className="space-y-1.5 mb-4">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        {item.tech.map((t, i) => (
                          <span 
                            key={i} 
                            className="font-mono text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Academic Degree */}
          <div data-reveal>
            <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-slate-200 dark:border-slate-800">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Academic Degree
              </h3>
            </div>

            <div ref={eduTimelineRef} className="relative pl-6 space-y-10">
              {/* Track Line */}
              <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-200 dark:bg-slate-800/80 rounded-full" />
              
              {/* Progress Line */}
              <div 
                className="absolute left-0 top-2 w-[2px] bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-200 ease-out z-10"
                style={{ height: `${eduScrollProgress}%`, maxHeight: 'calc(100% - 16px)' }}
              />

              {education.map((item, idx) => {
                const itemThreshold = (idx / (education.length - 1 || 1)) * 100;
                const isActive = eduScrollProgress >= itemThreshold;

                return (
                  <div key={idx} className="relative group">
                    <div 
                      className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-50 dark:border-[#0b0c10] transition-all duration-300 z-20 ${
                        isActive 
                          ? 'bg-indigo-600 dark:bg-indigo-400 scale-125 shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />

                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                          {item.period}
                        </span>
                        <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 px-2 py-0.5 rounded">
                          {item.score}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {item.degree}
                      </h4>

                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 mb-3">
                        {item.institution} <span className="text-xs font-normal text-slate-500">({item.location})</span>
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dedicated Click-to-View Certifications Section */}
        <div className="mt-16 pt-10 border-t border-slate-200/60 dark:border-slate-800/60 text-center" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-amber-200/50 dark:border-amber-500/20">
            <Award size={13} />
            Professional Credentials
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight mb-2">
            Certifications & Badges
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-xs sm:text-sm mb-6 leading-relaxed">
            Verified academic credentials, programming specializations, and professional course completions.
          </p>
          
          <button
            onClick={() => setShowCerts(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow transition-all duration-200 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <Award size={15} className="text-amber-500" />
            <span>View Verified Credentials</span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

      </div>

      {/* Clean Minimalist Modal */}
      {showCerts && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md" 
          onClick={() => setShowCerts(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl relative flex flex-col overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Award size={16} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] leading-none">
                    Verified Technical Credentials
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                    5 Specializations Validated
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCerts(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              {certifications.map((cert, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                      <Award size={15} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {cert.name}
                      </p>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
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



