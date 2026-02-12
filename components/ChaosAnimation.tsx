import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../LanguageContext';
import { 
  ArrowDownCircle, Phone, Send, MessageCircle, MessageSquare, Bot, Briefcase, 
  FileSpreadsheet, Database, Table, DatabaseZap, Wrench, 
  HardDrive, Server, PhoneCall, Smartphone, Cylinder, 
  Search, MoreVertical, FileText, CheckCircle2, Paperclip, BarChart3, User, Circle, Mail
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Map string icon names to Lucide components
const IconMap: Record<string, React.FC<any>> = {
  Phone, Send, MessageCircle, MessageSquare, Bot, Briefcase, 
  FileSpreadsheet, Database, Table, DatabaseZap, Wrench, 
  HardDrive, Server, PhoneCall, Smartphone, Cylinder
};

export const ChaosAnimation: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const singularityRef = useRef<HTMLDivElement>(null);
  const chaosTextRef = useRef<HTMLDivElement>(null);
  const orderTextRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  const { content } = useLanguage();
  const { painPoints, chaos, hero } = content;

  // Pre-calculate positions once on component mount
  useLayoutEffect(() => {
    // Clear any existing animations to prevent memory leaks
    const ctx = gsap.context(() => {
      // Mobile-responsive configuration
      const isMobile = window.innerWidth < 768;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Simplified configuration for better performance
      const scrollDuration = isMobile ? "+=120%" : "+=150%";
      const scrubStrength = isMobile ? 0.3 : 0.4; // Lower values for faster response
      const iconScale = isMobile ? 0.8 : 1;
      
      // Limit the number of icons for better performance
      const visibleIcons = isMobile ? Math.min(8, itemsRef.current.length) : itemsRef.current.length;
      
      // Set initial states
      gsap.set(heroTextRef.current, { opacity: 1 });
      gsap.set(chaosTextRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(orderTextRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(dashboardRef.current, { scale: 0, opacity: 0 });
      gsap.set(singularityRef.current, { scale: 0, opacity: 0 });

      // Position icons in a simple grid or random pattern for better performance
      const positionIcons = () => {
        const containerWidth = containerRef.current?.offsetWidth || viewportWidth;
        const containerHeight = containerRef.current?.offsetHeight || viewportHeight;
        
        // Use a simple grid layout instead of golden ratio
        const cols = Math.ceil(Math.sqrt(visibleIcons));
        const rows = Math.ceil(visibleIcons / cols);
        const cellWidth = containerWidth / cols;
        const cellHeight = containerHeight / rows;
        
        for (let i = 0; i < visibleIcons; i++) {
          if (!itemsRef.current[i]) continue;
          
          const col = i % cols;
          const row = Math.floor(i / cols);
          
          // Add slight randomization for more natural look
          const offsetX = (Math.random() * 0.5 - 0.25) * cellWidth;
          const offsetY = (Math.random() * 0.5 - 0.25) * cellHeight;
          
          const x = col * cellWidth + cellWidth/2 + offsetX - containerWidth/2;
          const y = row * cellHeight + cellHeight/2 + offsetY - containerHeight/2;
          
          // Set initial position and state
          gsap.set(itemsRef.current[i], { 
            x, 
            y, 
            opacity: 0, 
            scale: 0, 
            rotation: Math.random() * 10 - 5 
          });
        }
      };
      
      positionIcons();

      if (prefersReducedMotion) {
        gsap.set(itemsRef.current, { opacity: 0, scale: 0 });
        gsap.set(dashboardRef.current, { scale: 1, opacity: 1 });
        gsap.set(orderTextRef.current, { opacity: 0.2, scale: 1 });
        return;
      }

      // Create main timeline with optimized settings
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: scrollDuration,
          scrub: scrubStrength,
          pin: !isMobile,
          anticipatePin: 1,
        }
      });

      // --- SIMPLIFIED ANIMATION SEQUENCE ---

      // 1. Fade out hero text
      tl.to(heroTextRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "fadeOutHero");

      // 2. Fade in CHAOS text
      tl.to(chaosTextRef.current, {
        opacity: 0.2,
        scale: 1,
        duration: 0.8,
        ease: "power1.inOut"
      }, "fadeInChaos");

      // 3. Fade out CHAOS text
      tl.to(chaosTextRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power1.in"
      }, "blurChaos");

      // 4. Materialize Icons with simplified staggered appearance
      tl.to(itemsRef.current.slice(0, visibleIcons), {
        opacity: 1,
        scale: iconScale,
        duration: 1,
        stagger: { 
          amount: 0.5, 
          from: "random" 
        },
        ease: "back.out(1.2)"
      }, "materializeIcons");

      // 5. Suction effect - pull icons into center (simplified)
      tl.to(itemsRef.current.slice(0, visibleIcons), {
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
        stagger: { 
          amount: 0.2, 
          from: "center" 
        }
      }, "suction");

      // 6. Singularity flash
      tl.to(singularityRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.in"
      }, "suction+=0.8");

      // 7. Expand flash and fade out
      tl.to(singularityRef.current, {
        scale: 20,
        opacity: 0,
        duration: 0.4
      }, "reveal");

      // 8. Reveal dashboard
      tl.to(dashboardRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "reveal-=0.1");

      // 9. Fade in ORDER text
      tl.to(orderTextRef.current, {
        opacity: 0.2,
        scale: 1,
        duration: 0.8,
        ease: "power1.inOut"
      }, "reveal+=0.7");

    }, triggerRef);

    // Cleanup function to prevent memory leaks
    return () => {
      ctx.revert();
    };
  }, [painPoints]);

  return (
    <div className="bg-slate-900 relative z-20 -mt-[1px]"> 
      <div ref={triggerRef} className="relative w-full h-screen bg-slate-900 overflow-hidden text-white flex items-center justify-center">
        
        {/* Hero Text Container (to be faded out) */}
        <div 
          ref={heroTextRef} 
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 text-center"
          style={{ willChange: 'opacity' }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white max-w-4xl">
            {hero.title}
          </h2>
          <button className="group relative px-8 py-4 mb-8 bg-emerald-500 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              {hero.ctaText}
            </div>
          </button>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {hero.subtitle}
          </p>
        </div>

        {/* Background CHAOS Text */}
        <div 
          ref={chaosTextRef} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ willChange: 'opacity, transform' }}
        >
           <h2 className="text-[20vw] font-black text-slate-800 select-none tracking-tighter leading-none whitespace-nowrap">
              {chaos.chaosText}
           </h2>
        </div>

        {/* Background ORDER Text */}
        <div 
          ref={orderTextRef} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ willChange: 'opacity, transform' }}
        >
           <h2 className="text-[20vw] font-black text-slate-800 select-none tracking-tighter leading-none whitespace-nowrap">
              {chaos.orderText}
           </h2>
        </div>

        {/* Static Container for Icons */}
        <div 
          ref={containerRef} 
          className="absolute inset-0 flex items-center justify-center z-20 w-full h-full pointer-events-none"
        >
            {painPoints.map((point, index) => {
              const Icon = IconMap[point.icon] || Circle;
              // Simplified icon rendering
              return (
                <div
                  key={point.id}
                  ref={el => itemsRef.current[index] = el}
                  className="absolute flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Icon size={24} className="text-white opacity-90" />
                </div>
              );
            })}
        </div>

        {/* Singularity (Flash Effect) */}
        <div 
          ref={singularityRef} 
          className="absolute w-12 h-12 bg-emerald-400 rounded-full blur-xl z-20"
          style={{ willChange: 'transform, opacity' }}
        ></div>

        {/* ---------------- DASHBOARD INTERFACE ---------------- */}
        <div 
            ref={dashboardRef}
            className="relative z-30 w-[95vw] md:w-[90vw] max-w-6xl h-[70vh] md:h-[80vh] bg-slate-900 rounded-xl border border-slate-700 shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col"
            style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        >
            {/* Window Header */}
            <div className="h-10 md:h-12 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
              <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-[10px] md:text-xs font-mono text-emerald-500 font-bold tracking-widest truncate ml-4 mr-4">
                СИСТЕМА АНАКОНДА АКТИВНА
              </div>
              <Search size={16} className="text-slate-500 hidden md:block" />
            </div>

            {/* Main Layout Grid */}
            <div className="flex-1 grid grid-cols-12 overflow-hidden bg-slate-900">
              
              {/* LEFT: Chats List (Hidden on Mobile) */}
              <div className="col-span-3 border-r border-slate-800 flex flex-col bg-slate-900/50 hidden md:flex">
                  <div className="p-4 border-b border-slate-800">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-2">Активные диалоги</div>
                    <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-xs font-bold border-2 border-slate-900 ring-2 ring-emerald-500">VP</div>
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center text-xs font-bold border-2 border-slate-900 grayscale opacity-50">Log</div>
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center text-xs font-bold border-2 border-slate-900 grayscale opacity-50">Sup</div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-3 bg-slate-800/50 border-l-4 border-emerald-500 cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-white truncate w-24">OOO Вектор Плюс</span>
                          <div className="flex items-center text-[10px] text-emerald-400">
                            <Send size={10} className="mr-1" />
                            09:41
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 truncate">Счет №4023 отправлен. Ожидание...</p>
                    </div>
                    
                    <div className="p-3 hover:bg-slate-800/30 cursor-pointer transition-colors opacity-60">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-slate-300">Логистика Север</span>
                          <div className="flex items-center text-[10px] text-slate-500">
                             <Mail size={10} className="mr-1" />
                             Вчера
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 truncate">Подтверждение доставки...</p>
                    </div>

                    <div className="p-3 hover:bg-slate-800/30 cursor-pointer transition-colors opacity-60">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-slate-300">ИП Смирнов</span>
                          <div className="flex items-center text-[10px] text-slate-500">
                             <MessageCircle size={10} className="mr-1" />
                             Вчера
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 truncate">Где можно забрать товар?</p>
                    </div>
                  </div>
              </div>

              {/* CENTER: Chat Interface + Invoice (Full width on Mobile) */}
              <div className="col-span-12 md:col-span-6 flex flex-col bg-slate-950/30 relative">
                  {/* Chat Header */}
                  <div className="h-14 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 bg-slate-900/80 backdrop-blur-sm z-10">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold mr-3">VP</div>
                        <div>
                          <div className="font-bold text-sm text-white">OOO Вектор Плюс</div>
                          <div className="text-[10px] text-emerald-500 flex items-center">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1"></span>
                              <Send size={10} className="mr-1" />
                              В сети (Telegram)
                          </div>
                        </div>
                    </div>
                    <MoreVertical size={16} className="text-slate-500" />
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
                    <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-xl rounded-tl-none p-3 md:p-4 max-w-[85%] md:max-w-[80%] border border-slate-700">
                          <p className="text-sm text-slate-300">Добрый день! Срочно нужен счет на оплату серверов за март.</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">09:38</span>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="bg-emerald-900/20 rounded-xl rounded-tr-none p-0 max-w-[90%] md:max-w-[85%] border border-emerald-500/30 overflow-hidden shadow-lg">
                          <div className="bg-emerald-500/10 p-3 border-b border-emerald-500/20 flex items-center gap-2">
                              <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                                <FileText size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-emerald-400">Счет Сформирован</div>
                                <div className="text-[10px] text-emerald-300/70">Интеграция 1С</div>
                              </div>
                          </div>
                          <div className="p-4 space-y-3">
                              <div className="flex justify-between items-baseline border-b border-emerald-500/10 pb-2">
                                <span className="text-xs text-slate-400">Счет №</span>
                                <span className="text-sm font-mono text-white">4023-B</span>
                              </div>
                              <div className="flex justify-between items-baseline border-b border-emerald-500/10 pb-2">
                                <span className="text-xs text-slate-400">Сумма</span>
                                <span className="text-lg font-bold text-white">450,000 ₽</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-slate-500">PDF • 1.2 MB</span>
                                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded transition-colors font-medium flex items-center">
                                    <CheckCircle2 size={12} className="mr-1.5" />
                                    Отправлено
                                </button>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-3 md:p-4 border-t border-slate-800 flex items-center gap-2 md:gap-3 bg-slate-900">
                    <Paperclip size={20} className="text-slate-500 cursor-pointer hover:text-white" />
                    <div className="flex-1 bg-slate-800 h-10 rounded-lg flex items-center px-4 text-xs md:text-sm text-slate-400">
                        Написать сообщение...
                    </div>
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white cursor-pointer hover:bg-emerald-500">
                        <Send size={18} />
                    </div>
                  </div>
              </div>

              {/* RIGHT: CRM / Analytics (Hidden on Mobile) */}
              <div className="col-span-3 border-l border-slate-800 bg-slate-900/50 hidden lg:flex flex-col p-6">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 border-4 border-slate-800 ring-2 ring-emerald-500/50">
                        VP
                    </div>
                    <h3 className="text-lg font-bold text-white">OOO Вектор Плюс</h3>
                    <div className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded mt-1">
                        Технический Партнер
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="space-y-4 mb-8">
                    <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Оборот (Год)</div>
                        <div className="text-xl font-bold text-emerald-400 font-mono">12.5M ₽</div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1 p-3 bg-slate-800 rounded-xl border border-slate-700">
                          <div className="text-[10px] text-slate-400 uppercase mb-1">Долг</div>
                          <div className="text-sm font-bold text-red-400 font-mono">0 ₽</div>
                        </div>
                        <div className="flex-1 p-3 bg-slate-800 rounded-xl border border-slate-700">
                          <div className="text-[10px] text-slate-400 uppercase mb-1">Заказы</div>
                          <div className="text-sm font-bold text-white font-mono">14</div>
                        </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-slate-800">
                        <div className="flex items-center text-slate-400">
                          <BarChart3 size={14} className="mr-2" />
                          <span>ИНН</span>
                        </div>
                        <span className="font-mono text-slate-200">772301001</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-800">
                        <div className="flex items-center text-slate-400">
                          <Phone size={14} className="mr-2" />
                          <span>Контакты</span>
                        </div>
                        <span className="text-slate-200">+7 (999) ...</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-800">
                        <div className="flex items-center text-slate-400">
                          <User size={14} className="mr-2" />
                          <span>Менеджер</span>
                        </div>
                        <span className="text-emerald-400">Макс</span>
                    </div>
                  </div>
              </div>

            </div>
        </div>
      </div>

      {/* Downward scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-[10px] tracking-[0.3em] uppercase text-slate-300">
        <ArrowDownCircle className="text-emerald-400 animate-bounce" size={30} />
        <span className="mt-1">{chaos.scrollText}</span>
      </div>
    </div>
  );
};
