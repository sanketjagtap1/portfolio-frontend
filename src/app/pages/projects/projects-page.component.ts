import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../../components/projects/projects.component';

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
export class ProjectsPageComponent {}
