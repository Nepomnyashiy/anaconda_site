import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChaosAnimation } from './components/ChaosAnimation';
import { Philosophy } from './components/Philosophy';
import { IntegrationLevels } from './components/IntegrationLevels';
import { BentoGrid } from './components/BentoGrid';
import { Testimonials } from './components/Testimonials';
import { FooterForm } from './components/FooterForm';
import { LanguageProvider } from './LanguageContext';

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Prevent the browser from restoring scroll position to the bottom on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Only scroll to top on initial load
    if (isInitialLoad) {
      window.scrollTo(0, 0);
      setIsInitialLoad(false);
    }

    // Prevent automatic scroll to chat
    const preventAutoScroll = (e: Event) => {
      if (window.pageYOffset === 0) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', preventAutoScroll);

    return () => {
      window.removeEventListener('scroll', preventAutoScroll);
    };
  }, [isInitialLoad]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
        <Header />
        <main>
          <Hero />
          {/* 1. Chaos transitioning to Order */}
          <ChaosAnimation />
          {/* 2. The Dialogue/Philosophy */}
          <Philosophy />
          {/* 3. Implementation Levels (Cost-based tiers) */}
          <IntegrationLevels />
          {/* 4. Features detail */}
          <BentoGrid />
          {/* 5. Testimonials & Philosophy Cards */}
          <Testimonials />
        </main>
        <FooterForm />
      </div>
    </LanguageProvider>
  );
}

export default App;