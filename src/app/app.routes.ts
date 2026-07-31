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
import { ServicesPageComponent } from './pages/services/services-page.component';
import { BlogPageComponent } from './pages/blog/blog-page.component';
import { ServicesManagementComponent } from './components/services-management/services-management.component';
import { BlogDetailsPageComponent } from './pages/blog-details/blog-details-page.component';
import { ReviewPageComponent } from './pages/review/review-page.component';
import { TestimonialsManagementComponent } from './components/testimonials-management/testimonials-management.component';
import { MessagesManagementComponent } from './components/messages-management/messages-management.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Sanket Jagtap — Freelance Full-Stack Developer | Angular, Node.js, Flutter' },
  { path: 'home', component: HomeComponent, title: 'Sanket Jagtap — Freelance Full-Stack Developer | Angular, Node.js, Flutter' },
  { path: 'skills', component: SkillsPageComponent, title: 'Skills & Tech Stack — Angular, Node.js, Flutter | Sanket Jagtap' },
  { path: 'experience', component: ExperiencePageComponent, title: 'Experience — Senior Full-Stack Developer | Sanket Jagtap' },
  { path: 'projects', component: ProjectsPageComponent, title: 'Projects & Case Studies — Web & Mobile Apps | Sanket Jagtap' },
  { path: 'projects/:id', component: ProjectDetailsPageComponent, title: 'Project Details | Sanket Jagtap' },
  { path: 'services', component: ServicesPageComponent, title: 'Hire a Freelance Full-Stack Developer — Services & Pricing | Sanket Jagtap' },
  { path: 'contact', component: ContactPageComponent, title: 'Contact — Hire a Freelance Developer | Sanket Jagtap' },
  { path: 'review', component: ReviewPageComponent, title: 'Leave a Review' },
  { path: 'blog', component: BlogPageComponent, title: 'Blog — Web & Mobile Development Articles | Sanket Jagtap' },
  { path: 'blog/:slug', component: BlogDetailsPageComponent, title: 'Blog Post | Sanket Jagtap' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login' },
  { path: 'admin/dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard', canActivate: [authGuard] },
  { path: 'admin/skills', component: SkillsManagementComponent, title: 'Skills Management', canActivate: [authGuard] },
  { path: 'admin/projects', component: ProjectsManagementComponent, title: 'Projects Management', canActivate: [authGuard] },
  { path: 'admin/experience', component: ExperienceManagementComponent, title: 'Experience Management', canActivate: [authGuard] },
  { path: 'admin/blog', component: BlogManagementComponent, title: 'Blog Management', canActivate: [authGuard] },
  { path: 'admin/services', component: ServicesManagementComponent, title: 'Services Management', canActivate: [authGuard] },
  { path: 'admin/testimonials', component: TestimonialsManagementComponent, title: 'Testimonials Management', canActivate: [authGuard] },
  { path: 'admin/messages', component: MessagesManagementComponent, title: 'Leads & Messages', canActivate: [authGuard] },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];
