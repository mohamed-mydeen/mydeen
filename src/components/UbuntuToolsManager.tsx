import React, { useState, useEffect } from 'react';
import { 
  X, 
  Minus, 
  Square, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  Grid, 
  List, 
  Folder, 
  Terminal,
  Globe,
  Server,
  Database,
  Cloud,
  CheckCircle2,
  HardDrive,
  Home as HomeIcon,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'devops';
  categoryLabel: string;
  level: string;
  description: string;
  experience: string;
  relatedProjects: string[];
  docUrl: string;
  color: string;
  iconPath: string;
}

const TOOLS_DATA: ToolItem[] = [
  // Languages
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Programming Language',
    level: 'Advanced • Core Backend',
    description: 'Object-oriented programming language used for enterprise backend systems, Spring Boot microservices, and robust REST APIs.',
    experience: 'Built full-stack CRUD applications and persistence architecture at Asta Systech.',
    relatedProjects: ['Asta Systech Backend', 'CRUD Management Systems'],
    docUrl: 'https://dev.java/',
    color: '#f89820',
    iconPath: '/tech-icons/java.svg'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Programming Language',
    level: 'Advanced • AI & Automation',
    description: 'High-level programming language utilized for test automation, computer vision, data engineering, and rapid API prototyping.',
    experience: 'Migrated Selenium suites to Playwright in Python at Skill Software (USA) and engineered Streamlit portals.',
    relatedProjects: ['Skill Software Automation', 'SafeCheck Detector', 'Intelligent Card Extractor'],
    docUrl: 'https://www.python.org/',
    color: '#3776ab',
    iconPath: '/tech-icons/python.svg'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'Programming Language',
    level: 'Proficient • Type Safety',
    description: 'Typed superset of JavaScript providing static type definitions, cleaner refactoring, and enterprise frontend scalability.',
    experience: 'Used across personal portfolio, technical blog platform, and modern web applications.',
    relatedProjects: ['Mydeen Dev Blog', 'Personal Portfolio'],
    docUrl: 'https://www.typescriptlang.org/',
    color: '#3178c6',
    iconPath: '/tech-icons/typescript.svg'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'languages',
    categoryLabel: 'Programming Language',
    level: 'Advanced • Core Web',
    description: 'Modern asynchronous JavaScript including ES Modules, DOM manipulation, promises, and interactive component lifecycles.',
    experience: 'Core driver for frontend web development, single page applications, and Node.js scripting.',
    relatedProjects: ['Symposium Web', 'Food Ordering PWA', 'Gateway Software Internship'],
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: '#f7df1e',
    iconPath: '/tech-icons/javascript.svg'
  },
  {
    id: 'c',
    name: 'C Programming',
    category: 'languages',
    categoryLabel: 'Programming Language',
    level: 'Foundational • Systems',
    description: 'Low-level procedural language used for data structures, memory management, and algorithmic problem solving.',
    experience: 'Academic coursework and algorithm implementations at FXEC.',
    relatedProjects: ['Data Structures Implementations'],
    docUrl: 'https://en.cppreference.com/w/c',
    color: '#a8b9cc',
    iconPath: '/tech-icons/c.svg'
  },

  // Frontend
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend Framework',
    level: 'Advanced • Daily Driver',
    description: 'Declarative, component-based frontend library for engineering responsive, high-performance web applications.',
    experience: 'Primary framework for building interactive user interfaces, SPA routing, state management, and modern web tooling.',
    relatedProjects: ['Mydeen Dev Blog', 'Portfolio', 'Asta Systech Web App', 'Food Ordering PWA'],
    docUrl: 'https://react.dev/',
    color: '#61dafb',
    iconPath: '/tech-icons/react.svg'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'CSS Framework',
    level: 'Advanced • Modern UI',
    description: 'Utility-first CSS framework providing responsive grid systems, dark mode palettes, and sleek glassmorphism designs.',
    experience: 'Designed modern layouts with bespoke animations, accessible micro-interactions, and custom design tokens.',
    relatedProjects: ['Mydeen Dev Blog', 'Portfolio Redesign'],
    docUrl: 'https://tailwindcss.com/',
    color: '#38bdf8',
    iconPath: '/tech-icons/tailwind.svg'
  },
  {
    id: 'html5-css3',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    categoryLabel: 'Web Standards',
    level: 'Expert • Semantic Web',
    description: 'Modern semantic markup, responsive flexbox/grid layouts, media queries, CSS variables, and accessibility best practices.',
    experience: 'Developed accessible, SEO-optimized semantic web structures across all web applications.',
    relatedProjects: ['All Web Projects', 'Railway Portal'],
    docUrl: 'https://developer.mozilla.org/',
    color: '#e34f26',
    iconPath: '/tech-icons/html5.svg'
  },

  // Backend
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'backend',
    categoryLabel: 'Backend Framework',
    level: 'Advanced • Enterprise Backend',
    description: 'Java framework for creating standalone, production-grade microservices, REST APIs, and JPA data persistence layers.',
    experience: 'Engineered REST endpoints, service layers, and MySQL connections during Asta Systech internship.',
    relatedProjects: ['Asta Systech CRUD Web App'],
    docUrl: 'https://spring.io/projects/spring-boot',
    color: '#6db33f',
    iconPath: '/tech-icons/spring.svg'
  },
  {
    id: 'node-js',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend Runtime',
    level: 'Proficient • Event-Driven',
    description: 'JavaScript runtime built on Chrome V8 engine for building fast, scalable network applications and RESTful APIs.',
    experience: 'Developed server-side API endpoints, npm build pipelines, and lightweight backend services.',
    relatedProjects: ['Gateway Software Solutions', 'Portfolio Build System'],
    docUrl: 'https://nodejs.org/',
    color: '#5fa04e',
    iconPath: '/tech-icons/nodejs.svg'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'Python Web Framework',
    level: 'Proficient • High Performance',
    description: 'Modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints.',
    experience: 'Used for asynchronous API endpoints, machine learning inference servers, and technical publications backend.',
    relatedProjects: ['Mydeen Dev Publications Backend'],
    docUrl: 'https://fastapi.tiangolo.com/',
    color: '#059669',
    iconPath: '/tech-icons/fastapi.svg'
  },
  {
    id: 'rest-api',
    name: 'RESTful Architecture',
    category: 'backend',
    categoryLabel: 'API Standard',
    level: 'Advanced • API Design',
    description: 'Stateless HTTP API communication standards, JSON contracts, status codes, JWT authentication, and pagination.',
    experience: 'Designed and consumed secure RESTful APIs across multiple internships and production deployments.',
    relatedProjects: ['Asta Systech', 'YouTube Data Analytics', 'Food Ordering PWA'],
    docUrl: 'https://restfulapi.net/',
    color: '#6366f1',
    iconPath: '/tech-icons/rest.svg'
  },

  // Databases
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'Relational Database',
    level: 'Proficient • Relational DB',
    description: 'Powerful, open-source object-relational database system with strong reputation for reliability, feature robustness, and performance.',
    experience: 'Engineered relational models, foreign key constraints, and relational querying for modern web systems.',
    relatedProjects: ['Mydeen Dev Blog Data Layer'],
    docUrl: 'https://www.postgresql.org/',
    color: '#336791',
    iconPath: '/tech-icons/postgresql.svg'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'Relational Database',
    level: 'Advanced • SQL & Indexing',
    description: 'Fast, reliable relational database management system used for transactional application storage and data analysis.',
    experience: 'Designed normalized schemas and optimized complex SQL queries across internships and data warehousing tools.',
    relatedProjects: ['Asta Systech CRUD App', 'IPCS Global Project', 'Railway Feedback Portal'],
    docUrl: 'https://www.mysql.com/',
    color: '#4479a1',
    iconPath: '/tech-icons/mysql.svg'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    categoryLabel: 'NoSQL Database',
    level: 'Proficient • Document Store',
    description: 'Document-oriented NoSQL database designed for elastic scalability, flexible JSON-like schemas, and fast querying.',
    experience: 'Implemented MERN stack data layers, document models, and aggregation pipelines.',
    relatedProjects: ['MERN Stack Applications', 'Food Ordering PWA'],
    docUrl: 'https://www.mongodb.com/',
    color: '#47a248',
    iconPath: '/tech-icons/mongodb.svg'
  },

  // DevOps & Tools
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'devops',
    categoryLabel: 'Version Control',
    level: 'Advanced • Daily Workflow',
    description: 'Distributed version control system for tracking source code changes, collaborative branching, PRs, and CI/CD triggers.',
    experience: 'Maintains 50+ public repositories with structured commits, semantic versioning, and open-source contributions.',
    relatedProjects: ['All Repositories', 'mohamed-mydeen on GitHub'],
    docUrl: 'https://git-scm.com/',
    color: '#f05032',
    iconPath: '/tech-icons/git.svg'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    category: 'devops',
    categoryLabel: 'Cloud Platform',
    level: 'Proficient • Cloud Deployment',
    description: 'Cloud computing platform providing on-demand compute, cloud storage, container deployment, and infrastructure orchestration.',
    experience: 'Configured AWS deployments and cloud execution infrastructure during Skill Software internship.',
    relatedProjects: ['Skill Software Cloud Pipeline'],
    docUrl: 'https://aws.amazon.com/',
    color: '#ff9900',
    iconPath: '/tech-icons/aws.svg'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    categoryLabel: 'Containerization',
    level: 'Intermediate • Containers',
    description: 'Platform for developing, shipping, and running applications in lightweight, isolated software containers.',
    experience: 'Created Dockerfiles for reproducible environments and microservices development.',
    relatedProjects: ['Web Systems Containerization'],
    docUrl: 'https://www.docker.com/',
    color: '#2496ed',
    iconPath: '/tech-icons/docker.svg'
  },
  {
    id: 'playwright',
    name: 'Playwright (Python)',
    category: 'devops',
    categoryLabel: 'Test Automation',
    level: 'Advanced • Automation',
    description: 'Modern framework for reliable end-to-end cross-browser automation, headless testing, and web scraping.',
    experience: 'Migrated legacy Selenium suites to Playwright in Python at Skill Software, dramatically reducing test execution times.',
    relatedProjects: ['Skill Software Automation Suites'],
    docUrl: 'https://playwright.dev/',
    color: '#2e7d32',
    iconPath: '/tech-icons/playwright.svg'
  },
  {
    id: 'linux',
    name: 'Linux / Ubuntu Environment',
    category: 'devops',
    categoryLabel: 'Operating System',
    level: 'Daily Driver • CLI Proficient',
    description: 'Unix shell environment, bash scripting, file permissions, package management, and developer command line tools.',
    experience: 'Primary development OS environment for programming, container orchestration, and server administration.',
    relatedProjects: ['Ubuntu Developer Desktop', 'System Administration'],
    docUrl: 'https://ubuntu.com/',
    color: '#A5A79B',
    iconPath: '/tech-icons/linux.svg'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'devops',
    categoryLabel: 'API Development',
    level: 'Advanced • API Testing',
    description: 'API development, debugging, mock server creation, and automated regression testing environment.',
    experience: 'Used to test and document all REST endpoints across Spring Boot, Node.js, and FastAPI services.',
    relatedProjects: ['Spring Boot Backend Testing', 'API Verifications'],
    docUrl: 'https://www.postman.com/',
    color: '#ff6c37',
    iconPath: '/tech-icons/postman.svg'
  }
];

