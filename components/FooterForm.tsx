import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export const FooterForm: React.FC = () => {
  const { content } = useLanguage();
  const { footer, settings } = content;
  const { chat } = footer;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: chat.welcomeMessage, sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    setMessages([{ id: '1', text: chat.welcomeMessage, sender: 'bot', timestamp: new Date() }]);
  }, [chat.welcomeMessage]);

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.message) {
        handleSend(customEvent.detail.message);
      }
    };
    window.addEventListener('prefillChat', handlePrefill);
    return () => window.removeEventListener('prefillChat', handlePrefill);
  }, []);

  const handleSend = (text: string) => {
    const textToSend = text.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "Спасибо за запрос. Специалист Макс уже изучает ваш кейс. Он свяжется с вами в течение 10 минут.";
      if (text.includes("Audit") || text.includes("Аудит")) {
         responseText = "Заявка на бесплатный аудит принята. Мы подготовим отчет за 48 часов.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <footer id="contact" className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Title & Subtitle */}
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{footer.title}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {footer.subtitle}
            </p>
        </div>

        {/* 2. Chat Interface - Centered */}
        <div className="relative max-w-md mx-auto mb-20">
            {/* Subtle backlight */}
            <div className="absolute top-10 -left-10 -right-10 bottom-0 bg-emerald-500/10 rounded-[3rem] blur-3xl pointer-events-none"></div>
            
            <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col h-[550px] w-full">
              
              {/* Chat Header */}
              <div className="bg-white/80 backdrop-blur-md p-5 border-b border-slate-100 flex items-center justify-between z-10 sticky top-0">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center font-bold text-lg text-white">A</div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{chat.header}</div>
                    <div className="text-xs text-emerald-500 font-medium">Online</div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 custom-scrollbar">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3.5 rounded-xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white text-slate-800 border border-slate-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-2">
                       <span className="text-xs text-slate-400 italic mr-2">{chat.botTyping}</span>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies (Chips) - Stacked */}
              <div className="px-5 pb-3 bg-white border-t border-slate-50 pt-3">
                 <div className="flex flex-col space-y-2">
                  {chat.quickReplies.map((reply, idx) => (
                     <button
                       key={idx}
                       onClick={() => handleSend(reply)}
                       className="w-full text-left px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-slate-100 flex items-center justify-between group"
                     >
                       {reply}
                       <Send size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                     </button>
                  ))}
                 </div>
              </div>

              {/* Input Area */}
              <div className="bg-white p-4 flex items-center gap-3 border-t border-slate-100">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={chat.inputPlaceholder}
                  className="flex-1 px-4 py-3 bg-slate-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-100 text-sm text-slate-900 placeholder:text-slate-400 transition-shadow"
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </div>
        </div>

        {/* 3. Contact Info - At the Bottom */}
        <div className="border-t border-slate-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start text-slate-700">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-500 mb-3 border border-slate-100">
                  <Phone size={20} />
                </div>
                <span className="font-medium text-lg">{settings.phone}</span>
                <span className="text-sm text-slate-400 mt-1">Ежедневно 9:00 - 20:00</span>
              </div>
              <div className="flex flex-col items-center md:items-start text-slate-700">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-500 mb-3 border border-slate-100">
                  <Mail size={20} />
                </div>
                <span className="font-medium text-lg">{settings.email}</span>
                <span className="text-sm text-slate-400 mt-1">Отвечаем в течение часа</span>
              </div>
              <div className="flex flex-col items-center md:items-start text-slate-700">
                 <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-500 mb-3 border border-slate-100">
                  <MapPin size={20} />
                </div>
                <span className="font-medium text-lg">{footer.address}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm border-t border-slate-100 pt-8">
              <p>{settings.copyright}</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-emerald-500">{footer.links.privacy}</a>
                <a href="#" className="hover:text-emerald-500">{footer.links.terms}</a>
              </div>
            </div>
        </div>

      </div>
    </footer>
  );
};