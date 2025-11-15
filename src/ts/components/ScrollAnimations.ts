import { DOMUtils, AnimationUtils } from '../utils';
import { ANIMATION_CONFIG } from '../config';

export class ScrollAnimations {
    private observer: IntersectionObserver | null = null;
    private animatedElements: NodeListOf<Element>;

    constructor(
        private animateSelector: string = '.animate-on-scroll',
        private options: IntersectionObserverInit = ANIMATION_CONFIG.scroll
    ) {
        this.animatedElements = DOMUtils.getElements(this.animateSelector);
    }

    /**
     * Initialize scroll animations
     */
    init(): void {
        this.setupIntersectionObserver();
        this.setupStaggeredAnimations();
        this.setupCounterAnimations();
    }

    /**
     * Setup intersection observer for scroll animations
     */
    private setupIntersectionObserver(): void {
        this.observer = AnimationUtils.setupIntersectionObserver(
            this.animatedElements,
            this.options,
            this.handleIntersection.bind(this)
        );
    }

    /**
     * Handle intersection observer callback
     */
    private handleIntersection(entry: IntersectionObserverEntry): void {
        if (entry.isIntersecting) {
            AnimationUtils.addAnimationClass(entry.target);
            
            // Start counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                this.animateStatCounter(entry.target as HTMLElement);
            }
        }
    }

    /**
     * Setup staggered animations for grid items
     */
    private setupStaggeredAnimations(): void {
        const servicesGrid = document.querySelector('.services-grid');
        const projectsGrid = document.querySelector('.projects-grid');

        if (servicesGrid) {
            this.applyStaggeredDelay(servicesGrid, '.service-card');
        }

        if (projectsGrid) {
            this.applyStaggeredDelay(projectsGrid, '.project-card');
        }
    }

    /**
     * Apply staggered delay to grid items
     */
    private applyStaggeredDelay(container: Element, itemSelector: string): void {
        const items = container.querySelectorAll(itemSelector);
        items.forEach((item, index) => {
            (item as HTMLElement).style.transitionDelay = `${(index + 1) * 0.1}s`;
        });
    }

    /**
     * Setup counter animations for statistics
     */
    private setupCounterAnimations(): void {
        const statNumbers = DOMUtils.getElements('.stat-number[data-count]');
        
        // Observe stat numbers for counter animation
        if (this.observer) {
            statNumbers.forEach(stat => this.observer!.observe(stat));
        }
    }

    /**
     * Animate statistic counter
     */
    private animateStatCounter(element: HTMLElement): void {
        const target = parseInt(element.getAttribute('data-count') || '0');
        const current = parseInt(element.textContent || '0');
        
        if (current < target) {
            AnimationUtils.animateCounter(element, current, target, 2000);
        }
    }

    /**
     * Add animation to element
     */
    addAnimation(element: Element, animationClass: string): void {
        element.classList.add(animationClass);
    }

    /**
     * Remove animation from element
     */
    removeAnimation(element: Element, animationClass: string): void {
        element.classList.remove(animationClass);
    }

    /**
     * Reset all animations
     */
    resetAnimations(): void {
        this.animatedElements.forEach(element => {
            AnimationUtils.removeAnimationClass(element);
        });
    }

    /**
     * Destroy animations and clean up
     */
    destroy(): void {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}
