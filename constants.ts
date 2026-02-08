import { Content } from './types';

const COMMON_SETTINGS = {
  logoText: "ANACONDA",
  phone: "+7 (999) 000-00-00",
  email: "hello@anaconda.io",
};

// New Source List - Mapped to Lucide Icon Names
const COMMON_PAIN_POINTS = [
  { id: 1, name: "Phone", icon: "Phone" },
  { id: 2, name: "Telegram", icon: "Send" },
  { id: 3, name: "WhatsApp", icon: "MessageCircle" },
  { id: 4, name: "Viber", icon: "MessageSquare" },
  { id: 5, name: "Messenger Max", icon: "Bot" },
  { id: 6, name: "Bitrix24", icon: "Briefcase" },
  { id: 7, name: "1C", icon: "FileSpreadsheet" },
  { id: 8, name: "Databases", icon: "Database" },
  { id: 9, name: "Excel", icon: "Table" },
  { id: 10, name: "Access", icon: "DatabaseZap" },
  { id: 11, name: "Tools", icon: "Wrench" },
  { id: 12, name: "DB Access", icon: "HardDrive" },
  { id: 13, name: "MS SQL", icon: "Server" },
  { id: 14, name: "PostgreSQL", icon: "Cylinder" },
  { id: 15, name: "Phone Calls", icon: "PhoneCall" },
  { id: 16, name: "Manager Phones", icon: "Smartphone" },
];

const COMMON_FEATURE_CONFIG = [
  { id: 1, gridArea: "col-span-12 md:col-span-8" },
  { id: 2, gridArea: "col-span-12 md:col-span-4" },
  { id: 3, gridArea: "col-span-12 md:col-span-4" },
  { id: 4, gridArea: "col-span-12 md:col-span-8" },
];

