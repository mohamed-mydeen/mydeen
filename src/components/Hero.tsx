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

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden bg-white dark:bg-[#0a0a0f] pt-28 pb-8 sm:pt-32 sm:pb-12"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div
          className={`flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left — Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide">
                Open to Opportunities
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-3 font-['Space_Grotesk'] tracking-tight">
              Mohamed{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                Mydeen
              </span>
            </h1>

            {/* Typing role */}
            <div className="h-10 flex items-center justify-center lg:justify-start mb-8">
              <span className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300 typing-cursor">
                {displayText}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary"
              >
                <ExternalLink size={16} />
                View My Work
              </button>
              <a
                href="/mydeen_resume.pdf"
                download="Mohamed_Mydeen_Resume.pdf"
                className="btn-secondary"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              
              <div className="flex gap-3">
                <a href="https://github.com/mohamed-mydeen" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/mohamed-mydeen4262" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:mohamedmydeen.sd@gmail.com" className="social-btn" title="Email">
                  <Mail size={18} />
                </a>
                <a href="https://wa.me/919344990461" target="_blank" rel="noopener noreferrer" className="social-btn" title="WhatsApp">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Profile Image (Professional clean style) */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg mx-auto">
            <div className="relative">
              <img
                src="/my%20photo.png"
                alt="Mohamed Mydeen"
                className="relative rounded-2xl w-full max-w-sm h-[350px] md:h-[400px] lg:h-[450px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
