// Main application entry point
import { Loader } from './components/Loader';
import { Navigation } from './components/Navigation';
import { ScrollAnimations } from './components/ScrollAnimations';
import { ParticlesAnimation } from './components/Particles';
import { NotificationSystem } from './components/Notification';
import { ContactService } from './services/ContactService';
import { DOMUtils } from './utils';

class VegaApp {
    private loader: Loader;
    private navigation: Navigation;
    private scrollAnimations: ScrollAnimations;
    private particles: ParticlesAnimation;
    private notification: NotificationSystem;
    private contactService: ContactService;

    constructor() {
        this.loader = new Loader();
        this.navigation = new Navigation();
        this.scrollAnimations = new ScrollAnimations();
        this.particles = new ParticlesAnimation();
        this.notification = new NotificationSystem();
        this.contactService = new ContactService();
    }

    /**
     * Initialize the application
     */
    async init(): Promise<void> {
        try {
            // Show loading screen
            this.loader.init();

            // Initialize core components
            this.navigation.init();
            this.scrollAnimations.init();
            this.particles.init();
            this.contactService.init();

            // Setup additional event listeners
            this.setupEventListeners();
            this.setupBackToTop();
            this.setupHeroAnimations();

            // Load dynamic content
            await this.loadDynamicContent();

            console.log('🚀 VEGA App initialized successfully');

        } catch (error) {
            console.error('❌ Error initializing VEGA App:', error);
            this.notification.error('خطأ', 'حدث خطأ أثناء تحميل التطبيق');
        }
    }

    /**
     * Setup global event listeners
     */
    private setupEventListeners(): void {
        // Start project button
        const startProjectBtn = document.getElementById('startProject');
        if (startProjectBtn) {
            DOMUtils.addEventListener(startProjectBtn, 'click', () => {
                this.navigation.navigateToSection('contact');
                this.notification.info('بدأ مشروعك', 'اختر الخدمة المناسبة واملأ النموذج');
            });
        }

        // View portfolio button
        const viewPortfolioBtn = document.getElementById('viewPortfolio');
        if (viewPortfolioBtn) {
            DOMUtils.addEventListener(viewPortfolioBtn, 'click', () => {
                this.navigation.navigateToSection('projects');
            });
        }

        // Keyboard shortcuts
        DOMUtils.addEventListener(document, 'keydown', (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.navigation.navigateToSection('contact');
            }
        });

        // Prevent smooth scroll on focus to improve accessibility
        DOMUtils.addEventListener(document, 'focus', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                document.documentElement.style.scrollBehavior = 'auto';
                setTimeout(() => {
                    document.documentElement.style.scrollBehavior = 'smooth';
                }, 1000);
            }
        }, true);
    }

    /**
     * Setup back to top button
     */
    private setupBackToTop(): void {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        DOMUtils.addEventListener(window, 'scroll', 
            DOMUtils.throttle(toggleVisibility, 100)
        );

        DOMUtils.addEventListener(backToTopBtn, 'click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial check
        toggleVisibility();
    }

    /**
     * Setup hero section animations
     */
    private setupHeroAnimations(): void {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');

        if (heroTitle) {
            heroTitle.classList.add('fade-in');
        }

        if (heroDescription) {
            setTimeout(() => {
                heroDescription.classList.add('fade-in');
            }, 500);
        }
    }

    /**
     * Load dynamic content (services, projects, etc.)
     */
    private async loadDynamicContent(): Promise<void> {
        await this.loadServices();
        await this.loadProjects();
        await this.loadStats();
    }

    /**
     * Load services dynamically
     */
    private async loadServices(): Promise<void> {
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;

        try {
            const { SERVICES } = await import('./config');
            
            SERVICES.forEach(service => {
                const serviceCard = this.createServiceCard(service);
                servicesGrid.appendChild(serviceCard);
            });

            // Re-initialize scroll animations for new elements
            this.scrollAnimations.init();

        } catch (error) {
            console.error('Error loading services:', error);
        }
    }

    /**
     * Create service card element
     */
    private createServiceCard(service: any): HTMLElement {
        const card = DOMUtils.createElement('div', 'service-card animate-on-scroll');
        
        card.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-features">
                ${service.features.map((feature: string) => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
        `;

        return card;
    }

    /**
     * Load projects dynamically
     */
    private async loadProjects(): Promise<void> {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        try {
            const { PROJECTS } = await import('./config');
            
            PROJECTS.forEach(project => {
                const projectCard = this.createProjectCard(project);
                projectsGrid.appendChild(projectCard);
            });

        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    /**
     * Create project card element
     */
    private createProjectCard(project: any): HTMLElement {
        const card = DOMUtils.createElement('div', 'project-card animate-on-scroll');
        
        card.innerHTML = `
            <div class="project-image">
                <i class="fas fa-code"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map((tech: string) => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                ${project.link ? `<a href="${project.link}" class="project-link">عرض المشروع</a>` : ''}
            </div>
        `;

        return card;
    }

    /**
     * Load and animate statistics
     */
    private async loadStats(): Promise<void> {
        try {
            const { APP_STATS } = await import('./config');
            
            // Animate hero stats
            const heroStats = document.querySelectorAll('.hero-stats .stat-number');
            heroStats.forEach((stat, index) => {
                const values = [APP_STATS.projects, APP_STATS.experience, APP_STATS.clients];
                if (index < values.length) {
                    setTimeout(() => {
                        this.animateCounter(stat as HTMLElement, values[index]);
                    }, index * 500);
                }
            });

            // Animate about stats
            const aboutStats = document.querySelectorAll('.about-stats .stat-number');
            aboutStats.forEach((stat, index) => {
                const values = [APP_STATS.languages, 200, 100]; // Example values
                if (index < values.length) {
                    setTimeout(() => {
                        this.animateCounter(stat as HTMLElement, values[index]);
                    }, index * 500);
                }
            });

        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    /**
     * Animate counter
     */
    private animateCounter(element: HTMLElement, target: number): void {
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            element.textContent = current.toString();
            
            if (current >= target) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    /**
     * Get app version and info
     */
    getAppInfo(): { version: string; components: string[] } {
        return {
            version: '1.0.0',
            components: [
                'Loader',
                'Navigation',
                'ScrollAnimations',
                'Particles',
                'NotificationSystem',
                'ContactService'
            ]
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new VegaApp();
    app.init();
});

// Export for potential use in other modules
export { VegaApp };