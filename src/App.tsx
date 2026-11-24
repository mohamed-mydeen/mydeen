import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';

import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Chatbot from './components/Chatbot';
import GithubStats from './components/GithubStats';
import LeetCodeStats from './components/LeetCodeStats';
import FeaturedProducts from './components/FeaturedProducts';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import { useLenis } from './hooks/useLenis';
import { useReveal } from './hooks/useReveal';
import { initAnalytics, trackPageView, trackEvent, startHeartbeat } from './utils/analytics';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    trackPageView(`${pathname}${hash}`);
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />

      {/* ─── MOBILE VIEW ESSENTIAL SECTIONS (VISIBLE ON MOBILE; DESKTOP USES HERO OS DOCK) ─── */}
      <div className="lg:hidden">
        <Projects limit={4} />
      </div>
      <div className="lg:hidden">
        <Skills />
      </div>
      <div className="lg:hidden">
        <FeaturedProducts />
      </div>

      {/* ─── SECTIONS VISIBLE ON ALL SCREENS ─── */}
      <Education />
      <GithubStats />
      <LeetCodeStats />
      <Contact />

      <Chatbot/>
    </>
  );
}

function AppInner() {
  // Lenis smooth scroll
  useLenis();
  // Section reveal animations
  useReveal('[data-reveal]');
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
    const stopHeartbeat = startHeartbeat(() => `${window.location.pathname}${window.location.hash}`);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const lowerHref = href.toLowerCase();

      if (lowerHref.includes('mohamedmydeensd.pdf') || target.hasAttribute('download')) {
        trackEvent('resume_downloaded');
      } else if (lowerHref.includes('github.com')) {
        trackEvent('github_clicked', { url: href });
      } else if (lowerHref.includes('linkedin.com')) {
        trackEvent('linkedin_clicked', { url: href });
      } else if (lowerHref.startsWith('mailto:') || lowerHref.startsWith('tel:') || lowerHref.includes('wa.me') || lowerHref === '#contact') {
        trackEvent('contact_clicked', { target: href });
      } else if (
        lowerHref.includes('vercel.app') ||
        lowerHref.includes('streamlit.app') ||
        target.getAttribute('aria-label')?.toLowerCase().includes('project')
      ) {
        trackEvent('project_clicked', { url: href || target.textContent?.trim() });
      }
    };

    const preventCopy = (e: Event) => { e.preventDefault(); };
    const preventCut = (e: Event) => { e.preventDefault(); };
    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCut);
    return () => {
      stopHeartbeat();
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCut);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#E8D2B5] dark:bg-[#141414] text-[#181818] dark:text-[#f2efe9] transition-colors duration-500 flex flex-col">
      <ScrollProgress />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToHash />
        <AppInner />
      </Router>
    </ThemeProvider>
  );
}

export default App;
