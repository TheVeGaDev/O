import { DOMUtils } from '../utils';
import { Notification } from '../types';

export class NotificationSystem {
    private container: HTMLElement;
    private notifications: Set<string> = new Set();

    constructor(private containerSelector: string = '#notificationContainer') {
        this.container = DOMUtils.getElement(this.containerSelector);
    }

    /**
     * Show notification
     */
    show(notification: Notification): void {
        const notificationId = `notification-${Date.now()}`;
        this.notifications.add(notificationId);

        const notificationElement = this.createNotificationElement(notification, notificationId);
        this.container.appendChild(notificationElement);

        // Animate in
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);

        // Auto remove after duration
        const duration = notification.duration || 5000;
        setTimeout(() => {
            this.remove(notificationId);
        }, duration);
    }

    /**
     * Create notification element
     */
    private createNotificationElement(notification: Notification, id: string): HTMLElement {
        const element = DOMUtils.createElement('div', `notification ${notification.type}`);
        element.id = id;

        const icon = this.getNotificationIcon(notification.type);
        
        element.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add close button event listener
        const closeButton = element.querySelector('.notification-close') as HTMLElement;
        DOMUtils.addEventListener(closeButton, 'click', () => {
            this.remove(id);
        });

        return element;
    }

    /**
     * Get icon for notification type
     */
    private getNotificationIcon(type: string): string {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };

        return icons[type as keyof typeof icons] || icons.info;
    }

    /**
     * Remove notification
     */
    remove(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('show');
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                this.notifications.delete(id);
            }, 300);
        }
    }

    /**
     * Show success notification
     */
    success(title: string, message: string, duration?: number): void {
        this.show({
            id: `success-${Date.now()}`,
            type: 'success',
            title,
            message,
            duration
        });
    }

    /**
     * Show error notification
     */
    error(title: string, message: string, duration?: number): void {
        this.show({
            id: `error-${Date.now()}`,
            type: 'error',
            title,
            message,
            duration
        });
    }

    /**
     * Show warning notification
     */
    warning(title: string, message: string, duration?: number): void {
        this.show({
            id: `warning-${Date.now()}`,
            type: 'warning',
            title,
            message,
            duration
        });
    }

    /**
     * Show info notification
     */
    info(title: string, message: string, duration?: number): void {
        this.show({
            id: `info-${Date.now()}`,
            type: 'info',
            title,
            message,
            duration
        });
    }

    /**
     * Clear all notifications
     */
    clearAll(): void {
        this.notifications.forEach(id => {
            this.remove(id);
        });
    }

    /**
     * Get notification count
     */
    getCount(): number {
        return this.notifications.size;
    }
}
