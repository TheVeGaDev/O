// Utility functions for the application

export class DOMUtils {
    /**
     * Get element by selector with type safety
     */
    static getElement<T extends HTMLElement>(selector: string): T {
        const element = document.querySelector(selector) as T;
        if (!element) {
            throw new Error(`Element with selector '${selector}' not found`);
        }
        return element;
    }

    /**
     * Get multiple elements by selector
     */
    static getElements<T extends HTMLElement>(selector: string): NodeListOf<T> {
        return document.querySelectorAll(selector);
    }

    /**
     * Create element with optional class name
     */
    static createElement<T extends HTMLElement>(
        tag: string, 
        className?: string, 
        innerHTML?: string
    ): T {
        const element = document.createElement(tag) as T;
        if (className) {
            element.className = className;
        }
        if (innerHTML) {
            element.innerHTML = innerHTML;
        }
        return element;
    }

    /**
     * Add event listener with type safety
     */
    static addEventListener<T extends keyof HTMLElementEventMap>(
        element: HTMLElement | Document | Window,
        event: T,
        handler: (this: HTMLElement, ev: HTMLElementEventMap[T]) => void,
        options?: boolean | AddEventListenerOptions
    ): void {
        element.addEventListener(event, handler as EventListener, options);
    }

    /**
     * Remove event listener
     */
    static removeEventListener<T extends keyof HTMLElementEventMap>(
        element: HTMLElement | Document | Window,
        event: T,
        handler: (this: HTMLElement, ev: HTMLElementEventMap[T]) => void,
        options?: boolean | EventListenerOptions
    ): void {
        element.removeEventListener(event, handler as EventListener, options);
    }

    /**
     * Toggle class on element
     */
    static toggleClass(element: HTMLElement, className: string, force?: boolean): void {
        element.classList.toggle(className, force);
    }

    /**
     * Check if element is in viewport
     */
    static isInViewport(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Scroll to element smoothly
     */
    static scrollToElement(element: HTMLElement, offset: number = 0): void {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Debounce function for performance
     */
    static debounce<T extends (...args: any[]) => any>(
        func: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timeoutId: number;
        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Throttle function for performance
     */
    static throttle<T extends (...args: any[]) => any>(
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let inThrottle: boolean;
        return (...args: Parameters<T>) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

export class AnimationUtils {
    /**
     * Add animation class to element
     */
    static addAnimationClass(element: Element, className: string = 'is-visible'): void {
        element.classList.add(className);
    }

    /**
     * Remove animation class from element
     */
    static removeAnimationClass(element: Element, className: string = 'is-visible'): void {
        element.classList.remove(className);
    }

    /**
     * Setup intersection observer for scroll animations
     */
    static setupIntersectionObserver(
        elements: NodeListOf<Element>,
        options: IntersectionObserverInit,
        callback?: (entry: IntersectionObserverEntry) => void
    ): IntersectionObserver {
        const defaultCallback = (entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                this.addAnimationClass(entry.target);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (callback) {
                    callback(entry);
                } else {
                    defaultCallback(entry);
                }
            });
        }, options);

        elements.forEach(el => observer.observe(el));
        return observer;
    }

    /**
     * Animate counter from start to end value
     */
    static animateCounter(
        element: HTMLElement,
        start: number,
        end: number,
        duration: number = 2000
    ): void {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toString();
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    /**
     * Create typing effect
     */
    static typeWriter(
        element: HTMLElement,
        text: string,
        speed: number = 50
    ): void {
        let i = 0;
        element.innerHTML = '';

        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    }
}

export class StorageUtils {
    /**
     * Get item from localStorage
     */
    static get<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    }

    /**
     * Set item in localStorage
     */
    static set(key: string, value: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    /**
     * Remove item from localStorage
     */
    static remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }

    /**
     * Clear all items from localStorage
     */
    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
}

export class ValidationUtils {
    /**
     * Validate email format
     */
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number
     */
    static isValidPhone(phone: string): boolean {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Check if string is empty
     */
    static isEmpty(str: string): boolean {
        return str.trim().length === 0;
    }

    /**
     * Validate form data
     */
    static validateForm(data: Record<string, string>): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        for (const [key, value] of Object.entries(data)) {
            if (this.isEmpty(value)) {
                errors.push(`حقل ${key} مطلوب`);
            }

            if (key === 'email' && !this.isEmpty(value) && !this.isValidEmail(value)) {
                errors.push('البريد الإلكتروني غير صحيح');
            }

            if (key === 'phone' && !this.isEmpty(value) && !this.isValidPhone(value)) {
                errors.push('رقم الهاتف غير صحيح');
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

export class DateUtils {
    /**
     * Format date to Arabic string
     */
    static formatToArabic(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('ar-EG', options);
    }

    /**
     * Get relative time in Arabic
     */
    static getRelativeTime(date: Date): string {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'الآن';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `منذ ${minutes} دقيقة`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `منذ ${hours} ساعة`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `منذ ${days} يوم`;
        }
    }
}