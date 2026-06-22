import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout, catchError, of } from 'rxjs';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
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
  imports: [CommonModule, AdminNavComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <app-admin-nav></app-admin-nav>

      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold">Leads & Messages</h1>
            <p class="text-blue-200 text-sm mt-1">Enquiries submitted through the contact form.</p>
          </div>
          <div class="text-right text-sm text-blue-200">
            <span class="text-amber-300 font-semibold">{{ unread }}</span> unread ·
            <span class="text-blue-100 font-semibold">{{ messages.length }}</span> total
          </div>
        </div>

        <div *ngIf="isLoading" class="text-center py-16 text-blue-200">Loading…</div>
        <div *ngIf="!isLoading && messages.length === 0" class="text-center py-16 text-blue-300/60">
          No messages yet. Leads from the contact form will appear here.
        </div>

        <div *ngIf="!isLoading" class="space-y-4">
          <div *ngFor="let m of messages" class="bg-white/5 border rounded-2xl p-6"
               [ngClass]="m.read ? 'border-white/15' : 'border-amber-400/40'">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 flex-wrap">
                  <span class="font-semibold text-white">{{ m.name }}</span>
                  <a [href]="'mailto:' + m.email" class="text-cyan-300 hover:text-cyan-200 text-sm underline">{{ m.email }}</a>
                  <span *ngIf="!m.read" class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-200 border border-amber-400/30">New</span>
                </div>
                <div *ngIf="m.subject" class="text-sm text-blue-200 mt-1">Subject: {{ m.subject }}</div>
                <p class="text-blue-100 mt-3 leading-relaxed whitespace-pre-line">{{ m.message }}</p>
                <p class="text-xs text-blue-300/60 mt-2">{{ m.createdAt | date:'medium' }}</p>
              </div>
              <div class="flex md:flex-col gap-2 flex-shrink-0">
                <a [href]="'mailto:' + m.email + '?subject=' + replySubject(m)"
                   class="px-4 py-2 rounded-lg text-sm font-medium text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all">Reply</a>
                <button (click)="toggleRead(m)" class="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-blue-200 hover:bg-white/20 transition-all">
                  {{ m.read ? 'Mark unread' : 'Mark read' }}
                </button>
                <button (click)="remove(m)" class="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30 transition-all">Delete</button>
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
