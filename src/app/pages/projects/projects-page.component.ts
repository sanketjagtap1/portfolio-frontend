import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectsComponent],
  template: `
    <div class="projects-page">
      <app-projects></app-projects>
    </div>
  `,
  styles: []
})
export class ProjectsPageComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.set({
      title: 'Projects & Case Studies — Web & Mobile Apps | Sanket Jagtap',
      description:
        'Real products built end to end: an automated trading platform (AlgoETF), a Flutter music streaming app (BeatNest), and a self-hosted cloud storage platform (Cloud Nest) — with Angular, Node.js and Flutter.',
      path: '/projects',
    });
  }
}
