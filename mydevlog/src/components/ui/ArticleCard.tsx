import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import type { Article } from '../../data/articles';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  index?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false, index = 0 }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Get color themes based on gradient to keep it extremely cohesive and premium
  const getThemeColors = (gradient: string) => {
    if (gradient.includes('violet')) return { text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', dot: 'bg-violet-500', glow: 'group-hover:shadow-violet-500/10' };
    if (gradient.includes('emerald')) return { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500', glow: 'group-hover:shadow-emerald-500/10' };
    if (gradient.includes('blue')) return { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500', glow: 'group-hover:shadow-blue-500/10' };
    if (gradient.includes('orange')) return { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500', glow: 'group-hover:shadow-amber-500/10' };
    return { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', dot: 'bg-rose-500', glow: 'group-hover:shadow-rose-500/10' };
  };

  const colors = getThemeColors(article.coverGradient);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="group relative"
      >
        {/* Soft atmospheric background glow on hover */}
        <div className={`absolute -inset-2 rounded-[28px] bg-gradient-to-r ${article.coverGradient} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-[0.06] dark:group-hover:opacity-[0.12]`} />

        <Link
          to={`/article/${article.slug}`}
          className={`relative block h-full rounded-2xl bg-white dark:bg-ink-900/60 border border-slate-100 dark:border-white/5
                     shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]
                     dark:hover:bg-ink-900/80 hover:-translate-y-1 transition-all duration-500 overflow-hidden`}
        >
          {/* Subtle colored top line glow, not solid bar */}
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${article.coverGradient} opacity-50 dark:opacity-30`} />

          <div className="p-8 flex flex-col h-full justify-between">
            <div>
              {/* Category + Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${colors.text}`}>
                    {article.category}
                  </span>
                </div>
                {article.trending && (
                  <span className="text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Trending
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight leading-snug mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3 mb-6">
                {article.excerpt}
              </p>
            </div>

            <div>
              {/* Custom refined tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {article.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/5 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Meta information bar */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{article.readingTime} min read</span>
                  </div>
                  <span>·</span>
                  <span>{formattedDate}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Refined List Card (Compact)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link
        to={`/article/${article.slug}`}
        className="flex gap-5 py-6 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/2 -mx-4 px-4 rounded-xl transition-all duration-300"
      >
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-300`}>
          {article.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            <span className={`text-[10px] font-bold tracking-wider uppercase ${colors.text}`}>{article.category}</span>
          </div>
          <h3 className="font-display font-semibold text-slate-900 dark:text-white text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 mb-1.5">
            {article.title}
          </h3>
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            {formattedDate} · {article.readingTime} min read
          </p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-transparent group-hover:border-slate-100 dark:group-hover:border-white/5 text-slate-300 dark:text-slate-700 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-300">
          <ArrowRight size={14} />
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
