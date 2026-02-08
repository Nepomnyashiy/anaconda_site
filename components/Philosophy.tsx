import React from 'react';
import { Activity, UserCircle, BrainCircuit } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const IconMap: Record<string, React.FC<any>> = {
  Activity, UserCircle, BrainCircuit
};

export const Philosophy: React.FC = () => {
  const { content } = useLanguage();
  const { philosophy } = content;

  return (
    <section id="philosophy" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Abstract Tech Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[150px] transform translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 mb-6 text-sm font-mono uppercase tracking-wider">
               <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
               Anaconda Protocol
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {philosophy.title}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-emerald-500 pl-6">
              {philosophy.subtitle}
            </p>
          </div>
          <div className="relative h-64 lg:h-auto">
             {/* Decorative abstract diagram */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border border-slate-700 rounded-full animate-[spin_20s_linear_infinite] opacity-50"></div>
                <div className="w-48 h-48 border border-emerald-500/30 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="w-32 h-32 bg-emerald-500/10 rounded-full absolute backdrop-blur-md flex items-center justify-center border border-emerald-500/50">
                   <div className="text-emerald-400 font-mono font-bold text-lg">CORE</div>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophy.items.map((item) => {
            const Icon = IconMap[item.icon] || Activity;
            
            return (
              <div 
                key={item.id}
                className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:bg-slate-800"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300 border border-slate-700">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <div className="text-emerald-500/70 text-xs font-mono uppercase tracking-wider mb-4">
                  {item.principle}
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
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