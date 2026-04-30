import React, { useEffect, useRef } from 'react';
import { User, Mail, MapPin, GraduationCap, Phone, Github, Linkedin, Download, Code2, Server, Shield, Brain } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-animate]').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);




  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-12 pb-20 sm:pt-16 sm:pb-24 bg-slate-50 dark:bg-[#0d0d14] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div
          data-animate
          className="mb-16 opacity-0 translate-y-8 transition-all duration-700"
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <div className="section-tag">
            <User size={12} /> About Me
          </div>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-underline" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Bio (Box Layout & Justified & Concise) */}
          <div
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-700"
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <div className="glass-card p-6 sm:p-8 border border-slate-200 dark:border-white/5 rounded-2xl bg-white/80 dark:bg-slate-900/50 shadow-sm">
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed text-justify">
                Hi! I'm <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">Mohamed Mydeen Shahabudeen M</strong>, 
                a passionate full-stack developer dedicated to building scalable and efficient web applications. 
                With a strong foundation in <span className="text-violet-600 dark:text-violet-400 font-medium">Java, Spring Boot, React.js,</span> and <span className="text-emerald-600 dark:text-emerald-400 font-medium">MongoDB</span>, 
                I specialize in turning complex problems into elegant, user-friendly solutions. 
                <br /><br />
                I am currently pursuing a BTech in Computer Science & Business Systems at <strong className="text-slate-800 dark:text-white">Francis Xavier Engineering College</strong>, 
                actively creating real-world projects and preparing to contribute to innovative tech teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
