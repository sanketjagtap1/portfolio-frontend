import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
  description: string;
  order: number;
}

@Component({
  selector: 'app-skills-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Skills Management</h1>
            <p class="text-blue-200">Manage your technical skills and expertise levels</p>
          </div>
          <button 
            (click)="showAddForm = true"
            class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Skill
          </button>
        </div>
        <!-- Add/Edit Form -->
        <div *ngIf="showAddForm" class="mb-8">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg"></div>
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 class="text-xl font-bold text-white mb-6">{{ editingSkill ? 'Edit Skill' : 'Add New Skill' }}</h3>
              
              <form (ngSubmit)="saveSkill()" #skillForm="ngForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-blue-200 mb-2">Skill Name</label>
                    <input 
                      type="text" 
                      [(ngModel)]="skillFormData.name" 
                      name="name"
                      required
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="e.g., JavaScript"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-blue-200 mb-2">Category</label>
                    <select 
                      [(ngModel)]="skillFormData.category" 
                      name="category"
                      required
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    >
                      <option value="">Select Category</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="cloud">Cloud</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-blue-200 mb-2">Level (0-100)</label>
                    <input 
                      type="number" 
                      [(ngModel)]="skillFormData.level" 
                      name="level"
                      min="0" 
                      max="100" 
                      required
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      placeholder="85"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-blue-200 mb-2">Icon Image</label>
                    <div class="space-y-3">
                      <!-- File Upload Input -->
                      <input 
                        type="file" 
                        #fileInput
                        (change)="onFileSelected($event)"
                        accept="image/*"
                        class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      >
                      
                      <!-- Image Preview -->
                      <div *ngIf="selectedImagePreview" class="mt-3">
                        <p class="text-blue-200 text-sm mb-2">Preview:</p>
                        <img [src]="selectedImagePreview" alt="Icon preview" class="w-16 h-16 object-cover rounded-lg border border-white/20">
                      </div>
                      
                      <!-- Current Image Display -->
                      <div *ngIf="skillFormData.icon && !selectedImagePreview" class="mt-3">
                        <p class="text-blue-200 text-sm mb-2">Current Icon:</p>
                        <img [src]="getImageUrl(skillFormData.icon)" alt="Current icon" class="w-16 h-16 object-cover rounded-lg border border-white/20">
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-blue-200 mb-2">Description</label>
                  <textarea 
                    [(ngModel)]="skillFormData.description" 
                    name="description"
                    rows="3"
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    placeholder="Brief description of your expertise..."
                  ></textarea>
                </div>
                
                <div class="flex gap-4">
                  <button 
                    type="submit" 
                    class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300"
                    [disabled]="skillForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Saving...' : (editingSkill ? 'Update Skill' : 'Add Skill') }}
                  </button>
                  <button 
                    type="button" 
                    (click)="cancelEdit()"
                    class="px-6 py-3 bg-gray-500/20 text-gray-300 rounded-xl hover:bg-gray-500/40 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Skills List -->
        <div *ngIf="skills.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let skill of skills; let i = index" 
            class="group"
          >
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-400/50">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg overflow-hidden border border-white/20 flex items-center justify-center bg-white/5">
                      <img 
                        *ngIf="skill.icon" 
                        [src]="getImageUrl(skill.icon)" 
                        [alt]="skill.name + ' icon'"
                        class="w-full h-full object-cover"
                      >
                      <div *ngIf="!skill.icon" class="text-2xl text-blue-300">💻</div>
                    </div>
                    <div>
                      <h3 class="text-lg font-bold text-white">{{ skill.name }}</h3>
                      <p class="text-blue-200 text-sm">{{ skill.category | titlecase }}</p>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      (click)="editSkill(skill)"
                      class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/40 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="deleteSkill(skill.id)"
                      class="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/40 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div class="mb-4">
                  <div class="flex justify-between text-sm text-blue-200 mb-2">
                    <span>Proficiency</span>
                    <span>{{ skill.level }}%</span>
                  </div>
                  <div class="w-full bg-white/10 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full transition-all duration-500"
                      [style.width.%]="skill.level"
                    ></div>
                  </div>
                </div>
                
                <p *ngIf="skill.description" class="text-blue-200 text-sm">{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="skills.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">No Skills Added Yet</h3>
          <p class="text-blue-200 text-lg mb-6">Start building your skills portfolio by adding your first skill!</p>
          <button 
            (click)="showAddForm = true"
            class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300"
          >
            Add Your First Skill
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }
  `]
})
export class SkillsManagementComponent implements OnInit {
  skills: Skill[] = [];
  showAddForm = false;
  editingSkill: Skill | null = null;
  isLoading = false;
  skillFormData: any = {};
  selectedImagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.http.get<Skill[]>('http://localhost:3000/api/portfolio/skills')
      .subscribe({
        next: (skills) => {
          this.skills = skills;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading skills:', error);
          this.isLoading = false;
        }
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveSkill() {
    if (this.isLoading) return;

    this.isLoading = true;
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      console.error('No admin token found');
      this.isLoading = false;
      return;
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      let iconUrl = this.skillFormData.icon;

      // Upload image if a new file is selected
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        const uploadResponse: any = await this.http.post('http://dev-api.technootales.in/v1/cloud/file', formData).toPromise();
        iconUrl = uploadResponse.file._id; // Store the file ID returned by the API
      }

      const skillData = {
        name: this.skillFormData.name,
        level: parseInt(this.skillFormData.level),
        category: this.skillFormData.category,
        icon: iconUrl,
        description: this.skillFormData.description || '',
        order: this.skills.length
      };

      if (this.editingSkill) {
        // Update existing skill
        this.http.put(`http://localhost:3000/api/portfolio/admin/skills/${this.editingSkill.id}`, skillData, { headers })
          .subscribe({
            next: () => {
              this.loadSkills();
              this.cancelEdit();
            },
            error: (error) => {
              console.error('Error updating skill:', error);
              this.isLoading = false;
            }
          });
      } else {
        // Add new skill
        this.http.post('http://localhost:3000/api/portfolio/admin/skills', skillData, { headers })
          .subscribe({
            next: () => {
              this.loadSkills();
              this.cancelEdit();
            },
            error: (error) => {
              console.error('Error adding skill:', error);
              this.isLoading = false;
            }
          });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.isLoading = false;
    }
  }

  editSkill(skill: Skill) {
    this.editingSkill = skill;
    this.skillFormData = { ...skill };
    this.showAddForm = true;
  }

  deleteSkill(skillId: number) {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:3000/api/portfolio/admin/skills/${skillId}`, { headers })
      .subscribe({
        next: () => {
          this.loadSkills();
        },
        error: (error) => {
          console.error('Error deleting skill:', error);
        }
      });
  }

  cancelEdit() {
    this.editingSkill = null;
    this.skillFormData = {};
    this.showAddForm = false;
    this.isLoading = false;
    this.selectedImagePreview = null;
    this.selectedFile = null;
  }

  getImageUrl(icon: string): string {
    // If it's already a full URL, return as is
    if (icon.startsWith('http')) {
      return icon;
    }
    // If it's a file ID, construct the API URL
    return `http://dev-api.technootales.in/v1/cloud/file/${icon}`;
  }
}
