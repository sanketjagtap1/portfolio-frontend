import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { RichTextEditorComponent } from '../rich-text-editor/rich-text-editor.component';
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
  imports: [CommonModule, FormsModule, AdminNavComponent, RichTextEditorComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Projects Management</h1>
            <p class="text-cyan-200">Manage your portfolio projects and showcase your work</p>
          </div>
          <button 
            (click)="showAddForm = true"
            class="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all duration-300 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Project
          </button>
        </div>
        <!-- Add/Edit Form -->
        <div *ngIf="showAddForm" class="mb-8">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-2xl blur-lg"></div>
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 class="text-xl font-bold text-white mb-6">{{ editingProject ? 'Edit Project' : 'Add New Project' }}</h3>
              
              <form (ngSubmit)="saveProject()" #projectForm="ngForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-cyan-200 mb-2">Project Title</label>
                    <input 
                      type="text" 
                      [(ngModel)]="projectFormData.title" 
                      name="title"
                      required
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="e.g., E-commerce Website"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-cyan-200 mb-2">Status</label>
                    <select 
                      [(ngModel)]="projectFormData.status" 
                      name="status"
                      required
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                      <option value="" class="bg-slate-700 text-white">Select Status</option>
                      <option value="completed" class="bg-slate-700 text-white">Completed</option>
                      <option value="in-progress" class="bg-slate-700 text-white">In Progress</option>
                      <option value="planned" class="bg-slate-700 text-white">Planned</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-cyan-200 mb-2">Short Description</label>
                  <input 
                    type="text" 
                    [(ngModel)]="projectFormData.shortDescription" 
                    name="shortDescription"
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="Brief one-line description"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-cyan-200 mb-2">Description</label>
                  <app-rich-text-editor
                    [content]="projectFormData.description || ''"
                    placeholder="Enter detailed project description with formatting..."
                    (contentChange)="onDescriptionChange($event)"
                  ></app-rich-text-editor>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-cyan-200 mb-2">GitHub URL</label>
                    <input 
                      type="url" 
                      [(ngModel)]="projectFormData.githubUrl" 
                      name="githubUrl"
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="https://github.com/username/project"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-cyan-200 mb-2">Live URL</label>
                    <input 
                      type="url" 
                      [(ngModel)]="projectFormData.liveUrl" 
                      name="liveUrl"
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      placeholder="https://project-demo.com"
                    >
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-cyan-200 mb-2">Technologies (comma-separated)</label>
                  <input 
                    type="text" 
                    [(ngModel)]="projectFormData.technologies" 
                    name="technologies"
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="React, Node.js, MongoDB, AWS"
                  >
                </div>
                
                <!-- Featured Image -->
                <div>
                  <label class="block text-sm font-semibold text-cyan-200 mb-2">Featured Image</label>
                  <div class="space-y-3">
                    <!-- File Upload Input -->
                    <input 
                      type="file" 
                      #featuredImageInput
                      (change)="onFeaturedImageSelected($event)"
                      accept="image/*"
                      class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                    
                    <!-- Image Preview -->
                    <div *ngIf="selectedFeaturedImagePreview" class="mt-3">
                      <p class="text-cyan-200 text-sm mb-2">Preview:</p>
                      <img [src]="selectedFeaturedImagePreview" alt="Featured image preview" class="w-32 h-20 object-cover rounded-lg border border-white/20">
                    </div>
                    
                    <!-- Current Image Display -->
                    <div *ngIf="projectFormData.featuredImage && !selectedFeaturedImagePreview" class="mt-3">
                      <p class="text-cyan-200 text-sm mb-2">Current Featured Image:</p>
                      <img [src]="getImageUrl(projectFormData.featuredImage)" alt="Current featured image" class="w-32 h-20 object-cover rounded-lg border border-white/20">
                    </div>
                  </div>
                </div>

                <!-- Multiple Project Images -->
                <div>
                  <label class="block text-sm font-semibold text-cyan-200 mb-2">Project Images (up to 3)</label>
                  <div class="space-y-4">
                    <!-- Add Image Button -->
                    <div *ngIf="projectImages.length < 3" class="flex items-center gap-3">
                      <input 
                        type="file" 
                        #projectImageInput
                        id="projectImageInput"
                        (change)="onProjectImageSelected($event)"
                        accept="image/*"
                        class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      >
                      <button 
                        type="button"
                        (click)="addProjectImage()"
                        class="px-4 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all duration-300"
                        [disabled]="!newProjectImage"
                      >
                        Add Image
                      </button>
                    </div>

                    <!-- Project Images List -->
                    <div *ngIf="projectImages.length > 0" class="space-y-3">
                      <div *ngFor="let image of projectImages; let i = index" class="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <img [src]="getImageUrl(image.url)" [alt]="image.alt" class="w-16 h-12 object-cover rounded border border-white/20">
                        <div class="flex-1">
                          <input 
                            type="text" 
                            [(ngModel)]="image.alt" 
                            name="imageAlt_{{i}}"
                            placeholder="Image description"
                            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-cyan-300 text-sm focus:outline-none focus:border-cyan-400"
                          >
                          <input 
                            type="text" 
                            [(ngModel)]="image.caption" 
                            name="imageCaption_{{i}}"
                            placeholder="Image caption (optional)"
                            class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-cyan-300 text-sm mt-1 focus:outline-none focus:border-cyan-400"
                          >
                        </div>
                        <button 
                          type="button"
                          (click)="removeProjectImage(i)"
                          class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-all duration-200"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
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
                      class="w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-400"
                    >
                    <span class="text-cyan-200">Featured Project</span>
                  </label>
                </div>
                
                <div class="flex gap-4">
                  <button 
                    type="submit" 
                    class="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all duration-300"
                    [disabled]="projectForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project') }}
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

        <!-- Projects List -->
        <div *ngIf="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let project of projects; let i = index" 
            class="group"
          >
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-cyan-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-cyan-400/50">
                <!-- Project Image -->
                <div *ngIf="project.image" class="mb-4">
                  <img 
                    [src]="getImageUrl(project.image)" 
                    [alt]="project.title + ' image'"
                    class="w-full h-32 object-cover rounded-lg border border-white/20"
                  >
                </div>
                
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-bold text-white">{{ project.title }}</h3>
                    <p class="text-cyan-200 text-sm">{{ project.shortDescription || 'No description' }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      (click)="editProject(project)"
                      class="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center hover:bg-cyan-500/40 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="deleteProject(project.id)"
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
                  <div class="flex items-center gap-2 mb-2">
                    <span 
                      class="px-2 py-1 rounded-lg text-xs font-semibold"
                      [class]="getStatusClass(project.status)"
                    >
                      {{ project.status | titlecase }}
                    </span>
                    <span *ngIf="project.featured" class="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-semibold">
                      ⭐ Featured
                    </span>
                  </div>
                  <p class="text-cyan-200 text-sm line-clamp-3 project-description" 
                     [innerHTML]="project.description"></p>
                </div>
                
                <div *ngIf="project.technologies && project.technologies.length > 0" class="mb-4">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      *ngFor="let tech of project.technologies" 
                      class="px-2 py-1 bg-cyan-500/20 text-cyan-200 rounded-lg text-xs"
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
                    class="flex-1 px-3 py-2 bg-gray-500/20 text-gray-300 rounded-lg text-center text-sm hover:bg-gray-500/40 transition-all duration-300"
                  >
                    GitHub
                  </a>
                  <a 
                    *ngIf="project.liveUrl" 
                    [href]="project.liveUrl" 
                    target="_blank"
                    class="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-center text-sm hover:bg-cyan-500/40 transition-all duration-300"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="projects.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">No Projects Added Yet</h3>
          <p class="text-cyan-200 text-lg mb-6">Start showcasing your work by adding your first project!</p>
          <button 
            (click)="showAddForm = true"
            class="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-all duration-300"
          >
            Add Your First Project
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    /* Select dropdown styling for dark theme */
    select {
      background-color: #334155 !important; /* slate-700 */
      color: #ffffff !important;
      border-color: #475569 !important; /* slate-600 */
    }
    
    select option {
      background-color: #334155 !important; /* slate-700 */
      color: #ffffff !important;
    }
    
    select:focus {
      border-color: #06b6d4 !important; /* cyan-500 */
      box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2) !important;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    /* Project description HTML formatting for admin cards */
    .project-description {
      color: #22d3ee !important; /* Purple-200 */
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
      color: #06b6d4; /* Purple-500 */
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
      color: #cffafe; /* Purple-100 */
    }
    
    .project-description em {
      font-style: italic;
      color: #22d3ee; /* Purple-200 */
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
      color: #cffafe; /* Purple-100 */
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
      border-left: 2px solid #06b6d4;
      padding-left: 0.5rem;
      margin: 0.5rem 0;
      font-style: italic;
      color: #22d3ee;
      background-color: rgba(6, 182, 212, 0.1);
      padding: 0.5rem;
      border-radius: 0.25rem;
    }
    
    .project-description code {
      background-color: rgba(6, 182, 212, 0.2);
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-family: 'Courier New', monospace;
      font-size: 0.75rem;
      color: #fbbf24; /* Yellow-400 */
    }
    
    .project-description a {
      color: #60a5fa; /* Blue-400 */
      text-decoration: underline;
    }
    
    .project-description a:hover {
      color: #93c5fd; /* Blue-300 */
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
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
        return 'bg-green-500/20 text-green-300';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'planned':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
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
