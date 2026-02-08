import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { content } = useLanguage();
  const { steps } = content;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the line height from 0% to 100% based on scroll
      gsap.fromTo(lineRef.current, 
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          }
        }
      );

      // Animate steps appearing
      const stepElements = gsap.utils.toArray('.timeline-step');
      stepElements.forEach((step: any) => {
        gsap.fromTo(step,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [steps]); // Re-run when steps change (lang switch)

  return (
    <section id="process" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{steps.title}</h2>
          <p className="text-lg text-slate-600">{steps.subtitle}</p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical Line Container */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform -translate-x-1/2 rounded-full"></div>
          {/* Animated Fill Line */}
          <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 w-1 bg-emerald-500 transform -translate-x-1/2 rounded-full z-10"></div>

          <div className="space-y-12">
            {steps.items.map((step, index) => (
              <div key={step.id} className={`timeline-step relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-white border-4 border-emerald-500 rounded-full transform -translate-x-1/2 z-20 flex items-center justify-center shadow-md">
                   <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                </div>

                {/* Content Box */}
                <div className={`ml-20 md:ml-0 w-full md:w-[45%] p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <div className={`inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold mb-3 ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                    ЭТАП 0{step.stepNumber}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className={`flex items-center text-sm font-semibold text-emerald-600 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                    Срок: {step.duration}
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};