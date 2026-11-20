import React, { useState, useEffect } from 'react';
import { 
  X, 
  Minus, 
  Square, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Grid, 
  List, 
  FileCode, 
  Folder, 
  FileText, 
  Terminal,
  Globe,
  Sparkles,
  Layers,
  Clock,
  HardDrive,
  Home as HomeIcon,
  FolderGit2
} from 'lucide-react';
import { ProjectType } from '../data/projectsData';

// Iconic Ubuntu Yaru Folder SVG
const UbuntuFolderIcon: React.FC<{ className?: string; category?: string }> = ({ 
  className = "w-14 h-12"
}) => (
  <svg 
    viewBox="0 0 64 52" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} drop-shadow-md select-none transition-transform duration-200 group-hover:scale-105`}
  >
    <defs>
      <linearGradient id="ubTab" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f36c34" />
        <stop offset="100%" stopColor="#d94411" />
      </linearGradient>
      <linearGradient id="ubBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e95420" />
        <stop offset="100%" stopColor="#c33d0e" />
      </linearGradient>
      <linearGradient id="ubBack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#b33309" />
        <stop offset="100%" stopColor="#8c2302" />
      </linearGradient>
    </defs>
    {/* Back flap */}
    <path d="M 4 8 C 4 5.8 5.8 4 8 4 L 24 4 C 26 4 27.8 5.1 28.8 6.8 L 31.5 11 L 56 11 C 58.2 11 60 12.8 60 15 L 60 22 L 4 22 Z" fill="url(#ubBack)" />
    {/* Paper insert hint */}
    <rect x="8" y="9" width="48" height="14" rx="2" fill="#faf8f5" opacity="0.9" />
    {/* Main front body */}
    <rect x="3" y="14" width="58" height="34" rx="4" fill="url(#ubBody)" />
    {/* Subtle highlight sheen */}
    <path d="M 4 15 C 4 14.5 4.5 14 5 14 L 59 14 C 59.5 14 60 14.5 60 15 L 60 16 L 4 16 Z" fill="#ff8d61" opacity="0.6" />
    {/* Ubuntu small emblem on folder */}
    <circle cx="32" cy="31" r="5" fill="#ffffff" opacity="0.25" />
    <circle cx="32" cy="31" r="2.5" fill="url(#ubBody)" />
  </svg>
);

interface UbuntuFileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectType[];
}

export const UbuntuFileManager: React.FC<UbuntuFileManagerProps> = ({
  isOpen,
  onClose,
  projects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
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
        if (activeProject) {
          setActiveProject(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeProject, onClose]);

  if (!isOpen) return null;

  // Filter projects by category and search query
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
              onClick={() => setActiveProject(null)}
              disabled={!activeProject}
              className={`p-1.5 rounded-lg transition-colors ${
                activeProject 
                  ? 'hover:bg-white/10 text-white cursor-pointer' 
                  : 'text-white/30 cursor-not-allowed'
              }`}
              title="Back"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Breadcrumb Path Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#202020] rounded-md text-xs font-medium border border-white/5">
              <HomeIcon size={13} className="text-[#e95420]" />
              <span>Home</span>
              <ChevronRight size={12} className="opacity-40" />
              <span className="text-[#e95420] font-semibold">Projects</span>
              {activeProject && (
                <>
                  <ChevronRight size={12} className="opacity-40" />
                  <span className="text-white truncate max-w-[140px] sm:max-w-[200px]">
                    {activeProject.title}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Center: Window Title (Desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-white/80">
            <span>Files</span>
            <span className="opacity-40">•</span>
            <span className="font-mono text-white/60">~/Portfolio/Projects</span>
          </div>

          {/* Right: Search, View Switcher & Window Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Search Input */}
            <div className="relative hidden sm:block">
              <Search size={13} className="absolute left-2.5 top-2 text-white/40" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#202020] border border-white/10 rounded-md pl-8 pr-3 py-1 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#e95420] w-36 lg:w-48 transition-all"
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

            {/* Ubuntu Window Controls (Minimize, Maximize, Close) */}
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
                className="w-4 h-4 rounded-full bg-[#e95420] hover:bg-[#d04212] text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                title="Close"
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            </div>

          </div>

        </div>

        {/* ─── 2. MAIN WINDOW BODY (SIDEBAR + FILE BROWSER) ───────────────────────── */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Ubuntu Nautilus Sidebar */}
          <div className="w-44 sm:w-56 bg-[#1e1e1e] border-r border-black/40 p-2 sm:p-3 flex flex-col justify-between shrink-0 text-xs">
            
            <div className="space-y-4">
              <div>
                <p className="px-2.5 py-1 text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Categories
                </p>
                <div className="space-y-0.5">
                  <button
                    onClick={() => { setSelectedCategory('all'); setActiveProject(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#e95420] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Folder size={14} />
                      <span>All Projects</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">{projects.length}</span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('web'); setActiveProject(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'web'
                        ? 'bg-[#e95420] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={14} />
                      <span>Web Apps</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {projects.filter(p => p.category.toLowerCase().includes('web')).length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('ai'); setActiveProject(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'ai'
                        ? 'bg-[#e95420] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={14} />
                      <span>AI &amp; ML</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {projects.filter(p => p.category.toLowerCase().includes('ai')).length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setSelectedCategory('software'); setActiveProject(null); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === 'software'
                        ? 'bg-[#e95420] text-white font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Terminal size={14} />
                      <span>Software Systems</span>
                    </span>
                    <span className="text-[10px] opacity-70 font-mono">
                      {projects.filter(p => p.category.toLowerCase().includes('software')).length}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <p className="px-2.5 py-1 text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                  Devices
                </p>
                <div className="px-2.5 py-1.5 flex items-center gap-2 text-white/50">
                  <HardDrive size={13} />
                  <span>Mydeen OS (256 GB)</span>
                </div>
              </div>
            </div>

            {/* Quick System Info Pill */}
            <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-white/80">Ubuntu 24.04 LTS</span>
              </div>
              <p className="text-[10px] text-white/40 font-mono">Gnome 46 • Wayland</p>
            </div>

          </div>

          {/* Right Main Folder Grid / Project Detail View */}
          <div className="flex-1 bg-[#1a1a1a] p-4 sm:p-6 overflow-y-auto">
            
            {!activeProject ? (
              // ─── BROWSE FOLDERS VIEW ──────────────────────────────────────
              <div>
                {/* Status Bar inside view */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10 text-xs text-white/50 font-mono">
                  <span>{filteredProjects.length} items in /home/mydeen/projects</span>
                  <span className="hidden sm:inline">Double-click or click to open folder</span>
                </div>

                {viewMode === 'grid' ? (
                  // Grid View of Folders
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProjects.map((project, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveProject(project)}
                        className="group flex flex-col items-center p-3 rounded-xl border border-transparent hover:border-[#e95420]/40 hover:bg-[#e95420]/10 cursor-pointer transition-all duration-200 text-center"
                      >
                        <UbuntuFolderIcon className="w-16 h-14 mb-2" />
                        <span className="text-xs font-semibold text-white/90 group-hover:text-[#e95420] transition-colors line-clamp-2 max-w-[140px] leading-snug">
                          {project.title}
                        </span>
                        <span className="text-[10px] text-white/40 mt-1 font-mono uppercase tracking-wide">
                          {project.category}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View of Folders
                  <div className="space-y-1">
                    <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-mono font-bold text-white/40 border-b border-white/5 uppercase">
                      <span className="col-span-6 sm:col-span-5">Name</span>
                      <span className="col-span-3 sm:col-span-3">Category</span>
                      <span className="hidden sm:inline-block sm:col-span-4">Technologies</span>
                    </div>
                    {filteredProjects.map((project, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveProject(project)}
                        className="grid grid-cols-12 items-center px-3 py-2.5 rounded-lg hover:bg-[#e95420]/15 hover:border-[#e95420]/30 border border-transparent cursor-pointer transition-all text-xs"
                      >
                        <div className="col-span-6 sm:col-span-5 flex items-center gap-2.5">
                          <UbuntuFolderIcon className="w-6 h-5 shrink-0" />
                          <span className="font-semibold text-white/90 truncate">
                            {project.title}
                          </span>
                        </div>
                        <span className="col-span-3 sm:col-span-3 text-[11px] font-mono text-white/50 uppercase">
                          {project.category}
                        </span>
                        <div className="hidden sm:flex col-span-4 gap-1.5 overflow-hidden">
                          {project.technologies.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 truncate">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // ─── INSIDE FOLDER: PROJECT INSPECTOR & DETAILS ────────────────
              <div className="space-y-6 animate-fadeIn">
                
                {/* Folder Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#242424] border border-white/10">
                  <div className="flex items-center gap-4">
                    <UbuntuFolderIcon className="w-14 h-12 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#e95420]/20 text-[#e95420] border border-[#e95420]/30">
                          {activeProject.category}
                        </span>
                        <span className="text-xs text-white/40 font-mono">Directory opened</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                        {activeProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* Actions: Live Demo & GitHub */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    {activeProject.demo && (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#e95420] hover:bg-[#d04212] text-white text-xs font-semibold shadow-md transition-colors"
                      >
                        <Globe size={14} />
                        <span>Open Live Demo</span>
                        <ExternalLink size={12} className="opacity-70" />
                      </a>
                    )}
                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
                      >
                        <Github size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Files in Folder Simulation */}
                <div>
                  <p className="text-xs font-mono font-semibold text-white/40 uppercase tracking-widest mb-3">
                    Folder Contents
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#242424] border border-white/5">
                      <FileText size={18} className="text-blue-400" />
                      <div className="text-xs truncate">
                        <p className="font-semibold text-white/90">README.md</p>
                        <p className="text-[10px] text-white/40 font-mono">2.4 KB</p>
                      </div>
                    </div>

                    {/* source_code/ Directory — Click to Open GitHub Project Link */}
                    <a
                      href={activeProject.github || 'https://github.com/mohamed-mydeen'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[#242424] hover:bg-[#2c2c2c] border border-white/5 hover:border-[#e95420]/50 transition-all cursor-pointer group/code shadow-xs"
                      title="Open GitHub Source Code Repository"
                    >
                      <FileCode size={18} className="text-emerald-400 group-hover/code:scale-110 transition-transform" />
                      <div className="text-xs truncate flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-white/90 group-hover/code:text-[#e95420] transition-colors truncate">
                            source_code/
                          </p>
                          <ExternalLink size={10} className="text-white/40 group-hover/code:text-white shrink-0" />
                        </div>
                        <p className="text-[10px] text-emerald-400/80 font-mono">GitHub Repo &bull; Open &rarr;</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#242424] border border-white/5">
                      <Layers size={18} className="text-amber-400" />
                      <div className="text-xs truncate">
                        <p className="font-semibold text-white/90">package.json</p>
                        <p className="text-[10px] text-white/40 font-mono">JSON Config</p>
                      </div>
                    </div>

                    {activeProject.demo ? (
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-[#242424] hover:bg-[#2c2c2c] border border-white/5 hover:border-[#e95420]/50 transition-all cursor-pointer group/run shadow-xs"
                        title="Run Executable Demo"
                      >
                        <Terminal size={18} className="text-purple-400 group-hover/run:scale-110 transition-transform" />
                        <div className="text-xs truncate flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <p className="font-semibold text-white/90 group-hover/run:text-[#e95420] transition-colors truncate">run.sh</p>
                            <ExternalLink size={10} className="text-white/40 group-hover/run:text-white shrink-0" />
                          </div>
                          <p className="text-[10px] text-purple-400/80 font-mono">Live Demo &bull; Run &rarr;</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#242424] border border-white/5">
                        <Terminal size={18} className="text-purple-400" />
                        <div className="text-xs truncate">
                          <p className="font-semibold text-white/90">run.sh</p>
                          <p className="text-[10px] text-white/40 font-mono">Executable</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Description (README Preview) */}
                <div className="p-5 rounded-xl bg-[#242424] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/70">
                      <FileText size={14} className="text-[#e95420]" />
                      <span>README.md — Project Documentation</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed">
                    {activeProject.description}
                  </p>

                  <div>
                    <p className="text-[11px] font-mono font-semibold text-white/50 uppercase tracking-wider mb-2">
                      Technologies &amp; Libraries
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-[#1a1a1a] text-xs font-mono text-[#e95420] border border-[#e95420]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Back to All Folders Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Projects Folder</span>
                </button>

              </div>
            )}

          </div>

        </div>

        {/* ─── 3. UBUNTU STATUSBAR ─────────────────────────────────────────────── */}
        <div className="h-7 bg-[#242424] border-t border-black/40 px-4 flex items-center justify-between text-[11px] font-mono text-white/40 shrink-0">
          <span>{filteredProjects.length} items</span>
          <span>Free space: 142.8 GB</span>
        </div>

      </div>
    </div>
  );
};

export default UbuntuFileManager;
