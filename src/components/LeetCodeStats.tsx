import React, { useEffect, useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';

interface LeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
}

const LeetCodeStats: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const res = await fetch('https://leetcode-api-faisalshohag.vercel.app/Mohamed_Mydeen_Shahabudeen_M');
        if (!res.ok) throw new Error('API request failed');
        const data = await res.json();
        if (data && typeof data.totalSolved === 'number') {
          setStats(data);
        }
      } catch (err) {
        setStats({
          totalSolved: 150,
          totalQuestions: 4013,
          easySolved: 95,
          totalEasy: 958,
          mediumSolved: 49,
          totalMedium: 2095,
          hardSolved: 6,
          totalHard: 960,
          ranking: 1131139
        });
      }
    };

    fetchLeetCodeStats();
  }, []);

  const data = stats || {
    totalSolved: 150,
    totalQuestions: 4013,
    easySolved: 95,
    totalEasy: 958,
    mediumSolved: 49,
    totalMedium: 2095,
    hardSolved: 6,
    totalHard: 960,
    ranking: 1131139
  };

  // Compute SVG arc angles for Easy, Medium, Hard colored segments
  const totalSolved = data.totalSolved || 1;
  const sweepAngle = 260; // Total arc angle in degrees (140° to 400°)
  
  const easyRatio = data.easySolved / totalSolved;
  const medRatio = data.mediumSolved / totalSolved;
  const hardRatio = data.hardSolved / totalSolved;

  const r = 52;
  const cx = 75;
  const cy = 75;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * (sweepAngle / 360);

  const easyDash = (easyRatio * arcLength) - 3;
  const medDash = (medRatio * arcLength) - 3;
  const hardDash = (hardRatio * arcLength) - 3;

  return (
    <section id="leetcode" className="py-6 bg-white dark:bg-[#0a0a0f] border-b border-slate-100 dark:border-slate-800/40 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        
        {/* Minimalist Section Header */}
        <div className="flex items-center justify-between gap-3 mb-4" data-reveal>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ffa116]/10 text-[#ffa116] flex items-center justify-center border border-[#ffa116]/20 font-bold font-mono text-xs">
              LC
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] leading-none">
                LeetCode Stats
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                Live Problem Solving Progress
              </p>
            </div>
          </div>

          <a
            href="https://leetcode.com/u/Mohamed_Mydeen_Shahabudeen_M/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-all"
          >
            <span>Profile</span>
            <ExternalLink size={11} className="text-slate-400" />
          </a>
        </div>

        {/* Compact LeetCode Card Widget */}
        <div className="bg-[#1c1c1c] text-white rounded-2xl p-4 sm:p-5 border border-[#2e2e2e] shadow-lg max-w-md mx-auto flex flex-col items-center gap-4" data-reveal>
          
          {/* Top: Compact Circular Arc Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-[130deg]" viewBox="0 0 150 150">
              {/* Background Dark Track */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#333333"
                strokeWidth="6"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />

              {/* Hard Segment (Red) */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#ef4743"
                strokeWidth="6"
                strokeDasharray={`${Math.max(0, hardDash)} ${circumference}`}
                strokeDashoffset={-(easyDash + medDash + 6)}
                strokeLinecap="round"
              />

              {/* Medium Segment (Yellow/Amber) */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#ffb800"
                strokeWidth="6"
                strokeDasharray={`${Math.max(0, medDash)} ${circumference}`}
                strokeDashoffset={-(easyDash + 3)}
                strokeLinecap="round"
              />

              {/* Easy Segment (Teal/Cyan) */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#00b8a3"
                strokeWidth="6"
                strokeDasharray={`${Math.max(0, easyDash)} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
              />
            </svg>

            {/* Center Text inside Arc */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-1">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  {data.totalSolved}
                </span>
                <span className="text-[10px] text-slate-400 font-medium font-mono">
                  /{data.totalQuestions}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-[11px] text-[#2cbb5d] font-semibold mt-0.5">
                <Check size={11} strokeWidth={3} />
                <span>Solved</span>
              </div>

              <div className="text-[10px] text-slate-400 font-medium mt-2">
                <strong className="text-slate-200 font-bold">5</strong> Attempting
              </div>
            </div>
          </div>

          {/* Bottom: Easy, Med, Hard arranged in ONE SINGLE ROW */}
          <div className="grid grid-cols-3 gap-2.5 w-full">
            
            {/* Easy Box */}
            <div className="bg-[#282828] border border-[#333333] rounded-xl py-2 px-2 text-center hover:border-[#00b8a3]/50 transition-colors">
              <p className="text-[#00b8a3] font-bold text-[11px] tracking-wide">
                Easy
              </p>
              <p className="text-slate-200 font-extrabold text-xs mt-0.5 font-mono">
                {data.easySolved}/{data.totalEasy}
              </p>
            </div>

            {/* Medium Box */}
            <div className="bg-[#282828] border border-[#333333] rounded-xl py-2 px-2 text-center hover:border-[#ffb800]/50 transition-colors">
              <p className="text-[#ffb800] font-bold text-[11px] tracking-wide">
                Med.
              </p>
              <p className="text-slate-200 font-extrabold text-xs mt-0.5 font-mono">
                {data.mediumSolved}/{data.totalMedium}
              </p>
            </div>

            {/* Hard Box */}
            <div className="bg-[#282828] border border-[#333333] rounded-xl py-2 px-2 text-center hover:border-[#ef4743]/50 transition-colors">
              <p className="text-[#ef4743] font-bold text-[11px] tracking-wide">
                Hard
              </p>
              <p className="text-slate-200 font-extrabold text-xs mt-0.5 font-mono">
                {data.hardSolved}/{data.totalHard}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