// Official High-Resolution Tech Logo Component
const OfficialToolLogo: React.FC<{ tool: ToolItem; size?: 'sm' | 'md' | 'lg' }> = ({ tool, size = 'md' }) => {
  if (size === 'sm') {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#262626] border border-white/10 p-1 flex items-center justify-center shrink-0 shadow-xs">
        <img 
          src={tool.iconPath} 
          alt={tool.name} 
          className="w-full h-full object-contain" 
          loading="lazy" 
        />
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div 
        className="w-16 h-16 rounded-2xl bg-[#282828] border border-white/15 p-3 flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden group"
        style={{ boxShadow: `0 8px 24px ${tool.color}30` }}
      >
        <div 
          className="absolute inset-0 opacity-15 blur-md pointer-events-none" 
          style={{ backgroundColor: tool.color }} 
        />
        <img 
          src={tool.iconPath} 
          alt={tool.name} 
          className="w-full h-full object-contain relative z-10 drop-shadow-md" 
          loading="lazy" 
        />
      </div>
    );
  }

  // Default 'md' for Grid View
  return (
    <div 
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#282828] border border-white/10 group-hover:border-[#A5A79B]/60 p-2.5 sm:p-3 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(233,84,32,0.25)] transition-all duration-200 relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 pointer-events-none" 
        style={{ backgroundColor: tool.color }} 
      />
      <img
        src={tool.iconPath}
        alt={`${tool.name} official logo`}
        className="w-9 h-9 sm:w-10 sm:h-10 object-contain relative z-10 transition-transform duration-200 drop-shadow"
        loading="lazy"
      />
    </div>
  );
};

