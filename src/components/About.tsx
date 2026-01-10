import React, { useEffect, useRef } from 'react';
import { User, Mail, MapPin, Calendar } from 'lucide-react';
import mohamedmydeen from './assets/mohamedmydeen.pdf';

const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            About <span className="text-emerald-600 dark:text-emerald-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto"></div>
        </div>

        <div 
          ref={contentRef} 
          className="flex flex-col md:flex-row gap-20 items-center opacity-0 transition-opacity duration-1000"
        >
          <div className="md:w-1/2">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-3 ml-5 ">
            After finishing high school, I discovered a real passion for programming. I've learned C, Java, and Python, and now I'm focused on building real-time projects, sharpening my problem-solving skills, and getting ready for placements at top tech companies.
            </p>
            
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 ml-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
                  <p className="text-slate-800 dark:text-white">Mohamed Mydeen Shahabudeen M</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-slate-800 dark:text-white">mohamedmydeen.sd@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                  <p className="text-slate-800 dark:text-white">Melapalayam, Tirunelveli</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full text-emerald-600 dark:text-emerald-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
                  <p className="text-slate-800 dark:text-white">BTech Computer Science And Business System</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 ml-5">
              <a
                  href="/mohamedmydeen.pdf"
                  download="Mohamed_Mydeen_resume.pdf"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors duration-300 inline-block"
                >
                  Download Resume
                </a>
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default About;
