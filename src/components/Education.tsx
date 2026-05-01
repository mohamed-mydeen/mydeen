import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase, Award, BookOpen, ExternalLink, X } from 'lucide-react';

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eduTimelineRef = useRef<HTMLDivElement>(null);
  const internTimelineRef = useRef<HTMLDivElement>(null);
  const [showCerts, setShowCerts] = useState(false);
  const [eduScrollProgress, setEduScrollProgress] = useState(0);
  const [internScrollProgress, setInternScrollProgress] = useState(0);

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
  ];

  const certifications = [
    { name: 'Internet of Things – IIT Kharagpur', platform: 'NPTEL', score: '80%' },
    { name: 'Java Essentials', platform: 'LinkedIn Learning', score: null },
    { name: 'Git Essential Training', platform: 'LinkedIn Learning', score: null },
    { name: 'Web Development and C Programming', platform: 'Udemy', score: null },
    { name: 'Python', platform: 'Cisco Networking Academy', score: null },
  ];

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

        {/* Certifications */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white font-['Space_Grotesk']">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                <Award size={16} />
              </div>
              Certifications
            </h3>
            
            <button
              onClick={() => setShowCerts(true)}
              className="btn-primary"
            >
              <Award size={16} />
              View All Certifications
            </button>
          </div>

          {/* Modal Popup */}
          {showCerts && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" onClick={() => setShowCerts(false)}>
              <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes popupModal { 
                  0% { opacity: 0; transform: scale(0.95) translateY(20px); } 
                  100% { opacity: 1; transform: scale(1) translateY(0); } 
                }
              `}</style>
              <div className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative animate-[popupModal_0.5s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between z-10">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white font-['Space_Grotesk']">
                    My Certifications
                  </h3>
                  <button 
                    onClick={() => setShowCerts(false)}
                    className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-2 sm:p-4">
                  <div className="divide-y divide-slate-200 dark:divide-white/5">
                    {certifications.map((cert, i) => (
                      <div
                        key={i}
                        className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/5 group transition-colors rounded-xl"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 flex-shrink-0 group-hover:text-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10 transition-colors">
                            <Award size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm sm:text-base text-slate-800 dark:text-white truncate">
                              {cert.name}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                              {cert.platform}
                            </p>
                          </div>
                        </div>
                        {cert.score && (
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md flex-shrink-0">
                            {cert.score}
                          </div>
                        )}
                      </div>
                    ))}
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
