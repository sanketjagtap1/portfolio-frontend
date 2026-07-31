import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { RichTextEditorComponent } from '../rich-text-editor/rich-text-editor.component';
import { IconComponent } from '../ui/icon.component';
import { environment } from '../../../environments/environment';

interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  featuredImage?: string;
  images?: ProjectImage[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  status: string;
  featured: boolean;
  order: number;
}

@Component({
  selector: 'app-projects-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent, RichTextEditorComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="kicker mb-3">PROJECTS</span>
            <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Projects Management</h1>
            <p class="text-muted mt-2">Manage your portfolio projects and showcase your work</p>
          </div>
          <button
            (click)="showAddForm = true"
            class="btn-primary !px-4 !py-2 text-sm"
          >
            <app-icon name="plus" [size]="18"></app-icon>
            Add Project
          </button>
        </div>
        <!-- Add/Edit Form -->
        <div *ngIf="showAddForm" class="mb-8">
          <div class="rounded-2xl border border-line bg-surface p-6">
            <h3 class="font-display text-xl font-semibold text-ink mb-6">{{ editingProject ? 'Edit Project' : 'Add New Project' }}</h3>

            <form (ngSubmit)="saveProject()" #projectForm="ngForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Project Title</label>
                    <input
                      type="text"
                      [(ngModel)]="projectFormData.title"
                      name="title"
                      required
                      class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                      placeholder="e.g., E-commerce Website"
                    >
                  </div>

                  <div>
                    <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Status</label>
                    <select
                      [(ngModel)]="projectFormData.status"
                      name="status"
                      required
                      class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    >
                      <option value="">Select Status</option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Short Description</label>
                  <input
                    type="text"
                    [(ngModel)]="projectFormData.shortDescription"
                    name="shortDescription"
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="Brief one-line description"
                  >
                </div>

                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Description</label>
                  <app-rich-text-editor
                    [content]="projectFormData.description || ''"
                    placeholder="Enter detailed project description with formatting..."
                    (contentChange)="onDescriptionChange($event)"
                  ></app-rich-text-editor>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">GitHub URL</label>
                    <input
                      type="url"
                      [(ngModel)]="projectFormData.githubUrl"
                      name="githubUrl"
                      class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                      placeholder="https://github.com/username/project"
                    >
                  </div>

                  <div>
                    <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Live URL</label>
                    <input
                      type="url"
                      [(ngModel)]="projectFormData.liveUrl"
                      name="liveUrl"
                      class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                      placeholder="https://project-demo.com"
                    >
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    [(ngModel)]="projectFormData.technologies"
                    name="technologies"
                    class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                    placeholder="React, Node.js, MongoDB, AWS"
                  >
                </div>

                <!-- Featured Image -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Featured Image</label>
                  <div class="space-y-3 rounded-xl border border-line bg-white/[0.02] p-4">
                    <!-- File Upload Input -->
                    <input
                      type="file"
                      #featuredImageInput
                      (change)="onFeaturedImageSelected($event)"
                      accept="image/*"
                      class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                    >

                    <!-- Image Preview -->
                    <div *ngIf="selectedFeaturedImagePreview" class="mt-3">
                      <p class="text-muted text-sm mb-2">Preview:</p>
                      <img [src]="selectedFeaturedImagePreview" alt="Featured image preview" class="w-32 h-20 object-cover rounded-lg border border-line">
                    </div>

                    <!-- Current Image Display -->
                    <div *ngIf="projectFormData.featuredImage && !selectedFeaturedImagePreview" class="mt-3">
                      <p class="text-muted text-sm mb-2">Current Featured Image:</p>
                      <img [src]="getImageUrl(projectFormData.featuredImage)" alt="Current featured image" class="w-32 h-20 object-cover rounded-lg border border-line">
                    </div>
                  </div>
                </div>

                <!-- Multiple Project Images -->
                <div>
                  <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Project Images (up to 3)</label>
                  <div class="space-y-4">
                    <!-- Add Image Button -->
                    <div *ngIf="projectImages.length < 3" class="flex items-center gap-3">
                      <input
                        type="file"
                        #projectImageInput
                        id="projectImageInput"
                        (change)="onProjectImageSelected($event)"
                        accept="image/*"
                        class="flex-1 rounded-xl border border-line bg-surface2 px-4 py-3 text-ink file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                      >
                      <button
                        type="button"
                        (click)="addProjectImage()"
                        class="btn-primary !px-4 !py-2 text-sm"
                        [disabled]="!newProjectImage"
                      >
                        <app-icon name="image" [size]="16"></app-icon>
                        Add Image
                      </button>
                    </div>

                    <!-- Project Images List -->
                    <div *ngIf="projectImages.length > 0" class="space-y-3">
                      <div *ngFor="let image of projectImages; let i = index" class="flex items-center gap-3 p-3 rounded-xl border border-line bg-white/[0.02]">
                        <img [src]="getImageUrl(image.url)" [alt]="image.alt" class="w-16 h-12 object-cover rounded border border-line">
                        <div class="flex-1">
                          <input
                            type="text"
                            [(ngModel)]="image.alt"
                            name="imageAlt_{{i}}"
                            placeholder="Image description"
                            class="w-full rounded-lg border border-line bg-surface2 px-3 py-2 text-ink text-sm"
                          >
                          <input
                            type="text"
                            [(ngModel)]="image.caption"
                            name="imageCaption_{{i}}"
                            placeholder="Image caption (optional)"
                            class="w-full rounded-lg border border-line bg-surface2 px-3 py-2 text-ink text-sm mt-1"
                          >
                        </div>
                        <button
                          type="button"
                          (click)="removeProjectImage(i)"
                          class="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 p-2 text-red-300 transition-colors hover:bg-red-500/20"
                        >
                          <app-icon name="trash" [size]="16"></app-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <label class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      [(ngModel)]="projectFormData.featured"
                      name="featured"
                      class="w-4 h-4 accent-accent rounded border-line"
                    >
                    <span class="text-muted">Featured Project</span>
                  </label>
                </div>

                <div class="flex gap-4">
                  <button
                    type="submit"
                    class="btn-primary !px-4 !py-2 text-sm"
                    [disabled]="projectForm.invalid || isLoading"
                  >
                    <app-icon *ngIf="isLoading" name="loader" [size]="16" class="animate-spin"></app-icon>
                    <app-icon *ngIf="!isLoading" name="save" [size]="16"></app-icon>
                    {{ isLoading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project') }}
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

        <!-- Projects List -->
        <div *ngIf="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let project of projects; let i = index"
            class="group"
          >
            <div class="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
                <!-- Project Image -->
                <div *ngIf="project.image" class="mb-4">
                  <img
                    [src]="getImageUrl(project.image)"
                    [alt]="project.title + ' image'"
                    class="w-full h-32 object-cover rounded-lg border border-line"
                  >
                </div>

                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="font-display text-lg font-semibold text-ink">{{ project.title }}</h3>
                    <p class="text-muted text-sm">{{ project.shortDescription || 'No description' }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      (click)="editProject(project)"
                      class="w-8 h-8 rounded-lg border border-line bg-white/[0.03] flex items-center justify-center text-muted transition-colors hover:text-accent hover:border-accent/40"
                    >
                      <app-icon name="pencil" [size]="16"></app-icon>
                    </button>
                    <button
                      (click)="deleteProject(project.id)"
                      class="w-8 h-8 rounded-lg border border-red-500/25 bg-red-500/10 flex items-center justify-center text-red-300 transition-colors hover:bg-red-500/20"
                    >
                      <app-icon name="trash" [size]="16"></app-icon>
                    </button>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="chip"
                      [class]="getStatusClass(project.status)"
                    >
                      {{ project.status | titlecase }}
                    </span>
                    <span *ngIf="project.featured" class="chip !text-accent !border-accent/30 !bg-accent/10 gap-1">
                      <app-icon name="star" [size]="12"></app-icon>
                      Featured
                    </span>
                  </div>
                  <p class="text-muted text-sm line-clamp-3 project-description"
                     [innerHTML]="project.description"></p>
                </div>

                <div *ngIf="project.technologies && project.technologies.length > 0" class="mb-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      *ngFor="let tech of project.technologies"
                      class="chip"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div class="flex gap-2">
                  <a
                    *ngIf="project.githubUrl"
                    [href]="project.githubUrl"
                    target="_blank"
                    class="btn-ghost flex-1 !px-3 !py-2 text-sm"
                  >
                    <app-icon name="github" [size]="16"></app-icon>
                    GitHub
                  </a>
                  <a
                    *ngIf="project.liveUrl"
                    [href]="project.liveUrl"
                    target="_blank"
                    class="btn-ghost flex-1 !px-3 !py-2 text-sm"
                  >
                    <app-icon name="external-link" [size]="16"></app-icon>
                    Live Demo
                  </a>
                </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="projects.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <app-icon name="folder" [size]="48"></app-icon>
          </div>
          <h3 class="font-display text-2xl font-semibold text-ink mb-4">No Projects Added Yet</h3>
          <p class="text-muted text-lg mb-6">Start showcasing your work by adding your first project!</p>
          <button
            (click)="showAddForm = true"
            class="btn-primary !px-4 !py-2 text-sm"
          >
            <app-icon name="plus" [size]="16"></app-icon>
            Add Your First Project
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Project description HTML formatting for admin cards */
    .project-description {
      color: var(--muted, #9ca3af);
    }

    .project-description p {
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .project-description p:last-child {
      margin-bottom: 0;
    }

    .project-description ul {
      list-style: none;
      padding-left: 0;
      margin: 0.5rem 0;
    }

    .project-description li {
      display: flex;
      align-items: flex-start;
      gap: 0.25rem;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
    }

    .project-description li::before {
      content: "•";
      color: var(--accent, #a3e635);
      font-weight: bold;
      margin-right: 0.25rem;
      flex-shrink: 0;
    }

    .project-description ol {
      padding-left: 1rem;
      margin: 0.5rem 0;
    }

    .project-description ol li {
      padding-left: 0;
    }

    .project-description ol li::before {
      content: none;
    }

    .project-description strong {
      font-weight: 600;
      color: var(--ink, #f4f4f5);
    }

    .project-description em {
      font-style: italic;
      color: var(--muted, #9ca3af);
    }

    .project-description h1,
    .project-description h2,
    .project-description h3,
    .project-description h4,
    .project-description h5,
    .project-description h6 {
      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
      font-weight: 600;
      color: var(--ink, #f4f4f5);
    }

    .project-description h1 {
      font-size: 1rem;
    }

    .project-description h2 {
      font-size: 0.9rem;
    }

    .project-description h3 {
      font-size: 0.85rem;
    }

    .project-description blockquote {
      border-left: 2px solid var(--accent, #a3e635);
      padding-left: 0.5rem;
      margin: 0.5rem 0;
      font-style: italic;
      color: var(--muted, #9ca3af);
      background-color: rgba(163, 230, 53, 0.08);
      padding: 0.5rem;
      border-radius: 0.25rem;
    }

    .project-description code {
      background-color: rgba(255, 255, 255, 0.06);
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: 'Courier New', monospace;
      font-size: 0.75rem;
      color: var(--accent, #a3e635);
    }

    .project-description a {
      color: var(--accent, #a3e635);
      text-decoration: underline;
    }

    .project-description a:hover {
      opacity: 0.85;
    }
  `]
})
export class ProjectsManagementComponent implements OnInit {
  projects: Project[] = [];
  showAddForm = false;
  editingProject: Project | null = null;
  isLoading = false;
  projectFormData: any = {};
  selectedImagePreview: string | null = null;
  selectedFile: File | null = null;
  selectedFeaturedImagePreview: string | null = null;
  selectedFeaturedFile: File | null = null;
  projectImages: ProjectImage[] = [];
  newProjectImage: File | null = null;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>(`${environment.apiBaseUrl}/api/portfolio/projects`)
      .subscribe({
        next: (projects) => {
          this.projects = projects;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading projects:', error);
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

  onFeaturedImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFeaturedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFeaturedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProjectImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newProjectImage = file;
    }
  }

  async addProjectImage() {
    if (!this.newProjectImage) return;

    const token = localStorage.getItem('admin_token');
    if (!token) {
      console.error('No admin token found');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const formData = new FormData();
      formData.append('file', this.newProjectImage);

      const response = await this.http.post<any>(`${environment.apiBaseUrl}/api/upload`, formData, { headers }).toPromise();
      
      if (response && response.file && response.file._id) {
        const newImage: ProjectImage = {
          id: response.file._id,
          url: response.file._id,
          alt: this.newProjectImage.name.split('.')[0],
          caption: ''
        };
        
        this.projectImages.push(newImage);
        this.newProjectImage = null;
        
        // Clear the file input
        const fileInput = document.querySelector('#projectImageInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      console.error('Error uploading project image:', error);
    }
  }

  removeProjectImage(index: number) {
    this.projectImages.splice(index, 1);
  }

  onDescriptionChange(content: string) {
    this.projectFormData.description = content;
  }

  async saveProject() {
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
      let imageUrl = this.projectFormData.image;
      let featuredImageUrl = this.projectFormData.featuredImage;

      // Upload featured image if a new file is selected
      if (this.selectedFeaturedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFeaturedFile);
        
        const uploadResponse: any = await this.http.post(`${environment.apiBaseUrl}/api/upload`, formData, { headers }).toPromise();
        featuredImageUrl = uploadResponse.file._id;
      }

      // Upload main image if a new file is selected (for backward compatibility)
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        const uploadResponse: any = await this.http.post(`${environment.apiBaseUrl}/api/upload`, formData, { headers }).toPromise();
        imageUrl = uploadResponse.file._id;
      }

      const projectData = {
        title: this.projectFormData.title,
        description: this.projectFormData.description,
        shortDescription: this.projectFormData.shortDescription || '',
        image: imageUrl,
        featuredImage: featuredImageUrl,
        images: this.projectImages,
        technologies: this.projectFormData.technologies ? this.projectFormData.technologies.split(',').map((t: string) => t.trim()) : [],
        githubUrl: this.projectFormData.githubUrl || '',
        liveUrl: this.projectFormData.liveUrl || '',
        status: this.projectFormData.status,
        featured: this.projectFormData.featured || false,
        order: this.projects.length
      };

      if (this.editingProject) {
        // Update existing project
        this.http.put(`${environment.apiBaseUrl}/api/portfolio/admin/projects/${this.editingProject.id}`, projectData, { headers })
          .subscribe({
            next: () => {
              this.loadProjects();
              this.cancelEdit();
            },
            error: (error) => {
              console.error('Error updating project:', error);
              this.isLoading = false;
            }
          });
      } else {
        // Add new project
        this.http.post(`${environment.apiBaseUrl}/api/portfolio/admin/projects`, projectData, { headers })
          .subscribe({
            next: () => {
              this.loadProjects();
              this.cancelEdit();
            },
            error: (error) => {
              console.error('Error adding project:', error);
              this.isLoading = false;
            }
          });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.isLoading = false;
    }
  }

  editProject(project: Project) {
    this.editingProject = project;
    this.projectFormData = { 
      ...project, 
      technologies: project.technologies ? project.technologies.join(', ') : '' 
    };
    this.projectImages = project.images || [];
    this.showAddForm = true;
  }

  deleteProject(projectId: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${environment.apiBaseUrl}/api/portfolio/admin/projects/${projectId}`, { headers })
      .subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return '!text-accent !border-accent/30 !bg-accent/10';
      case 'in-progress':
        return '!text-amber-300 !border-amber-400/30 !bg-amber-500/10';
      case 'planned':
        return '!text-muted';
      default:
        return '!text-muted';
    }
  }

  cancelEdit() {
    this.editingProject = null;
    this.projectFormData = {};
    this.showAddForm = false;
    this.isLoading = false;
    this.selectedImagePreview = null;
    this.selectedFile = null;
    this.selectedFeaturedImagePreview = null;
    this.selectedFeaturedFile = null;
    this.projectImages = [];
    this.newProjectImage = null;
  }

  getImageUrl(image: string): string {
    // If it's already a full URL, return as is
    if (image.startsWith('http')) {
      return image;
    }
    // If it's a file ID, construct the API URL
    return `${environment.fileApiUrl}/${image}`;
  }
}
