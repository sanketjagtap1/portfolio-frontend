import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogComponent } from '../../components/blog/blog.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogComponent],
  template: `
    <app-blog></app-blog>

    <section class="pb-24">
      <div class="mx-auto max-w-shell px-6">
        <div class="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 md:flex-row md:items-center">
          <div>
            <h2 class="font-display text-2xl font-semibold text-ink">Enjoying the articles?</h2>
            <p class="mt-2 max-w-xl text-muted">
              I write about building real products — Angular, Node.js, Flutter and deployment.
              If you're building something yourself, let's talk.
            </p>
          </div>
          <a routerLink="/contact" class="btn-primary shrink-0">Get in touch</a>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class BlogPageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({
      title: 'Blog — Web & Mobile Development Articles | Sanket Jagtap',
      description:
        'Practical articles on Angular, Node.js, Flutter, Docker and shipping production software — written by Sanket Jagtap, freelance full-stack developer in Pune, India.',
      path: '/blog',
    });
  }
}
