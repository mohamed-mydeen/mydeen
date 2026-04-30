import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 flex items-center justify-center rounded-xl
        bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/10
        text-slate-600 dark:text-slate-300
        hover:bg-indigo-50 dark:hover:bg-indigo-500/15
        hover:border-indigo-200 dark:hover:border-indigo-500/30
        hover:text-indigo-600 dark:hover:text-indigo-400
        transition-all duration-200"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark'
        ? <Sun size={16} />
        : <Moon size={16} />
      }
    </button>
  );
};

export default ThemeToggle;