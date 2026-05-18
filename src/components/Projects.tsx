import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectsProps {
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const projectsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  const projectsData = [
    {
      title: "Food Ordering PWA",
      description: "A full-stack Progressive Web Application for food delivery. Built with a sophisticated AI-driven recommendation engine, secure authentication flows, real-time cart management, and a highly responsive, mobile-first user interface.",
      category: "web",
      technologies: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "PWA"],
      github: "https://github.com/mohamed-mydeen/Food-order-app",
      demo: "https://mpmhub.vercel.app/"
    },
    {
      title: "Deceptive Website Detection System",
      description: "Built an event-driven cybersecurity solution to detect seasonal fraudulent websites. Implemented URL analysis, SSL validation, domain age checks, and redirection detection techniques. Deployed an explainable risk-scoring system using Streamlit with real-time SQLite storage.",
      category: "Software",
      technologies: ["Cybersecurity", "Risk Analysis", "Streamlit", "SQLite"],
      github:"https://github.com/mohamed-mydeen/seasonal-deceptive-website-detector",
      demo: "https://seasonal-deceptive-website-detector.streamlit.app/"
    },
     {
      title: "TNEA Cut-Off Checking Portal",
      description: "Portal to check 12th TNEA Cut Off Mark with comprehensive college information and admission guidance.",
      category: "web",
      technologies: ["Python", "OpenCV", "Tkinter", "pandas"],
      github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/TNEA-cutoff-checker",
      demo: "https://tnea-cutoff-checker.vercel.app/"
    },
    
    
    {
      title: "Intelligent Business Card Data Extracter",
      description: "A comprehensive application that extracts business card data using advanced OCR technology with database management and real-time processing capabilities.",
      category: "Software",
      technologies: ["Python", "MySQL", "EasyOCR", "Streamlit"],
      github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Intelligent-Business-Card-Data-Extractor-and-Manager"
    },
    {
      title: "AI ChatBot",
      description: "An intelligent chatbot that uses machine learning to generate contextual responses using Gemini API with natural language processing capabilities.",
      category: "AI",
      technologies: ["Python", "TensorFlow", "Streamlit", "Gemini API"],
      github: "https://github.com"
    },
    {
      title: "Symposium Website",
      description: "Mobile application to track workouts, nutrition, and fitness goals with customizable plans and real-time analytics dashboard.",
      category: "web",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      github: "https://github.com"
    },
    {
      title: "Mydeen's Portfolio",
      description: "A centralized personal portfolio showcasing skills, projects and professional experience with interactive components and smooth animations.",
      category: "web",
      technologies: ["React.js", "TypeScript", "CSS", "JavaScript", "MySQL"]
    },
    {
      title: "Music Player Using Data Structures",
      description: "Custom music player application using Double circular linked list Model with GUI. Demonstrates practical implementation of advanced data structures.",
      category: "Software",
      technologies: ["Python", "Data Structures", "PyGame", "Tkinter"],
      github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Music-Player-Using-Double-Linked-List"
    },
    {
      title: "Face Detection & Authentication System",
      description: "Real-time face detection and authentication system using advanced computer vision techniques with secure credential validation.",
      category: "AI",
      technologies: ["Python", "OpenCV", "Tkinter", "pandas"],
      github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Real-time-Face-Detection-and-Authentication-System-Using-OpenCV-"
    },
   
  ];

  const categories = ['all', 'Software', 'AI', 'web'];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section ref={projectsRef} className="relative pt-12 pb-12 bg-black overflow-hidden">
      {/* Hacker Screen Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(0deg, rgba(0, 255, 150, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 150, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Scan Lines */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(0, 255, 150, 0.15) 1px, transparent 1px)',
            backgroundSize: '100% 2px',
            animation: 'scan 8s linear infinite'
          }}
        ></div>

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 0.98; }
          20%, 24%, 55% { opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 10px #00ff96, 0 0 20px #00ff96; }
          50% { text-shadow: 0 0 20px #00ff96, 0 0 30px #00ff96, 0 0 40px #00ff96; }
        }
        .hacker-text {
          animation: flicker 2s infinite;
          font-family: 'Courier New', monospace;
        }
        .glow-text {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* PROJECTS SECTION */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {!limit && (
            <div className="mb-6 flex justify-start">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 text-green-400 border border-green-500/30 hover:bg-green-500/10 hover:border-green-500/60 rounded font-mono transition-all duration-300"
              >
                <span className="text-lg">{'<'}</span> EXIT TO MAINFRAME
              </Link>
            </div>
          )}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-green-400 text-lg font-mono hacker-text">{'> PROJECTS.DB'}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-green-400 glow-text font-mono mb-4">
              PROJECT PORTFOLIO
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto opacity-70 mb-8"></div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded font-mono text-sm transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-green-500/20 text-green-400 border-green-500/70 shadow-[0_0_10px_rgba(0,255,150,0.3)]'
                      : 'bg-black/60 text-green-300 border-green-500/30 hover:border-green-500/50'
                  }`}
                >
                  {'>'} {category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedProjects.map((project, index) => (
              <div
                key={index}
                className={`h-full relative transition-all duration-1000 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } card-3d`}
                style={{ transitionDelay: `${index * 80}ms` }}
                data-reveal
                data-delay={String(index * 100)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
                
                <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 hover:border-green-500/70 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,150,0.3)] h-full flex flex-col">
                  {/* Terminal Header */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <h4 className="text-lg font-bold text-green-400 font-mono flex-1">
                        {project.title}
                      </h4>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-green-500/10 text-green-300 px-3 py-1 rounded text-xs font-mono border border-green-500/30">
                        {'>'} {project.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-green-300 text-sm mb-4 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <p className="text-xs text-green-500/60 font-mono mb-2">{'> TECH_STACK'}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-300 hover:text-green-400 px-2 py-1 rounded text-xs font-mono border border-green-500/20 hover:border-green-500/50 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Duration and Links */}
                    <div className="space-y-3 pt-4 border-t border-green-500/20">
                      
                      <div className="flex gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-300 hover:text-green-400 text-sm font-mono transition-colors"
                          >
                            <Github size={16} /> Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-300 hover:text-green-400 text-sm font-mono transition-colors"
                          >
                            <ExternalLink size={16} /> Live
                          </a>
                        )}
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        {limit && filteredProjects.length > limit && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500/20 hover:border-green-400 hover:shadow-[0_0_15px_rgba(0,255,150,0.4)] rounded-full font-mono transition-all duration-300"
            >
              <Folder size={18} />
              <span>VIEW MORE PROJECTS</span>
            </Link>
          </div>
        )}

        {/* Footer Command */}
        <div className={`text-center mt-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-green-500/60 font-mono text-sm hacker-text">
            {'> SYSTEM READY >'} <span className="animate-pulse">_</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
