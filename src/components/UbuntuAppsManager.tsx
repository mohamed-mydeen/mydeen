import React, { useState, useEffect } from 'react';
import { 
  X, 
  Minus, 
  Square, 
  Search, 
  ExternalLink, 
  Github, 
  Layers, 
  CreditCard,
  ScanFace
} from 'lucide-react';

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  category: 'web' | 'ai' | 'cloud' | 'software';
  categoryLabel: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  iconPath?: string;
  iconFallbackInitial: string;
  gradient: string;
  status: 'Live' | 'Deployed' | 'Desktop';
}

const APPS_DATA: AppItem[] = [
  {
    id: 'mydeen-ai',
    name: 'Mydeen AI',
    tagline: 'Conversational Artificial Intelligence Suite',
    category: 'ai',
    categoryLabel: 'Generative AI',
    description: 'Intelligent conversational AI assistant engineered with real-time streaming, generative reasoning, and custom prompt workflows.',
    technologies: ['React', 'Gemini API', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://mydeenai.vercel.app/',
    iconPath: '/mydeenai-original.png',
    iconFallbackInitial: 'M',
    gradient: 'from-violet-500 to-indigo-600',
    status: 'Live'
  },
  {
    id: 'feast-at-night',
    name: 'Feast At Night',
    tagline: 'Food Ordering & Night Delivery PWA',
    category: 'web',
    categoryLabel: 'E-Commerce & Food',
    description: 'Progressive Web Application designed for late-night food delivery, dynamic menu discovery, real-time cart state, and order tracking.',
    technologies: ['React', 'Redux', 'Node.js', 'Tailwind CSS'],
    liveUrl: 'https://mpmhub.vercel.app/',
    iconPath: 'https://mpmhub.vercel.app/apple-touch-icon.png',
    iconFallbackInitial: 'F',
    gradient: 'from-emerald-500 to-teal-600',
    status: 'Live'
  },
  {
    id: 'mydeen-blog',
    name: 'Mydeen Dev Blog',
    tagline: 'Technical Blog & Engineering Publications',
    category: 'web',
    categoryLabel: 'Engineering Platform',
    description: 'Official tech blog and engineering platform featuring in-depth articles on AI engineering, full-stack systems, modern architectures, and tutorials.',
    technologies: ['React', 'FastAPI', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://mydeenblog.vercel.app/about',
    iconPath: '/my%20photo.png',
    iconFallbackInitial: 'B',
    gradient: 'from-blue-600 to-indigo-600',
    status: 'Live'
  },
  {
    id: 'pbuh-app',
    name: 'Peace Be Upon Him',
    tagline: 'Daily Quran, Hadith & Prayer Companion APK',
    category: 'software',
    categoryLabel: 'Islamic Companion App',
    description: 'Dedicated Islamic companion application featuring prayer times, Quran recitations, Hadith collections, and offline spiritual tools.',
    technologies: ['Android', 'React', 'TypeScript', 'PWA'],
    liveUrl: 'https://pbuh.vercel.app/',
    iconPath: '/pbuh-logo.png',
    iconFallbackInitial: 'P',
    gradient: 'from-emerald-700 to-amber-600',
    status: 'Live'
  },
  {
    id: 'safecheck',
    name: 'SafeCheck ML',
    tagline: 'Seasonal Phishing & Deceptive Site Detector',
    category: 'ai',
    categoryLabel: 'Cybersecurity & ML',
    description: 'Automated machine learning security application detecting phishing domains and fraudulent seasonal clone websites with high precision.',
    technologies: ['Python', 'Streamlit', 'Scikit-Learn', 'Heuristic Engine'],
    liveUrl: 'https://seasonal-deceptive-website-detector.streamlit.app/',
    iconPath: '/safecheck-icon.png',
    iconFallbackInitial: 'S',
    gradient: 'from-cyan-500 to-blue-600',
    status: 'Live'
  },
  {
    id: 'card-extractor',
    name: 'Business Card OCR Manager',
    tagline: 'Card Scanning & Structured SQL Management',
    category: 'software',
    categoryLabel: 'Computer Vision & OCR',
    description: 'Data digitization platform utilizing Optical Character Recognition to extract business contact metadata from photos into normalized MySQL databases.',
    technologies: ['Python', 'EasyOCR', 'MySQL', 'Streamlit'],
    githubUrl: 'https://github.com/M-Mohamed-Mydeen-Shahabudeen/Intelligent-Business-Card-Data-Extractor-and-Manager',
    iconFallbackInitial: 'C',
    gradient: 'from-amber-500 to-orange-600',
    status: 'Deployed'
  },
  {
    id: 'face-auth',
    name: 'Face Authentication System',
    tagline: 'Real-time Facial Biometric Security',
    category: 'ai',
    categoryLabel: 'Computer Vision',
    description: 'Desktop biometric authentication framework implementing facial recognition algorithms, feature extraction, and secure session management.',
    technologies: ['Python', 'OpenCV', 'Tkinter', 'Haar Cascades'],
    githubUrl: 'https://github.com/M-Mohamed-Mydeen-Shahabudeen/Real-time-Face-Detection-and-Authentication-System-Using-OpenCV-',
    iconFallbackInitial: 'A',
    gradient: 'from-rose-500 to-red-600',
    status: 'Desktop'
  }
];

interface UbuntuAppsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UbuntuAppsManager: React.FC<UbuntuAppsManagerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'ai' | 'software'>('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

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

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedApp) {
          setSelectedApp(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedApp, onClose]);

  if (!isOpen) return null;

  const filteredApps = APPS_DATA.filter(app => {
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    const matchesSearch = 
      searchQuery === '' ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pb-24 sm:pb-24 bg-black/60 backdrop-blur-sm select-none animate-fadeIn overscroll-none"
      onClick={onClose}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* ─── UBUNTU APPLICATIONS WINDOW (MATCHING PASTED DESIGN EXACTLY) ────────── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#242424] text-[#dfdbd2] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[85vh] transition-all duration-300"
        style={{ fontFamily: 'Ubuntu, system-ui, -apple-system, sans-serif' }}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* 1. Header Bar */}
        <div className="h-12 bg-[#2d2d2d] border-b border-black/40 flex items-center justify-between px-4 shrink-0">
          {/* Left: Window Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#A5A79B] hover:brightness-110 flex items-center justify-center text-black/70 hover:text-black cursor-pointer shadow-sm transition-transform active:scale-95"
              title="Close"
            >
              <X size={10} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setSelectedApp(null)}
              className="w-3.5 h-3.5 rounded-full bg-[#3d3d3d] hover:bg-[#4d4d4d] flex items-center justify-center text-white/40 cursor-pointer shadow-sm"
              title="Minimize"
            >
              <Minus size={9} strokeWidth={2.5} />
            </button>
            <button
              className="w-3.5 h-3.5 rounded-full bg-[#3d3d3d] flex items-center justify-center text-white/20 cursor-default shadow-sm"
              title="Maximize"
            >
              <Square size={8} strokeWidth={2.5} />
            </button>
            
            <span className="ml-3 text-xs font-semibold text-white/80 font-mono flex items-center gap-2">
              <Layers size={14} className="text-[#A5A79B]" />
              <span>Applications</span>
            </span>
          </div>

          {/* Right: Status badge */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredApps.length} Apps Ready</span>
          </div>
        </div>

        {/* 2. Search & Category Filters Bar */}
        <div className="p-3 bg-[#282828] border-b border-black/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search apps or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#A5A79B] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-[#1e1e1e] p-1 rounded-lg border border-white/5 self-stretch sm:self-auto overflow-x-auto text-[11px] font-mono">
            {[
              { id: 'all', label: 'All' },
              { id: 'web', label: 'Web' },
              { id: 'ai', label: 'AI & ML' },
              { id: 'software', label: 'Software' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setSelectedApp(null);
                }}
                className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#A5A79B] text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Main Body Content (App Grid & Quick Preview) */}
        <div 
          className="p-4 sm:p-5 overflow-y-auto max-h-[60vh] overscroll-contain"
          data-lenis-prevent="true"
        >
          {/* Apps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredApps.map((app) => {
              const hasImgError = imgErrors[app.id];
              const isSelected = selectedApp?.id === app.id;

              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(isSelected ? null : app)}
                  className={`group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#333333] border-[#A5A79B] shadow-md ring-1 ring-[#A5A79B]/50'
                      : 'bg-[#2b2b2b] hover:bg-[#323232] border-white/5 hover:border-white/15'
                  }`}
                >
                  {/* App Squircle Icon */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-white/5 border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                    {app.iconPath && !hasImgError ? (
                      <img
                        src={app.iconPath}
                        alt={`${app.name} icon`}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(prev => ({ ...prev, [app.id]: true }))}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white font-bold font-['Space_Grotesk'] text-base`}>
                        {app.iconFallbackInitial}
                      </div>
                    )}
                  </div>

                  {/* App Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#A5A79B] transition-colors truncate">
                        {app.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 shrink-0">
                        {app.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5 font-normal">
                      {app.tagline}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {app.technologies.slice(0, 2).map((tech, i) => (
                        <span 
                          key={i}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-white/50 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {app.technologies.length > 2 && (
                        <span className="text-[9px] font-mono text-white/40">
                          +{app.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredApps.length === 0 && (
            <div className="py-12 text-center text-white/40 font-mono text-xs">
              No applications found matching "{searchQuery}"
            </div>
          )}

          {/* Detailed Inspector Drawer for Selected App */}
          {selectedApp && (
            <div className="mt-4 p-4 rounded-xl bg-[#1e1e1e] border border-[#A5A79B]/40 shadow-lg animate-fadeIn flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#A5A79B] uppercase font-semibold">
                      {selectedApp.categoryLabel}
                    </span>
                    <span className="text-white/30">&bull;</span>
                    <span className="text-xs font-mono text-white/50">
                      {selectedApp.status} Application
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5 font-['Space_Grotesk']">
                    {selectedApp.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1 text-white/40 hover:text-white rounded-md cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-normal">
                {selectedApp.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedApp.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
                {selectedApp.liveUrl && (
                  <a
                    href={selectedApp.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#A5A79B] hover:bg-[#d4481a] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    <ExternalLink size={13} />
                    <span>Launch App</span>
                  </a>
                )}

                {selectedApp.githubUrl && (
                  <a
                    href={selectedApp.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Github size={13} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* 4. Status Bar */}
        <div className="h-8 bg-[#202020] border-t border-black/40 px-4 flex items-center justify-between text-[11px] font-mono text-white/40 shrink-0">
          <span>{filteredApps.length} of {APPS_DATA.length} applications displayed</span>
          <span>Click app to inspect or launch</span>
        </div>
      </div>
    </div>
  );
};

export default UbuntuAppsManager;
