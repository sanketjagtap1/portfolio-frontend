import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout, catchError, of } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { IconComponent } from '../ui/icon.component';
import { environment } from '../../../environments/environment';

interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-messages-management',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, IconComponent],
  template: `
    <div class="min-h-screen bg-canvas text-ink">
      <app-admin-nav></app-admin-nav>

      <div class="mx-auto max-w-shell px-4 md:px-6 py-8 md:py-10">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span class="kicker mb-3">Inbox</span>
            <h1 class="font-display text-3xl md:text-4xl font-semibold text-ink mt-3">Leads &amp; Messages</h1>
            <p class="text-muted mt-2 text-sm">Enquiries submitted through your contact form.</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="chip !text-accent !border-accent/30 !bg-accent/10">{{ unread }} unread</span>
            <span class="chip">{{ messages.length }} total</span>
          </div>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading" class="flex items-center justify-center gap-2 py-20 text-muted">
          <app-icon name="loader" [size]="18" class="animate-spin"></app-icon> Loading…
        </div>

        <!-- Empty -->
        <div *ngIf="!isLoading && messages.length === 0" class="card flex flex-col items-center text-center py-16">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-faint mb-4">
            <app-icon name="inbox" [size]="24"></app-icon>
          </span>
          <p class="text-ink font-medium">No messages yet</p>
          <p class="text-faint text-sm mt-1">Leads from the contact form will appear here.</p>
        </div>

        <!-- List -->
        <div *ngIf="!isLoading" class="space-y-3">
          <div
            *ngFor="let m of messages"
            class="card !p-5 transition-colors"
            [ngClass]="m.read ? '' : 'border-accent/40 bg-accent/[0.03]'"
          >
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <span class="font-semibold text-ink">{{ m.name }}</span>
                  <a [href]="'mailto:' + m.email" class="text-accent hover:brightness-110 text-sm">{{ m.email }}</a>
                  <span *ngIf="!m.read" class="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30">New</span>
                </div>
                <div *ngIf="m.subject" class="text-sm text-muted mt-1.5">
                  <span class="text-faint">Subject:</span> {{ m.subject }}
                </div>
                <p class="text-ink/90 mt-3 leading-relaxed whitespace-pre-line">{{ m.message }}</p>
                <p class="flex items-center gap-1.5 text-xs text-faint mt-3">
                  <app-icon name="clock" [size]="13"></app-icon>
                  {{ m.createdAt | date:'medium' }}
                </p>
              </div>
              <div class="flex md:flex-col gap-2 flex-shrink-0">
                <a [href]="'mailto:' + m.email + '?subject=' + replySubject(m)"
                   class="btn-primary !px-4 !py-2 text-sm">
                  <app-icon name="mail" [size]="15"></app-icon> Reply
                </a>
                <button (click)="toggleRead(m)"
                   class="btn-ghost !px-4 !py-2 text-sm">
                  <app-icon [name]="m.read ? 'eye-off' : 'check'" [size]="15"></app-icon>
                  {{ m.read ? 'Unread' : 'Read' }}
                </button>
                <button (click)="remove(m)"
                   class="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20">
                  <app-icon name="trash" [size]="15"></app-icon> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MessagesManagementComponent implements OnInit {
  messages: Message[] = [];
  unread = 0;
  isLoading = true;
  private apiUrl = `${environment.apiBaseUrl}/api/portfolio/admin`;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('admin_token')) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.load();
  }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('admin_token')}`);
  }

  replySubject(m: Message): string {
    return encodeURIComponent('Re: ' + (m.subject || 'Your enquiry'));
  }

  load() {
    this.isLoading = true;
    this.http.get<{ messages: Message[]; unread: number }>(`${this.apiUrl}/messages`, { headers: this.headers() })
      .pipe(timeout(10000), catchError(() => of({ messages: [] as Message[], unread: 0 })))
      .subscribe(res => {
        this.messages = res.messages || [];
        this.unread = res.unread || 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  toggleRead(m: Message) {
    this.http.put(`${this.apiUrl}/messages/${m.id}`, { read: !m.read }, { headers: this.headers() })
      .subscribe({
        next: () => { m.read = !m.read; this.unread = this.messages.filter(x => !x.read).length; this.cdr.detectChanges(); },
        error: e => console.error(e)
      });
  }

  remove(m: Message) {
    if (!confirm('Delete this message?')) return;
    this.http.delete(`${this.apiUrl}/messages/${m.id}`, { headers: this.headers() })
      .subscribe({
        next: () => { this.messages = this.messages.filter(x => x.id !== m.id); this.unread = this.messages.filter(x => !x.read).length; this.cdr.detectChanges(); },
        error: e => console.error(e)
      });
  }
}
