import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDownCircle } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  const { hero } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Simple entrance animation for hero elements
    gsap.fromTo(".hero-text", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // Hide scroll hint when user scrolls
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.15) {
        setShowHint(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-16 lg:pt-48 lg:pb-28 overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center justify-center">
      
      {/* Abstract Background Orbs */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          
          {/* 1. Title */}
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-12 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400">
            {hero.title}
          </h1>
          
          {/* 2. Button */}
          <div className="hero-text mb-12">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="group relative px-10 py-6 bg-emerald-500 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                {hero.ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* 3. Subtitle */}
          <p className="hero-text text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light">
            {hero.subtitle}
          </p>

          {/* Scroll hint */}
          <div ref={hintRef} className={`mt-12 flex flex-col items-center text-sm tracking-[0.2em] uppercase text-slate-300 transition-opacity duration-500 ${showHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <ArrowDownCircle className="mb-2 animate-bounce" size={32} />
            <span>{hero.scrollHint}</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue - Only visible on initial load */}
      {showHint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs tracking-[0.4em] uppercase text-slate-300 pointer-events-none">
          <ArrowDownCircle className="text-emerald-400 animate-bounce" size={34} />
          <span className="mt-2">{hero.scrollHint}</span>
        </div>
      )}
    </section>
  );
};