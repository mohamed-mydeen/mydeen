import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Chatbot from './components/Chatbot';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
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
      <Projects limit={3} />
      <Skills/>
      <Education />
      <Contact />
      <Chatbot/>
    </>
  );
}

function AllProjectsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <Projects />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToHash />
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<AllProjectsPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
