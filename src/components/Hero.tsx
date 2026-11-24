import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Download, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { UbuntuFileManager } from './UbuntuFileManager';
import UbuntuToolsManager from './UbuntuToolsManager';
import UbuntuAppsManager from './UbuntuAppsManager';
import UbuntuBottomDock from './UbuntuBottomDock';
import { projectsData } from '../data/projectsData';

const ROLES = [
  'Full Stack Developer',
  'React.js Developer',
  'Problem Solver',
  'Open Source Enthusiast',
];

// Desktop Folder Icon matching the reference image silhouette
const FolderIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-11' }) => (
  <svg
    viewBox="0 0 48 38"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 0 4.5 C 0 2 2 0 4.5 0 L 16 0 C 18.2 0 20.2 1.2 21.2 3.1 L 23 6.5 L 43.5 6.5 C 46 6.5 48 8.5 48 11 L 48 33.5 C 48 36 46 38 43.5 38 L 4.5 38 C 2 38 0 36 0 33.5 Z" />
  </svg>
);

// Desktop Apps Grid Icon matching the dock aesthetic
const AppsIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 44 44"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="4" width="9" height="9" rx="2.5" />
    <rect x="17.5" y="4" width="9" height="9" rx="2.5" />
    <rect x="31" y="4" width="9" height="9" rx="2.5" />
    <rect x="4" y="17.5" width="9" height="9" rx="2.5" />
    <rect x="17.5" y="17.5" width="9" height="9" rx="2.5" />
    <rect x="31" y="17.5" width="9" height="9" rx="2.5" />
    <rect x="4" y="31" width="9" height="9" rx="2.5" />
    <rect x="17.5" y="31" width="9" height="9" rx="2.5" />
    <rect x="31" y="31" width="9" height="9" rx="2.5" />
  </svg>
);

// Theme Contrast Split-Circle Icon matching the reference top right
const ContrastIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M 12 3 A 9 9 0 0 1 12 21 Z" fill="currentColor" />
  </svg>
);

