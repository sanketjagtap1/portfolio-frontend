import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout, catchError, of } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { environment } from '../../../environments/environment';

interface AdminTestimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  email?: string;
  rating?: number;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

interface ReviewInvite {
  id: number;
  token: string;
  label?: string;
  used: boolean;
  usedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

@Component({
  selector: 'app-testimonials-management',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <app-admin-nav></app-admin-nav>

      <div class="container mx-auto px-4 py-8 space-y-10">
        <div>
          <h1 class="text-3xl font-bold">Testimonials</h1>
          <p class="text-blue-200 text-sm mt-1">Reviews are invitation-only. Generate a link below and share it with one person to collect a review.</p>
        </div>

        <!-- Generate review link -->
        <div class="bg-white/5 border border-white/15 rounded-2xl p-6">
          <h2 class="text-lg font-semibold mb-4">Create a review link</h2>
          <div class="flex flex-col md:flex-row gap-3 md:items-end">
            <div class="flex-1">
              <label class="block text-sm text-blue-100 mb-2">Who is this for? <span class="text-blue-300/60">(optional, for your reference)</span></label>
              <input [(ngModel)]="newLabel" name="newLabel" maxlength="100"
                     class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                     placeholder="e.g. John from Acme">
            </div>
            <div class="w-full md:w-40">
              <label class="block text-sm text-blue-100 mb-2">Expires in (days)</label>
              <input [(ngModel)]="newExpiry" name="newExpiry" type="number" min="0"
                     class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
                     placeholder="0 = never">
            </div>
            <button (click)="generateInvite()" [disabled]="generating"
                    class="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50">
              {{ generating ? 'Creating…' : 'Generate Link' }}
            </button>
          </div>

          <div *ngIf="lastLink" class="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
            <p class="text-sm text-cyan-200 mb-2">Share this single-use link:</p>
            <div class="flex gap-2">
              <input readonly [value]="lastLink" class="flex-1 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/20 text-cyan-100 text-sm">
              <button (click)="copy(lastLink)" class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">{{ copied === lastLink ? 'Copied!' : 'Copy' }}</button>
            </div>
          </div>
        </div>

        <!-- Existing invites -->
        <div class="bg-white/5 border border-white/15 rounded-2xl p-6">
          <h2 class="text-lg font-semibold mb-4">Review links</h2>
          <div *ngIf="invites.length === 0" class="text-blue-300/60 text-sm">No links yet.</div>
          <div class="space-y-3">
            <div *ngFor="let inv of invites" class="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium">{{ inv.label || 'Untitled' }}</span>
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium" [ngClass]="statusClass(inv)">{{ status(inv) }}</span>
                </div>
                <div class="text-xs text-blue-300/60 mt-1 truncate">{{ link(inv) }}</div>
              </div>
              <div class="flex gap-2 flex-shrink-0">
                <button *ngIf="status(inv) === 'Active'" (click)="copy(link(inv))" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">{{ copied === link(inv) ? 'Copied!' : 'Copy' }}</button>
                <button (click)="revoke(inv)" class="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 text-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Reviews</h2>
            <div class="text-right text-sm text-blue-200">
              <span class="text-amber-300 font-semibold">{{ pendingCount }}</span> pending ·
              <span class="text-green-300 font-semibold">{{ approvedCount }}</span> approved
            </div>
          </div>

          <div *ngIf="isLoading" class="text-center py-12 text-blue-200">Loading…</div>
          <div *ngIf="!isLoading && testimonials.length === 0" class="text-blue-300/60 text-sm">No reviews yet.</div>

          <div *ngIf="!isLoading" class="space-y-4">
            <div *ngFor="let t of testimonials" class="bg-white/5 border rounded-2xl p-6"
                 [ngClass]="t.approved ? 'border-white/15' : 'border-amber-400/40'">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 flex-wrap">
                    <span class="font-semibold text-white">{{ t.name }}</span>
                    <span *ngIf="t.position || t.company" class="text-sm text-blue-200">{{ t.position }}{{ t.position && t.company ? ', ' : '' }}{{ t.company }}</span>
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium" [ngClass]="t.approved ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'">{{ t.approved ? 'Approved' : 'Pending' }}</span>
                    <span *ngIf="t.featured" class="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-200 border border-blue-400/30">Featured</span>
                    <span *ngIf="t.rating" class="text-yellow-400 text-sm">{{ stars(t.rating) }}</span>
                  </div>
                  <p class="text-blue-100 mt-3 leading-relaxed">"{{ t.content }}"</p>
                  <p class="text-xs text-blue-300/60 mt-2">{{ t.createdAt | date:'medium' }}<span *ngIf="t.email"> · {{ t.email }}</span></p>
                </div>
                <div class="flex md:flex-col gap-2 flex-shrink-0">
                  <button (click)="toggleApprove(t)" class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                          [ngClass]="t.approved ? 'bg-white/10 text-blue-200 hover:bg-white/20' : 'bg-green-500/20 text-green-300 border border-green-400/30 hover:bg-green-500/30'">
                    {{ t.approved ? 'Unapprove' : 'Approve' }}
                  </button>
                  <button (click)="toggleFeature(t)" class="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-blue-200 hover:bg-white/20 transition-all">{{ t.featured ? 'Unfeature' : 'Feature' }}</button>
                  <button (click)="remove(t)" class="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition-all">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TestimonialsManagementComponent implements OnInit {
  testimonials: AdminTestimonial[] = [];
  invites: ReviewInvite[] = [];
  isLoading = true;

  newLabel = '';
  newExpiry: number | null = null;
  generating = false;
  lastLink = '';
  copied = '';

  private apiUrl = `${environment.apiBaseUrl}/api/portfolio/admin`;
  private origin = typeof window !== 'undefined' ? window.location.origin : '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('admin_token')) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.load();
    this.loadInvites();
  }

  get pendingCount(): number { return this.testimonials.filter(t => !t.approved).length; }
  get approvedCount(): number { return this.testimonials.filter(t => t.approved).length; }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('admin_token')}`);
  }

  stars(rating: number): string { return '★'.repeat(Math.max(0, Math.min(5, rating))); }

  link(inv: ReviewInvite): string { return `${this.origin}/review?token=${inv.token}`; }

  status(inv: ReviewInvite): string {
    if (inv.used) return 'Used';
    if (inv.expiresAt && new Date(inv.expiresAt) < new Date()) return 'Expired';
    return 'Active';
  }

  statusClass(inv: ReviewInvite): string {
    const s = this.status(inv);
    if (s === 'Used') return 'bg-blue-500/20 text-blue-200 border border-blue-400/30';
    if (s === 'Expired') return 'bg-slate-500/20 text-slate-300 border border-slate-400/30';
    return 'bg-green-500/20 text-green-300 border border-green-400/30';
  }

  copy(text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      this.copied = text;
      this.cdr.detectChanges();
      setTimeout(() => { this.copied = ''; this.cdr.detectChanges(); }, 2000);
    });
  }

  load() {
    this.isLoading = true;
    this.http.get<AdminTestimonial[]>(`${this.apiUrl}/testimonials`, { headers: this.headers() })
      .pipe(timeout(10000), catchError(() => of([] as AdminTestimonial[])))
      .subscribe(list => { this.testimonials = list || []; this.isLoading = false; this.cdr.detectChanges(); });
  }

  loadInvites() {
    this.http.get<ReviewInvite[]>(`${this.apiUrl}/review-invites`, { headers: this.headers() })
      .pipe(timeout(10000), catchError(() => of([] as ReviewInvite[])))
      .subscribe(list => { this.invites = list || []; this.cdr.detectChanges(); });
  }

  generateInvite() {
    this.generating = true;
    const body: any = { label: this.newLabel?.trim() || null };
    if (this.newExpiry && this.newExpiry > 0) body.expiresInDays = this.newExpiry;
    this.http.post<any>(`${this.apiUrl}/review-invites`, body, { headers: this.headers() })
      .subscribe({
        next: (res) => {
          this.generating = false;
          if (res?.invite) {
            this.lastLink = this.link(res.invite);
            this.invites.unshift(res.invite);
            this.newLabel = '';
            this.newExpiry = null;
          }
          this.cdr.detectChanges();
        },
        error: (e) => { this.generating = false; console.error(e); }
      });
  }

  revoke(inv: ReviewInvite) {
    if (!confirm('Delete this review link?')) return;
    this.http.delete(`${this.apiUrl}/review-invites/${inv.id}`, { headers: this.headers() })
      .subscribe({ next: () => { this.invites = this.invites.filter(x => x.id !== inv.id); this.cdr.detectChanges(); }, error: e => console.error(e) });
  }

  toggleApprove(t: AdminTestimonial) {
    this.http.put(`${this.apiUrl}/testimonials/${t.id}`, { approved: !t.approved }, { headers: this.headers() })
      .subscribe({ next: () => { t.approved = !t.approved; this.cdr.detectChanges(); }, error: e => console.error(e) });
  }

  toggleFeature(t: AdminTestimonial) {
    this.http.put(`${this.apiUrl}/testimonials/${t.id}`, { featured: !t.featured }, { headers: this.headers() })
      .subscribe({ next: () => { t.featured = !t.featured; this.cdr.detectChanges(); }, error: e => console.error(e) });
  }

  remove(t: AdminTestimonial) {
    if (!confirm('Delete this review permanently?')) return;
    this.http.delete(`${this.apiUrl}/testimonials/${t.id}`, { headers: this.headers() })
      .subscribe({ next: () => { this.testimonials = this.testimonials.filter(x => x.id !== t.id); this.cdr.detectChanges(); }, error: e => console.error(e) });
  }
}
