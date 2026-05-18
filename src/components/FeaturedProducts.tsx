import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  initial: string;
  gradient: string;
  liveUrl: string;
  iconSources: string[];
}

// ─── Deployed Products Data ────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 'mydeen-ai',
    name: 'Mydeen AI',
    initial: 'M',
    gradient: 'from-violet-500 to-indigo-500',
    liveUrl: 'https://mydeenai.vercel.app/',
    iconSources: [
      '/mydeenai-original.png', // The exact original logo uploaded by you
    ],
  },
  {
    id: 'feast-at-night',
    name: 'Feast At Night',
    initial: 'F',
    gradient: 'from-emerald-500 to-teal-500',
    liveUrl: 'https://mpmhub.vercel.app/',
    iconSources: [
      'https://mpmhub.vercel.app/apple-touch-icon.png',
      'https://mpmhub.vercel.app/android-chrome-192x192.png',
      'https://mpmhub.vercel.app/favicon.ico',
    ],
  },
  {
    id: 'safecheck',
    name: 'SafeCheck',
    initial: 'S',
    gradient: 'from-cyan-500 to-blue-600',
    liveUrl: 'https://seasonal-deceptive-website-detector.streamlit.app/',
    iconSources: [
      '/safecheck-icon.png', // Custom generated security padlock icon
    ],
  },
];

// ─── App Icon Component with Fallback ──────────────────────────────────────────

const AppIcon: React.FC<{ product: Product }> = ({ product }) => {
  const [srcIdx, setSrcIdx] = useState(0);
  const failed = srcIdx >= product.iconSources.length;

  return (
    <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:scale-105 transition-all duration-300">
      {!failed ? (
        <img
          src={product.iconSources[srcIdx]}
          alt={`${product.name} logo`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setSrcIdx(i => i + 1)}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
          <span className="text-white text-base font-bold font-['Space_Grotesk']">
            {product.initial}
          </span>
        </div>
      )}
    </div>
  );
};

// ─── Premium Compact Card Component (Icon and Name Only) ──────────────────────

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a
    href={product.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-shrink-0 flex items-center gap-4 p-4 w-[240px] sm:w-[260px] rounded-2xl
               bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-800/80
               shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-slate-350 dark:hover:border-slate-700
               hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5
               transition-all duration-300 group select-none"
  >
    {/* High-res App Icon */}
    <AppIcon product={product} />

    {/* App Name — Crisp and Bold */}
    <span className="text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight truncate">
      {product.name}
    </span>
  </a>
);

// ─── Main Section Component ───────────────────────────────────────────────────

const FeaturedProducts: React.FC = () => {
  // Multiply array to build a perfectly continuous marquee loop
  const marqueeItems = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

  return (
    <section 
      id="products" 
      className="bg-slate-50 dark:bg-[#0d0d14] border-t border-slate-200/40 dark:border-slate-850/30 py-12 sm:py-16 overflow-hidden relative"
    >
      
      {/* Styles for hardware-accelerated continuous scrolling */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-20%, 0, 0);
          }
        }
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .animate-marquee-loop:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative Blur Vignette Layers */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-[#0d0d14] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-[#0d0d14] to-transparent z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div className="mb-6 text-center" data-reveal>
          <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.25em] mb-1">
            Featured Products
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Products I've Built
          </h2>
        </div>
      </div>

      {/* Smooth Marquee Track */}
      <div className="w-full overflow-hidden flex relative py-2">
        <div className="animate-marquee-loop gap-6 px-3">
          {marqueeItems.map((product, idx) => (
            <ProductCard key={`${product.id}-${idx}`} product={product} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default FeaturedProducts;
