import React from 'react';
import { LayoutDashboard, BrainCircuit, Wallet, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const icons = [LayoutDashboard, BrainCircuit, Wallet, Users];

export const BentoGrid: React.FC = () => {
  const { content } = useLanguage();
  const { features } = content;

  return (
    <section id="product" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{features.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {features.items.map((feature, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={feature.id} 
                className={`${feature.gridArea} group relative p-8 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-default`}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:to-emerald-500/5 transition-all duration-500"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between items-start">
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {/* Glassmorphism Tooltip Overlay - Left Aligned */}
                <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center p-8 z-20">
                  <div className="flex flex-col items-start text-left">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                       <Icon size={20} />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      {feature.longDescription}
                    </p>
                  </div>
                </div>
                
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/20 rounded-xl transition-colors duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};