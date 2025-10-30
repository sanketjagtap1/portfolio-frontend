import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  duration?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="section bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden min-h-screen">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
        <div class="absolute top-0 left-0 w-full h-full bg-[url('/assets/patterns/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-16">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <div class="inline-block relative mb-6">
            <h2 class="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300" data-aos="fade-down">
              Our Services
            </h2>
            <!-- Text Glow Effect -->
            <div class="absolute inset-0 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 blur-sm opacity-50" data-aos="fade-down">
              Our Services
            </div>
          </div>
          <p class="text-xl text-center text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Comprehensive solutions tailored to bring your digital vision to life. From concept to deployment, we deliver excellence at every step.
          </p>
          <div class="flex items-center justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
            <div class="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <div class="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex items-center justify-center h-64">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
        </div>

        <!-- No Services State -->
        <div *ngIf="!isLoading && services.length === 0" class="text-center text-blue-300 text-lg">
          <div class="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <p>No services available at the moment.</p>
        </div>

        <!-- Services Grid -->
        <div *ngIf="!isLoading && services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let service of services; let i = index" 
            class="group relative cursor-pointer"
            data-aos="fade-up"
            [attr.data-aos-delay]="i * 150"
            (click)="contactForService(service)"
          >
            <!-- Card Background Glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            
            <!-- Main Card -->
            <div class="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-500 h-full flex flex-col group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
              <!-- Animated Background Pattern -->
              <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
              </div>

              <!-- Featured Badge -->
              <div *ngIf="service.featured" class="absolute top-4 right-4 z-30">
                <div class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border-2 border-white/20">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Featured
                  </div>
                </div>
              </div>

              <!-- Service Icon -->
              <div class="relative mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/30">
                  <img 
                    *ngIf="service.icon" 
                    [src]="getImageUrl(service.icon)" 
                    [alt]="service.title"
                    class="w-10 h-10 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                  />
                  <svg 
                    *ngIf="!service.icon" 
                    class="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <!-- Icon Glow Effect -->
                <div class="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              <!-- Service Title -->
              <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-300 transition-all duration-300">
                {{ service.title }}
              </h3>

              <!-- Service Description -->
              <p class="text-gray-300 leading-relaxed mb-5 flex-1 text-sm group-hover:text-gray-200 transition-colors duration-300">
                {{ service.description }}
              </p>

              <!-- Features List -->
              <div class="mb-5">
                <h4 class="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <div class="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  Key Features
                </h4>
                <ul class="space-y-1.5">
                  <li 
                    *ngFor="let feature of service.features.slice(0, 3)"
                    class="flex items-center gap-2.5 text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300"
                  >
                    <div class="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span>{{ feature }}</span>
                  </li>
                  <li *ngIf="service.features.length > 3" class="text-xs text-gray-400 ml-6 group-hover:text-gray-300 transition-colors duration-300">
                    +{{ service.features.length - 3 }} more features
                  </li>
                </ul>
              </div>

              <!-- Service Details -->
              <div class="mt-auto pt-6 border-t border-slate-700/50 group-hover:border-blue-400/30 transition-colors duration-300">
                <div class="flex justify-between items-center mb-6">
                  <div *ngIf="service.price" class="text-left">
                    <div class="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-300 transition-all duration-300">
                      {{ formatPriceINR(service.price) }}
                    </div>
                    <div class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Starting from</div>
                  </div>
                  <div *ngIf="service.duration" class="text-right">
                    <div class="text-base font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">{{ service.duration }}</div>
                    <div class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Delivery time</div>
                  </div>
                </div>

                <!-- Contact Button -->
                <div class="relative">
                  <button 
                    class="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white py-3 px-5 rounded-xl font-medium hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 group-hover:shadow-blue-500/40 overflow-hidden relative"
                  >
                    <span class="relative z-10 flex items-center justify-center gap-2">
                      <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      Get This Service
                    </span>
                    <!-- Button Shine Effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </div>

              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-20" data-aos="fade-up" data-aos-delay="400">
          <div class="relative bg-slate-800/60 backdrop-blur-xl rounded-3xl p-12 border border-blue-400/30 max-w-5xl mx-auto overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
              <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
            </div>
            
            <div class="relative z-10">
              <div class="inline-block relative mb-6">
                <h3 class="text-4xl font-bold text-white mb-4">Need Something Custom?</h3>
                <!-- Text Glow Effect -->
                <div class="absolute inset-0 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300 blur-sm opacity-50">
                  Need Something Custom?
                </div>
              </div>
              <p class="text-blue-200 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
                We're always excited to work on unique projects. Let's discuss your specific requirements and create something amazing together. Our team is ready to bring your vision to life.
              </p>
              <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/contact" 
                  class="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 overflow-hidden relative"
                >
                  <span class="relative z-10 flex items-center gap-3">
                    <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Contact Us
                  </span>
                  <!-- Button Shine Effect -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
                <a 
                  href="/projects" 
                  class="group inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-blue-400/50"
                >
                  <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                  View Our Work
                </a>
              </div>
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

    .floating-element {
      animation: float 3s ease-in-out infinite;
    }

    /* Custom scrollbar */
    .overflow-y-auto::-webkit-scrollbar {
      width: 6px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
    
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadServicesData();
  }

  loadServicesData() {
    this.isLoading = true;
    this.portfolioService.getServices()
      .pipe(
        timeout(10000), // 10 seconds timeout
        catchError(error => {
          console.error('Error loading services:', error);
          // Fallback to sample data
          return of(this.getSampleServices());
        })
      )
      .subscribe({
        next: (data) => {
          this.services = data;
          this.isLoading = false;
          this.cdr.detectChanges(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.services = this.getSampleServices();
          this.isLoading = false;
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      });
  }

  getImageUrl(imageId: string): string {
    if (!imageId) return '';
    return `https://dev-api.technootales.in/v1/cloud/file/${imageId}`;
  }

  formatPriceINR(price?: string): string {
    if (!price) return '';
    // Normalize
    const raw = String(price).trim();
    const hasPlus = raw.endsWith('+');
    const perHour = /\/?hour$/i.test(raw) || /per\s*hour/i.test(raw);
    // Extract numeric portion
    const match = raw.match(/[0-9][0-9,]*(?:\.[0-9]+)?/);
    if (!match) return `₹${raw.replace(/[^0-9+]/g, '')}`;
    const numeric = parseFloat(match[0].replace(/,/g, ''));
    // Format as INR (no decimals by default for starting prices)
    const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(numeric);
    let suffix = '';
    if (perHour) suffix = '/hour';
    if (hasPlus) suffix = suffix ? `${suffix}+` : '+';
    return `${formatted}${suffix}`;
  }

  contactForService(service: Service) {
    // Navigate to contact page with service pre-selected
    const contactUrl = `/contact?service=${encodeURIComponent(service.title)}`;
    window.location.href = contactUrl;
  }

  private getSampleServices(): Service[] {
    return [
      {
        id: 1,
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies and best practices.',
        icon: '',
        features: [
          'Responsive Design',
          'Modern Frameworks',
          'SEO Optimization',
          'Performance Optimization',
          'Cross-browser Compatibility',
          'Mobile-first Approach'
        ],
        price: '$500+',
        duration: '2-4 weeks',
        featured: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
        icon: '',
        features: [
          'iOS & Android Apps',
          'Cross-platform Solutions',
          'UI/UX Design',
          'App Store Optimization',
          'Push Notifications',
          'Offline Functionality'
        ],
        price: '$1000+',
        duration: '4-8 weeks',
        featured: true,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'E-commerce Solutions',
        description: 'Complete e-commerce platforms with payment integration and inventory management.',
        icon: '',
        features: [
          'Payment Gateway Integration',
          'Inventory Management',
          'Order Processing',
          'Customer Management',
          'Analytics Dashboard',
          'Security Features'
        ],
        price: '$800+',
        duration: '3-6 weeks',
        featured: false,
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 4,
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive user interfaces designed for optimal user experience.',
        icon: '',
        features: [
          'User Research',
          'Wireframing',
          'Prototyping',
          'Visual Design',
          'Usability Testing',
          'Design Systems'
        ],
        price: '$300+',
        duration: '1-3 weeks',
        featured: false,
        order: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 5,
        title: 'API Development',
        description: 'RESTful APIs and microservices for seamless data integration and communication.',
        icon: '',
        features: [
          'RESTful APIs',
          'GraphQL',
          'Authentication',
          'Rate Limiting',
          'Documentation',
          'Testing & Monitoring'
        ],
        price: '$400+',
        duration: '2-4 weeks',
        featured: false,
        order: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 6,
        title: 'Consulting & Support',
        description: 'Technical consulting and ongoing support for your digital projects.',
        icon: '',
        features: [
          'Technical Consulting',
          'Code Review',
          'Performance Audit',
          'Security Assessment',
          'Training & Support',
          'Maintenance Plans'
        ],
        price: '$100/hour',
        duration: 'Ongoing',
        featured: false,
        order: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
}
