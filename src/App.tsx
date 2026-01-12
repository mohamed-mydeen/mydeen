import React from 'react';
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


function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills/>
        <Education />
        <Contact />
        <Footer />
        <Chatbot/>
      </div>
    </ThemeProvider>
  );
}

export default App;
