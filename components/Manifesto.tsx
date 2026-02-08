import React from 'react';
import { Activity, UserCircle, AppWindow, BrainCircuit, TrendingUp } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const IconMap: Record<string, React.FC<any>> = {
  Activity, UserCircle, AppWindow, BrainCircuit, TrendingUp
};

export const Manifesto: React.FC = () => {
  const { content } = useLanguage();
  const { manifesto } = content;

  return (
    <section id="manifesto" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            {manifesto.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto border-l-4 border-emerald-500 pl-6 italic">
            {manifesto.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {manifesto.items.map((item, index) => {
            const Icon = IconMap[item.icon] || Activity;
            // Span the last item if total is odd (5 items)
            const isLast = index === manifesto.items.length - 1;
            
            return (
              <div 
                key={item.id}
                className={`group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 ${isLast ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl"></div>
                
                <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 text-emerald-400 shadow-inner group-hover:scale-110 transition-transform duration-300 border border-slate-700">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <div className="text-emerald-400 text-sm font-mono uppercase tracking-wider mb-4 opacity-80">
                  {item.principle}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};