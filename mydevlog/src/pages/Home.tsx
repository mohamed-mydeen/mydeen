import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Zap, Cpu, ShieldCheck, Database, Radio } from 'lucide-react';
import ArticleCard from '../components/ui/ArticleCard';
import { articles, getFeaturedArticles } from '../data/articles';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }
  }),
};

const Home: React.FC = () => {
  const featured = getFeaturedArticles();
  const latest = [...articles].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 4);

  const [liveNews, setLiveNews] = useState<{ id: number; title: string; url?: string; score: number }[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveNews = async () => {
      try {
        const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        if (!res.ok) return;
        const ids: number[] = await res.json();
        const topIds = ids.slice(0, 5);
        const detailsPromises = topIds.map(async (id) => {
          const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          if (!itemRes.ok) return null;
          return itemRes.json();
        });
        const results = await Promise.all(detailsPromises);
        setLiveNews(results.filter((item): item is any => item !== null && item.title !== undefined));
      } catch (e) {
        console.error(e);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchLiveNews();
  }, []);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-20">

        {/* Premium dot-matrix background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-indigo-100/60 via-violet-100/40 to-transparent rounded-full blur-3xl dark:from-indigo-900/20 dark:via-violet-900/10" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/50 to-transparent rounded-full blur-3xl dark:from-cyan-900/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-px">
            <div className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-indigo-50/40 to-transparent dark:from-indigo-950/20 rounded-full" />
          </div>
        </div>

        {/* Floating decorative high-end elements (Sleek tech icons instead of cheap emojis) */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-16 hidden xl:block"
        >
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-ink-900/80 border border-violet-500/20 shadow-xl shadow-violet-500/5 flex items-center justify-center text-violet-500">
            <Cpu size={24} className="animate-pulse" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-40 right-32 hidden xl:block"
        >
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-ink-900/80 border border-emerald-500/20 shadow-xl shadow-emerald-500/5 flex items-center justify-center text-emerald-500">
            <ShieldCheck size={20} />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-1/2 left-20 hidden xl:block"
        >
          <div className="w-11 h-11 rounded-xl bg-white dark:bg-ink-900/80 border border-cyan-500/20 shadow-xl shadow-cyan-500/5 flex items-center justify-center text-cyan-500">
            <Database size={18} />
          </div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
          {/* Badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] sm:text-[12px] font-semibold tracking-wide mb-8 shadow-sm">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-indigo-200 dark:border-indigo-500/30 flex-shrink-0">
                <img src="/my-photo.png" alt="Mohamed Mydeen" className="w-full h-full object-cover" />
              </div>
              <span>Engineering Journal by Mohamed Mydeen</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-slate-900 dark:text-white tracking-tight leading-[1.05] max-w-4xl mb-6"
          >
            Deep dives into{' '}
            <span className="bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              AI, engineering
            </span>
            {' '}&amp; modern products.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mb-10"
          >
            Practical articles on building production-grade software — from FastAPI streaming AI backends to React performance patterns and everything in between.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[14px] font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-slate-900/20 dark:shadow-black/20"
            >
              Start Reading
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 text-[14px] font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200"
            >
              Subscribe to Newsletter
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-slate-100 dark:border-white/10"
          >
            {[
              { value: `${articles.length}+`, label: 'Articles Published' },
              { value: `${articles.reduce((a, b) => a + b.readingTime, 0)}+`, label: 'Minutes of Reading' },
              { value: '6', label: 'Topic Categories' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display font-bold text-2xl text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-[12px] text-slate-500 dark:text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Articles ──────────────────────────────────── */}
      <section className="py-20 bg-slate-50/50 dark:bg-ink-950/50 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-indigo-500" />
                <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest">Featured</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                Editor's Picks
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featured.map((article, i) => (
              <ArticleCard key={article.id} article={article} featured index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Articles ────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Latest list */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={14} className="text-slate-500" />
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Latest</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight mb-8">
                Recent Writing
              </h2>
              <div>
                {latest.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/20 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
              >
                View all articles <ArrowRight size={13} />
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Live Daily Tech News Widget */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">Daily Tech Intel</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                
                {newsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50/50 dark:bg-ink-900/30 animate-pulse">
                        <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-5/6 mb-2" />
                        <div className="h-2.5 bg-slate-200 dark:bg-white/5 rounded w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {liveNews.map((a, i) => (
                      <a
                        key={a.id}
                        href={a.url || `https://news.ycombinator.com/item?id=${a.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-100 dark:hover:border-white/5 transition-all duration-300"
                      >
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 mt-1 w-4 text-center flex-shrink-0">0{i + 1}</span>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                            {a.title}
                          </p>
                          <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">{a.score} upvotes</p>
                        </div>
                      </a>
                    ))}
                    <Link
                      to="/news"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mt-2 pl-3"
                    >
                      View Live Newsroom <ArrowRight size={11} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Newsletter CTA */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-indigo-500" />
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Newsletter</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-[15px] mb-2">
                  Stay in the loop
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  New articles, project updates, and engineering insights — delivered to your inbox.
                </p>
                <Link
                  to="/newsletter"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Subscribe free <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
