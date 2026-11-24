import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';

interface ProjectsProps {
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  const projectsRef = useRef(null);
  // If limit is not passed, we are on the dedicated projects page, so show immediately
  const [isVisible, setIsVisible] = useState(!limit);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!limit) {
      setIsVisible(true);
      return;
    }

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
  }, [limit]);

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
    title: "Mydeen AI – Intelligent Conversational Platform",
    description: "A premium full-stack conversational AI assistant similar to leading AI platforms. Supports real-time streaming conversations, contextual memory for natural follow-ups, live web-grounded search, image analysis, OCR document understanding, voice interaction, and an installable PWA experience.",
    image: "https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "AI",
    technologies: ["React.js", "FastAPI", "Groq API", "Supabase", "PostgreSQL", "Tesseract OCR", "YOLOv8", "Web Search", "Web Speech API", "Tailwind CSS", "PWA"],
    github: "https://github.com/mohamed-mydeen/mydeen",
    demo: "https://mydeenai.vercel.app/"
  },
    
    
    {
      title: "Intelligent Business Card Data Extracter",
      description: "A comprehensive application that extracts business card data using advanced OCR technology with database management and real-time processing capabilities.",
      category: "Software",
      technologies: ["Python", "MySQL", "EasyOCR", "Streamlit"],
      github: "https://github.com/M-Mohamed-Mydeen-Shahabudeen/Intelligent-Business-Card-Data-Extractor-and-Manager"
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
    <section ref={projectsRef} className="relative py-14 bg-[#E8D2B5] dark:bg-[#141414] text-[#181818] dark:text-[#f2efe9] overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Animated Ambient Glowing Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A5A79B]/10 dark:bg-indigo-500/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none animate-pulse duration-[4000ms]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#E8D2B5]/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {!limit && (
            <div className="mb-6 flex justify-start">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-x-1"
              >
                <span>&larr;</span> Back to Home
              </Link>
            </div>
          )}
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight mb-4">
              Project <span className="text-[#A5A79B] dark:text-[#E8D2B5]">Portfolio</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              A collection of my recent work, showcasing full-stack applications, AI solutions, and software engineering projects.
            </p>
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform active:scale-95 border ${
                    selectedCategory === category
                      ? 'bg-[#A5A79B] text-[#181818] border-[#A5A79B] shadow-xs scale-105 font-bold'
                      : 'bg-[#A5A79B]/15 dark:bg-slate-900/50 text-[#181818] dark:text-slate-300 border-[#A5A79B]/30 dark:border-white/10 hover:border-[#A5A79B] dark:hover:border-[#A5A79B]/50 hover:scale-102'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with 3D Tilt Cards */}
          <div className="min-h-[560px] transition-all duration-500 flex flex-col justify-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`h-full relative transition-all duration-500 transform ${
                    isVisible ? 'opacity-100 translate-y-0 animate-fadeIn' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index % 4) * 80}ms` }}
                >
                <TiltCard maxTilt={6} glare={true} className="h-full rounded-2xl">
                  <div className="bg-[#A5A79B]/20 dark:bg-slate-900/60 backdrop-blur-md border border-[#A5A79B]/30 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#A5A79B]/60 dark:hover:border-[#A5A79B]/50 hover:shadow-xl h-full flex flex-col relative z-10 group shadow-sm">
                    <div className="p-6 sm:p-8 flex flex-col h-full justify-between flex-grow">
                      <div>
                        {/* Title & Category Badge */}
                        <div className="flex items-start justify-between gap-4 mb-4 min-h-[3.25rem]">
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                            {project.title}
                          </h4>
                          {/* Category Badge */}
                          <span className="inline-block bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap group-hover:scale-105 transition-transform duration-300 shrink-0">
                            {project.category}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3 min-h-[4.25rem]">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="mb-6 h-[3.5rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 flex items-start">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-4 pt-5 border-t border-slate-100 dark:border-white/5 mt-auto">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hover:translate-x-0.5 duration-200"
                          >
                            <Github size={15} /> Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hover:translate-x-0.5 duration-200"
                          >
                            <ExternalLink size={15} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* View More Button */}
        {limit && filteredProjects.length > limit && (
           <div className={`mt-12 text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 rounded-xl font-semibold transition-all duration-300"
            >
              <Folder size={18} />
              <span>View All Projects</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
