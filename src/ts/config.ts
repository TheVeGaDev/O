import { 
    NavLink, 
    Service, 
    Project, 
    TeamMember, 
    ContactInfo, 
    AppConfig,
    Stats 
} from './types';

export const APP_CONFIG: AppConfig = {
    company: {
        name: 'شركة فيجا للبرمجيات',
        slogan: 'حلولك البرمجية المتكاملة بأيدي خبراء متخصصين',
        founded: 2015,
        description: 'نمتلك خبرة واسعة في تطوير بوتات تيليجرام، وحماية الخوادم، وتقديم حلول برمجية مخصصة بأعلى معايير الجودة والأمان.'
    },
    social: {
        telegram: 'https://t.me/TopVeGa',
        github: 'https://github.com/vega-software',
        youtube: 'https://youtube.com/c/vega-code'
    }
};

export const NAV_LINKS: NavLink[] = [
    { text: 'الرئيسية', href: '#home', icon: 'fas fa-home' },
    { text: 'خدماتنا', href: '#services', icon: 'fas fa-cogs' },
    { text: 'أعمالنا', href: '#projects', icon: 'fas fa-project-diagram' },
    { text: 'من نحن', href: '#about', icon: 'fas fa-users' },
    { text: 'اتصل بنا', href: '#contact', icon: 'fas fa-envelope' }
];

export const SERVICES: Service[] = [
    {
        id: 'telegram-bots',
        icon: 'fas fa-robot',
        title: 'تطوير بوتات تيليجرام',
        description: 'تصميم بوتات إدارة، حماية، موسيقى، نشر، ومزادات احترافية بمميزات فريدة.',
        features: ['بوتات إدارة متقدمة', 'بوتات حماية قوية', 'بوتات موسيقى', 'بوتات نشر محتوى', 'بوتات مزادات']
    },
    {
        id: 'custom-solutions',
        icon: 'fas fa-code',
        title: 'حلول برمجية مخصصة',
        description: 'برمجة أكواد مخصصة بجميع اللغات، تعديل الملفات، وحل جميع الأخطاء البرمجية.',
        features: ['برمجة مخصصة', 'تعديل الأكواد', 'حل الأخطاء', 'دعم فني', 'تطوير ويب']
    },
    {
        id: 'hosting',
        icon: 'fas fa-server',
        title: 'الاستضافة والخوادم',
        description: 'نوفر خوادم مضمونة وسريعة بسعات مختلفة وأسعار تنافسية مع حماية قوية.',
        features: ['خوادم سريعة', 'حماية متقدمة', 'أسعار تنافسية', 'دعم فني', 'نسخ احتياطي']
    },
    {
        id: 'security',
        icon: 'fas fa-shield-alt',
        title: 'ملفات حماية',
        description: 'توفير مصانع وملفات حماية قوية (Lua & PHP) لتأمين بياناتك ومشاريعك.',
        features: ['حماية Lua', 'حماية PHP', 'مصانع حماية', 'تحديثات مستمرة', 'دعم فني']
    },
    {
        id: 'tools',
        icon: 'fas fa-users-cog',
        title: 'أدوات الأعضاء',
        description: 'ملفات نقل أعضاء (ظاهر ومخفي)، سكربتات شد، وأدوات لزيادة تفاعل المجموعات.',
        features: ['نقل أعضاء', 'سكربتات شد', 'أدوات تفاعل', 'إحصائيات', 'تقارير']
    },
    {
        id: 'panels',
        icon: 'fas fa-tachometer-alt',
        title: 'لوحات التحكم (البنلات)',
        description: 'بيع وتركيب لوحات تحكم احترافية للمواقع والمنصات المختلفة.',
        features: ['لوحات تحكم', 'إدارة متقدمة', 'واجهة مستخدم', 'تقارير مفصلة', 'دعم فني']
    }
];

export const PROJECTS: Project[] = [
    {
        id: 'project-1',
        title: 'بوت إدارة متكامل',
        description: 'بوت إدارة متقدم لمجموعات تيليجرام بميزات فريدة وحماية قوية.',
        image: 'project-1.jpg',
        technologies: ['Python', 'Telegram API', 'MongoDB'],
        link: '#'
    },
    {
        id: 'project-2',
        title: 'نظام حماية Lua',
        description: 'نظام حماية متكامل للخوادم بلغة Lua مع تحديثات مستمرة.',
        image: 'project-2.jpg',
        technologies: ['Lua', 'Linux', 'Security'],
        link: '#'
    },
    {
        id: 'project-3',
        title: 'لوحة تحكم ويب',
        description: 'لوحة تحكم ويب متكاملة لإدارة البوتات والخدمات.',
        image: 'project-3.jpg',
        technologies: ['React', 'Node.js', 'MySQL'],
        link: '#'
    }
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: '@TopVeGa',
        role: 'مطور بايثون متخصص',
        telegram: 'https://t.me/TopVeGa',
        avatar: 'fas fa-code'
    },
    {
        name: '@DevVEGA',
        role: 'خبير أنظمة وحماية',
        telegram: 'https://t.me/DevVEGA',
        avatar: 'fas fa-server'
    }
];

export const CONTACT_INFO: ContactInfo[] = [
    {
        platform: 'Telegram',
        url: 'https://t.me/TopVeGa',
        username: '@TopVeGa',
        icon: 'fab fa-telegram-plane'
    },
    {
        platform: 'Telegram',
        url: 'https://t.me/DevVEGA',
        username: '@DevVEGA',
        icon: 'fab fa-telegram-plane'
    }
];

export const APP_STATS: Stats = {
    projects: 500,
    experience: 9,
    clients: 50,
    languages: 15
};

export const ANIMATION_CONFIG = {
    scroll: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    particles: {
        count: 30,
        colors: ['#00a8ff', '#8c7ae6', '#e84118'],
        speed: 2
    }
};