export const CONTENT_RU: Content = {
  settings: {
    ...COMMON_SETTINGS,
    copyright: "© 2026 Anaconda SaaS. Интеллектуальная интеграция."
  },
  hero: {
    badge: "",
    title: "Единый слой управления бизнесом",
    subtitle: "Мы не разрушаем то, что работает. Мы создаем интеллектуальный слой поверх вашей текущей инфраструктуры, превращая разрозненные процессы в управляемый поток данных.",
    ctaText: "Заказать аудит",
    demoText: "Наш подход",
    scrollHint: "Скролльте вниз",
    noCard: "",
    trial: "",
    imageUrl: "" 
  },
  philosophy: {
    title: "Принцип бережной интеграции",
    subtitle: "Наш подход строится на сохранении существующего IT-ландшафта. Мы аккуратно интегрируемся в текущие процессы, создавая единую точку входа для управления.",
    items: [
      {
        id: "1",
        title: "Надстройка, а не замена",
        principle: "Integration Layer",
        description: "Мы не требуем отказа от привычного софта. Платформа накладывается поверх 1С, ERP и баз данных, консолидируя работу в удобном интерфейсе.",
        icon: "Activity"
      },
      {
        id: "2",
        title: "Ориентир на пользователя",
        principle: "User-Centric",
        description: "Интерфейс системы спроектирован для людей. Сложные процессы бэкенда превращаются в понятные диалоги и задачи для сотрудника.",
        icon: "UserCircle"
      },
      {
        id: "3",
        title: "Интеллект системы",
        principle: "Intelligent Core",
        description: "Это не просто агрегатор, а инструмент с собственной логикой. Система анализирует данные и помогает принимать решения на основе накопленного опыта.",
        icon: "BrainCircuit"
      }
    ]
  },
  painPoints: COMMON_PAIN_POINTS,
  features: {
    title: "Функциональный стек",
    subtitle: "Инструменты, которые вы получаете на каждом уровне.",
    items: [
      { 
        ...COMMON_FEATURE_CONFIG[0], 
        title: "Единое окно событий", 
        description: "Слияние Telegram, Email и телефонии в одну ленту.", 
        longDescription: "Вам больше не нужно прыгать между вкладками. Ответить клиенту в Telegram, проверить остатки в 1С и поставить задачу сотруднику можно в одном окне, не теряя ни секунды." 
      },
      { 
        ...COMMON_FEATURE_CONFIG[1], 
        title: "Векторная память", 
        description: "Система помнит все решения и контекст.", 
        longDescription: "Даже если менеджер уволится, история не исчезнет. ИИ помнит каждое обещание клиенту и контекст всех переговоров, помогая новичкам отвечать так же качественно, как профи." 
      },
      { 
        ...COMMON_FEATURE_CONFIG[2], 
        title: "Сквозная аналитика", 
        description: "От первого клика до отгрузки.", 
        longDescription: "Вы видите реальную прибыль здесь и сейчас, а не в отчетах в конце месяца. Система показывает, сколько денег принес каждый звонок и каждое сообщение." 
      },
      { 
        ...COMMON_FEATURE_CONFIG[3], 
        title: "Безопасный контур", 
        description: "Развертывание на ваших серверах.", 
        longDescription: "Ваши данные — это ваш капитал. Мы устанавливаем систему внутри вашей компании, чтобы никакая информация не утекла в облако к третьим лицам. Полное соответствие 152-ФЗ." 
      },
    ]
  },
  levels: {
    title: "Уровни внедрения",
    subtitle: "Мы внедряем систему поэтапно. Вы платите только за тот уровень порядка, который вам нужен сейчас.",
    items: [
      { 
        id: 1, 
        level: 1, 
        title: "Аудит инфраструктуры", 
        subtitle: "Проектирование",
        description: "Проводим полный аудит IT-инфраструктуры и процессов компании. Готовим проект внедрения системы Anaconda под ваши задачи.", 
        features: ["Анализ инфраструктуры", "Проект внедрения", "Карта процессов", "Стоимость: Бесплатно"], 
        costIndicator: "Бесплатно", 
        icon: "Search",
        buttonText: "Заказать аудит", 
        isFree: true
      },
      { 
        id: 2, 
        level: 2, 
        title: "Единое окно", 
        subtitle: "Фундамент порядка",
        description: "Агрегация всех мессенджеров и звонков в единый хаб. Базовая CRM: карточки клиентов, лента событий, распределение заявок на отдел продаж и аналитика.", 
        features: ["Мессенджер-хаб", "Базовая CRM", "Распределение заявок"],
        costIndicator: "₽₽",
        icon: "AppWindow",
        buttonText: "Рассчитать стоимость"
      },
      { 
        id: 3, 
        level: 3, 
        title: "Цифровой контроль", 
        subtitle: "Интеллектуальная CRM",
        description: "Интеграция с существующей ERP. Дашборды для руководства и отдела продаж. Сквозная аналитика для маркетинга и контроль финансовых потоков.", 
        features: ["Интеграция ERP", "Дашборды продаж", "Маркетинг-аналитика"],
        costIndicator: "₽₽₽",
        icon: "Sliders",
        buttonText: "Рассчитать стоимость"
      },
      { 
        id: 4, 
        level: 4, 
        title: "AI симбионт", 
        subtitle: "Эксперт и Аналитик",
        description: "Внутренний AI-консультант и эксперт. Архив всех взаимодействий компании. Работает как аналитик, а также как чат-бот для продаж и поддержки.", 
        features: ["Внутренний эксперт", "AI-аналитик", "Чат-боты поддержки"],
        costIndicator: "₽₽₽₽",
        icon: "Brain",
        buttonText: "Рассчитать стоимость"
      },
    ]
  },
  testimonials: {
    title: "Отзывы клиентов",
    subtitle: "Мнения лидеров рынка и философия системы Anaconda.",
    items: [
      {
        id: 1,
        type: 'review',
        text: "Мы перестали терять лиды в WhatsApp. Система сама подхватывает диалог, если менеджер спит. Это магия, которая приносит деньги.",
        author: "Алексей С.",
        position: "Собственник логистической компании"
      },
      {
        id: 2,
        type: 'philosophy',
        text: "Масштабирование хаоса приводит к катастрофе. Масштабирование порядка приводит к богатству.",
        author: "Философия Anaconda",
        position: "Принцип №1"
      },
      {
        id: 3,
        type: 'review',
        text: "Внедрение заняло 2 недели. Мы не останавливали работу ни на час. Данные из 1С теперь вижу в Telegram в реальном времени.",
        author: "Дмитрий К.",
        position: "Технический директор (Ритейл)"
      },
      {
        id: 4,
        type: 'philosophy',
        text: "Бизнес — это живой организм. Мы не ставим протезы, мы улучшаем кровоток информации.",
        author: "Философия Anaconda",
        position: "Принцип №2"
      },
      {
        id: 5,
        type: 'review',
        text: "AI-симбионт теперь отвечает на вопросы новичков быстрее, чем старший менеджер. База знаний стала активной сущностью.",
        author: "Елена В.",
        position: "HR-Директор IT-холдинга"
      },
      {
        id: 6,
        type: 'review',
        text: "Наконец-то маркетинг и продажи видят одни цифры. Сквозная аналитика показала, где мы сливали 30% бюджета.",
        author: "Сергей М.",
        position: "CMO E-commerce проекта"
      },
      {
        id: 7,
        type: 'philosophy',
        text: "Если действия нет в цифровом следе — его нет в бизнесе.",
        author: "Философия Anaconda",
        position: "Принцип №3"
      },
      {
        id: 8,
        type: 'review',
        text: "Безопасность была ключевым фактором. То, что нейросеть работает внутри нашего контура и соответствует 152-ФЗ — решающий аргумент.",
        author: "Виктор П.",
        position: "Генеральный директор (Финтех)"
      },
      {
        id: 9,
        type: 'review',
        text: "Автоматическая генерация счетов сократила цикл сделки на 2 дня. Менеджеры больше не занимаются бюрократией.",
        author: "Анна С.",
        position: "Руководитель отдела продаж"
      },
      {
        id: 10,
        type: 'philosophy',
        text: "Хаос — это не враг. Это неструктурированная энергия. Мы просто придаем ей вектор.",
        author: "Философия Anaconda",
        position: "Принцип №4"
      }
    ]
  },
  about: {
    title: "О нас",
    description: "",
    stats: { deployments: "", deploymentsLabel: "", failures: "", failuresLabel: "", uptime: "", uptimeLabel: "" },
    quote: "",
    author: "",
    position: ""
  },
  footer: {
    title: "Начните трансформацию.",
    subtitle: "Выберите уровень внедрения или закажите бесплатный аудит прямо в чате.",
    address: "Москва, Башня Федерация, 42 этаж",
    chat: {
      header: "Центр управления",
      welcomeMessage: "Система онлайн. Я готов рассчитать стоимость внедрения. Какой уровень вас интересует?",
      inputPlaceholder: "Напишите сообщение...",
      botTyping: "Anaconda печатает...",
      quickReplies: [
        "Заказать аудит (Бесплатно)",
        "Цена: Единое окно",
        "Цена: Цифровой контроль",
        "Цена: AI симбионт"
      ]
    },
    links: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования"
    }
  },
  nav: {
    philosophy: "Философия",
    levels: "Уровни",
    features: "Функции",
    cta: "Заказать аудит"
  },
  chaos: {
    scrollText: "Скролльте для синхронизации",
    chaosText: "ХАОС",
    orderText: "ПОРЯДОК"
  }
};

