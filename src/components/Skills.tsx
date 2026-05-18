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
      skills: ['Java', 'C', 'Python', 'JavaScript']
    },
    {
      title: 'Web Technologies',
      skills: ['HTML', 'CSS', 'JavaScript', 'React.js','Bootstrap']
    },
    {
      title: 'Backend & Frameworks',
      skills: ['Spring Boot', 'REST APIs', 'Node.js']
    },
    {
      title: 'Databases',
      skills: ['PostgreSQl', 'MongoDB', 'MySQL','TiDB']
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git','Postman','vs code','Docker','mysql workbench  ']
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
    <section ref={skillsRef} className="relative pt-8 pb-8 bg-black overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header - Hacker Style */}
        <div className="text-center mb-12">
          <div data-reveal className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="inline-block mb-2">
              <span className="text-green-400 text-sm sm:text-base font-mono hacker-text">{'> SKILLS.EXE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 glow-text font-mono mb-3">
              TECHNICAL ARSENAL
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-4 opacity-70"></div>
            <p className="text-green-300 text-sm sm:text-base font-mono max-w-2xl mx-auto opacity-80">
              {'<'} Initializing skill database {'>'} 
            </p>
          </div>
        </div>

        {/* JSON Terminal Style */}
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} max-w-4xl mx-auto`}>
          <div className="bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,150,0.15)] group hover:border-green-500/50 transition-all duration-500">
            
            {/* Window Header */}
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-3 border-b border-green-500/30">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
              <span className="ml-4 text-xs font-mono text-green-400/70 tracking-wider">skills.json</span>
            </div>

            {/* Editor Content */}
            <div className="p-5 sm:p-8 overflow-x-auto">
              <pre className="font-mono text-sm md:text-base leading-[2]">
                <span className="text-purple-400 font-bold">const</span> <span className="text-blue-400 font-bold">mydeenSkills</span> <span className="text-slate-300">=</span> <span className="text-yellow-300">{'{'}</span>
                {'\n'}
                {skillCategories.map((cat, i) => (
                  <React.Fragment key={i}>
                    <span className="text-slate-500">{'  // '} {cat.title}</span>
                    {'\n'}
                    {'  '}<span className="text-cyan-400">"{cat.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}"</span><span className="text-slate-300">:</span> <span className="text-blue-300">{'['}</span>
                    {'\n'}
                    {'    '}
                    <div className="inline-flex flex-wrap gap-x-2 pl-8 -ml-8">
                      {(cat.skills || cat.descriptions || []).map((item, j, arr) => (
                        <React.Fragment key={j}>
                          <span className="text-green-400 transition-colors duration-300 hover:text-green-300 cursor-default">
                            "{item.replace(/^>\s*/, '')}"
                          </span>
                          {j < arr.length - 1 && <span className="text-slate-400">, </span>}
                        </React.Fragment>
                      ))}
                    </div>
                    {'\n'}
                    {'  '}<span className="text-blue-300">{']'}</span>{i < skillCategories.length - 1 ? <span className="text-slate-400">,</span> : ''}
                    {'\n\n'}
                  </React.Fragment>
                ))}
                <span className="text-yellow-300">{'}'}</span><span className="text-slate-300">;</span>
              </pre>
            </div>
          </div>
        </div>

        {/* Stats Section - Hacker Style */}
       

        {/* Footer Command */}
        
      </div>
    </section>
  );
};

export default Skills;
