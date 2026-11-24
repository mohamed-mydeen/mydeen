import React from 'react';
import { 
  Download, 
  ExternalLink, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Code2, 
  Server, 
  Cpu, 
  Terminal,
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-[#A5A79B] dark:bg-[#141414] text-[#181818] dark:text-[#f2efe9] transition-colors duration-200 border-t border-black/10 dark:border-white/10 lg:min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden flex flex-col justify-center py-16 lg:py-0 px-4 sm:px-6 lg:px-8 xl:px-12 scroll-mt-0"
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl w-full flex flex-col justify-center lg:h-full lg:pt-16 lg:pb-6 relative z-10">
        
        {/* Section Header — Clean Left-Aligned Hierarchy */}
        <div className="mb-3.5 lg:mb-4 text-left shrink-0" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D2B5]/40 dark:bg-white/5 border border-[#181818]/15 dark:border-white/10 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
            <Terminal size={12} className="text-[#181818] dark:text-[#E8D2B5]" />
            <span>Profile &amp; Biography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] tracking-tight text-[#181818] dark:text-[#f2efe9]">
            About Mohamed
          </h2>
          <p className="text-xs sm:text-sm opacity-80 mt-1 max-w-2xl font-normal text-left">
            A software developer focused on crafting resilient full-stack systems, modern architectures, and smart automation.
          </p>
        </div>

        {/* ─── OS DEVELOPER WINDOW INSPECTOR ────────────────────────────────────── */}
        <div 
          className="rounded-2xl bg-[#E8D2B5]/95 dark:bg-[#1a1a1a] border border-black/15 dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-md flex flex-col shrink min-h-0"
          data-reveal
        >
          {/* Window Header Bar */}
          <div className="h-9 sm:h-10 bg-[#dbc3a4] dark:bg-[#252525] border-b border-black/10 dark:border-white/10 px-4 sm:px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />
              <span className="ml-3 text-xs font-mono font-semibold opacity-75 hidden sm:inline">
                ~/profile/about-mydeen.md
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono opacity-70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Full-Stack Developer</span>
            </div>
          </div>

          {/* Window Content Grid */}
          <div className="p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start flex-1 min-h-0">
            
            {/* Left Column: Portrait Photo, Actions & Philosophy Terminal */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center gap-3.5">
              
              {/* Profile Image with subtle framing */}
              <div className="relative group w-44 sm:w-52 lg:w-48 xl:w-56 shrink-0 mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#A5A79B]/40 to-black/10 dark:to-white/10 rounded-2xl blur-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                <img
                  src="/my%20photo.png"
                  alt="Mohamed Mydeen Shahabudeen"
                  loading="lazy"
                  className="relative rounded-2xl w-full h-52 sm:h-60 lg:h-56 xl:h-64 object-cover object-center border-2 border-black/15 dark:border-white/15 shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full">
                <a
                  href="/mohamedmydeensd.pdf"
                  download="mohamedmydeensd.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#181818] text-[#E8D2B5] dark:bg-[#E8D2B5] dark:text-[#181818] text-xs font-semibold hover:opacity-90 transition-all shadow-sm cursor-pointer"
                >
                  <Download size={14} />
                  <span>Resume</span>
                </a>

                <a
                  href="https://mydeenblog.vercel.app/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/15 dark:border-white/15 text-xs font-semibold transition-all"
                >
                  <BookOpen size={14} />
                  <span>Read Blog</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </div>

              {/* Interactive Terminal Philosophy Block */}
              <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#141414] text-[#dfdbd2] font-mono text-xs border border-black/20 dark:border-white/10 shadow-inner text-left">
                <div className="flex items-center gap-2 opacity-50 mb-1 text-[10px]">
                  <span>bash</span>
                  <span>&bull;</span>
                  <span>mydeen@desktop:~$</span>
                </div>
                <p className="text-emerald-400 font-semibold text-[11px]">
                  $ cat philosophy.txt
                </p>
                <p className="italic opacity-85 mt-1 leading-relaxed text-[11px]">
                  "Whoever travels a path in search of knowledge, GOD will make easy for him a path to Paradise."
                </p>
              </div>

            </div>

            {/* Right Column: Narrative, Developer Specs & Engineering Pillars */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between space-y-4 text-left">
              
              <div>
                <p className="text-xs font-mono font-bold tracking-widest text-[#A5A79B] dark:text-[#E8D2B5] uppercase mb-1">
                  // THE DEVELOPER JOURNEY
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] tracking-tight leading-snug text-[#181818] dark:text-[#f2efe9]">
                  Turning complex challenges into elegant, resilient web applications.
                </h3>
              </div>

              {/* Bio Paragraphs — Clean Left-Aligned Typography */}
              <div className="space-y-3 text-xs sm:text-sm lg:text-[14px] leading-relaxed opacity-90 text-left font-normal">
                <p>
                  Hi! I'm <strong className="font-bold underline decoration-[#A5A79B] underline-offset-4">Mohamed Mydeen Shahabudeen M</strong>, 
                  a full-stack developer dedicated to building scalable and efficient web applications. 
                  With a strong foundation in <span className="font-semibold">MERN Stack</span> (MongoDB, Express, React, Node.js) and <span className="font-semibold">Java Spring Boot</span>, 
                  I specialize in turning complex problems into elegant, user-friendly digital systems.
                </p>
                <p>
                  I am currently pursuing a B.Tech in Computer Science &amp; Business Systems at <strong className="font-bold">Francis Xavier Engineering College</strong>. 
                  Across multiple software internships, I've engineered cloud automation pipelines with Playwright &amp; AWS, constructed full-stack CRUD platforms with Spring Boot &amp; React, and architected custom data tools.
                </p>
              </div>

              {/* Developer Specs Grid (4 clean cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-0.5">
                  <span className="opacity-60 text-[10px] uppercase font-semibold flex items-center gap-1.5">
                    <GraduationCap size={12} className="text-[#A5A79B]" />
                    <span>Education</span>
                  </span>
                  <span className="font-bold truncate text-[11px] sm:text-xs">B.Tech CSBS @ FXEC</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-0.5">
                  <span className="opacity-60 text-[10px] uppercase font-semibold flex items-center gap-1.5">
                    <MapPin size={12} className="text-emerald-500" />
                    <span>Location</span>
                  </span>
                  <span className="font-bold truncate text-[11px] sm:text-xs">Tamil Nadu, India</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-0.5">
                  <span className="opacity-60 text-[10px] uppercase font-semibold flex items-center gap-1.5">
                    <Code2 size={12} className="text-[#A5A79B]" />
                    <span>Core Stack</span>
                  </span>
                  <span className="font-bold truncate text-[11px] sm:text-xs">MERN &bull; Spring Boot</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col gap-0.5">
                  <span className="opacity-60 text-[10px] uppercase font-semibold flex items-center gap-1.5">
                    <BookOpen size={12} className="text-[#A5A79B]" />
                    <span>Publications</span>
                  </span>
                  <a 
                    href="https://mydeenblog.vercel.app/about" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold truncate text-[11px] sm:text-xs text-[#A5A79B] dark:text-[#E8D2B5] hover:underline"
                  >
                    mydeenblog
                  </a>
                </div>
              </div>

              {/* Socials & Get In Touch (Matching Hero Section Font & Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Socials Box */}
                <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-left space-y-2">
                  <p className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A5A79B]" />
                    <span>Socials</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-semibold">
                    <a
                      href="https://github.com/mohamed-mydeen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline opacity-85 hover:opacity-100 transition-opacity tracking-wider uppercase text-[#181818] dark:text-[#f2efe9]"
                    >
                      GITHUB
                    </a>
                    <span className="opacity-30">&bull;</span>
                    <a
                      href="https://linkedin.com/in/mohamed-mydeen4262"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline opacity-85 hover:opacity-100 transition-opacity tracking-wider uppercase text-[#181818] dark:text-[#f2efe9]"
                    >
                      LINKEDIN
                    </a>
                    <span className="opacity-30">&bull;</span>
                    <a
                      href="https://mydeenblog.vercel.app/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline opacity-85 hover:opacity-100 transition-opacity tracking-wider uppercase text-[#181818] dark:text-[#f2efe9]"
                    >
                      BLOG
                    </a>
                  </div>
                </div>

                {/* Get In Touch Box */}
                <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-left space-y-2">
                  <p className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Get In Touch</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-semibold">
                    <a
                      href="mailto:mohamedmydeen.sd@gmail.com"
                      className="hover:underline opacity-85 hover:opacity-100 transition-opacity uppercase tracking-wider text-[#181818] dark:text-[#f2efe9]"
                    >
                      mohamedmydeen.sd@gmail.com
                    </a>
                    <span className="opacity-30">&bull;</span>
                    <a
                      href="tel:+919344990461"
                      className="hover:underline opacity-85 hover:opacity-100 transition-opacity tracking-wider text-[#181818] dark:text-[#f2efe9]"
                    >
                      +91 93449 90461
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
