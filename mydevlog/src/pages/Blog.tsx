import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ArticleCard from '../components/ui/ArticleCard';
import { articles, getAllCategories, getAllTags } from '../data/articles';

const Blog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('');

  const categories = ['All', ...getAllCategories()];
  const tags = getAllTags();

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const matchesQuery =
        !query.trim() ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCat = activeCategory === 'All' || a.category === activeCategory;
      const matchesTag = !activeTag || a.tags.includes(activeTag);
      return matchesQuery && matchesCat && matchesTag;
    });
  }, [query, activeCategory, activeTag]);

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('All');
    setActiveTag('');
  };

  const hasFilters = query || activeCategory !== 'All' || activeTag;

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2">All Writing</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3">
            Articles
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
            {articles.length} articles on AI engineering, React, backend systems, and everything I find worth writing about.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 space-y-4"
        >
          {/* Search bar */}
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles by title, topic, or tag..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 text-[14px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 dark:focus:border-indigo-500/50 transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold text-rose-500 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 flex items-center gap-1"
              >
                <X size={11} /> Clear
              </button>
            )}
          </div>

          {/* Tag filter strip */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(t => t === tag ? '' : tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                    : 'bg-transparent text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/10 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        {hasFilters && (
          <p className="text-[12px] text-slate-400 dark:text-slate-600 mb-6">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Article Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} featured index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg mb-2">No articles found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Try a different search term or clear your filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-[13px] font-semibold hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Blog;