export const CONTENT_EN: Content = {
  // Keeping EN mostly same structure as RU but translated contextually
  settings: {
    ...COMMON_SETTINGS,
    copyright: "© 2026 Anaconda SaaS. Intelligent Integration."
  },
  hero: {
    badge: "",
    title: "Unified Business Control Layer",
    subtitle: "We don't destroy what works. We create an intelligent layer on top of your current infrastructure, transforming scattered processes into a managed data stream.",
    ctaText: "Order Audit",
    demoText: "Our Approach",
    scrollHint: "Scroll down",
    noCard: "",
    trial: "",
    imageUrl: "" 
  },
  philosophy: {
    title: "Thoughtful Integration Principle",
    subtitle: "Our approach is based on preserving your existing IT landscape. We carefully integrate into current processes, creating a single entry point for management.",
    items: [
      {
        id: "1",
        title: "Layer, not replacement",
        principle: "Integration Layer",
        description: "We don't demand abandoning familiar software. The platform layers on top of 1C, ERP, and databases, consolidating work in a convenient interface.",
        icon: "Activity"
      },
      {
        id: "2",
        title: "User Centric",
        principle: "User-Centric",
        description: "The system interface is designed for people. Complex backend processes turn into understandable dialogues and tasks for the employee.",
        icon: "UserCircle"
      },
      {
        id: "3",
        title: "System Intelligence",
        principle: "Intelligent Core",
        description: "This is not just an aggregator, but a tool with its own logic. The system analyzes data and helps make decisions based on accumulated experience.",
        icon: "BrainCircuit"
      }
    ]
  },
  painPoints: COMMON_PAIN_POINTS,
  features: {
    title: "Functional stack",
    subtitle: "Tools you get at each level.",
    items: [
      { 
        ...COMMON_FEATURE_CONFIG[0], 
        title: "Single event window", 
        description: "Merger of Telegram, Email, and telephony into one feed.", 
        longDescription: "No more tab jumping. Reply to a client in Telegram, check 1C stock, and assign a task—all in one window." 
      },
      { 
        ...COMMON_FEATURE_CONFIG[1], 
        title: "Vector memory", 
        description: "System remembers all decisions and context.", 
        longDescription: "Even if a manager leaves, the history stays. AI remembers every promise and context, helping new hires perform like pros." 
      },
      { 
        ...COMMON_FEATURE_CONFIG[2], 
        title: "End-to-end analytics", 
        description: "From first click to shipment.", 
        longDescription: "See real profits now, not next month. The system shows exactly how much money each call and message generated." 
      },
      { 
        ...COMMON_FEATURE_CONFIG[3], 
        title: "Secure perimeter", 
        description: "Deployment on your servers.", 
        longDescription: "Your data is your capital. We install the system inside your company so no info leaks to the cloud." 
      },
    ]
  },
  levels: {
    title: "Integration levels",
    subtitle: "We implement the system in stages. You only pay for the level of order you need right now.",
    items: [
      { 
        id: 1, 
        level: 1, 
        title: "Infrastructure Audit", 
        subtitle: "Project Design",
        description: "We conduct a full audit of IT infrastructure and company processes. We prepare a project for implementing the Anaconda system for your tasks.", 
        features: ["Infrastructure Analysis", "Implementation Project", "Process Map", "Cost: Free"],
        costIndicator: "Free",
        icon: "Search",
        buttonText: "Order audit",
        isFree: true
      },
      { 
        id: 2, 
        level: 2, 
        title: "Single Window", 
        subtitle: "Foundation of Order",
        description: "Aggregation of all messengers and calls into a single hub. Basic CRM: client cards, event feed, request distribution to sales, and analytics.", 
        features: ["Messenger Hub", "Basic CRM", "Request Distribution"],
        costIndicator: "$$",
        icon: "AppWindow",
        buttonText: "Calculate cost"
      },
      { 
        id: 3, 
        level: 3, 
        title: "Digital Control", 
        subtitle: "Intelligent CRM",
        description: "Integration with existing ERP. Dashboards for management and sales. End-to-end analytics for marketing and financial flow control.", 
        features: ["ERP Integration", "Sales Dashboards", "Marketing Analytics"],
        costIndicator: "$$$",
        icon: "Sliders",
        buttonText: "Calculate cost"
      },
      { 
        id: 4, 
        level: 4, 
        title: "AI Symbiont", 
        subtitle: "Expert & Analyst",
        description: "Internal AI consultant and expert. Archive of all company interactions. Acts as an analyst, as well as a chatbot for sales and support.", 
        features: ["Internal Expert", "AI Analyst", "Support Chatbots"],
        costIndicator: "$$$$",
        icon: "Brain",
        buttonText: "Calculate cost"
      },
    ]
  },
  testimonials: {
    title: "Client Reviews",
    subtitle: "Opinions of market leaders and Anaconda philosophy.",
    items: [
       { id: 1, type: 'review', text: "We stopped losing leads in WhatsApp. It's magic.", author: "Alex S.", position: "Owner" },
       { id: 2, type: 'philosophy', text: "Scaling chaos leads to catastrophe.", author: "Philosophy", position: "#1" }
    ]
  },
  about: {
    title: "About",
    description: "",
    stats: { deployments: "", deploymentsLabel: "", failures: "", failuresLabel: "", uptime: "", uptimeLabel: "" },
    quote: "",
    author: "",
    position: ""
  },
  footer: {
    title: "Начните трансформацию.",
    subtitle: "Выберите уровень внедрения или закажите бесплатный аудит прямо в чате.",
    address: "Москва, Башня Федерация, 42 этаж",
    chat: {
      header: "Центр управления",
      welcomeMessage: "Система онлайн. Я готов рассчитать стоимость внедрения. Какой уровень вас интересует?",
      inputPlaceholder: "Напишите сообщение...",
      botTyping: "Anaconda печатает...",
      quickReplies: [
        "Заказать аудит (Бесплатно)",
        "Цена: Единое окно",
        "Цена: Цифровой контроль",
        "Цена: AI симбионт"
      ]
    },
    links: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования"
    }
  },
  nav: {
    philosophy: "Философия",
    levels: "Уровни",
    features: "Функции",
    cta: "Заказать аудит"
  },
  chaos: {
    scrollText: "Scroll to synchronize",
    chaosText: "CHAOS",
    orderText: "ORDER"
  }
};