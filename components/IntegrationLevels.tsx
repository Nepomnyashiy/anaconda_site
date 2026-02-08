import React from 'react';
import { Search, AppWindow, Sliders, Brain, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const IconMap: Record<string, React.FC<any>> = {
  Search, AppWindow, Sliders, Brain
};

export const IntegrationLevels: React.FC = () => {
  const { content } = useLanguage();
  const { levels } = content;

  const handleLevelAction = (text: string) => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    const event = new CustomEvent('prefillChat', { detail: { message: text } });
    window.dispatchEvent(event);
  };

  return (
    <section id="levels" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{levels.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{levels.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.items.map((level, index) => {
            const Icon = IconMap[level.icon] || Search;
            const isPremium = index === 3; 
            
            return (
              <div 
                key={level.id} 
                className={`relative flex flex-col p-8 rounded-xl transition-all duration-500 hover:-translate-y-2
                  ${isPremium 
                    ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-emerald-500/20' 
                    : 'bg-white text-slate-900 shadow-lg border border-slate-100 hover:shadow-xl'
                  }`}
              >
                {/* Level Tag */}
                <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-xl rounded-tr-xl text-xs font-bold font-mono tracking-wider
                  ${isPremium ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  УРОВЕНЬ 0{level.level}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 
                   ${isPremium ? 'bg-slate-800 text-emerald-400' : 'bg-slate-50 text-emerald-600'}`}>
                   <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold mb-1">{level.title}</h3>
                <div className={`text-sm font-medium mb-4 ${isPremium ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {level.subtitle}
                </div>
                
                <p className={`text-sm leading-relaxed mb-8 flex-grow ${isPremium ? 'text-slate-400' : 'text-slate-600'}`}>
                  {level.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {level.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check size={16} className={`mr-2 mt-0.5 ${isPremium ? 'text-emerald-500' : 'text-emerald-600'}`} />
                      <span className={isPremium ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button & Cost */}
                <div className={`mt-auto pt-6 border-t
                  ${isPremium ? 'border-slate-700' : 'border-slate-100'}`}>
                   
                   <button 
                     onClick={() => handleLevelAction(`${level.buttonText}`)}
                     className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center transition-all
                       ${isPremium 
                         ? 'bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30' 
                         : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg'
                       }`}
                   >
                     {level.buttonText}
                     <ArrowRight size={16} className="ml-2" />
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};