const Hero: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Desktop state
  const [visitorName, setVisitorName] = useState('');
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  // Mobile typing state
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  // Mobile typing animation
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

  // Mobile fade-in
  useEffect(() => {
    const t = setTimeout(() => setMobileVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Desktop real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = days[now.getDay()];
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();

      setTimeString(timeStr);
      setDateString(`${dayName} ${day}/${month}/${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#E8D2B5] dark:bg-[#141414] text-[#181818] dark:text-[#f2efe9] transition-colors duration-500 flex flex-col justify-between select-none"
    >
      
      {/* =========================================================================
          1. DESKTOP VIEW (ONLY FOR DESKTOP: hidden lg:flex)
          ========================================================================= */}
      <div className="hidden lg:flex flex-col justify-between min-h-screen w-full p-8 lg:p-12 relative">
        
        {/* Desktop Top Bar */}
        <header className="relative z-20 flex items-center justify-between w-full">
          {/* Brand Name */}
          <div className="flex items-center gap-1">
            <span className="font-['Space_Grotesk'] font-bold text-2xl tracking-tight">
              mydeen
            </span>
            <span className="text-sm font-semibold opacity-50">/dev</span>
          </div>

          {/* Interactive "What's you name?" Pill Input */}
          <div className="flex items-center">
            <input
              type="text"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              placeholder="What's you name?"
              className="bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 focus:border-black dark:focus:border-white rounded-lg px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none transition-all w-52 sm:w-64 text-center sm:text-left"
            />
          </div>

          {/* Live Clock & Actions */}
          <div className="flex items-center gap-4 text-xs font-mono font-medium tracking-wider">
            <div className="flex items-center gap-3 opacity-80">
              <span>GMT / {timeString || '09:45:11 AM'}</span>
              <span>{dateString || 'Sun 24/07/2026'}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-1 rounded hover:opacity-70 transition-opacity cursor-pointer"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle Theme"
              >
                <ContrastIcon className="w-4 h-4" />
              </button>

              {/* GitHub Link */}
              <a
                href="https://github.com/mohamed-mydeen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded hover:opacity-70 transition-opacity"
                title="GitHub Profile"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </header>

        {/* Giant Outline Watermark Background */}
        <div
          className="absolute inset-x-0 bottom-12 pointer-events-none select-none flex justify-center overflow-hidden z-0"
          aria-hidden="true"
        >
          <span
            className="font-['Space_Grotesk'] font-bold text-[24vw] leading-none tracking-tighter opacity-[0.07] dark:opacity-[0.05] whitespace-nowrap"
            style={{
              WebkitTextStroke: '2px currentColor',
              color: 'transparent',
            }}
          >
            mydeen
          </span>
        </div>

        {/* Desktop Main Content Area */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full my-auto py-12">
          
          {/* Left Desktop Folders & Apps Dock (Positioned on the Left) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-7 xl:gap-8 z-20">
            {/* Projects Folder — Opens Ubuntu File Manager Modal */}
            <button
              onClick={() => setIsProjectsOpen(true)}
              className="group flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 text-left"
              title="Open Projects in Ubuntu File Manager"
            >
              <div className="text-[#181818] dark:text-[#f2efe9] group-hover:scale-105 transition-transform duration-200">
                <FolderIcon className="w-16 h-12" />
              </div>
              <span className="text-xs font-semibold tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                Projects
              </span>
            </button>

            {/* Tools / Arsenal Folder — Opens Ubuntu Tools Manager */}
            <button
              onClick={() => setIsToolsOpen(true)}
              className="group flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 text-left"
              title="Open Tools & Arsenal in Ubuntu File Manager"
            >
              <div className="text-[#181818] dark:text-[#f2efe9] group-hover:scale-105 transition-transform duration-200">
                <FolderIcon className="w-16 h-12" />
              </div>
              <span className="text-xs font-semibold tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                Tools
              </span>
            </button>
          </div>

          {/* Horizontally Centered Main Headline Content */}
          <div className="w-full max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-start justify-center px-8 lg:px-16">
            {/* Dynamic Greeting */}
            <p className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase opacity-75 mb-4">
              HI {visitorName ? visitorName.trim().toUpperCase() : 'STRANGER'} ,
            </p>

            {/* Core Bold Headline */}
            <h1 className="text-7xl xl:text-8xl 2xl:text-9xl font-bold font-['Space_Grotesk'] tracking-tight leading-[0.95] mb-8 text-[#181818] dark:text-[#f2efe9]">
              I am Mydeen<br />
              Software Dev.
            </h1>

            {/* Philosophy Subtitle */}
            <p className="text-lg xl:text-xl font-normal opacity-80 max-w-xl leading-relaxed">
              I solve problems and make things happen, all with a few keystrokes.
            </p>
          </div>

        </div>

        {/* Desktop Bottom Bar Info */}
        <footer className="relative z-20 w-full flex items-end justify-between pt-8 pb-16 lg:pb-20 border-t border-black/10 dark:border-white/10 text-xs font-mono">
          
          {/* Left: About Me Monogram Circle & Socials */}
          <div className="flex items-center gap-8 xl:gap-12">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[11px] font-semibold tracking-wider opacity-70">
                About Me
              </span>
              <button
                onClick={() => scrollTo('#about')}
                className="w-10 h-10 rounded-full bg-[#181818] text-[#E8D2B5] dark:bg-[#E8D2B5] dark:text-[#181818] flex items-center justify-center font-['Space_Grotesk'] font-bold text-sm hover:scale-105 transition-transform cursor-pointer shadow-sm border border-[#A5A79B]/40"
                title="Learn About Mohamed Mydeen"
              >
                /m
              </button>
            </div>

            {/* Socials Column - Positioned Safely on the Left to Never Intersect Dock */}
            <div className="space-y-1.5 pl-6 border-l border-black/10 dark:border-white/10">
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-50">
                Socials
              </p>
              <div className="flex items-center gap-4 font-semibold text-xs">
                <a
                  href="https://github.com/mohamed-mydeen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity tracking-wider uppercase text-[#181818] dark:text-[#f2efe9]"
                >
                  GITHUB
                </a>
                <a
                  href="https://linkedin.com/in/mohamed-mydeen4262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity tracking-wider uppercase text-[#181818] dark:text-[#f2efe9]"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://mydeenblog.vercel.app/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity tracking-wider uppercase text-[#181818] dark:text-[#f2efe9]"
                >
                  BLOG
                </a>
              </div>
            </div>
          </div>

          {/* Center Gap specifically cleared for the Ubuntu Center Bottom Dock */}
          <div className="w-8 xl:w-16 pointer-events-none" />

          {/* Right: Get In Touch & Copyright - Safely on Right with Zero Dock Overlap */}
          <div className="flex items-end gap-8">
            <div className="space-y-1.5 text-right">
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-50">
                Get In Touch
              </p>
              <div className="flex items-center gap-4 font-semibold text-xs">
                <a
                  href="mailto:mohamedmydeen.sd@gmail.com"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity uppercase tracking-wider text-[#181818] dark:text-[#f2efe9]"
                >
                  mohamedmydeen.sd@gmail.com
                </a>
                <a
                  href="tel:+919344990461"
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity tracking-wider text-[#181818] dark:text-[#f2efe9]"
                >
                  +91 93449 90461
                </a>
              </div>
            </div>

            <div className="opacity-60 text-right border-l border-black/10 dark:border-white/10 pl-6 hidden xl:block">
              <p>&copy; {new Date().getFullYear()}, mydeen.</p>
            </div>
          </div>

        </footer>

      </div>


      {/* =========================================================================
          2. MOBILE VIEW (CLEAN ORIGINAL LAYOUT: lg:hidden)
          ========================================================================= */}
      <div className="lg:hidden flex flex-col justify-center min-h-screen px-4 sm:px-6 pt-24 pb-12 z-10">
        <div
          className={`flex flex-col-reverse items-center justify-between gap-10 transition-all duration-1000 ${
            mobileVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Mobile Text Content */}
          <div className="text-center max-w-xl">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-2 font-['Space_Grotesk'] tracking-tight">
              Mohamed{' '}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                Mydeen
              </span>
            </h1>

            {/* Typing role */}
            <div className="h-9 flex items-center justify-center mb-6">
              <span className="text-lg sm:text-xl font-semibold opacity-80 font-mono">
                {displayText}
              </span>
            </div>

            {/* Quote */}
            <blockquote className="relative mb-6 px-4">
              <p className="italic text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-light opacity-75">
                "Whoever travels a path in search of knowledge, GOD will make easy for him a path to Paradise."
              </p>
            </blockquote>

            {/* Actions & Social Links */}
            <div className="flex flex-col items-center gap-6">
              <a
                href="/mohamedmydeensd.pdf"
                download="mohamedmydeensd.pdf"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-xs font-semibold shadow-sm hover:opacity-80 transition-all"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/mohamed-mydeen" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center hover:opacity-70 transition-opacity" 
                  title="GitHub"
                >
                  <Github size={16} />
                </a>
                <a 
                  href="https://linkedin.com/in/mohamed-mydeen4262" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center hover:opacity-70 transition-opacity" 
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://mydeenblog.vercel.app/about" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center hover:opacity-70 transition-opacity" 
                  title="Mydeen Blog"
                >
                  <BookOpen size={16} />
                </a>
                <a 
                  href="mailto:mohamedmydeen.sd@gmail.com" 
                  className="w-9 h-9 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center hover:opacity-70 transition-opacity" 
                  title="Email"
                >
                  <Mail size={16} />
                </a>
                <a 
                  href="https://wa.me/919344990461" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center hover:opacity-70 transition-opacity" 
                  title="WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Profile Photo */}
          <div className="w-full max-w-[240px] sm:max-w-[280px]">
            <img
              src="/my%20photo.png"
              alt="Mohamed Mydeen"
              loading="lazy"
              className="rounded-2xl shadow-xl w-full h-[280px] sm:h-[320px] object-cover object-center border-2 border-black/15 dark:border-white/15"
            />
          </div>
        </div>
      </div>

      {/* ─── 3. UBUNTU FILE MANAGERS & APP WINDOW (FOR DESKTOP) ──────────────── */}
      <UbuntuFileManager
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        projects={projectsData}
      />
      <UbuntuToolsManager
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />
      <UbuntuAppsManager
        isOpen={isAppsOpen}
        onClose={() => setIsAppsOpen(false)}
      />

      {/* ─── 4. UBUNTU BOTTOM DOCK (CENTER BOTTOM WITH AUTO-HIDE ON SCROLL) ───── */}
      <UbuntuBottomDock
        onOpenProjects={() => setIsProjectsOpen(prev => !prev)}
        onOpenTools={() => setIsToolsOpen(prev => !prev)}
        onOpenApps={() => setIsAppsOpen(prev => !prev)}
        onCloseAll={() => {
          setIsAppsOpen(false);
          setIsProjectsOpen(false);
          setIsToolsOpen(false);
        }}
        isProjectsOpen={isProjectsOpen}
        isToolsOpen={isToolsOpen}
        isAppsOpen={isAppsOpen}
      />
    </section>
  );
};

export default Hero;
