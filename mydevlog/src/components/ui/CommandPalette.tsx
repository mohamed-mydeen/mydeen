import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, Hash } from 'lucide-react';
import { articles, getAllCategories } from '../../data/articles';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const categories = getAllCategories();

  const results = query.trim()
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickLinks = [
    { label: 'All Writing', href: '/blog', icon: FileText },
    { label: 'Newsletter', href: '/newsletter', icon: FileText },
    { label: 'About', href: '/about', icon: FileText },
  ];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelected(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, results.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && results[selected]) {
        navigate(`/article/${results[selected].slug}`);
        onClose();
      }
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, results, selected, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="cmd-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mx-4 bg-white dark:bg-ink-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.15)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-white/10">
              <Search size={16} className="text-slate-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search articles, topics, tags..."
                className="flex-1 bg-transparent text-[14px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none"
              />
              <kbd className="px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-ink-800 rounded border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">ESC</kbd>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2">
              {query.trim() === '' ? (
                <>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-3 py-2">Quick Links</p>
                  {quickLinks.map(link => (
                    <button
                      key={link.href}
                      onClick={() => { navigate(link.href); onClose(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <link.icon size={14} className="text-slate-400" />
                      <span className="text-[13px] text-slate-700 dark:text-slate-300">{link.label}</span>
                      <ArrowRight size={12} className="ml-auto text-slate-300 dark:text-slate-600" />
                    </button>
                  ))}
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-3 py-2 mt-2">Categories</p>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { navigate(`/blog?category=${encodeURIComponent(cat)}`); onClose(); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-left transition-colors"
                    >
                      <Hash size={14} className="text-slate-400" />
                      <span className="text-[13px] text-slate-700 dark:text-slate-300">{cat}</span>
                    </button>
                  ))}
                </>
              ) : results.length > 0 ? (
                <>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-3 py-2">
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </p>
                  {results.map((article, i) => (
                    <button
                      key={article.id}
                      onClick={() => { navigate(`/article/${article.slug}`); onClose(); }}
                      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                        i === selected ? 'bg-indigo-50 dark:bg-indigo-950/40' : 'hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xl leading-none mt-0.5">{article.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-slate-900 dark:text-white truncate">{article.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">{article.category} · {article.readingTime} min read</p>
                      </div>
                      <ArrowRight size={12} className="mt-1 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                    </button>
                  ))}
                </>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-[13px] text-slate-400 dark:text-slate-600">No results for "<span className="text-slate-600 dark:text-slate-400">{query}</span>"</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
