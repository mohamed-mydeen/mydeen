import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CommandPalette from './components/ui/CommandPalette';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Article from './pages/Article';
import About from './pages/About';
import Contact from './pages/Contact';
import Newsletter from './pages/Newsletter';
import News from './pages/News';

// Page transition wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// Inner app needs to be inside Router for hooks
const AppInner: React.FC = () => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const location = useLocation();

  // Lenis smooth scroll
  useLenis();

  // Ctrl+K to open command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 transition-colors duration-300 flex flex-col">
      <Navbar onOpenCommand={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/article/:slug" element={<PageWrapper><Article /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/newsletter" element={<PageWrapper><Newsletter /></PageWrapper>} />
            <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
            {/* 404 */}
            <Route path="*" element={
              <PageWrapper>
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                  <p className="text-7xl mb-4">🔍</p>
                  <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white mb-2">Page not found</h1>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">This page doesn't exist or was moved.</p>
                  <a href="/" className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:opacity-80 transition-opacity">
                    Go home
                  </a>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
