import { DOMUtils } from '../utils';
import { NavLink } from '../types';

export class Navigation {
    private navElement: HTMLElement;
    private navToggle: HTMLElement;
    private navMenu: HTMLElement;
    private themeToggle: HTMLElement;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private currentSection: string = 'home';

    constructor(
        private navSelector: string = '.floating-nav',
        private toggleSelector: string = '#navToggle',
        private menuSelector: string = '#navMenu',
        private themeSelector: string = '#themeToggle'
    ) {
        this.navElement = DOMUtils.getElement(this.navSelector);
        this.navToggle = DOMUtils.getElement(this.toggleSelector);
        this.navMenu = DOMUtils.getElement(this.menuSelector);
        this.themeToggle = DOMUtils.getElement(this.themeSelector);
        this.navLinks = DOMUtils.getElements('.nav-link');
    }

    /**
     * Initialize navigation
     */
    init(): void {
        this.setupEventListeners();
        this.setupScrollEffect();
        this.setupThemeToggle();
        this.setupActiveLinks();
    }

    /**
     * Setup event listeners
     */
    private setupEventListeners(): void {
        // Mobile menu toggle
        DOMUtils.addEventListener(this.navToggle, 'click', () => {
            this.toggleMobileMenu();
        });

        // Nav link clicks
        this.navLinks.forEach(link => {
            DOMUtils.addEventListener(link, 'click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href')?.substring(1);
                if (target) {
                    this.navigateToSection(target);
                }
            });
        });

        // Close mobile menu when clicking outside
        DOMUtils.addEventListener(document, 'click', (e) => {
            if (!this.navElement.contains(e.target as Node) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Setup scroll effect for navigation
     */
    private setupScrollEffect(): void {
        const handleScroll = DOMUtils.throttle(() => {
            // Add scrolled class when scrolling
            if (window.scrollY > 100) {
                this.navElement.classList.add('scrolled');
            } else {
                this.navElement.classList.remove('scrolled');
            }

            // Update active section
            this.updateActiveSection();
        }, 100);

        DOMUtils.addEventListener(window, 'scroll', handleScroll);
    }

    /**
     * Setup theme toggle functionality
     */
    private setupThemeToggle(): void {
        DOMUtils.addEventListener(this.themeToggle, 'click', () => {
            this.toggleTheme();
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme as 'dark' | 'light');
    }

    /**
     * Setup active link tracking
     */
    private setupActiveLinks(): void {
        // Initial active link setup
        this.updateActiveLinks();
    }

    /**
     * Toggle mobile menu
     */
    private toggleMobileMenu(): void {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');

        // Animate hamburger icon
        const spans = this.navToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    /**
     * Close mobile menu
     */
    private closeMobileMenu(): void {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');

        const spans = this.navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    /**
     * Navigate to section
     */
    private navigateToSection(sectionId: string): void {
        const section = document.getElementById(sectionId);
        if (section) {
            DOMUtils.scrollToElement(section, 100);
            this.currentSection = sectionId;
            this.updateActiveLinks();
            this.closeMobileMenu();
        }
    }

    /**
     * Update active section based on scroll position
     */
    private updateActiveSection(): void {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id') || '';
            }
        });

        if (current && current !== this.currentSection) {
            this.currentSection = current;
            this.updateActiveLinks();
        }
    }

    /**
     * Update active navigation links
     */
    private updateActiveLinks(): void {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href')?.substring(1);
            if (href === this.currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Toggle between dark and light themes
     */
    private toggleTheme(): void {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    /**
     * Set theme
     */
    private setTheme(theme: 'dark' | 'light'): void {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update theme toggle icon
        const icon = this.themeToggle.querySelector('i') as HTMLElement;
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    /**
     * Get current theme
     */
    getCurrentTheme(): string {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    /**
     * Update navigation visibility (for special cases)
     */
    setVisibility(visible: boolean): void {
        this.navElement.style.display = visible ? 'block' : 'none';
    }
}
