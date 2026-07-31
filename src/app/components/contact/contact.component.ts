import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, ContactInfo, SocialLink } from '../../services/portfolio.service';
import { timeout, catchError, of } from 'rxjs';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <section id="contact" class="section min-h-screen">
      <div class="mx-auto max-w-shell px-6">
        <!-- Header -->
        <div class="max-w-2xl" data-aos="fade-up">
          <p class="kicker">Contact</p>
          <h2 class="mt-4 font-display text-4xl md:text-6xl font-semibold tracking-tightest text-ink">
            Let's build something
          </h2>
          <p class="mt-4 text-lg text-muted">
            Have a project in mind, or not sure where to start? Tell me what you need —
            I read every message personally and reply within a day.
          </p>
        </div>

        <div class="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <!-- Left: contact + socials -->
          <div class="space-y-4" data-aos="fade-up">
            <div *ngFor="let contact of contactInfo"
                 class="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
                <app-icon [name]="iconForType(contact.type)" [size]="20"></app-icon>
              </div>
              <div class="min-w-0">
                <div class="font-mono text-xs uppercase tracking-[0.12em] text-faint">{{ getContactTypeLabel(contact.type) }}</div>
                <a *ngIf="isClickableContact(contact.type)" [href]="getContactHref(contact.type, contact.value)"
                   [attr.target]="contact.type === 'linkedin' ? '_blank' : null"
                   class="truncate text-ink hover:text-accent transition-colors">{{ contact.value }}</a>
                <span *ngIf="!isClickableContact(contact.type)" class="text-ink">{{ contact.value }}</span>
              </div>
            </div>

            <div class="rounded-2xl border border-line bg-surface p-5">
              <div class="font-mono text-xs uppercase tracking-[0.12em] text-faint">Follow me</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <a *ngFor="let social of socialLinks" [href]="social.url" target="_blank" rel="noopener noreferrer"
                   [attr.aria-label]="social.platform"
                   class="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40">
                  <app-icon [name]="iconForPlatform(social.platform)" [size]="16"></app-icon>
                  {{ getContactTypeLabel(social.platform) }}
                </a>
              </div>
            </div>
          </div>

          <!-- Right: form -->
          <div class="rounded-2xl border border-line bg-surface p-6 md:p-8" data-aos="fade-up">
            <h3 class="font-display text-xl font-semibold text-ink">Send a message</h3>

            <div *ngIf="submitSuccess" role="status" class="mt-5 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent">
              Thanks — your message has been received. I'll get back to you within a day. You can also reach me at
              <a [href]="'mailto:' + recipientEmailDisplay" class="font-medium underline">{{ recipientEmailDisplay }}</a>.
            </div>
            <div *ngIf="submitError" role="alert" class="mt-5 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">
              Something went wrong. Email me directly at
              <a [href]="'mailto:' + recipientEmailDisplay" class="font-medium underline">{{ recipientEmailDisplay }}</a>.
            </div>

            <form (ngSubmit)="onSubmit()" (input)="dismissStatus()" #contactForm="ngForm" class="mt-6 space-y-5">
              <div>
                <label for="name" class="mb-1.5 block text-xs font-medium text-muted">Name</label>
                <input type="text" id="name" name="name" [(ngModel)]="formData.name" required minlength="2" #name="ngModel"
                       class="w-full rounded-xl border px-4 py-3 text-sm outline-none" placeholder="Your full name" />
                <p class="mt-1 text-xs text-red-400" *ngIf="name.invalid && name.touched">Please enter your name.</p>
              </div>
              <div>
                <label for="email" class="mb-1.5 block text-xs font-medium text-muted">Email</label>
                <input type="email" id="email" name="email" [(ngModel)]="formData.email" required email #email="ngModel"
                       class="w-full rounded-xl border px-4 py-3 text-sm outline-none" placeholder="your.email@example.com" />
                <p class="mt-1 text-xs text-red-400" *ngIf="email.invalid && email.touched">
                  <span *ngIf="email.errors?.['required']">Email is required</span>
                  <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
                </p>
              </div>
              <div>
                <label for="subject" class="mb-1.5 block text-xs font-medium text-muted">Subject</label>
                <input type="text" id="subject" name="subject" [(ngModel)]="formData.subject" required #subject="ngModel"
                       class="w-full rounded-xl border px-4 py-3 text-sm outline-none" placeholder="What's this about?" />
                <p class="mt-1 text-xs text-red-400" *ngIf="subject.invalid && subject.touched">Subject is required</p>
              </div>
              <div>
                <label for="message" class="mb-1.5 block text-xs font-medium text-muted">Message</label>
                <textarea id="message" name="message" [(ngModel)]="formData.message" required minlength="10" rows="5" #message="ngModel"
                          class="w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none" placeholder="Tell me about your project or question..."></textarea>
                <p class="mt-1 text-xs text-red-400" *ngIf="message.invalid && message.touched">Please write at least a sentence (10+ characters).</p>
              </div>

              <button type="submit"
                      class="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-ink transition-all hover:brightness-95 disabled:opacity-50"
                      [disabled]="contactForm.invalid || isSubmitting">
                <span *ngIf="!isSubmitting">Send message</span>
                <span *ngIf="isSubmitting">Sending…</span>
                <app-icon *ngIf="!isSubmitting" name="send" [size]="17"></app-icon>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ContactComponent implements OnInit {
  isSubmitting = false;
  isLoading = true;
  submitSuccess = false;
  submitError = false;
  contactInfo: ContactInfo[] = [];
  socialLinks: SocialLink[] = [];
  formData = { name: '', email: '', subject: '', message: '' };

  constructor(private portfolioService: PortfolioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadContactData();
  }

  loadContactData() {
    this.isLoading = true;
    this.portfolioService.getContactInfo()
      .pipe(timeout(10000), catchError(() => of([] as ContactInfo[])))
      .subscribe({
        next: (contactInfo) => {
          this.contactInfo = contactInfo && contactInfo.length > 0 ? contactInfo : this.fallbackContact();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.contactInfo = this.fallbackContact();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });

    this.portfolioService.getSocialLinks()
      .pipe(timeout(10000), catchError(() => of([] as SocialLink[])))
      .subscribe({
        next: (socialLinks) => {
          this.socialLinks = socialLinks && socialLinks.length > 0 ? socialLinks : this.fallbackSocial();
          this.cdr.detectChanges();
        },
        error: () => {
          this.socialLinks = this.fallbackSocial();
          this.cdr.detectChanges();
        },
      });
  }

  private fallbackContact(): ContactInfo[] {
    const now = new Date().toISOString();
    return [
      { id: 1, type: 'email', value: 'contact@sanket-jagtap.in', icon: '', order: 0, createdAt: now, updatedAt: now },
      { id: 2, type: 'phone', value: '+91 8806328987', icon: '', order: 1, createdAt: now, updatedAt: now },
      { id: 3, type: 'location', value: 'Pune, India', icon: '', order: 2, createdAt: now, updatedAt: now },
      { id: 4, type: 'linkedin', value: 'linkedin.com/in/sanket-jagtap', icon: '', order: 3, createdAt: now, updatedAt: now },
    ];
  }

  private fallbackSocial(): SocialLink[] {
    const now = new Date().toISOString();
    return [
      { id: 1, platform: 'github', url: 'https://github.com/sanketjagtap1', icon: '', order: 0, createdAt: now, updatedAt: now },
      { id: 2, platform: 'linkedin', url: 'https://linkedin.com/in/sanket-jagtap', icon: '', order: 1, createdAt: now, updatedAt: now },
      { id: 3, platform: 'email', url: 'mailto:contact@sanket-jagtap.in', icon: '', order: 2, createdAt: now, updatedAt: now },
    ];
  }

  iconForType(type: string): string {
    const map: { [k: string]: string } = {
      email: 'mail', phone: 'phone', location: 'map-pin',
      linkedin: 'linkedin', github: 'github', twitter: 'twitter',
    };
    return map[type] || 'globe';
  }

  iconForPlatform(platform: string): string {
    return this.iconForType(platform);
  }

  getContactTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email', phone: 'Phone', location: 'Location',
      linkedin: 'LinkedIn', github: 'GitHub', twitter: 'Twitter/X',
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  }

  isClickableContact(type: string): boolean {
    return ['email', 'phone', 'linkedin', 'github', 'twitter'].includes(type);
  }

  getContactHref(type: string, value: string): string {
    switch (type) {
      case 'email': return `mailto:${value}`;
      case 'phone': return `tel:${value}`;
      case 'linkedin':
      case 'github':
      case 'twitter': return value.startsWith('http') ? value : `https://${value}`;
      default: return value;
    }
  }

  private get recipientEmail(): string {
    const emailContact = this.contactInfo.find(c => c.type === 'email');
    return emailContact?.value || 'contact@sanket-jagtap.in';
  }

  get recipientEmailDisplay(): string {
    return this.recipientEmail;
  }

  onSubmit() {
    if (this.isSubmitting) return;
    const { name, email, subject, message } = this.formData;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    this.isSubmitting = true;
    this.submitError = false;
    this.submitSuccess = false;

    // Persist the enquiry server-side so it's captured as a lead
    // (viewable in the admin dashboard under Leads & Messages).
    this.portfolioService.sendContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || '').trim() || 'Website enquiry',
      message: message.trim(),
    })
      .pipe(timeout(15000), catchError(() => of(null)))
      .subscribe((res) => {
        if (res !== null) {
          this.submitSuccess = true;
          this.formData = { name: '', email: '', subject: '', message: '' };
        } else {
          this.submitError = true;
        }
        this.isSubmitting = false;
        this.cdr.detectChanges();
      });
  }

  dismissStatus() {
    this.submitSuccess = false;
    this.submitError = false;
  }
}
