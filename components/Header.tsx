import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, content } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  // Dynamic text color based on scroll state (Dark hero = white text initially, Light content = dark text on scroll)
  const textColorClass = isScrolled ? 'text-slate-600' : 'text-white/80';
  const hoverColorClass = isScrolled ? 'hover:text-emerald-600' : 'hover:text-white';
  const logoTextClass = isScrolled ? 'text-slate-900' : 'text-white';
  const logoBgClass = isScrolled ? 'bg-slate-900' : 'bg-white';
  const logoLetterClass = isScrolled ? 'text-white' : 'text-slate-900';

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md border-b border-slate-200' : 'bg-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
             <div className={`w-8 h-8 rounded-lg mr-2 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300 ${logoBgClass}`}>
                <span className={`font-bold text-lg ${logoLetterClass} group-hover:text-white`}>A</span>
             </div>
            <span className={`font-bold text-xl tracking-tight ${logoTextClass}`}>
              {content.settings.logoText}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <button onClick={() => scrollToSection('philosophy')} className={`${textColorClass} ${hoverColorClass} font-medium transition-colors text-sm uppercase tracking-wide`}>
              {content.nav.philosophy}
            </button>
            <button onClick={() => scrollToSection('levels')} className={`${textColorClass} ${hoverColorClass} font-medium transition-colors text-sm uppercase tracking-wide`}>
              {content.nav.levels}
            </button>
            <button onClick={() => scrollToSection('features')} className={`${textColorClass} ${hoverColorClass} font-medium transition-colors text-sm uppercase tracking-wide`}>
              {content.nav.features}
            </button>
            
            <div className={`h-6 w-px mx-2 ${isScrolled ? 'bg-slate-300' : 'bg-white/20'}`}></div>
            
            <button 
              onClick={toggleLanguage}
              className={`flex items-center ${textColorClass} ${hoverColorClass} font-medium transition-colors`}
            >
              <Globe size={18} className="mr-1" />
              {language.toUpperCase()}
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-lg text-sm ${
                 isScrolled 
                 ? 'bg-slate-900 text-white hover:bg-emerald-600 shadow-emerald-500/20' 
                 : 'bg-white text-slate-900 hover:bg-emerald-400 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              }`}
            >
              {content.nav.cta}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button 
                onClick={toggleLanguage}
                className={`mr-4 flex items-center font-bold ${textColorClass}`}
            >
              {language.toUpperCase()}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? 'text-slate-900' : 'text-white'} focus:outline-none`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => scrollToSection('philosophy')} className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-500 rounded-lg">
              {content.nav.philosophy}
            </button>
            <button onClick={() => scrollToSection('levels')} className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-500 rounded-lg">
              {content.nav.levels}
            </button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-500 rounded-lg">
              {content.nav.features}
            </button>
            <button 
               onClick={() => scrollToSection('contact')}
               className="block w-full mt-4 text-center bg-slate-900 text-white px-3 py-4 rounded-lg font-bold"
            >
              {content.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};