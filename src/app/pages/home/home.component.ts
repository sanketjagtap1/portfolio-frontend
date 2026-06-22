import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { FeaturedProjectsComponent } from '../../components/featured-projects/featured-projects.component';
import { ServicesComponent } from '../../components/services/services.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { BlogComponent } from '../../components/blog/blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    FeaturedProjectsComponent,
    ServicesComponent,
    TestimonialsComponent,
    BlogComponent
  ],
  template: `
    <div class="home-page">
      <app-hero></app-hero>
      <app-about></app-about>
      <app-services></app-services>
      <app-featured-projects></app-featured-projects>
      <app-blog></app-blog>
      <app-testimonials></app-testimonials>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
