import React from 'react';
import { useLanguage } from '../LanguageContext';

export const About: React.FC = () => {
  const { content } = useLanguage();
  const { about } = content;

  return (
    <section id="about" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
             <h2 className="text-3xl font-bold mb-6">{about.title}</h2>
             <p className="text-slate-400 text-lg leading-relaxed mb-8">
               {about.description}
             </p>
             <div className="grid grid-cols-3 gap-8 border-t border-slate-800 pt-8">
               <div>
                 <div className="text-4xl font-bold text-emerald-400 mb-1">{about.stats.deployments}</div>
                 <div className="text-sm text-slate-500 uppercase tracking-wide">{about.stats.deploymentsLabel}</div>
               </div>
               <div>
                 <div className="text-4xl font-bold text-emerald-400 mb-1">{about.stats.uptime}</div>
                 <div className="text-sm text-slate-500 uppercase tracking-wide">{about.stats.uptimeLabel}</div>
               </div>
               <div>
                 <div className="text-4xl font-bold text-emerald-400 mb-1">{about.stats.failures}</div>
                 <div className="text-sm text-slate-500 uppercase tracking-wide">{about.stats.failuresLabel}</div>
               </div>
             </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-emerald-500 rounded-xl transform rotate-3 opacity-20"></div>
             <div className="relative bg-slate-800 p-8 rounded-xl border border-slate-700">
                <blockquote className="text-xl italic text-slate-300 mb-6">
                  {about.quote}
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-600 mr-3"></div>
                  <div>
                    <div className="font-bold">{about.author}</div>
                    <div className="text-sm text-emerald-500">{about.position}</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};