interface UbuntuToolsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UbuntuToolsManager: React.FC<UbuntuToolsManagerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Freeze body & stop Lenis scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      (window as any).lenis?.stop();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (activeTool) {
          setActiveTool(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeTool, onClose]);

  if (!isOpen) return null;

  // Filter tools
  const filteredTools = TOOLS_DATA.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm select-none animate-fadeIn overscroll-none"
      onClick={onClose}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Ubuntu Window Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className={`w-full bg-[#242424] text-[#dfdbd2] rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 ${
          isMaximized 
            ? 'h-full max-w-none rounded-none' 
            : 'max-w-5xl h-[85vh] max-h-[720px]'
        }`}
        style={{ fontFamily: 'Ubuntu, system-ui, -apple-system, sans-serif' }}
      >
        {/* ─── 1. UBUNTU NAUTILUS HEADERBAR ─────────────────────────────────────── */}
        <div className="h-12 bg-[#2f2f2f] border-b border-black/40 flex items-center justify-between px-3 sm:px-4 shrink-0">
          
          {/* Left: Navigation Buttons & Breadcrumb */}
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <button
              onClick={() => setActiveTool(null)}
              disabled={!activeTool}
              className={`p-1.5 rounded-lg transition-colors ${
                activeTool 
                  ? 'hover:bg-white/10 text-white cursor-pointer' 
                  : 'text-white/30 cursor-not-allowed'
              }`}
              title="Go Back"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Breadcrumb Path */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#202020] rounded-lg border border-white/5 text-xs font-mono">
              <span className="flex items-center gap-1 text-white/50">
                <HomeIcon size={12} />
                <span>Home</span>
              </span>
              <ChevronRight size={12} className="text-white/30" />
              <span className="text-[#A5A79B] font-semibold">Tools &amp; Arsenal</span>
              {activeTool && (
                <>
                  <ChevronRight size={12} className="text-white/30" />
                  <span className="text-white/90 truncate max-w-[150px]">{activeTool.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Center Title (Desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/70">
            <Terminal size={14} className="text-[#A5A79B]" />
            <span>Development Tools &bull; ~/Portfolio/Tools</span>
          </div>

          {/* Right: Search, View Mode, Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search tools, stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#202020] border border-white/10 rounded-md pl-8 pr-3 py-1 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#A5A79B] w-36 lg:w-48 transition-all"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#202020] rounded-md p-0.5 border border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#353535] text-white' : 'text-white/50 hover:text-white'}`}
                title="Grid View"
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-[#353535] text-white' : 'text-white/50 hover:text-white'}`}
                title="List View"
              >
                <List size={14} />
              </button>
            </div>

            <div className="h-4 w-px bg-white/10 mx-1" />

            {/* Ubuntu Window Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Minimize"
              >
                <Minus size={9} />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3.5 h-3.5 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isMaximized ? "Restore Window" : "Maximize Window"}
              >
                <Square size={8} />
              </button>
              <button
                onClick={onClose}
                className="w-4 h-4 rounded-full bg-[#A5A79B] hover:bg-[#96988c] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                title="Close"
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            </div>

          </div>

        </div>

        {/* ─── 2. MAIN BODY (SIDEBAR + TOOLS EXPLORER) ─────────────────────────── */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Ubuntu Sidebar */}
          <div className="w-44 sm:w-56 bg-[#1e1e1e] border-r border-black/40 p-2 sm:p-3 flex flex-col justify-between shrink-0 text-xs">
            <div className="space-y-4">
              <div>
                <p className="px-2.5 py-1 text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Tool Categories
                </p>
                <div className="space-y-0.5">
                  <button
                    onClick={() => { setSelectedCategory('all'); setActiveTool(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#A5A79B] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers size={14} />
                      <span>All Tools</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">{TOOLS_DATA.length}</span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('languages'); setActiveTool(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'languages'
                        ? 'bg-[#A5A79B] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Terminal size={14} />
                      <span>Languages</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {TOOLS_DATA.filter(t => t.category === 'languages').length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('frontend'); setActiveTool(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'frontend'
                        ? 'bg-[#A5A79B] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={14} />
                      <span>Frontend &amp; UI</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {TOOLS_DATA.filter(t => t.category === 'frontend').length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('backend'); setActiveTool(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'backend'
                        ? 'bg-[#A5A79B] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Server size={14} />
                      <span>Backend &amp; APIs</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {TOOLS_DATA.filter(t => t.category === 'backend').length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('databases'); setActiveTool(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'databases'
                        ? 'bg-[#A5A79B] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Database size={14} />
                      <span>Databases</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {TOOLS_DATA.filter(t => t.category === 'databases').length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('devops'); setActiveTool(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'devops'
                        ? 'bg-[#A5A79B] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Cloud size={14} />
                      <span>DevOps &amp; Cloud</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {TOOLS_DATA.filter(t => t.category === 'devops').length}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <p className="px-2.5 py-1 text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Environment
                </p>
                <div className="px-2.5 py-1.5 flex items-center gap-2 text-white/50">
                  <HardDrive size={13} />
                  <span>Linux x86_64 Architecture</span>
                </div>
              </div>
            </div>

            {/* Quick Tech Badge */}
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-white/80">Active Developer Stack</span>
              </div>
              <p className="text-[10px] text-white/40 font-mono">20+ Production Packages</p>
            </div>
          </div>

          {/* Right Main Folder Grid */}
          <div className="flex-1 bg-[#1a1a1a] p-4 sm:p-6 overflow-y-auto">
            
            {!activeTool ? (
              // ─── BROWSE TOOLS FOLDER VIEW ─────────────────────────────────
              <div>
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-xs text-white/50 font-mono">
                  <span>{filteredTools.length} tools &amp; frameworks in /home/mydeen/tools</span>
                  <span className="hidden sm:inline">Click a tool to inspect details</span>
                </div>

                {viewMode === 'grid' ? (
                  // Grid View with Real Official Logos
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {filteredTools.map((tool) => (
                      <div
                        key={tool.id}
                        onClick={() => setActiveTool(tool)}
                        className="group flex flex-col items-center p-3.5 rounded-xl border border-transparent hover:border-[#A5A79B]/40 hover:bg-[#A5A79B]/10 cursor-pointer transition-all duration-200 text-center"
                      >
                        <OfficialToolLogo tool={tool} size="md" />
                        <span className="text-xs font-bold text-white/95 group-hover:text-[#A5A79B] transition-colors mt-2.5 truncate max-w-[130px]">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono mt-0.5 truncate max-w-[130px]">
                          {tool.categoryLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View with Real Official Logos
                  <div className="space-y-1">
                    <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-mono font-bold text-white/40 border-b border-white/5 uppercase">
                      <span className="col-span-5 sm:col-span-4">Tool / Framework</span>
                      <span className="col-span-4 sm:col-span-3">Category</span>
                      <span className="col-span-3 sm:col-span-5">Proficiency Level</span>
                    </div>
                    {filteredTools.map((tool) => (
                      <div
                        key={tool.id}
                        onClick={() => setActiveTool(tool)}
                        className="grid grid-cols-12 items-center px-3 py-2.5 rounded-lg hover:bg-[#A5A79B]/15 hover:border-[#A5A79B]/30 border border-transparent cursor-pointer transition-all text-xs"
                      >
                        <div className="col-span-5 sm:col-span-4 flex items-center gap-3 truncate">
                          <OfficialToolLogo tool={tool} size="sm" />
                          <span className="font-semibold text-white/90 truncate">
                            {tool.name}
                          </span>
                        </div>
                        <span className="col-span-4 sm:col-span-3 text-[11px] font-mono text-white/50 truncate">
                          {tool.categoryLabel}
                        </span>
                        <span className="col-span-3 sm:col-span-5 text-[11px] font-mono text-emerald-400 truncate">
                          {tool.level}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // ─── TOOL DETAILS INSPECTOR ────────────────────────────────────
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#242424] border border-white/10">
                  <div className="flex items-center gap-4">
                    <OfficialToolLogo tool={activeTool} size="lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
                          style={{ 
                            color: activeTool.color, 
                            borderColor: `${activeTool.color}40`,
                            backgroundColor: `${activeTool.color}15`
                          }}
                        >
                          {activeTool.categoryLabel}
                        </span>
                        <span className="text-xs text-emerald-400 font-mono font-semibold">
                          &bull; {activeTool.level}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {activeTool.name}
                      </h3>
                    </div>
                  </div>

                  {/* External Docs Link */}
                  <a
                    href={activeTool.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#A5A79B] hover:bg-[#96988c] text-white text-xs font-semibold shadow-md transition-colors shrink-0"
                  >
                    <span>Official Docs</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                </div>

                {/* Tool Description Card */}
                <div className="p-5 rounded-xl bg-[#242424] border border-white/10 space-y-4">
                  <div>
                    <p className="text-[11px] font-mono font-semibold text-white/50 uppercase tracking-wider mb-1">
                      Overview &amp; Purpose
                    </p>
                    <p className="text-sm text-white/85 leading-relaxed">
                      {activeTool.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-[11px] font-mono font-semibold text-white/50 uppercase tracking-wider mb-1">
                      Production &amp; Hands-on Experience
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed font-mono">
                      {activeTool.experience}
                    </p>
                  </div>

                  {/* Applied Projects */}
                  {activeTool.relatedProjects.length > 0 && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[11px] font-mono font-semibold text-white/50 uppercase tracking-wider mb-2">
                        Applied in Projects
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeTool.relatedProjects.map((proj, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                          >
                            <CheckCircle2 size={12} className="text-[#A5A79B]" />
                            <span>{proj}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Back Button */}
                <button
                  onClick={() => setActiveTool(null)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-xs font-mono transition-colors cursor-pointer border border-white/10"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Tools Folder</span>
                </button>

              </div>
            )}

          </div>

        </div>

        {/* ─── 3. STATUSBAR ────────────────────────────────────────────────────── */}
        <div className="h-7 bg-[#242424] border-t border-black/40 px-4 flex items-center justify-between text-[11px] font-mono text-white/40 shrink-0">
          <span>{filteredTools.length} tools installed</span>
          <span>Environment: Production Ready</span>
        </div>

      </div>
    </div>
  );
};

export default UbuntuToolsManager;
