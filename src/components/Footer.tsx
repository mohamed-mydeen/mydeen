import React from 'react';
import { Mail, Linkedin, BookOpen, ExternalLink, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const mapsUrl = "https://www.google.com/maps/contrib/100933190595032532131/reviews/@10.100966,77.1627555,577893m/data=!3m2!1e3!4b1!4m3!8m2!3m1!1e1?authuser=1&entry=ttu&g_ep=EgoyMDI2MTExNy4wIKXMDSoASAFQAw%3D%3D";

  return (
    <footer className="bg-[#E8D2B5] dark:bg-[#101010] text-[#181818] dark:text-[#f2efe9] border-t border-[#A5A79B]/20 dark:border-white/10 py-12 md:py-16 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <p className="text-[#A5A79B] dark:text-[#E8D2B5] text-xs font-bold uppercase tracking-widest mb-3 font-mono">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-['Space_Grotesk']">
            Want to build something useful?
          </h2>
          <p className="opacity-75 text-sm md:text-base max-w-2xl mb-8 leading-relaxed font-normal">
            Tamil Nadu, India &bull; Open to software, AI automation, systems, and cloud engineering opportunities.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:mohamedmydeen.sd@gmail.com"
              className="flex items-center gap-2 bg-[#A5A79B] hover:bg-[#96988c] text-[#181818] px-5 py-2.5 rounded-md font-semibold transition-colors duration-200 shadow-sm"
            >
              <Mail size={18} />
              <span>Email me</span>
            </a>
            <a
              href="https://linkedin.com/in/mohamed-mydeen4262"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-transparent border border-[#A5A79B]/40 dark:border-white/20 hover:bg-[#A5A79B]/15 dark:hover:bg-white/5 text-[#181818] dark:text-white px-5 py-2.5 rounded-md font-semibold transition-colors duration-200"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://mydeenblog.vercel.app/about"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-transparent border border-[#A5A79B]/40 dark:border-white/20 hover:bg-[#A5A79B]/15 dark:hover:bg-white/5 text-[#181818] dark:text-white px-5 py-2.5 rounded-md font-semibold transition-colors duration-200"
            >
              <BookOpen size={18} />
              <span>Blog &amp; Articles</span>
            </a>
          </div>
        </div>

        {/* ─── CREATIVE SINGLE-LINE GOOGLE MAPS CONTRIBUTOR LINK ────────────────── */}
        <div className="pt-8 pb-6 border-t border-[#A5A79B]/20 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#181818] dark:text-[#f2efe9]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="italic opacity-90">
              &ldquo;Traveler by heart, explorer by soul &mdash; discovering nature &amp; new experiences 🌿✈️&rdquo;
            </span>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-[#A5A79B] dark:text-[#E8D2B5] hover:underline underline-offset-4 shrink-0 transition-colors"
          >
            <MapPin size={13} />
            <span>Google Maps Contributions</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Copyright & SEO Links Row */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="opacity-75 text-sm">
              &copy; {currentYear} Mohamed Mydeen Shahabudeen M.
            </p>
            <p className="opacity-60 text-xs font-mono">
              Software &bull; AI Automation &bull; Systems
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-mono">
            <a 
              href="https://mydeenblog.vercel.app/about"
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity break-all underline underline-offset-2"
            >
              https://mydeenblog.vercel.app/about
            </a>
            <span className="opacity-30 hidden sm:inline">&bull;</span>
            <a 
              href={mapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity break-all underline underline-offset-2"
            >
              maps.google.com/contrib
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
