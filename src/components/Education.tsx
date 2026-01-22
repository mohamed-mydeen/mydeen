import React, { useEffect, useRef } from 'react';
import { educationData } from '../data/educationData';

const Education: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach((element, index) => {
              setTimeout(() => {
                (element as HTMLElement).style.transform = 'translateY(0)';
                (element as HTMLElement).style.opacity = '1';
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <section id="education" className="py-20 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Education & <span className="text-emerald-600 dark:text-emerald-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-8"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My academic background and professional journey that have shaped my skills and knowledge.
          </p>
        </div>

        <div 
          ref={timelineRef}
          className="relative max-w-3xl mx-auto opacity-0 transition-opacity duration-1000"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200 dark:bg-emerald-800"></div>
          
          {educationData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item relative mb-12 opacity-0 transform translate-y-8 transition-all duration-500 ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}
            >
              {/* Content container */}
              <div
                className={`relative ${
                  index % 2 === 0 ? 'mr-12 md:mr-0 md:pr-12' : 'ml-12 md:ml-0 md:pl-12'
                } md:w-1/2 ${index % 2 === 0 ? 'md:left-0' : 'md:left-1/2'}`}
              >
                {/* Date badge */}
                <div className="absolute top-0 bg-emerald-600 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
                  {item.period}
                </div>
                
                {/* Card */}
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 mt-8">
                  <div className="flex items-center mb-4 mt-4">
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {item.organization}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                  {item.achievements && (
                    <div className="mt-4">
                      <p className="font-semibold text-slate-800 dark:text-white mb-2">Key Achievements:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                        {item.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Timeline dot */}
                <div className="absolute top-3 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-800 shadow">
                  <div className="absolute inset-0 rounded-full bg-emerald-600 animate-ping opacity-50"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
