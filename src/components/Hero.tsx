import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, Download, ArrowDown, ExternalLink } from 'lucide-react';
import profileImage from '../assets/images/md.jpg';

const ROLES = [
  'Full Stack Developer',
  'Spring Boot Engineer',
  'React.js Developer',
  'Problem Solver',
  'Open Source Enthusiast',
];

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Typing animation
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 65);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parallax scroll effect for background
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Full Size Background Image with Parallax and decreased brightness */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-[0.4] dark:brightness-[0.25]"
        style={{ 
          backgroundImage: 'url("/my photo.png")',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      {/* Mesh grid over image */}
      <div className="mesh-grid opacity-40 dark:opacity-80 z-0" />

      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="glow-orb w-[600px] h-[600px] -top-32 -left-32"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
        />
        <div
          className="glow-orb w-[500px] h-[500px] -bottom-24 -right-24"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', animationDelay: '3s' }}
        />
        <div
          className="glow-orb w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', animationDelay: '6s' }}
        />
        {/* Floating particles */}
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3 z-10" />
        <div className="particle particle-4 z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 py-24 min-h-screen flex items-center justify-center lg:justify-start relative">
        <div
          className={`flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-16 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left — Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl glass-card border-white/10 dark:border-white/10 p-8 sm:p-12 !bg-slate-900/40 backdrop-blur-md">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse drop-shadow-md" />
              <span className="text-emerald-200 text-xs font-semibold tracking-wide drop-shadow-md">
                Open to Opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3 font-['Space_Grotesk'] drop-shadow-lg">
              Mohamed
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Mydeen
              </span>
            </h1>

            {/* Typing role */}
            <div className="h-10 flex items-center justify-center lg:justify-start mb-5">
              <span className="text-xl md:text-2xl font-semibold text-slate-200 dark:text-slate-300 typing-cursor drop-shadow-md">
                {displayText}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-base md:text-lg text-slate-300 dark:text-slate-400 max-w-lg mb-8 leading-relaxed drop-shadow-md">
              Crafting scalable web applications with <strong className="text-indigo-300">Spring Boot</strong> &{' '}
              <strong className="text-violet-300">React.js</strong>. Passionate about clean architecture, 
              RESTful APIs, and turning complex problems into elegant solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary"
              >
                <ExternalLink size={16} />
                View My Work
              </button>
              <a
                href="/mydeen.pdf"
                download="Mohamed_Mydeen_Resume.pdf"
                className="btn-secondary"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="text-xs text-slate-300 dark:text-slate-400 font-medium drop-shadow-md">Find me on</span>
              <div className="w-8 h-px bg-slate-400/50 dark:bg-slate-500" />
              <div className="flex gap-2">
                <a href="https://github.com/mohamed-mydeen" target="_blank" rel="noopener noreferrer" className="social-btn bg-slate-900/30 backdrop-blur-sm border-indigo-400/30 text-indigo-300 hover:text-white" title="GitHub">
                  <Github size={16} />
                </a>
                <a href="https://linkedin.com/in/mohamed-mydeen4262" target="_blank" rel="noopener noreferrer" className="social-btn bg-slate-900/30 backdrop-blur-sm border-indigo-400/30 text-indigo-300 hover:text-white" title="LinkedIn">
                  <Linkedin size={16} />
                </a>
                <a href="mailto:mohamedmydeen.sd@gmail.com" className="social-btn bg-slate-900/30 backdrop-blur-sm border-indigo-400/30 text-indigo-300 hover:text-white" title="Email">
                  <Mail size={16} />
                </a>
                <a href="https://wa.me/919344990461" target="_blank" rel="noopener noreferrer" className="social-btn bg-slate-900/30 backdrop-blur-sm border-indigo-400/30 text-indigo-300 hover:text-white" title="WhatsApp">
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              {[
                { value: '5+', label: 'Projects Built' },
                { value: '10+', label: 'Technologies' },
                { value: '3+', label: 'Months Intern' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center lg:items-start"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-['Space_Grotesk']">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-300 dark:text-slate-400 whitespace-nowrap">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-80 z-10">
          <span className="text-xs text-slate-300 dark:text-slate-400 font-medium tracking-widest uppercase drop-shadow-md">Scroll</span>
          <ArrowDown size={16} className="text-indigo-400 animate-bounce drop-shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
