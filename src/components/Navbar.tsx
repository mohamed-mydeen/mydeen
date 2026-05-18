import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section tracking
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      let current = 'home';
      sections.forEach((section) => {
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 120) current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative">
          {/* Clean Logo - Hides on mobile when menu opens */}
          <button 
            onClick={() => scrollToSection('#home')}
            className={`flex items-center gap-1 group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen ? 'max-w-0 opacity-0 overflow-hidden' : 'max-w-[200px] opacity-100'
            } md:max-w-none md:w-auto md:opacity-100 md:overflow-visible`}
          >
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
              Mydeen
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-emerald-500 transition-colors" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  activeSection === link.id 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Sliding Nav (Horizontal within navbar) */}
          <div 
            className={`md:hidden flex items-center overflow-x-auto whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scrollbar-none ${
              isOpen ? 'flex-1 translate-x-0 mr-4' : 'w-0 -translate-x-8 overflow-hidden'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .scrollbar-none::-webkit-scrollbar { display: none; }
            `}</style>
            {navLinks.map((link, idx) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium px-3 py-1 transition-all duration-500 ease-out transform ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } ${
                  activeSection === link.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-indigo-500'
                }`}
                style={{ transitionDelay: isOpen ? `${idx * 150}ms` : '0ms' }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right side (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* ThemeToggle option removed */}
          </div>

          {/* Mobile right (Toggle + Hamburger) */}
          <div className="flex md:hidden items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-300 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
