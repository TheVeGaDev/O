import { NotificationSystem } from '../components/Notification';
import { ValidationUtils } from '../utils';
import { FormData } from '../types';

export class ContactService {
    private notification: NotificationSystem;

    constructor() {
        this.notification = new NotificationSystem();
    }

    /**
     * Initialize contact form
     */
    init(): void {
        this.setupContactForm();
    }

    /**
     * Setup contact form event listeners
     */
    private setupContactForm(): void {
        const form = document.getElementById('contactForm') as HTMLFormElement;
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });

        // Add real-time validation
        this.setupRealTimeValidation(form);
    }

    /**
     * Setup real-time form validation
     */
    private setupRealTimeValidation(form: HTMLFormElement): void {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
            });
        });
    }

    /**
     * Validate individual form field
     */
    private validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || '';
        let isValid = true;
        let errorMessage = '';

        if (ValidationUtils.isEmpty(value)) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        } else if (fieldName === 'email' && !ValidationUtils.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'البريد الإلكتروني غير صحيح';
        }

        this.updateFieldValidation(field, isValid, errorMessage);
    }

    /**
     * Update field validation state
     */
    private updateFieldValidation(
        field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, 
        isValid: boolean, 
        errorMessage: string
    ): void {
        // Remove existing error messages
        const existingError = field.parentNode?.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');

        if (!isValid) {
            field.classList.add('invalid');
            
            // Add error message
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.color = '#e84118';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.5rem';
            
            field.parentNode?.appendChild(errorElement);
        } else {
            field.classList.add('valid');
        }
    }

    /**
     * Handle form submission
     */
    private async handleFormSubmit(form: HTMLFormElement): Promise<void> {
        const formData = new FormData(form);
        const data: FormData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            service: formData.get('service') as string,
            message: formData.get('message') as string
        };

        // Validate form data
        const validation = ValidationUtils.validateForm(data);
        if (!validation.isValid) {
            this.notification.error('خطأ في الإدخال', validation.errors.join('\n'));
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        try {
            await this.submitForm(data);
            this.notification.success('تم الإرسال', 'سيتم الرد عليك في أقرب وقت');
            form.reset();
        } catch (error) {
            this.notification.error('خطأ في الإرسال', 'حدث خطأ أثناء إرسال الرسالة');
            console.error('Form submission error:', error);
        } finally {
            this.setFormLoading(form, false);
        }
    }

    /**
     * Set form loading state
     */
    private setFormLoading(form: HTMLFormElement, loading: boolean): void {
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        
        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الطلب';
        }

        // Disable all form inputs during loading
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            (input as HTMLInputElement).disabled = loading;
        });
    }

    /**
     * Submit form data (simulated)
     */
    private async submitForm(data: FormData): Promise<void> {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.2) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    /**
     * Generate Telegram message from form data
     */
    private generateTelegramMessage(data: FormData): string {
        return `
طلب جديد من موقع فيجا للبرمجيات:

👤 الاسم: ${data.name}
📧 البريد: ${data.email}
🛠 الخدمة: ${data.service}
📝 الرسالة:
${data.message}

تاريخ الطلب: ${new Date().toLocaleString('ar-EG')}
        `.trim();
    }

    /**
     * Open Telegram with pre-filled message
     */
    openTelegram(data: FormData): void {
        const message = this.generateTelegramMessage(data);
        const encodedMessage = encodeURIComponent(message);
        const telegramUrl = `https://t.me/TopVeGa?text=${encodedMessage}`;
        
        window.open(telegramUrl, '_blank');
    }
}
