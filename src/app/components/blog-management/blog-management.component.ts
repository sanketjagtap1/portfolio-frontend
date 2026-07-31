import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { RichTextEditorComponent } from '../rich-text-editor/rich-text-editor.component';
import { IconComponent } from '../ui/icon.component';
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
            <span class="kicker mb-3">BLOG</span>
            <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Blog Management</h1>
            <p class="text-muted mt-2">Create and manage blog posts to share your knowledge</p>
          </div>
          <button
            (click)="showAddForm = true"
            class="btn-primary !px-4 !py-2 text-sm"
          >
            <app-icon name="plus" [size]="20"></app-icon>
            New Post
          </button>
        </div>
        <!-- Add/Edit Form -->
        <div *ngIf="showAddForm" class="mb-8">
          <div class="rounded-2xl border border-line bg-surface p-6">
            <h3 class="font-display text-xl font-semibold text-ink mb-6">{{ editingPost ? 'Edit Blog Post' : 'Create New Blog Post' }}</h3>

            <form (ngSubmit)="savePost()" #postForm="ngForm" class="space-y-4">
              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Title</label>
                <input
                  type="text"
                  [(ngModel)]="postFormData.title"
                  name="title"
                  required
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="Enter blog post title"
                >
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Excerpt</label>
                <textarea
                  [(ngModel)]="postFormData.excerpt"
                  name="excerpt"
                  rows="3"
                  maxlength="500"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="Brief summary of the post (plain text, max 500 characters)..."
                ></textarea>
                <div class="text-xs text-faint mt-1">
                  {{ (postFormData.excerpt || '').length }}/500 characters
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Content</label>
                <div class="mb-4">
                  <div class="flex gap-2 mb-2">
                    <button
                      type="button"
                      (click)="showPreview = false"
                      class="rounded-full px-4 py-2 text-sm transition-colors"
                      [class]="!showPreview ? 'bg-accent/10 text-accent border border-accent/30' : 'border border-line bg-white/[0.02] text-muted hover:bg-white/[0.05]'"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      (click)="showPreview = true"
                      class="rounded-full px-4 py-2 text-sm transition-colors"
                      [class]="showPreview ? 'bg-accent/10 text-accent border border-accent/30' : 'border border-line bg-white/[0.02] text-muted hover:bg-white/[0.05]'"
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
                <div *ngIf="showPreview" class="rounded-xl border border-line bg-white/[0.02] p-6 min-h-[200px]">
                  <div class="prose prose-lg max-w-none prose-invert" [innerHTML]="getPreviewContent()"></div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  [(ngModel)]="postFormData.tags"
                  name="tags"
                  class="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-ink"
                  placeholder="web development, javascript, tutorial"
                >
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-[0.15em] text-faint mb-2">Featured Image</label>
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
                    <p class="text-muted text-sm mb-2 flex items-center gap-2"><app-icon name="image" [size]="16"></app-icon> Preview:</p>
                    <img [src]="selectedImagePreview" alt="Featured image preview" class="w-48 h-32 object-cover rounded-lg border border-line">
                  </div>

                  <!-- Current Image Display -->
                  <div *ngIf="postFormData.featuredImage && !selectedImagePreview" class="mt-3">
                    <p class="text-muted text-sm mb-2 flex items-center gap-2"><app-icon name="image" [size]="16"></app-icon> Current Featured Image:</p>
                    <img [src]="getImageUrl(postFormData.featuredImage)" alt="Current featured image" class="w-48 h-32 object-cover rounded-lg border border-line">
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    [(ngModel)]="postFormData.published"
                    name="published"
                    class="w-4 h-4 rounded"
                  >
                  <span class="text-muted">Publish immediately</span>
                </label>
              </div>

              <div class="flex gap-4">
                <button
                  type="submit"
                  class="btn-primary !px-4 !py-2 text-sm"
                  [disabled]="postForm.invalid || isLoading"
                >
                  <app-icon *ngIf="isLoading" name="loader" [size]="16" class="animate-spin"></app-icon>
                  <app-icon *ngIf="!isLoading" name="save" [size]="16"></app-icon>
                  {{ isLoading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post') }}
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

        <!-- Blog Posts List -->
        <div *ngIf="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let post of posts; let i = index"
            class="group"
          >
            <div class="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/30">
              <!-- Featured Image -->
              <div *ngIf="post.featuredImage" class="mb-4">
                <img
                  [src]="getImageUrl(post.featuredImage)"
                  [alt]="post.title + ' featured image'"
                  class="w-full h-32 object-cover rounded-lg border border-line"
                >
              </div>

              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="font-display text-lg font-semibold text-ink line-clamp-2">{{ post.title }}</h3>
                  <p class="text-faint text-sm flex items-center gap-1.5 mt-1"><app-icon name="calendar" [size]="14"></app-icon> {{ formatDate(post.createdAt) }}</p>
                </div>
                <div class="flex gap-2">
                  <button
                    (click)="editPost(post)"
                    class="w-8 h-8 rounded-lg border border-line bg-white/[0.02] flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                  >
                    <app-icon name="pencil" [size]="16"></app-icon>
                  </button>
                  <button
                    (click)="deletePost(post.id)"
                    class="w-8 h-8 rounded-lg border border-red-500/25 bg-red-500/10 flex items-center justify-center text-red-300 hover:bg-red-500/20 transition-colors"
                  >
                    <app-icon name="trash" [size]="16"></app-icon>
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="chip"
                    [class]="post.published ? '!text-accent !border-accent/30 !bg-accent/10' : '!text-amber-300 !border-amber-400/30 !bg-amber-500/10'"
                  >
                    {{ post.published ? 'Published' : 'Draft' }}
                  </span>
                </div>
                <p class="text-muted text-sm line-clamp-3">{{ post.excerpt }}</p>
              </div>

              <div *ngIf="post.tags && post.tags.length > 0" class="mb-4">
                <div class="flex flex-wrap gap-1">
                  <span
                    *ngFor="let tag of post.tags"
                    class="chip"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="flex gap-2">
                <button
                  (click)="togglePublish(post)"
                  class="flex-1 rounded-full border border-line bg-white/[0.02] px-3 py-2 text-center text-sm text-muted hover:bg-white/[0.05] transition-colors"
                >
                  {{ post.published ? 'Unpublish' : 'Publish' }}
                </button>
                <button
                  (click)="viewPost(post.slug)"
                  class="flex-1 rounded-full border border-line bg-white/[0.02] px-3 py-2 text-center text-sm text-muted hover:text-accent hover:border-accent/30 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <app-icon name="eye" [size]="16"></app-icon>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="posts.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <app-icon name="file-text" [size]="48"></app-icon>
          </div>
          <h3 class="font-display text-2xl font-semibold text-ink mb-4">No Blog Posts Yet</h3>
          <p class="text-muted text-lg mb-6">Start sharing your knowledge by creating your first blog post!</p>
          <button
            (click)="showAddForm = true"
            class="btn-primary !px-4 !py-2 text-sm"
          >
            <app-icon name="plus" [size]="16"></app-icon>
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
      color: #38bdf8;
    }

    .prose-invert a {
      color: #0ea5e9;
    }

    .prose-invert a:hover {
      color: #38bdf8;
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
      border-left-color: #0ea5e9;
      background-color: rgba(14, 165, 233, 0.1);
      color: #38bdf8;
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
    this.http.get<{blogs: BlogPost[]}>(`${environment.apiBaseUrl}/api/blog?status=all`)
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
    return this.postFormData.content || '<p class="text-faint italic">No content to preview yet...</p>';
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
        
        const uploadResponse: any = await this.http.post(`${environment.apiBaseUrl}/api/upload`, formData, { headers }).toPromise();
        featuredImageUrl = uploadResponse.file._id; // Store the stored filename returned by the API
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
        this.http.put(`${environment.apiBaseUrl}/api/blog/${this.editingPost.id}`, postData, { headers })
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
        this.http.post(`${environment.apiBaseUrl}/api/blog`, postData, { headers })
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

    this.http.delete(`${environment.apiBaseUrl}/api/blog/${postId}`, { headers })
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

    this.http.put(`${environment.apiBaseUrl}/api/blog/${post.id}`, updateData, { headers })
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
    return `${environment.fileApiUrl}/${image}`;
  }
}
