import React, { useState } from 'react';
import { FileCode, Copy, Check, Terminal } from 'lucide-react';

const Skills: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const skillsData = {
    programming_languages: ["Java", "C", "Python", "JavaScript"],
    web_technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    backend_and_frameworks: ["Spring Boot", "REST APIs", "Node.js"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "TiDB"],
    tools_and_platforms: ["Git", "Docker", "Postman", "VS Code", "MySQL Workbench"],
    core_competencies: [
      "Problem Solving & Analytical Thinking",
      "Team Collaboration & Adaptability",
      "Time Management & Technical Leadership"
    ]
  };

  const jsonString = JSON.stringify(skillsData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    { key: "programming_languages", title: "Programming Languages", values: skillsData.programming_languages },
    { key: "web_technologies", title: "Web Technologies", values: skillsData.web_technologies },
    { key: "backend_and_frameworks", title: "Backend & Frameworks", values: skillsData.backend_and_frameworks },
    { key: "databases", title: "Databases", values: skillsData.databases },
    { key: "tools_and_platforms", title: "Tools & Platforms", values: skillsData.tools_and_platforms },
    { key: "core_competencies", title: "Core Competencies", values: skillsData.core_competencies }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-[#0a0a0f] border-t border-slate-100 dark:border-slate-800/40 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-14 text-center" data-reveal>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">
            <Terminal className="w-3.5 h-3.5" />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            A clean, structured schema of programming languages, frameworks, database architectures, and software tools.
          </p>
        </div>

        {/* Minimalist Professional JSON IDE Terminal */}
        <div className="max-w-4xl mx-auto" data-reveal>
          <div className="bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
            
            {/* IDE Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                
                <div className="ml-3 flex items-center gap-1.5 px-3 py-1 bg-[#0d1117] rounded-md border border-slate-800 text-xs font-mono text-slate-300">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  <span>skills.json</span>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-md transition-all cursor-pointer"
                title="Copy JSON string"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto select-text">
              <div className="flex">
                {/* Line Numbers */}
                <div className="pr-4 text-slate-600 text-right select-none font-mono text-xs sm:text-sm space-y-1">
                  <div>1</div>
                  {categories.map((_, i) => (
                    <React.Fragment key={i}>
                      <div>{i * 2 + 2}</div>
                      <div>{i * 2 + 3}</div>
                    </React.Fragment>
                  ))}
                  <div>{categories.length * 2 + 2}</div>
                </div>

                {/* Code Content */}
                <div className="flex-1 space-y-1">
                  <div>
                    <span className="text-amber-300 font-bold">{'{'}</span>
                  </div>

                  {categories.map((cat, i) => (
                    <div key={i} className="pl-4 sm:pl-6 hover:bg-slate-800/30 rounded transition-colors py-0.5">
                      <span className="text-indigo-400 font-semibold">"{cat.key}"</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-sky-300 font-semibold">[</span>
                      {cat.values.map((val, j) => (
                        <span key={j}>
                          <span className="text-emerald-400">"{val}"</span>
                          {j < cat.values.length - 1 && <span className="text-slate-400">, </span>}
                        </span>
                      ))}
                      <span className="text-sky-300 font-semibold">]</span>
                      {i < categories.length - 1 && <span className="text-slate-400">,</span>}
                    </div>
                  ))}

                  <div>
                    <span className="text-amber-300 font-bold">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Footer Bar */}
            <div className="px-4 py-2 bg-[#161b22] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  JSON Validated
                </span>
                <span>UTF-8</span>
              </div>
              <span>{Object.keys(skillsData).length} Schema Categories</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
