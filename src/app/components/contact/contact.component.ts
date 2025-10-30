import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, ContactInfo, SocialLink } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="section bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden min-h-screen">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <!-- Header Section -->
        <div class="text-center mb-20" data-aos="fade-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-6 border border-indigo-400/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Get In Touch
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            Let's Connect
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p class="text-lg md:text-xl text-indigo-200 mt-8 max-w-4xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? I'm always excited to work on new challenges and bring innovative ideas to life.
          </p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col justify-center items-center py-20" role="status" aria-label="Loading contact data">
          <div class="relative mb-4">
            <div class="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin"></div>
            <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style="animation-delay: 0.5s;"></div>
          </div>
          <p class="text-indigo-200 text-lg">Loading contact information...</p>
          <span class="sr-only">Loading contact data...</span>
        </div>

        <!-- Contact Content -->
        <div *ngIf="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Contact Information -->
          <div class="space-y-8" data-aos="fade-right">
            <!-- Introduction -->
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">Let's Work Together</h3>
                <p class="text-indigo-100 leading-relaxed text-base md:text-lg">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question, 
                  want to collaborate, or just want to say hi, I'd love to hear from you!
                </p>
              </div>
            </div>

            <!-- Contact Methods -->
            <div class="space-y-6">
              <div *ngFor="let contact of contactInfo" class="group" data-aos="fade-up" data-aos-delay="100">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-indigo-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-indigo-400/50">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span class="text-white text-lg">{{ contact.icon || '📧' }}</span>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-bold text-white mb-1">{{ getContactTypeLabel(contact.type) }}</h4>
                        <a *ngIf="isClickableContact(contact.type)" 
                           [href]="getContactHref(contact.type, contact.value)" 
                           [target]="contact.type === 'linkedin' ? '_blank' : null"
                           class="text-indigo-200 hover:text-indigo-100 transition-colors duration-300">
                          {{ contact.value }}
                        </a>
                        <span *ngIf="!isClickableContact(contact.type)" class="text-indigo-200">
                          {{ contact.value }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="relative" data-aos="fade-up" data-aos-delay="500">
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Connect With Me
                </h4>
                <div class="flex gap-4">
                  <a *ngFor="let social of socialLinks" 
                     [href]="social.url" 
                     target="_blank" 
                     class="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-xl border border-blue-400/30 hover:from-blue-500/40 hover:to-blue-600/40 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                    <span class="text-lg">{{ social.icon || '🔗' }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="relative" data-aos="fade-left">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Send me a message</h3>
              
              <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="space-y-6">
                <div class="form-group">
                  <label for="name" class="block text-sm font-semibold text-indigo-200 mb-2">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    [(ngModel)]="formData.name"
                    required
                    #name="ngModel"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    placeholder="Your full name"
                    [class.error]="name.invalid && name.touched"
                  >
                  <div class="error-message text-red-400 text-sm mt-1" *ngIf="name.invalid && name.touched">
                    Name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email" class="block text-sm font-semibold text-indigo-200 mb-2">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    [(ngModel)]="formData.email"
                    required
                    email
                    #email="ngModel"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                    [class.error]="email.invalid && email.touched"
                  >
                  <div class="error-message text-red-400 text-sm mt-1" *ngIf="email.invalid && email.touched">
                    <span *ngIf="email.errors?.['required']">Email is required</span>
                    <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="subject" class="block text-sm font-semibold text-indigo-200 mb-2">Subject *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    [(ngModel)]="formData.subject"
                    required
                    #subject="ngModel"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    placeholder="What's this about?"
                    [class.error]="subject.invalid && subject.touched"
                  >
                  <div class="error-message text-red-400 text-sm mt-1" *ngIf="subject.invalid && subject.touched">
                    Subject is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="message" class="block text-sm font-semibold text-indigo-200 mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    [(ngModel)]="formData.message"
                    required
                    rows="5"
                    #message="ngModel"
                    class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or question..."
                    [class.error]="message.invalid && message.touched"
                  ></textarea>
                  <div class="error-message text-red-400 text-sm mt-1" *ngIf="message.invalid && message.touched">
                    Message is required
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  class="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  [disabled]="contactForm.invalid || isSubmitting"
                >
                  <span *ngIf="!isSubmitting">Send Message</span>
                  <span *ngIf="isSubmitting">Sending...</span>
                  <svg *ngIf="!isSubmitting" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                  <div *ngIf="isSubmitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Custom animations for enhanced user experience */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
      50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
    }
    
    .group:hover .animate-float {
      animation: float 2s ease-in-out infinite;
    }
    
    .group:hover .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
    
    /* Enhanced scrollbar for webkit browsers */
    .contact-container::-webkit-scrollbar {
      width: 6px;
    }
    
    .contact-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    .contact-container::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #6366f1, #8b5cf6);
      border-radius: 3px;
    }
    
    .contact-container::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #4f46e5, #7c3aed);
    }
    
    /* Professional focus states for accessibility */
    .focus-visible:focus {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced text selection */
    ::selection {
      background: rgba(99, 102, 241, 0.3);
      color: white;
    }
    
    /* Professional gradient text */
    .gradient-text {
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #f3e8ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Form input focus effects */
    .form-group input:focus,
    .form-group textarea:focus {
      transform: translateY(-1px);
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.15);
    }
    
    /* Button hover effects */
    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }
    
    /* Error state styling */
    .error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    /* Loading animation */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class ContactComponent implements OnInit {
  isSubmitting = false;
  isLoading = true;
  contactInfo: ContactInfo[] = [];
  socialLinks: SocialLink[] = [];
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {
    // Component initialized
  }

  ngOnInit() {
    this.loadContactData();
  }

  loadContactData() {
    this.isLoading = true;
    this.portfolioService.getContactInfo()
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error loading contact info:', error);
          this.loadFallbackContactData();
          return of([]);
        })
      )
      .subscribe({
        next: (contactInfo) => {
          if (contactInfo && contactInfo.length > 0) {
            this.contactInfo = contactInfo;
          } else {
            this.loadFallbackContactData();
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading contact info:', error);
          this.loadFallbackContactData();
          this.isLoading = false;
        }
      });

    this.portfolioService.getSocialLinks()
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error loading social links:', error);
          this.loadFallbackSocialData();
          return of([]);
        })
      )
      .subscribe({
        next: (socialLinks) => {
          if (socialLinks && socialLinks.length > 0) {
            this.socialLinks = socialLinks;
          } else {
            this.loadFallbackSocialData();
          }
        },
        error: (error) => {
          console.error('Error loading social links:', error);
          this.loadFallbackSocialData();
        }
      });
  }

  private loadFallbackContactData() {
    this.contactInfo = [
      { id: 1, type: 'email', value: 'sanketjagtap479@gmail.com', icon: '📧', order: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 2, type: 'phone', value: '+91 8806328987', icon: '📞', order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 3, type: 'location', value: 'Pune, India', icon: '📍', order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 4, type: 'linkedin', value: 'linkedin.com/in/sanket-jagtap', icon: '💼', order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
  }

  private loadFallbackSocialData() {
    this.socialLinks = [
      { id: 1, platform: 'linkedin', url: 'https://linkedin.com/in/sanket-jagtap', icon: '💼', order: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 2, platform: 'email', url: 'mailto:sanketjagtap479@gmail.com', icon: '📧', order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 3, platform: 'phone', url: 'tel:8806328987', icon: '📞', order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ];
  }

  getContactTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'email': 'Email',
      'phone': 'Phone',
      'location': 'Location',
      'linkedin': 'LinkedIn',
      'github': 'GitHub',
      'twitter': 'Twitter'
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  }

  isClickableContact(type: string): boolean {
    return ['email', 'phone', 'linkedin', 'github', 'twitter'].includes(type);
  }

  getContactHref(type: string, value: string): string {
    switch (type) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value}`;
      case 'linkedin':
        return value.startsWith('http') ? value : `https://${value}`;
      case 'github':
        return value.startsWith('http') ? value : `https://${value}`;
      case 'twitter':
        return value.startsWith('http') ? value : `https://${value}`;
      default:
        return value;
    }
  }

  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting = false;
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      // Show success message (you can implement a toast notification here)
      alert('Thank you for your message! I\'ll get back to you soon.');
    }, 2000);
  }
}
