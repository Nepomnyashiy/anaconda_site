import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Testimonials: React.FC = () => {
  const { content } = useLanguage();
  const { testimonials } = content;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.items.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length);
  };

  return (
    <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {testimonials.title}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 border-l-2 border-slate-700 pl-6">
              {testimonials.subtitle}
            </p>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={prevCard}
                className="p-3 rounded-full border border-slate-600 hover:bg-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition-all"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={nextCard}
                className="p-3 rounded-full border border-slate-600 hover:bg-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition-all"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Card Stack */}
          <div className="relative h-[400px] w-full max-w-md mx-auto perspective-1000">
            {testimonials.items.map((item, index) => {
              // Calculate relative index for stacking logic
              const relativeIndex = (index - currentIndex + testimonials.items.length) % testimonials.items.length;
              
              // Only render top 3 cards for performance/visuals
              if (relativeIndex > 2) return null;

              const zIndex = 30 - relativeIndex * 10;
              const scale = 1 - relativeIndex * 0.05;
              const translateY = relativeIndex * 20;
              const opacity = 1 - relativeIndex * 0.2;
              
              const isPhilosophy = item.type === 'philosophy';

              return (
                <div 
                  key={item.id}
                  onClick={relativeIndex === 0 ? nextCard : undefined}
                  className={`absolute top-0 left-0 w-full h-full p-8 rounded-xl border transition-all duration-500 ease-out cursor-pointer shadow-2xl flex flex-col justify-between
                    ${isPhilosophy 
                       ? 'bg-gradient-to-br from-emerald-900 to-slate-900 border-emerald-500/30' 
                       : 'bg-slate-800 border-slate-700'
                    }`}
                  style={{
                    zIndex,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    pointerEvents: relativeIndex === 0 ? 'auto' : 'none'
                  }}
                >
                   <div>
                     <Quote size={40} className={`mb-6 ${isPhilosophy ? 'text-emerald-500' : 'text-slate-600'}`} />
                     <p className={`text-xl font-medium leading-relaxed ${isPhilosophy ? 'text-emerald-50 italic' : 'text-white'}`}>
                       "{item.text}"
                     </p>
                   </div>

                   <div className="flex items-center mt-8">
                     <div className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center font-bold text-lg
                        ${isPhilosophy ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {item.author.charAt(0)}
                     </div>
                     <div>
                       <div className={`font-bold ${isPhilosophy ? 'text-emerald-400' : 'text-white'}`}>
                         {item.author}
                       </div>
                       <div className="text-sm text-slate-400">
                         {item.position}
                       </div>
                     </div>
                   </div>

                   {/* Swipe hint for top card */}
                   {relativeIndex === 0 && (
                      <div className="absolute top-4 right-4 animate-pulse">
                         <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                   )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};