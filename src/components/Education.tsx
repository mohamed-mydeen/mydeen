import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Award, BookOpen, ExternalLink, X, ArrowUpRight } from 'lucide-react';

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eduTimelineRef = useRef<HTMLDivElement>(null);
  const internTimelineRef = useRef<HTMLDivElement>(null);
  const [showCerts, setShowCerts] = useState(false);
  const [eduScrollProgress, setEduScrollProgress] = useState(0);
  const [internScrollProgress, setInternScrollProgress] = useState(0);

  useEffect(() => {
    if (showCerts) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCerts]);

  useEffect(() => {
    // Reveal animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-animate]').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Scroll progress logic for timelines
    const handleScroll = () => {
      const calculateProgress = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Start filling when top of timeline reaches 60% of viewport
        const startTrigger = viewportHeight * 0.6;
        
        const scrolledPast = startTrigger - rect.top;
        const totalHeight = rect.height;
        
        if (scrolledPast < 0) return 0;
        if (scrolledPast > totalHeight) return 100;
        return (scrolledPast / totalHeight) * 100;
      };

      setEduScrollProgress(calculateProgress(eduTimelineRef));
      setInternScrollProgress(calculateProgress(internTimelineRef));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const education = [
    {
      period: '2023 – 2027',
      title: 'BTech in Computer Science & Business Systems',
      org: 'Francis Xavier Engineering College, Tamil Nadu',
      grade: 'CGPA: 7.81',
      desc: 'Pursuing a comprehensive CS degree with focus on software engineering, algorithms, AI, and database systems. Active in coding clubs and hackathons.',
      highlights: ['Data Structures & Algorithms', 'Database Management Systems', 'AI & Machine Learning', 'Web Technologies'],
    },
    {
      period: '2021 – 2023',
      title: 'Higher Secondary Certificate (HSC)',
      org: 'Time Matric Higher Secondary School',
      grade: 'Percentage: 83.17%',
      desc: 'Completed 12th grade with Computer Science major. Recognized as Best Student (2022–2023) for academic excellence.',
      highlights: ['Computer Science', 'Mathematics', 'Best Student Award 2022–2023'],
    },
  ];

  const internships = [
    {
      period: 'Remote (1 Month)',
      title: 'Software Developer Intern',
      org: 'Skill Software Inc, USA',
      desc: 'Migrated legacy Selenium automation suites to Playwright (Python), improving test execution speed and reliability across internal project pipelines.',
      highlights: [
        'Migrated Selenium → Playwright (Python)',
        'Improved test execution speed & reliability',
        'Managed AWS cloud deployment workflows',
        'Handled cloud resource configuration',
      ],
      tech: ['Python', 'Playwright', 'Selenium', 'AWS'],
    },
    {
      period: 'Jun – Jul 2024 (2 Months)',
      title: 'Full Stack Developer Intern',
      org: 'Asta Systech Pvt. Ltd, India',
      desc: 'Completed a full-stack internship developing a CRUD-based application using Java Spring Boot and React.js with RESTful API integration.',
      highlights: [
        'Built CRUD-based full-stack web application',
        'Implemented RESTful APIs with Spring Boot',
        'Integrated MySQL database with JPA/Hibernate',
        'Collaborated with cross-functional teams',
      ],
      tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST API'],
    },
    {
      period: '2024 (1 Month)',
      title: 'Full Stack Developer Intern',
      org: 'IPCS Global TVL, India',
      desc: 'Developed and deployed a web application using Python, Streamlit, and MySQL. Focused on data-driven features and responsive UI.',
      highlights: [
        'Developed a software product from scratch',
        'Built data-driven web application with Streamlit',
        'Managed MySQL databases and queries',
      ],
      tech: ['Python', 'Streamlit', 'MySQL', 'HTML', 'CSS'],
    },
  ];

  const certifications = [
    { name: 'Internet of Things – IIT Kharagpur', platform: 'NPTEL', score: '80%' },
    { name: 'Java Essentials', platform: 'LinkedIn Learning', score: null },
    { name: 'Git Essential Training', platform: 'LinkedIn Learning', score: null },
    { name: 'Web Development and C Programming', platform: 'Udemy', score: null },
    { name: 'Python', platform: 'Cisco Networking Academy', score: null },
  ];

  const getPlatformStyles = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'nptel':
        return {
          bg: 'bg-purple-50/60 dark:bg-purple-500/10',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-100/80 dark:border-purple-500/20',
          glow: 'from-purple-500/5 to-indigo-500/5',
        };
      case 'linkedin learning':
        return {
          bg: 'bg-blue-50/60 dark:bg-blue-500/10',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-100/80 dark:border-blue-500/20',
          glow: 'from-blue-500/5 to-cyan-500/5',
        };
      case 'udemy':
        return {
          bg: 'bg-rose-50/60 dark:bg-rose-500/10',
          text: 'text-rose-600 dark:text-rose-400',
          border: 'border-rose-100/80 dark:border-rose-500/20',
          glow: 'from-rose-500/5 to-orange-500/5',
        };
      case 'cisco networking academy':
      case 'cisco':
        return {
          bg: 'bg-emerald-50/60 dark:bg-emerald-500/10',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-100/80 dark:border-emerald-500/20',
          glow: 'from-emerald-500/5 to-teal-500/5',
        };
      default:
        return {
          bg: 'bg-slate-50/60 dark:bg-slate-800/60',
          text: 'text-slate-600 dark:text-slate-400',
          border: 'border-slate-100/80 dark:border-slate-800/40',
          glow: 'from-slate-500/5 to-indigo-500/5',
        };
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="pt-8 pb-8 sm:pb-12 bg-white dark:bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div
          data-animate
          className="mb-16 opacity-0 translate-y-8 transition-all duration-700"
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <div className="section-tag"><BookOpen size={12} /> Education & Experience</div>
          <h2 className="section-title">My Journey</h2>
          <div className="section-underline" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl">
            Academic background, internship experience, and certifications that have shaped my technical expertise.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="mb-20">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white mb-10 font-['Space_Grotesk'] tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <GraduationCap size={20} />
            </div>
            Education
          </h3>

          <div ref={eduTimelineRef} className="relative border-l-2 border-transparent ml-5 md:ml-6">
            {/* Background Line */}
            <div className="absolute left-[-2px] top-2 bottom-0 w-[2px] bg-violet-100 dark:bg-violet-500/20 rounded-full" />
            
            {/* Animated Fill Line */}
            <div 
              className="absolute left-[-2px] top-2 w-[2px] bg-violet-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(139,92,246,0.8)] z-0" 
              style={{ height: `${eduScrollProgress}%`, maxHeight: 'calc(100% - 8px)' }} 
            />

            <div className="space-y-10">
              {education.map((item, i) => (
                <div
                  key={i}
                  data-animate
                  className="relative pl-8 md:pl-12 opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionProperty: 'opacity, transform' }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-21px] top-2 w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center shadow-[0_0_0_6px_white] dark:shadow-[0_0_0_6px_#0a0a0f] z-10">
                    <GraduationCap size={18} className="text-white" />
                  </div>

                  <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800/60 hover:shadow-lg transition-shadow duration-300">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-4 border border-violet-100 dark:border-violet-500/20">
                      <GraduationCap size={14} />
                      {item.period}
                    </div>
                    
                    <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white font-['Space_Grotesk'] leading-snug mb-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-base mb-4">
                      {item.org}
                    </p>

                    <div className="inline-block bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg px-3 py-1.5 mb-5">
                      <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">{item.grade}</p>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    {item.highlights && (
                      <div className="flex flex-wrap gap-2.5">
                        {item.highlights.map((h) => (
                          <span key={h} className="text-xs md:text-sm px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 font-medium border border-violet-100 dark:border-violet-500/20">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Internship Timeline */}
        <div className="mb-20">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white mb-10 font-['Space_Grotesk'] tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Briefcase size={20} />
            </div>
            Internship Experience
          </h3>

          <div ref={internTimelineRef} className="relative border-l-2 border-transparent ml-5 md:ml-6">
            {/* Background Line */}
            <div className="absolute left-[-2px] top-2 bottom-0 w-[2px] bg-emerald-100 dark:bg-emerald-500/20 rounded-full" />
            
            {/* Animated Fill Line */}
            <div 
              className="absolute left-[-2px] top-2 w-[2px] bg-emerald-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(16,185,129,0.8)] z-0" 
              style={{ height: `${internScrollProgress}%`, maxHeight: 'calc(100% - 8px)' }} 
            />

            <div className="space-y-10">
              {internships.map((item, i) => (
                <div
                  key={i}
                  data-animate
                  className="relative pl-8 md:pl-12 opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionProperty: 'opacity, transform' }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-21px] top-2 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_0_6px_white] dark:shadow-[0_0_0_6px_#0a0a0f] z-10">
                    <Briefcase size={18} className="text-white" />
                  </div>

                  <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800/60 hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4 border border-emerald-100 dark:border-emerald-500/20">
                      <Briefcase size={14} />
                      {item.period}
                    </div>
                    
                    <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white font-['Space_Grotesk'] leading-snug mb-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-base mb-5">
                      {item.org}
                    </p>

                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm md:text-base text-slate-600 dark:text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2.5">
                      {item.tech.map((t) => (
                        <span key={t} className="text-xs md:text-sm px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Centered Compact Section */}
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800/40 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-100/50 dark:border-amber-500/20">
            <Award size={12} />
            Professional Credentials
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white font-['Space_Grotesk'] tracking-tight mb-3">
            Certifications & Badges
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm mb-6 leading-relaxed">
            Verified academic credentials, programming specializations, and professional course completions.
          </p>
          
          {/* Centered Premium MNC Button */}
          <button
            onClick={() => setShowCerts(true)}
            className="group/btn inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 text-xs font-bold text-slate-700 dark:text-slate-800 whitespace-nowrap cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Award size={13} className="text-amber-500" />
            <span>View Verified Credentials</span>
            <ArrowUpRight size={13} className="text-slate-400 group-hover/btn:text-slate-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </button>

          {/* Premium MNC-Standard Modal Popup */}
          {showCerts && (
            <div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]" 
              onClick={() => setShowCerts(false)}
            >
              <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes popupModal { 
                  0% { opacity: 0; transform: scale(0.96) translateY(15px); } 
                  100% { opacity: 1; transform: scale(1) translateY(0); } 
                }
              `}</style>
              
              <div 
                className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl w-full max-w-xl max-h-[85vh] rounded-3xl border border-slate-100/50 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative animate-[popupModal_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden" 
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/40 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-100/50 dark:border-amber-500/20">
                      <Award size={18} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white font-['Space_Grotesk'] leading-none">
                        Verified Credentials
                      </h3>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                        5 Qualifications Successfully Validated
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowCerts(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 scrollbar-none">
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
                    {certifications.map((cert, i) => {
                      const styles = getPlatformStyles(cert.platform);
                      return (
                        <div
                          key={i}
                          className="py-3 px-3 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-2xl transition-all duration-200 group text-left relative overflow-hidden"
                        >
                          {/* Very subtle hover gradient glow */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                          <div className="flex items-center gap-3.5 min-w-0 relative z-10">
                            {/* Tiny elegant brand award badge */}
                            <div className={`w-8.5 h-8.5 rounded-xl ${styles.bg} ${styles.text} flex items-center justify-center flex-shrink-0 border ${styles.border}`}>
                              <Award size={15} className="group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-800 dark:text-white text-xs sm:text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                {cert.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 uppercase tracking-wide">
                                {cert.platform}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
                            {cert.score && (
                              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100/50 dark:border-emerald-500/20 px-2 py-0.5 rounded-md">
                                Score: {cert.score}
                              </span>
                            )}
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/30 px-2 py-0.5 rounded-md uppercase tracking-wide">
                              Verified
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Education;
