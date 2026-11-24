import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  Terminal, 
  Layers, 
  CreditCard, 
  ScanFace
} from 'lucide-react';

interface UbuntuBottomDockProps {
  onOpenProjects: () => void;
  onOpenTools: () => void;
  onOpenApps?: () => void;
  onCloseAll?: () => void;
  isProjectsOpen?: boolean;
  isToolsOpen?: boolean;
  isAppsOpen?: boolean;
}

export const UbuntuBottomDock: React.FC<UbuntuBottomDockProps> = ({
  onOpenProjects,
  onOpenTools,
  isProjectsOpen = false,
  isToolsOpen = false,
}) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      // Hide dock when scrolled down past hero
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const DOCK_APPS = [
    {
      id: 'projects',
      name: 'Projects File Manager',
      type: 'action',
      onClick: onOpenProjects,
      customIcon: (
        <div className="w-full h-full bg-[#353535] rounded-xl flex items-center justify-center text-[#A5A79B] border border-white/10 shadow-sm">
          <svg viewBox="0 0 48 38" fill="currentColor" className="w-7 h-6">
            <path d="M 0 4.5 C 0 2 2 0 4.5 0 L 16 0 C 18.2 0 20.2 1.2 21.2 3.1 L 23 6.5 L 43.5 6.5 C 46 6.5 48 8.5 48 11 L 48 33.5 C 48 36 46 38 43.5 38 L 4.5 38 C 2 38 0 36 0 33.5 Z" />
          </svg>
        </div>
      ),
      isRunning: true
    },
    {
      id: 'tools',
      name: 'Tools & Arsenal',
      type: 'action',
      onClick: onOpenTools,
      customIcon: (
        <div className="w-full h-full bg-[#242624] rounded-xl flex items-center justify-center text-[#A5A79B] border border-white/10 shadow-sm">
          <Terminal size={22} className="text-[#A5A79B]" />
        </div>
      ),
      isRunning: true
    },
    {
      id: 'ai',
      name: 'Mydeen AI Suite',
      type: 'link',
      url: 'https://mydeenai.vercel.app/',
      iconPath: '/mydeenai-original.png',
      isRunning: true
    },
    {
      id: 'feast',
      name: 'Feast At Night PWA',
      type: 'link',
      url: 'https://mpmhub.vercel.app/',
      iconPath: 'https://mpmhub.vercel.app/apple-touch-icon.png',
      fallbackColor: 'bg-emerald-600',
      initial: 'F',
      isRunning: true
    },
    {
      id: 'blog',
      name: 'Mydeen Dev Blog',
      type: 'link',
      url: 'https://mydeenblog.vercel.app/about',
      iconPath: '/my%20photo.png',
      isRunning: true
    },
    {
      id: 'pbuh',
      name: 'Peace Be Upon Him (PBUH)',
      type: 'link',
      url: 'https://pbuh.vercel.app/',
      iconPath: '/pbuh-logo.png',
      isRunning: true
    },
    {
      id: 'safecheck',
      name: 'SafeCheck ML Detector',
      type: 'link',
      url: 'https://seasonal-deceptive-website-detector.streamlit.app/',
      iconPath: '/safecheck-icon.png',
      isRunning: true
    },
    {
      id: 'card-ocr',
      name: 'Card OCR Extractor',
      type: 'link',
      url: 'https://github.com/M-Mohamed-Mydeen-Shahabudeen/Intelligent-Business-Card-Data-Extractor-and-Manager',
      customIcon: (
        <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white border border-white/10 shadow-sm">
          <CreditCard size={20} />
        </div>
      ),
      isRunning: false
    },
    {
      id: 'face-auth',
      name: 'Face Biometric Security',
      type: 'link',
      url: 'https://github.com/M-Mohamed-Mydeen-Shahabudeen/Real-time-Face-Detection-and-Authentication-System-Using-OpenCV-',
      customIcon: (
        <div className="w-full h-full bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center text-white border border-white/10 shadow-sm">
          <ScanFace size={20} />
        </div>
      ),
      isRunning: false
    }
  ];

  return (
    <div 
      className={`hidden lg:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 ease-out select-none ${
        scrolled 
          ? 'translate-y-28 opacity-0 pointer-events-none' 
          : 'translate-y-0 opacity-100'
      }`}
      aria-label="Ubuntu Bottom Applications Dock"
    >
      {/* ─── UBUNTU DOCK CONTAINER PILL ───────────────────────────────────────── */}
      <div className="relative flex items-center gap-2 sm:gap-2.5 px-3.5 py-2 rounded-2xl bg-[#111111]/90 hover:bg-[#141414]/95 backdrop-blur-xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all">
        
        {/* Dock Items */}
        {DOCK_APPS.map((app) => {
          const hasImgError = imgErrors[app.id];
          const isHovered = hoveredApp === app.id;

          const content = (
            <div
              className="relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Ubuntu Style Floating Tooltip Above */}
              {isHovered && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-50 animate-fadeIn whitespace-nowrap">
                  <div className="bg-[#181818] text-white text-[11px] font-mono font-medium px-3 py-1 rounded-full border border-white/20 shadow-xl flex items-center gap-1.5">
                    <span>{app.name}</span>
                  </div>
                  {/* Subtle Tooltip Point */}
                  <div className="w-2 h-2 bg-[#181818] border-r border-b border-white/20 rotate-45 mx-auto -mt-1" />
                </div>
              )}

              {/* Icon Container with Magnification Effect */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden p-0.5 flex items-center justify-center transition-all duration-200 group-hover:scale-120 group-hover:-translate-y-1.5 drop-shadow-md">
                {app.customIcon ? (
                  app.customIcon
                ) : app.iconPath && !hasImgError ? (
                  <img
                    src={app.iconPath}
                    alt={app.name}
                    className="w-full h-full object-cover rounded-xl"
                    onError={() => setImgErrors(prev => ({ ...prev, [app.id]: true }))}
                  />
                ) : (
                  <div className={`w-full h-full ${app.fallbackColor || 'bg-blue-600'} rounded-xl flex items-center justify-center text-white text-base font-bold`}>
                    {app.initial || app.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Ubuntu Running Indicator Dot */}
              <div className="h-1 mt-0.5 flex items-center justify-center">
                {((app.id === 'projects' && isProjectsOpen) || (app.id === 'tools' && isToolsOpen) || app.isRunning) && (
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    (app.id === 'projects' && isProjectsOpen) || (app.id === 'tools' && isToolsOpen)
                      ? 'bg-[#A5A79B]'
                      : 'bg-white/70 group-hover:bg-[#A5A79B]'
                  }`} />
                )}
              </div>
            </div>
          );

          if (app.type === 'link' && app.url) {
            return (
              <a
                key={app.id}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none"
              >
                {content}
              </a>
            );
          }

          return (
            <button
              key={app.id}
              onClick={app.onClick}
              className="outline-none cursor-pointer bg-transparent border-0 p-0"
            >
              {content}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default UbuntuBottomDock;
