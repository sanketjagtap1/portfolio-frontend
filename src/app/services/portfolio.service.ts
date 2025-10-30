import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ContactInfo {
  id: number;
  type: string;
  value: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tools';
  icon?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  technologies: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  duration?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  image?: string;
  featuredImage?: string;
  images?: ProjectImage[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface PortfolioData {
  contact: ContactInfo;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = `${environment.apiBaseUrl}/portfolio`;

  constructor(private http: HttpClient) {
    // Service initialized
  }

  // Get all portfolio data
  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(this.apiUrl);
  }

  // Get contact information
  getContactInfo(): Observable<ContactInfo[]> {
    return this.http.get<{contactInfo: ContactInfo[], socialLinks: SocialLink[]}>(`${this.apiUrl}/contact`)
      .pipe(map(response => response.contactInfo));
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.http.get<{contactInfo: ContactInfo[], socialLinks: SocialLink[]}>(`${this.apiUrl}/contact`)
      .pipe(map(response => response.socialLinks));
  }

  // Get summary
  getSummary(): Observable<{ summary: string }> {
    return this.http.get<{ summary: string }>(`${this.apiUrl}/summary`);
  }

  // Get skills
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  // Get skills by category
  getSkillsByCategory(category: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/skills/${category}`);
  }

  // Get experience
  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`).pipe(
      catchError(error => {
        console.error('HTTP Error in PortfolioService:', error);
        throw error;
      })
    );
  }

  // Get specific experience
  getExperienceById(id: string): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/experience/${id}`);
  }

  // Get projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  // Get specific project
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  // Get education
  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/education`);
  }

  // Send contact message
  sendContactMessage(message: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, message);
  }

  // Get services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`).pipe(
      catchError(error => {
        console.error('Error fetching services:', error);
        return of([]);
      })
    );
  }

  // Get blog post by slug
  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/blog/slug/${slug}`).pipe(
      catchError(error => {
        console.error('Error fetching blog post:', error);
        throw error;
      })
    );
  }
}
