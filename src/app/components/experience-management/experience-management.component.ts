import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
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
  imports: [CommonModule, FormsModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="container mx-auto px-6 py-12">
        <!-- Page Header -->
        <div class="mb-12">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl"></div>
            <div class="relative bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-600/30 shadow-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-4xl font-bold text-white mb-2">Experience Management</h1>
                  <p class="text-slate-300 text-lg">Manage your professional experience entries</p>
                </div>
                <button 
                  (click)="showAddForm()"
                  class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium flex items-center gap-2 shadow-lg hover:shadow-green-500/25"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14m7-7H5"/>
                  </svg>
                  Add Experience
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Form -->
        <div *ngIf="showForm" class="mb-12">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl"></div>
            <div class="relative bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-600/30 shadow-2xl">
              <h2 class="text-2xl font-bold text-white mb-6">{{ editingExperience ? 'Edit Experience' : 'Add New Experience' }}</h2>
              
              <form #experienceForm="ngForm" (ngSubmit)="saveExperience()" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Company -->
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">Company *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="experienceFormData.company" 
                      name="company"
                      required
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company name"
                    >
                  </div>

                  <!-- Position -->
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">Position *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="experienceFormData.position" 
                      name="position"
                      required
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter job position"
                    >
                  </div>

                  <!-- Location -->
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <input 
                      type="text" 
                      [(ngModel)]="experienceFormData.location" 
                      name="location"
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter location (e.g., Pune, India)"
                    >
                  </div>

                  <!-- Order -->
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">Display Order</label>
                    <input 
                      type="number" 
                      [(ngModel)]="experienceFormData.order" 
                      name="order"
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Display order (lower numbers first)"
                    >
                  </div>

                  <!-- Start Date -->
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">Start Date *</label>
                    <input 
                      type="month" 
                      [(ngModel)]="experienceFormData.startDate" 
                      name="startDate"
                      required
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>

                  <!-- End Date -->
                  <div>
                    <label class="block text-sm font-medium text-slate-300 mb-2">End Date</label>
                    <input 
                      type="month" 
                      [(ngModel)]="experienceFormData.endDate" 
                      name="endDate"
                      [disabled]="experienceFormData.current"
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
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
                    class="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  >
                  <label for="current" class="text-slate-300 font-medium">This is my current position</label>
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                  <textarea 
                    [(ngModel)]="experienceFormData.description" 
                    name="description"
                    required
                    rows="4"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe your role and responsibilities"
                  ></textarea>
                </div>

                <!-- Technologies -->
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Technologies Used</label>
                  <input 
                    type="text" 
                    [(ngModel)]="technologiesInput" 
                    name="technologies"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter technologies separated by commas (e.g., Angular, Node.js, MongoDB)"
                    (blur)="updateTechnologies()"
                  >
                  <p class="text-xs text-slate-400 mt-2">Separate multiple technologies with commas</p>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center gap-4 pt-6">
                  <button 
                    type="submit"
                    [disabled]="experienceForm.invalid || isLoading"
                    class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <svg *ngIf="isLoading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    {{ isLoading ? 'Saving...' : (editingExperience ? 'Update Experience' : 'Add Experience') }}
                  </button>
                  <button 
                    type="button"
                    (click)="cancelEdit()"
                    class="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Experience List -->
        <div *ngIf="experiences.length > 0" class="space-y-6">
          <div 
            *ngFor="let experience of experiences; let i = index" 
            class="relative group"
          >
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30 shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-green-400/50">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-white mb-1">{{ experience.position }}</h3>
                    <h4 class="text-lg font-semibold text-green-300 mb-2">{{ experience.company }}</h4>
                    <div class="flex items-center gap-4 text-sm text-slate-400">
                      <span>{{ formatDate(experience.startDate) }} - {{ experience.current ? 'Present' : formatDate(experience.endDate || '') }}</span>
                      <span *ngIf="experience.location">📍 {{ experience.location }}</span>
                      <span>#{{ experience.order }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button 
                      (click)="editExperience(experience)"
                      class="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="deleteExperience(experience.id!)"
                      class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p class="text-slate-300 mb-4 leading-relaxed">{{ experience.description }}</p>
                
                <div *ngIf="experience.technologies && experience.technologies.length > 0">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      *ngFor="let tech of experience.technologies" 
                      class="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium border border-green-400/30"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="!isLoading && experiences.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">No Experience Entries</h3>
          <p class="text-slate-400 mb-6">Start building your professional experience portfolio</p>
          <button 
            (click)="showAddForm()"
            class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium"
          >
            Add Your First Experience
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center py-20">
          <div class="w-16 h-16 border-4 border-green-500/30 border-t-green-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-slate-300">Loading experience data...</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    button:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #10b981, #059669);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #059669, #047857);
    }
  `]
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
    
    this.http.get<Experience[]>(`${environment.apiBaseUrl}/portfolio/experience`, { headers })
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
      this.http.put(`${environment.apiBaseUrl}/portfolio/admin/experience/${this.editingExperience.id}`, experienceData, { headers })
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
      this.http.post(`${environment.apiBaseUrl}/portfolio/admin/experience`, experienceData, { headers })
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
      
      this.http.delete(`${environment.apiBaseUrl}/portfolio/admin/experience/${id}`, { headers })
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
