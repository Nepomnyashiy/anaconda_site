import React, { createContext, useState, useContext } from 'react';
import { CONTENT_RU, CONTENT_EN } from './constants';
import { Content } from './types';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const content = language === 'ru' ? CONTENT_RU : CONTENT_EN;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};