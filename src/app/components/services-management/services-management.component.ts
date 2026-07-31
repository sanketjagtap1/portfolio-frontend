import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { IconComponent } from '../ui/icon.component';
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
  imports: [CommonModule, FormsModule, AdminNavComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <app-admin-nav></app-admin-nav>

      <div class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10">
        <!-- Header -->
        <div class="mb-8">
          <span class="kicker mb-3">SERVICES</span>
          <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Services Management</h1>
          <p class="text-muted mt-2">Manage your service offerings and pricing</p>
        </div>

        <!-- Add Service Form -->
        <div class="card mb-8">
          <h2 class="font-display text-2xl font-semibold text-ink mb-6">{{ editingService ? 'Edit Service' : 'Add New Service' }}</h2>

          <form #serviceFormRef="ngForm" (ngSubmit)="onSubmit(serviceFormRef)" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Service Title -->
              <div>
                <label for="title" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  [(ngModel)]="serviceForm.title"
                  required
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="e.g., Web Development"
                />
              </div>

              <!-- Order -->
              <div>
                <label for="order" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Display Order</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  [(ngModel)]="serviceForm.order"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="1"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Description *</label>
              <textarea
                id="description"
                name="description"
                [(ngModel)]="serviceForm.description"
                required
                rows="4"
                class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                placeholder="Describe what this service includes..."
              ></textarea>
            </div>

            <!-- Features -->
            <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Features</label>
              <div class="space-y-2">
                <div *ngFor="let feature of serviceForm.features; let i = index" class="flex items-center gap-2">
                  <input
                    type="text"
                    [(ngModel)]="serviceForm.features[i]"
                    name="feature-{{i}}"
                    class="flex-1 rounded-xl border border-line bg-surface2 px-4 py-2 text-ink"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    (click)="removeFeature(i)"
                    class="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    <app-icon name="trash" [size]="15"></app-icon>
                    Remove
                  </button>
                </div>
                <button
                  type="button"
                  (click)="addFeature()"
                  class="btn-ghost"
                >
                  <app-icon name="plus" [size]="16"></app-icon>
                  Add Feature
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Price -->
              <div>
                <label for="price" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  [(ngModel)]="serviceForm.price"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="e.g., $500+"
                />
              </div>

              <!-- Duration -->
              <div>
                <label for="duration" class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  [(ngModel)]="serviceForm.duration"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
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
                  class="w-4 h-4 accent-accent rounded border-line"
                />
                <label for="featured" class="ml-2 text-sm font-medium text-muted">Featured Service</label>
              </div>
            </div>

            <!-- Icon Upload -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Service Icon</label>
              <div class="flex items-center gap-4">
                <input
                  type="file"
                  #fileInput
                  (change)="onFileSelected($event)"
                  accept="image/*"
                  class="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                />
                <div *ngIf="serviceForm.icon" class="w-16 h-16 rounded-xl border border-line bg-white/[0.02] flex items-center justify-center">
                  <img [src]="getImageUrl(serviceForm.icon)" alt="Icon preview" class="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-4 pt-6 border-t border-line">
              <button
                type="submit"
                [disabled]="isSubmitting"
                class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <app-icon *ngIf="isSubmitting" name="loader" [size]="16" class="animate-spin"></app-icon>
                <app-icon *ngIf="!isSubmitting" name="save" [size]="16"></app-icon>
                {{ isSubmitting ? 'Saving...' : (editingService ? 'Update Service' : 'Add Service') }}
              </button>
              <button
                type="button"
                (click)="resetForm()"
                class="btn-ghost"
              >
                <app-icon name="x" [size]="16"></app-icon>
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Services List -->
        <div class="card">
          <h2 class="font-display text-2xl font-semibold text-ink mb-6">All Services</h2>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="flex items-center justify-center h-32">
            <app-icon name="loader" [size]="32" class="animate-spin text-accent"></app-icon>
          </div>

          <!-- Services Grid -->
          <div *ngIf="!isLoading && services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let service of services" class="rounded-2xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-accent/30">
              <!-- Service Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <img
                      *ngIf="service.icon"
                      [src]="getImageUrl(service.icon)"
                      [alt]="service.title"
                      class="w-8 h-8 object-contain"
                    />
                    <app-icon
                      *ngIf="!service.icon"
                      name="layers"
                      [size]="28"
                      class="text-accent"
                    ></app-icon>
                  </div>
                  <div>
                    <h3 class="font-semibold text-ink">{{ service.title }}</h3>
                    <p class="text-sm text-faint">Order: {{ service.order }}</p>
                  </div>
                </div>
                <div *ngIf="service.featured" class="chip !text-accent !border-accent/30 !bg-accent/10">
                  Featured
                </div>
              </div>

              <!-- Service Description -->
              <p class="text-muted text-sm mb-4 line-clamp-3">{{ service.description }}</p>

              <!-- Service Details -->
              <div class="space-y-2 mb-4">
                <div *ngIf="service.price" class="flex justify-between text-sm">
                  <span class="text-faint">Price:</span>
                  <span class="font-medium text-ink">{{ service.price }}</span>
                </div>
                <div *ngIf="service.duration" class="flex justify-between text-sm">
                  <span class="text-faint">Duration:</span>
                  <span class="font-medium text-ink">{{ service.duration }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-faint">Features:</span>
                  <span class="font-medium text-ink">{{ service.features.length }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button
                  (click)="editService(service)"
                  class="btn-primary flex-1 !px-4 !py-2 text-sm"
                >
                  <app-icon name="pencil" [size]="15"></app-icon>
                  Edit
                </button>
                <button
                  (click)="deleteService(service.id)"
                  class="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
                >
                  <app-icon name="trash" [size]="15"></app-icon>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="!isLoading && services.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <app-icon name="layers" [size]="28" class="text-accent"></app-icon>
            </div>
            <h3 class="text-lg font-medium text-ink mb-2">No services yet</h3>
            <p class="text-muted">Add your first service to get started.</p>
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

  private apiUrl = `${environment.apiBaseUrl}/api/portfolio/admin`;

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
    const token = localStorage.getItem('admin_token');
    if (!token) {
      console.error('No admin token found');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formData = new FormData();
    formData.append('file', file);

    this.http.post(`${environment.apiBaseUrl}/api/upload`, formData, { headers })
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
    return `${environment.fileApiUrl}/${imageId}`;
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
