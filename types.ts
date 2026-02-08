export interface GlobalSettings {
  logoText: string;
  phone: string;
  email: string;
  copyright: string;
}

export interface HeroSection {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  demoText: string;
  scrollHint: string;
  noCard: string;
  trial: string;
  imageUrl: string;
}

export interface PainPoint {
  id: number;
  name: string;
  icon: string; // Lucide icon name mapping
}

export interface IntegrationLevel {
  id: number;
  level: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  costIndicator: string; 
  icon: string;
  buttonText: string; 
  isFree?: boolean; 
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
  longDescription: string; 
  gridArea: string;
}

export interface PhilosophyItem {
  id: string;
  title: string;
  principle: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  type: 'review' | 'philosophy';
  text: string;
  author: string;
  position: string;
  company?: string;
}

export interface Stats {
  deployments: string;
  deploymentsLabel: string;
  failures: string;
  failuresLabel: string;
  uptime: string;
  uptimeLabel: string;
}

export interface Content {
  settings: GlobalSettings;
  hero: HeroSection;
  philosophy: {
    title: string;
    subtitle: string;
    items: PhilosophyItem[];
  };
  painPoints: PainPoint[];
  features: {
    title: string;
    subtitle: string;
    items: ProductFeature[];
  };
  levels: {
    title: string;
    subtitle: string;
    items: IntegrationLevel[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  about: {
    title: string;
    description: string;
    stats: Stats;
    quote: string;
    author: string;
    position: string;
  };
  footer: {
    title: string;
    subtitle: string;
    address: string;
    chat: {
      header: string;
      welcomeMessage: string;
      inputPlaceholder: string;
      quickReplies: string[]; 
      botTyping: string;
    };
    links: {
      privacy: string;
      terms: string;
    };
  };
  nav: {
    philosophy: string;
    levels: string;
    features: string;
    cta: string;
  };
  chaos: {
    scrollText: string;
    chaosText: string;
    orderText: string;
  };
}