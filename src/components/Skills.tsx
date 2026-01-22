import React, { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Java', 'Python', 'C', 'JavaScript']
    },
    {
      title: 'Web Technologies',
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js']
    },
    {
      title: 'Frameworks & APIs',
      skills: ['Spring Boot', 'REST APIs', 'Microservices']
    },
    {
      title: 'Databases',
      skills: ['SQL', 'MongoDB', 'MySQL']
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'Streamlit', 'Python', 'API Integration']
    },
    {
      title: 'Soft Skills',
      descriptions: [
        '> Problem Solving & Analytical Thinking',
        '> Team Collaboration & Adaptability',
        '> Time Management & Communication'
      ]
    }
  ];

  return (
    <section ref={skillsRef} className="relative min-h-screen py-24 bg-black overflow-hidden">
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
        {/* Header - Hacker Style */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="inline-block mb-4">
              <span className="text-green-400 text-xl font-mono hacker-text">{'> SKILLS.EXE'}</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-green-400 glow-text font-mono mb-4">
              TECHNICAL ARSENAL
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-8 opacity-70"></div>
            <p className="text-green-300 text-lg font-mono max-w-3xl mx-auto opacity-80">
              {'<'} Initializing skill database {'>'} 
            </p>
          </div>
        </div>

        {/* 3 Column Grid - Hacker Terminal Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`relative transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Terminal Border */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              
              <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 hover:border-green-500/70 rounded-lg p-6 transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,150,0.3)]">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-green-400 font-mono tracking-wider">
                    {category.title}
                  </h3>
                </div>

                {/* Skills or Descriptions */}
                <div className="space-y-3">
                  {category.skills ? (
                    category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`transition-all duration-300 ${
                          isVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ transitionDelay: `${(index * 80) + (skillIndex * 40)}ms` }}
                      >
                        <span className="inline-block bg-green-500/10 hover:bg-green-500/20 text-green-300 hover:text-green-400 px-4 py-2 rounded border border-green-500/30 hover:border-green-500/60 text-sm font-mono transition-all duration-300 mr-2 mb-2 hover:shadow-[0_0_10px_rgba(0,255,150,0.3)]">
                          {'>'} {skill}
                        </span>
                      </div>
                    ))
                  ) : (
                    category.descriptions.map((desc, descIndex) => (
                      <div
                        key={descIndex}
                        className={`bg-green-500/5 border-l-2 border-green-500/50 rounded px-4 py-3 text-green-300 text-sm font-mono transition-all duration-300 hover:bg-green-500/10 hover:border-green-500/70 hover:shadow-[0_0_10px_rgba(0,255,150,0.2)] ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}
                        style={{ transitionDelay: `${(index * 80) + (descIndex * 40)}ms` }}
                      >
                        {desc}
                      </div>
                    ))
                  )}
                </div>

                {/* Terminal Footer */}
                <div className="mt-4 pt-4 border-t border-green-500/20">
                  <span className="text-xs text-green-500/60 font-mono">
                    root@skills:~${' '}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Hacker Style */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { value: '12+', label: 'Technical Skills', icon: '⚡' },
            { value: '6', label: 'Categories', icon: '📦' },
            { value: '2', label: 'Internships', icon: '🔐' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-black/60 backdrop-blur-xl border border-green-500/30 hover:border-green-500/70 rounded-lg p-6 text-center transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,255,150,0.3)]"
            >
              <div className="mb-2 text-2xl">{stat.icon}</div>
              <p className="text-4xl font-bold text-green-400 font-mono mb-2 glow-text">
                {stat.value}
              </p>
              <p className="text-green-300 font-mono text-sm">{'>'} {stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer Command */}
        <div className={`text-center mt-20 transition-all duration-1000 ${
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

export default Skills;
