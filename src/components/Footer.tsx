import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#111111] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <p className="text-[#e26d45] text-xs font-bold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Want to build something useful?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
            Tamil Nadu, India &bull; Open to software, AI automation, systems, and cloud engineering opportunities.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:mohamedmydeen.sd@gmail.com"
              className="flex items-center gap-2 bg-[#d85d38] hover:bg-[#c25332] text-white px-5 py-2.5 rounded-md font-semibold transition-colors duration-200"
            >
              <Mail size={18} />
              <span>Email me</span>
            </a>
            <a
              href="https://linkedin.com/in/mohamed-mydeen4262"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/5 text-white px-5 py-2.5 rounded-md font-semibold transition-colors duration-200"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Mohamed Mydeen Shahabudeen M.
            </p>
            <p className="text-slate-500 text-xs">
              Software &bull; AI Automation &bull; Systems
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
