import { DOMUtils } from '../utils';

export class Loader {
    private loaderElement: HTMLElement;
    private progressElement: HTMLElement;
    private progress: number = 0;
    private totalSteps: number = 5;

    constructor(
        private loaderSelector: string = '#loadingScreen',
        private progressSelector: string = '.loading-progress'
    ) {
        this.loaderElement = DOMUtils.getElement(this.loaderSelector);
        this.progressElement = DOMUtils.getElement(this.progressSelector);
    }

    /**
     * Initialize the loader
     */
    init(): void {
        this.simulateLoading();
        
        // Fallback: hide loader after max time
        setTimeout(() => {
            this.hide();
        }, 5000);
    }

    /**
     * Simulate loading progress
     */
    private simulateLoading(): void {
        const interval = setInterval(() => {
            this.progress += Math.random() * 20;
            
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                setTimeout(() => this.hide(), 500);
            }
            
            this.updateProgress(this.progress);
        }, 200);
    }

    /**
     * Update progress bar
     */
    private updateProgress(progress: number): void {
        this.progressElement.style.width = `${progress}%`;
    }

    /**
     * Hide loader
     */
    hide(): void {
        this.loaderElement.classList.add('loaded');
        
        setTimeout(() => {
            this.loaderElement.style.display = 'none';
        }, 500);
    }

    /**
     * Show loader (for page transitions)
     */
    show(): void {
        this.loaderElement.style.display = 'flex';
        this.loaderElement.classList.remove('loaded');
        this.progress = 0;
        this.updateProgress(0);
    }

    /**
     * Set progress manually
     */
    setProgress(progress: number): void {
        this.progress = Math.min(100, Math.max(0, progress));
        this.updateProgress(this.progress);
    }
}
