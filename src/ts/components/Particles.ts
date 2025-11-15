import { DOMUtils } from '../utils';
import { Particle } from '../types';
import { ANIMATION_CONFIG } from '../config';

export class ParticlesAnimation {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationId: number | null = null;
    private isAnimating: boolean = false;

    constructor(
        private containerSelector: string = '#particles',
        private particleCount: number = ANIMATION_CONFIG.particles.count
    ) {
        this.canvas = DOMUtils.getElement<HTMLCanvasElement>(this.containerSelector);
        this.ctx = this.canvas.getContext('2d')!;
    }

    /**
     * Initialize particles animation
     */
    init(): void {
        this.setupCanvas();
        this.createParticles();
        this.startAnimation();
        this.setupResizeHandler();
    }

    /**
     * Setup canvas dimensions and style
     */
    private setupCanvas(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.canvas.style.display = 'block';
    }

    /**
     * Create particles
     */
    private createParticles(): void {
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * ANIMATION_CONFIG.particles.speed,
                speedY: (Math.random() - 0.5) * ANIMATION_CONFIG.particles.speed,
                color: ANIMATION_CONFIG.particles.colors[
                    Math.floor(Math.random() * ANIMATION_CONFIG.particles.colors.length)
                ]
            });
        }
    }

    /**
     * Start animation loop
     */
    private startAnimation(): void {
        this.isAnimating = true;
        this.animate();
    }

    /**
     * Animation loop
     */
    private animate(): void {
        if (!this.isAnimating) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawParticles();
        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    /**
     * Update particles position
     */
    private updateParticles(): void {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off walls
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.speedY *= -1;
            }

            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    /**
     * Draw particles on canvas
     */
    private drawParticles(): void {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = 0.7;
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    /**
     * Draw connections between nearby particles
     */
    private drawConnections(): void {
        const maxDistance = 100;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = ANIMATION_CONFIG.particles.colors[0];
                    this.ctx.globalAlpha = 0.3 * (1 - distance / maxDistance);
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        }
    }

    /**
     * Setup resize handler
     */
    private setupResizeHandler(): void {
        const handleResize = DOMUtils.debounce(() => {
            this.resizeCanvas();
        }, 250);

        DOMUtils.addEventListener(window, 'resize', handleResize);
    }

    /**
     * Resize canvas and recreate particles
     */
    private resizeCanvas(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.createParticles();
    }

    /**
     * Update particle count
     */
    setParticleCount(count: number): void {
        this.particleCount = count;
        this.createParticles();
    }

    /**
     * Stop animation
     */
    stop(): void {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * Restart animation
     */
    restart(): void {
        this.stop();
        this.startAnimation();
    }

    /**
     * Destroy particles animation
     */
    destroy(): void {
        this.stop();
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
