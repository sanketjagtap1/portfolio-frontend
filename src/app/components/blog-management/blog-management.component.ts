import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { RichTextEditorComponent } from '../rich-text-editor/rich-text-editor.component';
import { environment } from '../../../environments/environment';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  published: boolean;
  publishedAt: string;
  tags: string[];
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent, RichTextEditorComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900">
      <!-- Admin Navigation -->
      <app-admin-nav></app-admin-nav>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Blog Management</h1>
            <p class="text-orange-200">Create and manage blog posts to share your knowledge</p>
          </div>
          <button 
            (click)="showAddForm = true"
            class="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300 flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Post
          </button>
        </div>
        <!-- Add/Edit Form -->
        <div *ngIf="showAddForm" class="mb-8">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg"></div>
            <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 class="text-xl font-bold text-white mb-6">{{ editingPost ? 'Edit Blog Post' : 'Create New Blog Post' }}</h3>
              
              <form (ngSubmit)="savePost()" #postForm="ngForm" class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-orange-200 mb-2">Title</label>
                  <input 
                    type="text" 
                    [(ngModel)]="postFormData.title" 
                    name="title"
                    required
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Enter blog post title"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-orange-200 mb-2">Excerpt</label>
                  <textarea 
                    [(ngModel)]="postFormData.excerpt" 
                    name="excerpt"
                    rows="3"
                    maxlength="500"
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Brief summary of the post (plain text, max 500 characters)..."
                  ></textarea>
                  <div class="text-xs text-orange-300 mt-1">
                    {{ (postFormData.excerpt || '').length }}/500 characters
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-orange-200 mb-2">Content</label>
                  <div class="mb-4">
                    <div class="flex gap-2 mb-2">
                      <button 
                        type="button"
                        (click)="showPreview = false"
                        class="px-3 py-1 rounded-lg text-sm transition-all duration-300"
                        [class]="!showPreview ? 'bg-orange-500 text-white' : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/40'"
                      >
                        Edit
                      </button>
                      <button 
                        type="button"
                        (click)="showPreview = true"
                        class="px-3 py-1 rounded-lg text-sm transition-all duration-300"
                        [class]="showPreview ? 'bg-orange-500 text-white' : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/40'"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  
                  <!-- Rich Text Editor -->
                  <div *ngIf="!showPreview">
                    <app-rich-text-editor
                      [content]="postFormData.content || ''"
                      [placeholder]="'Write your blog post content here...'"
                      (contentChange)="onContentChange($event)"
                    ></app-rich-text-editor>
                  </div>
                  
                  <!-- Preview -->
                  <div *ngIf="showPreview" class="bg-slate-700 rounded-lg p-6 border border-slate-600 min-h-[200px]">
                    <div class="prose prose-lg max-w-none prose-invert" [innerHTML]="getPreviewContent()"></div>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-orange-200 mb-2">Tags (comma-separated)</label>
                  <input 
                    type="text" 
                    [(ngModel)]="postFormData.tags" 
                    name="tags"
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    placeholder="web development, javascript, tutorial"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-orange-200 mb-2">Featured Image</label>
                  <div class="space-y-3">
                    <!-- File Upload Input -->
                    <input 
                      type="file" 
                      #fileInput
                      (change)="onFileSelected($event)"
                      accept="image/*"
                      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
                    >
                    
                    <!-- Image Preview -->
                    <div *ngIf="selectedImagePreview" class="mt-3">
                      <p class="text-orange-200 text-sm mb-2">Preview:</p>
                      <img [src]="selectedImagePreview" alt="Featured image preview" class="w-48 h-32 object-cover rounded-lg border border-white/20">
                    </div>
                    
                    <!-- Current Image Display -->
                    <div *ngIf="postFormData.featuredImage && !selectedImagePreview" class="mt-3">
                      <p class="text-orange-200 text-sm mb-2">Current Featured Image:</p>
                      <img [src]="getImageUrl(postFormData.featuredImage)" alt="Current featured image" class="w-48 h-32 object-cover rounded-lg border border-white/20">
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <label class="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      [(ngModel)]="postFormData.published" 
                      name="published"
                      class="w-4 h-4 text-orange-500 bg-slate-700 border-slate-600 rounded focus:ring-orange-400"
                    >
                    <span class="text-orange-200">Publish immediately</span>
                  </label>
                </div>
                
                <div class="flex gap-4">
                  <button 
                    type="submit" 
                    class="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300"
                    [disabled]="postForm.invalid || isLoading"
                  >
                    {{ isLoading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post') }}
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

        <!-- Blog Posts List -->
        <div *ngIf="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let post of posts; let i = index" 
            class="group"
          >
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div class="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-orange-500/25 transition-all duration-500 hover:-translate-y-2 group-hover:border-orange-400/50">
                <!-- Featured Image -->
                <div *ngIf="post.featuredImage" class="mb-4">
                  <img 
                    [src]="getImageUrl(post.featuredImage)" 
                    [alt]="post.title + ' featured image'"
                    class="w-full h-32 object-cover rounded-lg border border-white/20"
                  >
                </div>
                
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-bold text-white line-clamp-2">{{ post.title }}</h3>
                    <p class="text-orange-200 text-sm">{{ formatDate(post.createdAt) }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button 
                      (click)="editPost(post)"
                      class="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center hover:bg-orange-500/40 transition-all duration-300"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      (click)="deletePost(post.id)"
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
                      [class]="post.published ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'"
                    >
                      {{ post.published ? 'Published' : 'Draft' }}
                    </span>
                  </div>
                  <p class="text-orange-200 text-sm line-clamp-3">{{ post.excerpt }}</p>
                </div>
                
                <div *ngIf="post.tags && post.tags.length > 0" class="mb-4">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      *ngFor="let tag of post.tags" 
                      class="px-2 py-1 bg-orange-500/20 text-orange-200 rounded-lg text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                
                <div class="flex gap-2">
                  <button 
                    (click)="togglePublish(post)"
                    class="flex-1 px-3 py-2 rounded-lg text-center text-sm transition-all duration-300"
                    [class]="post.published ? 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/40' : 'bg-green-500/20 text-green-300 hover:bg-green-500/40'"
                  >
                    {{ post.published ? 'Unpublish' : 'Publish' }}
                  </button>
                  <button 
                    (click)="viewPost(post.slug)"
                    class="flex-1 px-3 py-2 bg-orange-500/20 text-orange-300 rounded-lg text-center text-sm hover:bg-orange-500/40 transition-all duration-300"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="posts.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h3>
          <p class="text-orange-200 text-lg mb-6">Start sharing your knowledge by creating your first blog post!</p>
          <button 
            (click)="showAddForm = true"
            class="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300"
          >
            Create Your First Post
          </button>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    /* Preview content styling for dark theme */
    .prose-invert {
      color: #e2e8f0;
    }

    .prose-invert h1,
    .prose-invert h2,
    .prose-invert h3,
    .prose-invert h4,
    .prose-invert h5,
    .prose-invert h6 {
      color: #ffffff;
    }

    .prose-invert p {
      color: #cbd5e1;
    }

    .prose-invert strong {
      color: #ffffff;
    }

    .prose-invert em {
      color: #a78bfa;
    }

    .prose-invert a {
      color: #8b5cf6;
    }

    .prose-invert a:hover {
      color: #a78bfa;
    }

    .prose-invert code {
      background-color: rgba(0, 0, 0, 0.4);
      color: #fbbf24;
    }

    .prose-invert pre {
      background-color: rgba(0, 0, 0, 0.4);
      color: #e2e8f0;
    }

    .prose-invert blockquote {
      border-left-color: #8b5cf6;
      background-color: rgba(139, 92, 246, 0.1);
      color: #a78bfa;
    }

    .prose-invert ul,
    .prose-invert ol {
      color: #cbd5e1;
    }

    .prose-invert li {
      color: #cbd5e1;
    }
  `]
})
export class BlogManagementComponent implements OnInit {
  posts: BlogPost[] = [];
  showAddForm = false;
  showPreview = false;
  editingPost: BlogPost | null = null;
  isLoading = false;
  postFormData: any = {};
  selectedImagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get<{blogs: BlogPost[]}>(`${environment.apiBaseUrl}/blog?status=all`)
      .subscribe({
        next: (response) => {
          this.posts = response.blogs;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading posts:', error);
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

  onContentChange(content: string) {
    this.postFormData.content = content;
  }

  getPreviewContent(): string {
    return this.postFormData.content || '<p class="text-slate-400 italic">No content to preview yet...</p>';
  }

  async savePost() {
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
      let featuredImageUrl = this.postFormData.featuredImage;

      // Upload image if a new file is selected
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        const uploadResponse: any = await this.http.post('http://dev-api.technootales.in/v1/cloud/file', formData).toPromise();
        featuredImageUrl = uploadResponse.file._id; // Store the file ID returned by the API
      }

      const postData = {
        title: this.postFormData.title,
        content: this.postFormData.content,
        excerpt: this.postFormData.excerpt,
        featuredImage: featuredImageUrl,
        published: this.postFormData.published || false,
        tags: this.postFormData.tags ? this.postFormData.tags.split(',').map((t: string) => t.trim()) : []
      };

      if (this.editingPost) {
        // Update existing post
        this.http.put(`${environment.apiBaseUrl}/blog/${this.editingPost.id}`, postData, { headers })
          .subscribe({
            next: () => {
              this.loadPosts();
              this.cancelEdit();
            },
            error: (error) => {
              console.error('Error updating post:', error);
              this.isLoading = false;
            }
          });
      } else {
        // Add new post
        this.http.post(`${environment.apiBaseUrl}/blog`, postData, { headers })
          .subscribe({
            next: () => {
              this.loadPosts();
              this.cancelEdit();
            },
            error: (error) => {
              console.error('Error adding post:', error);
              this.isLoading = false;
            }
          });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.isLoading = false;
    }
  }

  editPost(post: BlogPost) {
    this.editingPost = post;
    this.postFormData = { 
      ...post, 
      tags: post.tags ? post.tags.join(', ') : '' 
    };
    this.showAddForm = true;
  }

  deletePost(postId: number) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${environment.apiBaseUrl}/blog/${postId}`, { headers })
      .subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
  }

  togglePublish(post: BlogPost) {
    const token = localStorage.getItem('admin_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const updateData = {
      published: !post.published
    };

    this.http.put(`${environment.apiBaseUrl}/blog/${post.id}`, updateData, { headers })
      .subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error toggling publish status:', error);
        }
      });
  }

  viewPost(slug: string) {
    window.open(`/blog/${slug}`, '_blank');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  cancelEdit() {
    this.editingPost = null;
    this.postFormData = {};
    this.showAddForm = false;
    this.showPreview = false;
    this.isLoading = false;
    this.selectedImagePreview = null;
    this.selectedFile = null;
  }

  getImageUrl(image: string): string {
    // If it's already a full URL, return as is
    if (image.startsWith('http')) {
      return image;
    }
    // If it's a file ID, construct the API URL
    return `http://dev-api.technootales.in/v1/cloud/file/${image}`;
  }
}
