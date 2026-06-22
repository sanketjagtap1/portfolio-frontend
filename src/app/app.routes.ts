import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SkillsPageComponent } from './pages/skills/skills-page.component';
import { ExperiencePageComponent } from './pages/experience/experience-page.component';
import { ProjectsPageComponent } from './pages/projects/projects-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SkillsManagementComponent } from './components/skills-management/skills-management.component';
import { ProjectsManagementComponent } from './components/projects-management/projects-management.component';
import { ProjectDetailsPageComponent } from './pages/project-details/project-details-page.component';
import { ExperienceManagementComponent } from './components/experience-management/experience-management.component';
import { BlogManagementComponent } from './components/blog-management/blog-management.component';
import { ServicesComponent } from './components/services/services.component';
import { ServicesManagementComponent } from './components/services-management/services-management.component';
import { BlogDetailsPageComponent } from './pages/blog-details/blog-details-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Sanket Jagtap - Home' },
  { path: 'home', component: HomeComponent, title: 'Sanket Jagtap - Home' },
  { path: 'skills', component: SkillsPageComponent, title: 'Skills & Expertise' },
  { path: 'experience', component: ExperiencePageComponent, title: 'Professional Experience' },
  { path: 'projects', component: ProjectsPageComponent, title: 'Portfolio Projects' },
  { path: 'projects/:id', component: ProjectDetailsPageComponent, title: 'Project Details' },
  { path: 'services', component: ServicesComponent, title: 'Our Services' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact Me' },
  { path: 'blog', component: HomeComponent, title: 'Blog & Articles' }, // Blog will be shown on home page for now
  { path: 'blog/:slug', component: BlogDetailsPageComponent, title: 'Blog Post' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login' },
  { path: 'admin/dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard' },
  { path: 'admin/skills', component: SkillsManagementComponent, title: 'Skills Management' },
  { path: 'admin/projects', component: ProjectsManagementComponent, title: 'Projects Management' },
  { path: 'admin/experience', component: ExperienceManagementComponent, title: 'Experience Management' },
  { path: 'admin/blog', component: BlogManagementComponent, title: 'Blog Management' },
  { path: 'admin/services', component: ServicesManagementComponent, title: 'Services Management' },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];
