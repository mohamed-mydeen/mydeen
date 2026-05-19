import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Link2, ArrowRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getArticleBySlug, articles } from '../data/articles';
import { useTheme } from '../context/ThemeContext';
import ReadingProgress from '../components/ui/ReadingProgress';
import ArticleCard from '../components/ui/ArticleCard';

// ─── Custom Code Block Component with Copy ────────────────────────────────────
interface CodeBlockProps {
  code: string;
  lang: string;
  isDark: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, isDark }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-sm relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-ink-900 border-b border-slate-200/60 dark:border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-600 font-mono ml-2">{lang}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-ink-800 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-ink-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all font-semibold shadow-sm active:scale-95"
        >
          {copied ? 'Copied! ✓' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '13px',
          lineHeight: '1.7',
          background: isDark ? '#0f1117' : '#f9fafb',
          padding: '1.25rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// ─── Main Article Component ───────────────────────────────────────────────────
const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const article = getArticleBySlug(slug || '');
  
  const [copied, setCopied] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Claps State
  const [claps, setClaps] = useState<number>(() => {
    if (!article) return 0;
    const stored = localStorage.getItem(`claps-${article.id}`);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [hasClapped, setHasClapped] = useState<boolean>(() => {
    if (!article) return false;
    const stored = localStorage.getItem(`has-clapped-${article.id}`);
    return stored === 'true';
  });

  useEffect(() => {
    if (!article) {
      navigate('/blog', { replace: true });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Extract Headings for Table of Contents
    const lines = article.content.split('\n');
    const extracted: { id: string; text: string; level: number }[] = [];
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.slice(3);
        extracted.push({
          id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          text,
          level: 2
        });
      } else if (line.startsWith('### ')) {
        const text = line.slice(4);
        extracted.push({
          id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          text,
          level: 3
        });
      }
    });
    setHeadings(extracted);
  }, [article, navigate, slug]);

  // Scroll Spy Observer
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (!article) return null;

  const related = articles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 2);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClap = () => {
    if (claps >= 50) return;
    const newClaps = claps + 1;
    setClaps(newClaps);
    setHasClapped(true);
    localStorage.setItem(`claps-${article.id}`, newClaps.toString());
    localStorage.setItem(`has-clapped-${article.id}`, 'true');
  };

  // Markdown-to-JSX Renderer with ID extraction
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.trim().startsWith('```')) {
        const lang = line.trim().slice(3) || 'text';
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <CodeBlock
            key={i}
            code={codeLines.join('\n')}
            lang={lang}
            isDark={isDark}
          />
        );
      }
      // Blockquotes
      else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/20 pl-5 pr-4 py-3 rounded-r-xl my-6">
            <p className="text-slate-700 dark:text-slate-300 text-[15px] italic leading-relaxed">{line.slice(2)}</p>
          </blockquote>
        );
      }
      // H2
      else if (line.startsWith('## ')) {
        const text = line.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2 id={id} key={i} className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-12 mb-4 tracking-tight scroll-mt-24">
            {text}
          </h2>
        );
      }
      // H3
      else if (line.startsWith('### ')) {
        const text = line.slice(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3 id={id} key={i} className="font-display font-semibold text-xl text-slate-900 dark:text-white mt-8 mb-3 tracking-tight scroll-mt-24">
            {text}
          </h3>
        );
      }
      // Paragraphs
      else if (line.trim()) {
        const processed = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-md text-[0.875em] font-mono">$1</code>');
        elements.push(
          <p key={i} className="text-slate-700 dark:text-slate-300 text-[16px] leading-[1.85] mb-4"
             dangerouslySetInnerHTML={{ __html: processed }} />
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <>
      <ReadingProgress />
      <main className="pt-20 pb-20 min-h-screen">
        {/* Gradient accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${article.coverGradient}`} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Main Article Content (9 Columns on Desktop) */}
          <div className="lg:col-span-9 max-w-[760px] mx-auto w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 transition-colors mb-8"
              >
                <ArrowLeft size={14} /> Back to Writing
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{article.icon}</span>
                <span className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  {article.category}
                </span>
                {article.trending && (
                  <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Trending
                  </span>
                )}
              </div>

              <h1 className="font-display font-bold text-[2rem] sm:text-[2.4rem] leading-[1.15] text-slate-900 dark:text-white tracking-tight mb-4">
                {article.title}
              </h1>

              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/60 dark:border-white/10 bg-slate-100 flex-shrink-0">
                    <img src="/my-photo.png" alt="Mohamed Mydeen" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-none">Mohamed Mydeen</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5">Full Stack & AI Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-slate-500 font-medium">
                  <Calendar size={12} />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-slate-500 font-medium">
                  <Clock size={12} />
                  <span>{article.readingTime} min read</span>
                </div>

                {/* Share header */}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="w-8 h-8 rounded-lg border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-350 dark:hover:border-white/20 transition-all active:scale-95"
                    aria-label="Copy link"
                  >
                    <Link2 size={13} />
                  </button>
                  {copied && <span className="text-[11px] text-emerald-500 font-semibold">Copied!</span>}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 my-5">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200/40 dark:border-white/10 text-slate-500 dark:text-slate-400 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {/* Article Body */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              {renderContent(article.content)}
            </motion.article>

            {/* Interactive Claps Widget */}
            <div className="mt-14 pt-8 border-t border-slate-100 dark:border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClap}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 transform active:scale-95 shadow-sm ${
                    hasClapped
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600 scale-105 shadow-indigo-100/50'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-350 hover:text-slate-800'
                  }`}
                  aria-label="Clap for this article"
                >
                  <span className="text-xl">👏</span>
                </button>
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    {claps} Claps
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Limit 50 claps per article</p>
                </div>
              </div>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              >
                <Link2 size={14} />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-ink-900 dark:to-indigo-950/20 border border-slate-200/60 dark:border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/10 bg-slate-100 flex-shrink-0">
                  <img src="/my-photo.png" alt="Mohamed Mydeen" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display font-bold text-slate-900 dark:text-white text-[15px]">Mohamed Mydeen Shahabudeen</p>
                  <p className="text-[12px] text-indigo-600 dark:text-indigo-400 font-medium mb-2">Full Stack & AI Engineer</p>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Building AI-powered products and writing about the engineering behind them. Creator of Mydeen AI, Feast At Night, and SafeCheck.
                  </p>
                  <div className="flex gap-3 mt-3">
                    <a href="https://github.com/mohamed-mydeen" target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
                    <a href="https://mydeenai.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-0.5">Mydeen AI <ArrowRight size={10} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky Table of Contents Sidebar (3 Columns on Desktop) */}
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start select-none">
              <div className="border-l border-slate-100 dark:border-white/5 pl-5">
                <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
                  Table of Contents
                </h4>
                <nav className="space-y-3">
                  {headings.map(h => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block text-[13px] transition-all duration-200 ${
                        activeId === h.id
                          ? 'text-indigo-600 font-semibold translate-x-1'
                          : 'text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      } ${h.level === 3 ? 'ml-3' : ''}`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 dark:border-white/10 mt-10 pt-16 pb-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((a, i) => (
                  <ArticleCard key={a.id} article={a} featured index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Article;
