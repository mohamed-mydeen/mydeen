import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ExternalLink, Flame, Clock, Radio } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  domain?: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTechNews = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      // 1. Fetch top story IDs from Hacker News API
      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      if (!res.ok) throw new Error('Failed to fetch story list');
      const ids: number[] = await res.json();
      
      // Slice top 15 stories
      const topIds = ids.slice(0, 15);

      // 2. Fetch details for each story concurrently
      const detailsPromises = topIds.map(async (id) => {
        const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (!itemRes.ok) return null;
        return itemRes.json();
      });

      const results = await Promise.all(detailsPromises);
      const activeNews = results.filter((item): item is NewsItem => {
        return item !== null && item.title !== undefined;
      });

      // Format and extract domain names
      const formatted = activeNews.map(item => {
        let domain = '';
        if (item.url) {
          try {
            domain = new URL(item.url).hostname.replace('www.', '');
          } catch {
            domain = 'tech';
          }
        } else {
          domain = 'self.ycombinator';
        }
        return { ...item, domain };
      });

      setNews(formatted);
    } catch (err: any) {
      setError(err.message || 'Unable to load real-time feed');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTechNews();
    // Auto refresh every 5 minutes
    const interval = setInterval(() => fetchTechNews(true), 300000);
    return () => clearInterval(interval);
  }, []);

  // Format relative time (e.g. "2 hours ago")
  const formatRelativeTime = (timestamp: number) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    const intervals = [
      { label: 'y', seconds: 31536000 },
      { label: 'mo', seconds: 2592000 },
      { label: 'd', seconds: 86400 },
      { label: 'h', seconds: 3600 },
      { label: 'm', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) return `${count}${interval.label} ago`;
    }
    return 'just now';
  };

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Radio size={12} className="animate-pulse" />
              Live Developer Feed
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white tracking-tight mb-3">
              Tech Intelligence
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">
              Real-time technology news, software breakthroughs, and community discussions directly from the global engineering network.
            </p>
          </div>

          {/* Sync Button & Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Sync Active
              </span>
            </div>
            <button
              onClick={() => fetchTechNews(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
              aria-label="Refresh news"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center mb-8">
            <p className="text-sm font-semibold text-rose-500">{error}</p>
            <button
              onClick={() => fetchTechNews()}
              className="mt-4 px-4 py-2 bg-rose-500/10 text-rose-500 text-[12px] font-bold rounded-lg hover:bg-rose-500/20 transition-colors"
            >
              Retry Sync
            </button>
          </div>
        )}

        {/* Live Feed List */}
        {loading ? (
          // Shimmer loading skeleton
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-ink-900/30 animate-pulse"
              >
                <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-md w-3/4 mb-3" />
                <div className="flex gap-4">
                  <div className="h-3 bg-slate-200 dark:bg-white/5 rounded-md w-20" />
                  <div className="h-3 bg-slate-200 dark:bg-white/5 rounded-md w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.url || `https://news.ycombinator.com/item?id=${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 rounded-2xl bg-white dark:bg-ink-900/50 border border-slate-100 dark:border-white/5
                               hover:bg-slate-50/50 dark:hover:bg-ink-900/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]
                               transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 justify-between">
                      <div className="space-y-2.5">
                        {/* Domain & Source badge */}
                        <div className="flex flex-wrap items-center gap-2">
                          {item.domain && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-white/5 uppercase tracking-wide">
                              {item.domain}
                            </span>
                          )}
                          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-600">
                            posted by @{item.by}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display font-bold text-slate-900 dark:text-white text-[15px] sm:text-[17px] leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {item.title}
                        </h2>

                        {/* Relative stats */}
                        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 dark:text-slate-500 pt-1">
                          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                            <Flame size={12} className="fill-amber-600/10" />
                            <span>{item.score} points</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{formatRelativeTime(item.time)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Go icon */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:rotate-45 transition-all duration-300">
                        <ExternalLink size={13} />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </main>
  );
};

export default News;
