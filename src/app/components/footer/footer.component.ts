import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="p-5 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>
      
      <div class="container relative z-10 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div class="footer-brand">
            <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">Sanket Jagtap</h3>
            <p class="text-lg text-indigo-200 mb-6">Full Stack Developer</p>
            <div class="footer-social">
              <a href="https://linkedin.com/in/sanket-jagtap" target="_blank" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:sanketjagtap479@gmail.com" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="tel:8806328987" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="footer-links">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="link-group">
                <h4 class="text-lg font-semibold text-white mb-4">Navigation</h4>
                <ul class="space-y-2">
                  <li><a routerLink="/" class="text-indigo-200 hover:text-blue-300 transition-colors duration-300">Home</a></li>
                  <li><a routerLink="/skills" class="text-indigo-200 hover:text-blue-300 transition-colors duration-300">Skills</a></li>
                  <li><a routerLink="/experience" class="text-indigo-200 hover:text-blue-300 transition-colors duration-300">Experience</a></li>
                  <li><a routerLink="/projects" class="text-indigo-200 hover:text-blue-300 transition-colors duration-300">Projects</a></li>
                  <li><a routerLink="/contact" class="text-indigo-200 hover:text-blue-300 transition-colors duration-300">Contact</a></li>
                </ul>
              </div>
              
              <div class="link-group">
                <h4 class="text-lg font-semibold text-white mb-4">Services</h4>
                <ul class="space-y-2">
                  <li class="text-indigo-200">Web Development</li>
                  <li class="text-indigo-200">Mobile Development</li>
                  <li class="text-indigo-200">API Development</li>
                  <li class="text-indigo-200">Cloud Solutions</li>
                  <li class="text-indigo-200">Database Design</li>
                  <li class="text-indigo-200">DevOps</li>
                </ul>
              </div>
              
              <div class="link-group">
                <h4 class="text-lg font-semibold text-white mb-4">Technologies</h4>
                <ul class="space-y-2">
                  <li class="text-indigo-200">Angular</li>
                  <li class="text-indigo-200">Node.js</li>
                  <li class="text-indigo-200">TypeScript</li>
                  <li class="text-indigo-200">AWS</li>
                  <li class="text-indigo-200">PostgreSQL</li>
                  <li class="text-indigo-200">Docker</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div class="footer-copyright">
              <p class="text-indigo-200">&copy; {{ currentYear }} Sanket Jagtap. All rights reserved.</p>
            </div>
            
            <div class="footer-meta">
              <p class="text-indigo-200">Built with ❤️ using Angular & Node.js</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-social {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      
      &:hover {
        background: rgba(99, 102, 241, 0.2);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.15);
      }
    }
    
    .link-group {
      h4 {
        font-size: 1.125rem;
        font-weight: 600;
        color: white;
        margin-bottom: 1rem;
      }
      
      ul {
        list-style: none;
        
        li {
          margin-bottom: 0.5rem;
          
          a {
            color: rgb(196, 181, 253);
            text-decoration: none;
            font-size: 0.875rem;
            transition: color 0.3s ease;
            
            &:hover {
              color: rgb(147, 197, 253);
            }
          }
          
          &:not(:has(a)) {
            color: rgb(196, 181, 253);
            font-size: 0.875rem;
          }
        }
      }
    }
    
    .footer-bottom {
      .footer-copyright {
        p {
          color: rgb(196, 181, 253);
          font-size: 0.875rem;
          margin: 0;
        }
      }
      
      .footer-meta {
        p {
          color: rgb(196, 181, 253);
          font-size: 0.875rem;
          margin: 0;
        }
      }
    }
    
    @media (max-width: 768px) {
      .footer-social {
        justify-content: center;
      }
      
      .footer-bottom {
        text-align: center;
        gap: 1rem;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  ngOnInit() {
    // Component initialization
  }
}
