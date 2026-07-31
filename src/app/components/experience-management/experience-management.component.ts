import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { IconComponent } from '../ui/icon.component';
import { environment } from '../../../environments/environment';

interface Experience {
  id?: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  technologies: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-experience-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10">
        <!-- Page Header -->
        <div class="mb-12">
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <span class="kicker mb-3">EXPERIENCE</span>
                <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Experience Management</h1>
                <p class="text-muted text-lg mt-2">Manage your professional experience entries</p>
              </div>
              <button
                (click)="showAddForm()"
                class="btn-primary"
              >
                <app-icon name="plus" [size]="20"></app-icon>
                Add Experience
              </button>
            </div>
          </div>
        </div>

        <!-- Experience Form -->
        <div *ngIf="showForm" class="mb-12">
          <div class="card">
            <h2 class="font-display text-2xl font-semibold text-ink mb-6">{{ editingExperience ? 'Edit Experience' : 'Add New Experience' }}</h2>

            <form #experienceForm="ngForm" (ngSubmit)="saveExperience()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Company -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Company *</label>
                  <input
                    type="text"
                    [(ngModel)]="experienceFormData.company"
                    name="company"
                    required
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="Enter company name"
                  >
                </div>

                <!-- Position -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Position *</label>
                  <input
                    type="text"
                    [(ngModel)]="experienceFormData.position"
                    name="position"
                    required
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="Enter job position"
                  >
                </div>

                <!-- Location -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Location</label>
                  <input
                    type="text"
                    [(ngModel)]="experienceFormData.location"
                    name="location"
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="Enter location (e.g., Pune, India)"
                  >
                </div>

                <!-- Order -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Display Order</label>
                  <input
                    type="number"
                    [(ngModel)]="experienceFormData.order"
                    name="order"
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="Display order (lower numbers first)"
                  >
                </div>

                <!-- Start Date -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Start Date *</label>
                  <input
                    type="month"
                    [(ngModel)]="experienceFormData.startDate"
                    name="startDate"
                    required
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  >
                </div>

                <!-- End Date -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">End Date</label>
                  <input
                    type="month"
                    [(ngModel)]="experienceFormData.endDate"
                    name="endDate"
                    [disabled]="experienceFormData.current"
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink disabled:opacity-50"
                  >
                </div>
              </div>

              <!-- Current Job -->
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  [(ngModel)]="experienceFormData.current"
                  name="current"
                  id="current"
                  class="w-5 h-5 rounded border-line"
                >
                <label for="current" class="text-muted font-medium">This is my current position</label>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Description *</label>
                <textarea
                  [(ngModel)]="experienceFormData.description"
                  name="description"
                  required
                  rows="4"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink resize-none"
                  placeholder="Describe your role and responsibilities"
                ></textarea>
              </div>

              <!-- Technologies -->
              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Technologies Used</label>
                <input
                  type="text"
                  [(ngModel)]="technologiesInput"
                  name="technologies"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="Enter technologies separated by commas (e.g., Angular, Node.js, MongoDB)"
                  (blur)="updateTechnologies()"
                >
                <p class="text-xs text-faint mt-2">Separate multiple technologies with commas</p>
              </div>

              <!-- Form Actions -->
              <div class="flex items-center gap-4 pt-6">
                <button
                  type="submit"
                  [disabled]="experienceForm.invalid || isLoading"
                  class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <app-icon *ngIf="isLoading" name="loader" [size]="16" class="animate-spin"></app-icon>
                  {{ isLoading ? 'Saving...' : (editingExperience ? 'Update Experience' : 'Add Experience') }}
                </button>
                <button
                  type="button"
                  (click)="cancelEdit()"
                  class="btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Experience List -->
        <div *ngIf="experiences.length > 0" class="space-y-6">
          <div
            *ngFor="let experience of experiences; let i = index"
            class="group"
          >
            <div class="rounded-2xl border border-line bg-surface p-6 transition-colors group-hover:border-accent/30">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="font-display text-xl font-semibold text-ink mb-1">{{ experience.position }}</h3>
                  <h4 class="text-lg font-semibold text-accent mb-2">{{ experience.company }}</h4>
                  <div class="flex items-center gap-4 text-sm text-faint">
                    <span>{{ formatDate(experience.startDate) }} - {{ experience.current ? 'Present' : formatDate(experience.endDate || '') }}</span>
                    <span *ngIf="experience.location" class="inline-flex items-center gap-1"><app-icon name="map-pin" [size]="14"></app-icon>{{ experience.location }}</span>
                    <span>#{{ experience.order }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    (click)="editExperience(experience)"
                    class="p-2 text-muted hover:text-accent rounded-lg transition-colors"
                  >
                    <app-icon name="pencil" [size]="18"></app-icon>
                  </button>
                  <button
                    (click)="deleteExperience(experience.id!)"
                    class="p-2 text-red-300 hover:text-red-200 rounded-lg transition-colors"
                  >
                    <app-icon name="trash" [size]="18"></app-icon>
                  </button>
                </div>
              </div>

