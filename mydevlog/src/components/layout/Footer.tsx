import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, ArrowUpRight, Rss } from 'lucide-react';

const LINKS = {
  writing: [
    { label: 'All Articles', href: '/blog' },
    { label: 'AI Engineering', href: '/blog?category=AI+Engineering' },
    { label: 'React', href: '/blog?category=React' },
    { label: 'Backend', href: '/blog?category=Backend' },
  ],
  personal: [
    { label: 'About', href: '/about' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Contact', href: '/contact' },
  ],
};

const Footer: React.FC = () => (
  <footer className="border-t border-slate-200/60 dark:border-white/10 bg-slate-50 dark:bg-ink-950/80">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="font-display font-semibold text-slate-900 dark:text-white">
              mydeen<span className="text-indigo-500">.dev</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mb-6">
            A personal tech journal by Mohamed Mydeen — writing about AI, full-stack engineering, and building products that matter.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/mohamed-mydeen', label: 'GitHub' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Rss, href: '#', label: 'RSS Feed' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/5 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Writing Links */}
        <div>
          <h4 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Writing</h4>
          <ul className="space-y-2.5">
            {LINKS.writing.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Personal Links */}
        <div>
          <h4 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Personal</h4>
          <ul className="space-y-2.5">
            {LINKS.personal.map(link => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://mydeenai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Mydeen AI <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-[12px] text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Mohamed Mydeen Shahabudeen. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
