import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from '../../components/services/services.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, ServicesComponent],
  template: `
    <app-services></app-services>

    <!-- SEO/FAQ content: real, indexable answers for people looking to hire -->
    <section class="pb-24">
      <div class="mx-auto max-w-shell px-6">
        <div class="max-w-2xl">
          <p class="kicker">FAQ</p>
          <h2 class="mt-4 font-display text-2xl md:text-3xl font-semibold tracking-tightest text-ink">
            Hiring a freelance developer — common questions
          </h2>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-2">
          <div *ngFor="let f of faqs" class="rounded-2xl border border-line bg-surface p-6">
            <h3 class="font-display text-lg font-semibold text-ink">{{ f.q }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ f.a }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ServicesPageComponent implements OnInit {
  faqs = [
    {
      q: 'How much does a website cost?',
      a: 'A clean, responsive business website starts at ₹15,000 and takes about two weeks. A larger CMS-backed site is ₹30,000, and full custom web apps (dashboards, marketplaces, SaaS) start at ₹50,000. Every quote comes with a clear scope before any work begins.',
    },
    {
      q: 'Can I hire you by the hour?',
      a: 'Yes — hourly consulting is ₹800/hour for bug fixes, small features, code reviews or technical advice. No minimum commitment; you pay only for the time you need.',
    },
    {
      q: 'Do you work with clients outside Pune / India?',
      a: 'Absolutely. I work remotely with startups and businesses worldwide. I’m based in Pune, India (IST), and I keep overlap with your timezone for calls and reviews.',
    },
    {
      q: 'What do you build with?',
      a: 'Angular or React on the front-end, Node.js APIs on the back-end, Flutter for mobile apps, and MySQL/PostgreSQL with AWS or VPS deployment — the same stack I’ve used in production for 4+ years.',
    },
    {
      q: 'How do we start?',
      a: 'Send a short description of what you need through the contact form. I’ll reply within 24 hours with questions, a suggested approach, and a fixed quote or hourly estimate — no obligation.',
    },
    {
      q: 'Who owns the code?',
      a: 'You do. On final payment you get the complete source code, deployment setup and documentation. No lock-in — any developer can pick it up after me.',
    },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({
      title: 'Hire a Freelance Full-Stack Developer — Services & Pricing | Sanket Jagtap',
      description:
        'Freelance web & mobile development services: websites from ₹15,000, full-stack apps, ₹800/hr consulting and monthly retainers. Clear scope, honest timelines. Based in Pune, India — working worldwide.',
      path: '/services',
    });
  }
}
