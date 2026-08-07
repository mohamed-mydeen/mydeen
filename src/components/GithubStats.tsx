import React, { useEffect, useState } from 'react';
import { Github, Star, GitFork, BookOpen, Users, Calendar, Award, Code2, ArrowUpRight, X } from 'lucide-react';

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repo {
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const GithubStats: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/mohamed-mydeen'),
          fetch('https://api.github.com/users/mohamed-mydeen/repos?per_page=100')
        ]);

        if (!profileRes.ok || !reposRes.ok) throw new Error('API limit reached');

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData);
        setError(false);
      } catch (err) {
        console.error('GitHub API error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync scroll lock and animation state with showModal
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => setAnimate(true), 120);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = '';
      setAnimate(false);
    }
  }, [showModal]);

  // Calculate live statistics
  const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

  // Calculate top languages dynamically
  const languageCounts = repos.reduce((acc: { [key: string]: number }, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const totalLanguageRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0);
  
  const topLanguages = Object.entries(languageCounts)
    .map(([lang, count]) => ({
      name: lang,
      percentage: totalLanguageRepos > 0 ? Math.round((count / totalLanguageRepos) * 100) : 0,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  // Defensive Fallback Stats (used if API fails or gets rate-limited)
  const fallbackProfile = {
    public_repos: 58,
    followers: 8,
    following: 12,
    created_at: '2024-09-12T00:00:00Z'
  };

  const fallbackLanguages = [
    { name: 'JavaScript', percentage: 26, color: 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]' },
    { name: 'HTML', percentage: 17, color: 'bg-gradient-to-r from-red-500 to-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]' },
    { name: 'Python', percentage: 17, color: 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' },
    { name: 'TypeScript', percentage: 15, color: 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]' }
  ];

  const currentProfile = error || !profile ? fallbackProfile : profile;
  const currentLanguages = error || topLanguages.length === 0 
    ? fallbackLanguages 
    : topLanguages.map((lang, idx) => {
        const colors = [
          'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]',
          'bg-gradient-to-r from-red-500 to-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
          'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]',
          'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
        ];
        return {
          name: lang.name,
          percentage: lang.percentage,
          color: colors[idx % colors.length]
        };
      });

  const memberYear = new Date(currentProfile.created_at).getFullYear();

  return (
    <>
      {/* Sleek Minimalist Banner (Light Green Theme) */}
      <section id="insights" className="py-6 bg-emerald-50/60 dark:bg-emerald-950/20 border-y border-emerald-100 dark:border-emerald-900/30 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40 flex-shrink-0">
              <Github size={18} />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 dark:text-emerald-100 text-sm sm:text-base font-['Space_Grotesk'] leading-none">
                Open Source Coding Insights
              </h4>
              <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/70 mt-1 font-medium">
                Live GitHub repository statistics and language distributions.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="group/btn px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:border-emerald-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5 text-xs font-bold whitespace-nowrap cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Live Stats</span>
            <ArrowUpRight size={13} className="text-emerald-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>
      </section>

      {/* Premium Glassmorphic Modal Window (Elegant Dark Theme) */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]"
          onClick={() => setShowModal(false)}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes popupModal { 
              0% { opacity: 0; transform: scale(0.96) translateY(15px); } 
              100% { opacity: 1; transform: scale(1) translateY(0); } 
            }
          `}</style>

          <div 
            className="bg-slate-950/98 backdrop-blur-2xl w-full max-w-3xl max-h-[85vh] rounded-3xl border border-slate-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative animate-[popupModal_0.4s_cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header (Dark Theme) */}
            <div className="px-6 py-5 border-b border-slate-900 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-slate-300 flex items-center justify-center border border-slate-850">
                  <Github size={18} />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk'] leading-none">
                    GitHub Analytics Dashboard
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
                    Real-time Profile Activity & Language Telemetry
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-full transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-none overscroll-contain bg-slate-950">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between">
                      <div className="h-4 bg-slate-800 rounded w-1/3" />
                      <div className="space-y-3">
                        <div className="h-3 bg-slate-800 rounded w-full" />
                        <div className="h-3 bg-slate-800 rounded w-5/6" />
                        <div className="h-3 bg-slate-800 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch justify-center">
                  
                  {/* Card 1: GitHub Stats */}
                  <div className="group relative bg-slate-900/40 border border-slate-850 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left hover:border-slate-700/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3.5 mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                            <Award size={14} />
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-100 font-['Space_Grotesk']">
                            Profile Stats
                          </h4>
                        </div>
                        <a 
                          href="https://github.com/mohamed-mydeen" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5 group/link transition-colors relative z-10"
                        >
                          <span>Profile</span>
                          <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-3 my-1 relative z-10">
                        <div className="p-2.5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-2.5 hover:bg-slate-900/80 transition-all duration-200">
                          <div className="w-7.5 h-7.5 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                            <BookOpen size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Repos</p>
                            <h5 className="font-bold text-white text-xs sm:text-sm mt-0.5">{currentProfile.public_repos}</h5>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-2.5 hover:bg-slate-900/80 transition-all duration-200">
                          <div className="w-7.5 h-7.5 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                            <Star size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Stars</p>
                            <h5 className="font-bold text-white text-xs sm:text-sm mt-0.5">{error ? 2 : totalStars}</h5>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-2.5 hover:bg-slate-900/80 transition-all duration-200">
                          <div className="w-7.5 h-7.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                            <Users size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Followers</p>
                            <h5 className="font-bold text-white text-xs sm:text-sm mt-0.5">{currentProfile.followers}</h5>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center gap-2.5 hover:bg-slate-900/80 transition-all duration-200">
                          <div className="w-7.5 h-7.5 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                            <GitFork size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Forks</p>
                            <h5 className="font-bold text-white text-xs sm:text-sm mt-0.5">{error ? 0 : totalForks}</h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-900 flex items-center gap-1.5 text-[9px] text-slate-500 font-medium relative z-10">
                      <Calendar size={11} className="text-slate-600" />
                      <span>Member since {memberYear}</span>
                    </div>
                  </div>

                  {/* Card 2: Languages Progress */}
                  <div className="group relative bg-slate-900/40 border border-slate-850 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left hover:border-slate-700/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-3.5 mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                            <Code2 size={13} />
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-100 font-['Space_Grotesk']">
                            Languages
                          </h4>
                        </div>
                        <span className="text-[8px] uppercase font-bold tracking-wider text-slate-400 bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded-md">
                          Activity
                        </span>
                      </div>

                      <div className="space-y-3.5 my-1 relative z-10">
                        {currentLanguages.map((lang, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-300">{lang.name}</span>
                              <span className="font-bold text-slate-500">{lang.percentage}%</span>
                            </div>
                            
                            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                              <div 
                                className={`h-full ${lang.color} rounded-full transition-all duration-[1200ms] cubic-bezier(0.16,1,0.3,1)`}
                                style={{ width: animate ? `${lang.percentage}%` : '0%' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-900 flex items-center gap-1.5 text-[9px] text-slate-500 font-medium relative z-10">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live dynamic calculations</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GithubStats;