              <p class="text-muted mb-4 leading-relaxed">{{ experience.description }}</p>

              <div *ngIf="experience.technologies && experience.technologies.length > 0">
                <div class="flex flex-wrap gap-2">
                  <span
                    *ngFor="let tech of experience.technologies"
                    class="chip"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!isLoading && experiences.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <app-icon name="briefcase" [size]="40" class="text-accent"></app-icon>
          </div>
          <h3 class="font-display text-xl font-semibold text-ink mb-2">No Experience Entries</h3>
          <p class="text-muted mb-6">Start building your professional experience portfolio</p>
          <button
            (click)="showAddForm()"
            class="btn-primary"
          >
            Add Your First Experience
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-20">
          <app-icon name="loader" [size]="48" class="animate-spin text-accent mx-auto mb-4"></app-icon>
          <p class="text-muted">Loading experience data...</p>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class ExperienceManagementComponent implements OnInit {
  experiences: Experience[] = [];
  isLoading = true;
  showForm = false;
  editingExperience: Experience | null = null;
  experienceFormData: Experience = {
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    technologies: [],
    order: 0
  };
  technologiesInput = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadExperiences();
  }

  loadExperiences() {
    this.isLoading = true;
    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get<Experience[]>(`${environment.apiBaseUrl}/api/portfolio/experience`, { headers })
      .subscribe({
        next: (experiences) => {
          this.experiences = experiences;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading experiences:', error);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  showAddForm() {
    this.editingExperience = null;
    this.experienceFormData = {
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      technologies: [],
      order: this.experiences.length
    };
    this.technologiesInput = '';
    this.showForm = true;
  }

  editExperience(experience: Experience) {
    this.editingExperience = experience;
    this.experienceFormData = { ...experience };
    this.technologiesInput = experience.technologies.join(', ');
    this.showForm = true;
  }

  updateTechnologies() {
    this.experienceFormData.technologies = this.technologiesInput
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
  }

  saveExperience() {
    this.isLoading = true;
    this.updateTechnologies();

    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const experienceData = {
      ...this.experienceFormData,
      technologies: this.experienceFormData.technologies
    };

    if (this.editingExperience) {
      // Update existing experience
      this.http.put(`${environment.apiBaseUrl}/api/portfolio/admin/experience/${this.editingExperience.id}`, experienceData, { headers })
        .subscribe({
          next: () => {
            this.loadExperiences();
            this.cancelEdit();
          },
          error: (error) => {
            console.error('Error updating experience:', error);
            this.isLoading = false;
          }
        });
    } else {
      // Add new experience
      this.http.post(`${environment.apiBaseUrl}/api/portfolio/admin/experience`, experienceData, { headers })
        .subscribe({
          next: () => {
            this.loadExperiences();
            this.cancelEdit();
          },
          error: (error) => {
            console.error('Error adding experience:', error);
            this.isLoading = false;
          }
        });
    }
  }

  deleteExperience(id: number) {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      this.isLoading = true;
      const token = localStorage.getItem('admin_token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      this.http.delete(`${environment.apiBaseUrl}/api/portfolio/admin/experience/${id}`, { headers })
        .subscribe({
          next: () => {
            this.loadExperiences();
          },
          error: (error) => {
            console.error('Error deleting experience:', error);
            this.isLoading = false;
          }
        });
    }
  }

  cancelEdit() {
    this.showForm = false;
    this.editingExperience = null;
    this.experienceFormData = {
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      technologies: [],
      order: 0
    };
    this.technologiesInput = '';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
