import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { timeout, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  selector: 'app-services-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <app-admin-nav></app-admin-nav>
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Services Management</h1>
          <p class="text-blue-200">Manage your service offerings and pricing</p>
        </div>

        <!-- Add Service Form -->
        <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl p-8 mb-8 border border-blue-400/30">
          <h2 class="text-2xl font-bold text-white mb-6">{{ editingService ? 'Edit Service' : 'Add New Service' }}</h2>
          
          <form #serviceFormRef="ngForm" (ngSubmit)="onSubmit(serviceFormRef)" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Service Title -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-300 mb-2">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  [(ngModel)]="serviceForm.title"
                  required
                  class="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400"
                  placeholder="e.g., Web Development"
                />
              </div>

              <!-- Order -->
              <div>
                <label for="order" class="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  [(ngModel)]="serviceForm.order"
                  class="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400"
                  placeholder="1"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                id="description"
                name="description"
                [(ngModel)]="serviceForm.description"
                required
                rows="4"
                class="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400"
                placeholder="Describe what this service includes..."
              ></textarea>
            </div>

            <!-- Features -->
            <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Features</label>
              <div class="space-y-2">
                <div *ngFor="let feature of serviceForm.features; let i = index" class="flex items-center gap-2">
                  <input
                    type="text"
                    [(ngModel)]="serviceForm.features[i]"
                    name="feature-{{i}}"
                    class="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    (click)="removeFeature(i)"
                    class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
                <button
                  type="button"
                  (click)="addFeature()"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Add Feature
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Price (INR) -->
              <div>
                <label for="price" class="block text-sm font-medium text-gray-300 mb-2">Price (INR)</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  [(ngModel)]="serviceForm.price"
                  class="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400"
                  placeholder="e.g., ₹500+ or ₹100/hour"
                />
              </div>

              <!-- Duration -->
              <div>
                <label for="duration" class="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  [(ngModel)]="serviceForm.duration"
                  class="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700 text-white placeholder-gray-400"
                  placeholder="e.g., 2-4 weeks"
                />
              </div>

              <!-- Featured -->
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  [(ngModel)]="serviceForm.featured"
                  class="w-4 h-4 text-blue-400 bg-slate-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label for="featured" class="ml-2 text-sm font-medium text-gray-300">Featured Service</label>
              </div>
            </div>

            <!-- Icon Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Service Icon</label>
              <div class="flex items-center gap-4">
                <input
                  type="file"
                  #fileInput
                  (change)="onFileSelected($event)"
                  accept="image/*"
                  class="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-500/20"
                />
                <div *ngIf="serviceForm.icon" class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img [src]="getImageUrl(serviceForm.icon)" alt="Icon preview" class="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                [disabled]="isSubmitting"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {{ isSubmitting ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service') }}
              </button>
              <button
                type="button"
                (click)="resetForm()"
                class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Services List -->
        <div class="bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-blue-400/30 p-8">
          <h2 class="text-2xl font-bold text-white mb-6">All Services</h2>
          
          <!-- Loading State -->
          <div *ngIf="isLoading" class="flex items-center justify-center h-32">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          <!-- Services Grid -->
          <div *ngIf="!isLoading && services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let service of services" class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <!-- Service Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <img 
                      *ngIf="service.icon" 
                      [src]="getImageUrl(service.icon)" 
                      [alt]="service.title"
                      class="w-8 h-8 object-contain"
                    />
                    <svg 
                      *ngIf="!service.icon" 
                      class="w-8 h-8 text-blue-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white">{{ service.title }}</h3>
                    <p class="text-sm text-gray-400">Order: {{ service.order }}</p>
                  </div>
                </div>
                <div *ngIf="service.featured" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  Featured
                </div>
              </div>

              <!-- Service Description -->
              <p class="text-gray-300 text-sm mb-4 line-clamp-3">{{ service.description }}</p>

              <!-- Service Details -->
              <div class="space-y-2 mb-4">
                <div *ngIf="service.price" class="flex justify-between text-sm">
                  <span class="text-gray-400">Price:</span>
                  <span class="font-medium text-white">{{ formatPriceINR(service.price) }}</span>
                </div>
                <div *ngIf="service.duration" class="flex justify-between text-sm">
                  <span class="text-gray-400">Duration:</span>
                  <span class="font-medium text-white">{{ service.duration }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Features:</span>
                  <span class="font-medium text-white">{{ service.features.length }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  (click)="editService(service)"
                  class="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  (click)="deleteService(service.id)"
                  class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="!isLoading && services.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-white mb-2">No services yet</h3>
            <p class="text-gray-400">Add your first service to get started.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ServicesManagementComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;
  isSubmitting = false;
  editingService: Service | null = null;

  serviceForm = {
    title: '',
    description: '',
    icon: '',
    features: [''],
    price: '',
    duration: '',
    featured: false,
    order: 0
  };

  private apiUrl = `${environment.apiBaseUrl}/portfolio/admin`;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.isLoading = true;
    const token = localStorage.getItem('admin_token');
    console.log('Token from localStorage:', token ? 'Token exists' : 'No token found');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Service[]>(`${this.apiUrl}/services`, { headers })
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error loading services:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.services = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.isSubmitting = true;
    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const serviceData = {
      ...this.serviceForm,
      price: this.formatPriceINR(this.serviceForm.price),
      features: this.serviceForm.features.filter(f => f.trim() !== '')
    };

    const request = this.editingService
      ? this.http.put(`${this.apiUrl}/services/${this.editingService.id}`, serviceData, { headers })
      : this.http.post(`${this.apiUrl}/services`, serviceData, { headers });

    request
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error saving service:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.loadServices();
            this.resetForm();
            this.isSubmitting = false;
          }
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.isSubmitting = false;
        }
      });
  }

  editService(service: Service) {
    this.editingService = service;
    this.serviceForm = {
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.length > 0 ? service.features : [''],
      price: service.price || '',
      duration: service.duration || '',
      featured: service.featured,
      order: service.order
    };
  }

  deleteService(id: number) {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${this.apiUrl}/services/${id}`, { headers })
      .pipe(
        timeout(10000),
        catchError(error => {
          console.error('Error deleting service:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response !== null) {
            this.loadServices();
          }
        },
        error: (err) => {
          console.error('Subscription error:', err);
        }
      });
  }

  addFeature() {
    this.serviceForm.features.push('');
  }

  removeFeature(index: number) {
    this.serviceForm.features.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('https://dev-api.technootales.in/v1/cloud/file', formData)
      .pipe(
        timeout(30000),
        catchError(error => {
          console.error('Error uploading image:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response && response.file && response.file._id) {
            this.serviceForm.icon = response.file._id;
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Subscription error:', err);
        }
      });
  }

  getImageUrl(imageId: string): string {
    if (!imageId) return '';
    return `https://dev-api.technootales.in/v1/cloud/file/${imageId}`;
  }

  formatPriceINR(price?: string): string {
    if (!price) return '';
    const raw = String(price).trim().replace(/\$/g, '').replace(/^INR\s*/i, '').replace(/^Rs\.?\s*/i, '').replace(/₹/g, '');
    const hasPlus = /\+$/.test(raw);
    const perHour = /\/?hour$/i.test(raw) || /per\s*hour/i.test(raw);
    const match = raw.match(/[0-9][0-9,]*(?:\.[0-9]+)?/);
    if (!match) return `₹${raw.replace(/[^0-9+]/g, '')}`;
    const numeric = parseFloat(match[0].replace(/,/g, ''));
    const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(numeric);
    let suffix = '';
    if (perHour) suffix = '/hour';
    if (hasPlus) suffix = suffix ? `${suffix}+` : '+';
    return `${formatted}${suffix}`;
  }

  resetForm() {
    this.editingService = null;
    this.serviceForm = {
      title: '',
      description: '',
      icon: '',
      features: [''],
      price: '',
      duration: '',
      featured: false,
      order: 0
    };
  }
}
