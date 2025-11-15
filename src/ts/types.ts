// Main types for the application

export interface NavLink {
    text: string;
    href: string;
    icon: string;
    isActive?: boolean;
}

export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    telegram: string;
    avatar: string;
}

export interface ContactInfo {
    platform: string;
    url: string;
    username: string;
    icon: string;
}

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
}

export interface ThemeConfig {
    name: 'dark' | 'light';
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        heading: string;
    };
}

export interface AppConfig {
    company: {
        name: string;
        slogan: string;
        founded: number;
        description: string;
    };
    social: {
        telegram: string;
        github: string;
        youtube: string;
    };
}

export interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
}

export interface FormData {
    name: string;
    email: string;
    service: string;
    message: string;
}

export interface Stats {
    projects: number;
    experience: number;
    clients: number;
    languages: number;
}
