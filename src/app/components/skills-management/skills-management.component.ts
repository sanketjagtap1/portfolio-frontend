import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { IconComponent } from '../ui/icon.component';
import { environment } from '../../../environments/environment';

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
  imports: [CommonModule, FormsModule, AdminNavComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="kicker mb-3">SKILLS</span>
            <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Skills Management</h1>
            <p class="text-muted mt-2">Manage your technical skills and expertise levels</p>
          </div>
          <button
            (click)="showAddForm = true"
            class="btn-primary !px-4 !py-2 text-sm"
          >
            <app-icon name="plus" [size]="20"></app-icon>
            Add Skill
          </button>
        </div>
        <!-- Add/Edit Form -->
        <div *ngIf="showAddForm" class="mb-8">
          <div class="rounded-2xl border border-line bg-surface p-6">
            <h3 class="font-display text-xl font-semibold text-ink mb-6">{{ editingSkill ? 'Edit Skill' : 'Add New Skill' }}</h3>

            <form (ngSubmit)="saveSkill()" #skillForm="ngForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Skill Name</label>
                  <input
                    type="text"
                    [(ngModel)]="skillFormData.name"
                    name="name"
                    required
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="e.g., JavaScript"
                  >
                </div>

                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Category</label>
                  <select
                    [(ngModel)]="skillFormData.category"
                    name="category"
                    required
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
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
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Level (0-100)</label>
                  <input
                    type="number"
                    [(ngModel)]="skillFormData.level"
                    name="level"
                    min="0"
                    max="100"
                    required
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="85"
                  >
                </div>

                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Icon Image</label>
                  <div class="space-y-3">
                    <!-- File Upload Input -->
                    <input
                      type="file"
                      #fileInput
                      (change)="onFileSelected($event)"
                      accept="image/*"
                      class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                    >

                    <!-- Image Preview -->
                    <div *ngIf="selectedImagePreview" class="mt-3">
                      <p class="text-muted text-sm mb-2">Preview:</p>
                      <img [src]="selectedImagePreview" alt="Icon preview" class="w-16 h-16 object-cover rounded-lg border border-line">
                    </div>

                    <!-- Current Image Display -->
                    <div *ngIf="skillFormData.icon && !selectedImagePreview" class="mt-3">
                      <p class="text-muted text-sm mb-2">Current Icon:</p>
                      <img [src]="getImageUrl(skillFormData.icon)" alt="Current icon" class="w-16 h-16 object-cover rounded-lg border border-line">
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Description</label>
                <textarea
                  [(ngModel)]="skillFormData.description"
                  name="description"
                  rows="3"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="Brief description of your expertise..."
                ></textarea>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  class="btn-primary !px-4 !py-2 text-sm"
                  [disabled]="skillForm.invalid || isLoading"
                >
                  {{ isLoading ? 'Saving...' : (editingSkill ? 'Update Skill' : 'Add Skill') }}
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

        <!-- Skills List -->
        <div *ngIf="skills.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let skill of skills; let i = index"
            class="group"
          >
            <div class="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/30">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg overflow-hidden border border-line flex items-center justify-center bg-white/[0.02]">
                    <img
                      *ngIf="skill.icon"
                      [src]="getImageUrl(skill.icon)"
                      [alt]="skill.name + ' icon'"
                      class="w-full h-full object-cover"
                    >
                    <app-icon *ngIf="!skill.icon" name="code" [size]="24" class="text-accent"></app-icon>
                  </div>
                  <div>
                    <h3 class="font-display text-lg font-semibold text-ink">{{ skill.name }}</h3>
                    <p class="text-muted text-sm">{{ skill.category | titlecase }}</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    (click)="editSkill(skill)"
                    class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent transition-colors hover:bg-accent/20"
                  >
                    <app-icon name="pencil" [size]="16"></app-icon>
                  </button>
                  <button
                    (click)="deleteSkill(skill.id)"
                    class="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    <app-icon name="trash" [size]="16"></app-icon>
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <div class="flex justify-between text-sm text-muted mb-2">
                  <span>Proficiency</span>
                  <span>{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-white/[0.06] rounded-full h-2">
                  <div
                    class="bg-accent h-2 rounded-full transition-all duration-500"
                    [style.width.%]="skill.level"
                  ></div>
                </div>
              </div>

              <p *ngIf="skill.description" class="text-muted text-sm">{{ skill.description }}</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="skills.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <app-icon name="award" [size]="48"></app-icon>
          </div>
          <h3 class="font-display text-2xl font-semibold text-ink mb-4">No Skills Added Yet</h3>
          <p class="text-muted text-lg mb-6">Start building your skills portfolio by adding your first skill!</p>
          <button
            (click)="showAddForm = true"
            class="btn-primary !px-4 !py-2 text-sm"
          >
            Add Your First Skill
          </button>
        </div>
      </main>
    </div>
  `,
  styles: []
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
    this.http.get<Skill[]>(`${environment.apiBaseUrl}/api/portfolio/skills`)
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
        
        const uploadResponse: any = await this.http.post(`${environment.apiBaseUrl}/api/upload`, formData, { headers }).toPromise();
        iconUrl = uploadResponse.file._id; // Store the stored filename returned by the API
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
        this.http.put(`${environment.apiBaseUrl}/api/portfolio/admin/skills/${this.editingSkill.id}`, skillData, { headers })
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
        this.http.post(`${environment.apiBaseUrl}/api/portfolio/admin/skills`, skillData, { headers })
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

    this.http.delete(`${environment.apiBaseUrl}/api/portfolio/admin/skills/${skillId}`, { headers })
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
    return `${environment.fileApiUrl}/${icon}`;
  }
}
