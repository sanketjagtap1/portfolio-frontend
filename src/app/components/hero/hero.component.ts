import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section id="home" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <!-- Animated Background Particles -->
      <div id="particles-js" class="absolute inset-0"></div>
      
      <!-- Enhanced Background Animations -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Large floating circles with enhanced effects -->
        <div class="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div class="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow animation-delay-4000"></div>
        
        <!-- Additional floating orbs -->
        <div class="absolute top-1/2 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl animate-float-fast"></div>
        <div class="absolute bottom-1/3 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/15 to-purple-400/15 rounded-full blur-2xl animate-float-fast animation-delay-1000"></div>
        <div class="absolute top-1/4 left-1/2 w-24 h-24 bg-gradient-to-r from-indigo-400/15 to-cyan-400/15 rounded-full blur-2xl animate-float-fast animation-delay-2500"></div>
        
        <!-- Floating triangles with enhanced animations -->
        <div class="absolute top-1/4 right-1/4 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-blue-400/20 animate-rotate-slow"></div>
        <div class="absolute bottom-1/4 left-1/4 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-purple-400/20 animate-rotate-slow animation-delay-3000"></div>
        <div class="absolute top-3/4 right-1/3 w-0 h-0 border-l-[25px] border-r-[25px] border-b-[43px] border-l-transparent border-r-transparent border-b-cyan-400/20 animate-rotate-slow animation-delay-1500"></div>
        
        <!-- Floating squares with enhanced effects -->
        <div class="absolute top-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rotate-45 animate-pulse-slow"></div>
        <div class="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rotate-45 animate-pulse-slow animation-delay-1500"></div>
        <div class="absolute top-2/3 left-1/4 w-14 h-14 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rotate-45 animate-pulse-slow animation-delay-3000"></div>
        
        <!-- Animated lines and connections -->
        <div class="absolute top-1/2 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-line-pulse"></div>
        <div class="absolute top-1/3 right-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-line-pulse animation-delay-1000"></div>
        <div class="absolute bottom-1/2 right-1/4 w-1 h-24 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-line-pulse animation-delay-2000"></div>
        
        <!-- Floating hexagons -->
        <div class="absolute top-1/5 left-1/5 w-20 h-20 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 animate-hexagon-float" style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
        <div class="absolute bottom-1/5 right-1/5 w-16 h-16 bg-gradient-to-r from-purple-400/15 to-pink-400/15 animate-hexagon-float animation-delay-2000" style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
        
        <!-- Animated grid pattern with enhanced effects -->
        <div class="absolute inset-0 opacity-5">
          <div class="grid grid-cols-12 grid-rows-8 h-full w-full">
            <div *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96]" 
                 class="border border-blue-400/10 animate-grid-pulse" 
                 [style.animation-delay]="(i * 0.1) + 's'"></div>
          </div>
        </div>
        
        <!-- Animated dots pattern -->
        <div class="absolute inset-0 opacity-10">
          <div *ngFor="let dot of dotPositions; let i = index" 
               class="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-dot-pulse"
               [style.left]="dot.left"
               [style.top]="dot.top"
               [style.animation-delay]="dot.delay"></div>
        </div>
        
        <!-- Animated waves -->
        <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 to-transparent animate-wave"></div>
        <div class="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-purple-500/5 to-transparent animate-wave-reverse"></div>
        
        <!-- Floating particles -->
        <div class="absolute inset-0">
          <div *ngFor="let particle of particlePositions; let i = index" 
               class="absolute w-1 h-1 bg-white/20 rounded-full animate-particle-float"
               [style.left]="particle.left"
               [style.top]="particle.top"
               [style.animation-delay]="particle.delay"
               [style.animation-duration]="particle.duration"></div>
        </div>
      </div>
      
      <!-- Interactive Mouse Follower -->
      <div class="mouse-follower-container absolute inset-0 pointer-events-none z-20">
        <!-- Main cursor -->
        <div class="mouse-follower-main absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none transition-all duration-300 ease-out mix-blend-mode-difference"></div>
        
        <!-- Trailing bubbles -->
        <div class="mouse-follower-trail-1 absolute w-4 h-4 bg-blue-300/60 rounded-full pointer-events-none transition-all duration-500 ease-out"></div>
        <div class="mouse-follower-trail-2 absolute w-3 h-3 bg-purple-300/50 rounded-full pointer-events-none transition-all duration-700 ease-out"></div>
        <div class="mouse-follower-trail-3 absolute w-2 h-2 bg-indigo-300/40 rounded-full pointer-events-none transition-all duration-900 ease-out"></div>
        <div class="mouse-follower-trail-4 absolute w-1 h-1 bg-pink-300/30 rounded-full pointer-events-none transition-all duration-1100 ease-out"></div>
        
        <!-- Glow effect -->
        <div class="mouse-follower-glow absolute w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full pointer-events-none transition-all duration-1000 ease-out blur-xl"></div>
        
        <!-- Sparkle effects -->
        <div class="mouse-sparkle-1 absolute w-1 h-1 bg-white rounded-full pointer-events-none opacity-0"></div>
        <div class="mouse-sparkle-2 absolute w-1 h-1 bg-blue-200 rounded-full pointer-events-none opacity-0"></div>
        <div class="mouse-sparkle-3 absolute w-1 h-1 bg-purple-200 rounded-full pointer-events-none opacity-0"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div class="text-center lg:text-left">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 animate-fade-in border border-blue-400/30 backdrop-blur-xl hover:bg-blue-500/30 transition-all duration-300">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Available for new opportunities
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
              Hi, I'm <span class="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">Sanket</span>
            </h1>
            
            <h2 class="text-2xl md:text-3xl font-semibold text-blue-200 mb-6 animate-slide-up animation-delay-200">
              Full Stack Developer
            </h2>
            
            <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0 animate-slide-up animation-delay-400 leading-relaxed">
              Passionate about creating scalable web applications with modern technologies. 
              I specialize in Angular, Node.js, and cloud solutions to deliver exceptional user experiences.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-600">
              <a routerLink="/projects" class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
                View My Work
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
              <a routerLink="/contact" class="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
                Get In Touch
                <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </a>
            </div>
            
            <!-- Social Links -->
            <div class="flex justify-center lg:justify-start space-x-6 mt-12 animate-slide-up animation-delay-800">
              <a href="https://linkedin.com/in/sanket-jagtap" target="_blank" class="group text-blue-300 hover:text-blue-200 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <svg class="w-6 h-6 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:sanketjagtap479@gmail.com" class="group text-blue-300 hover:text-blue-200 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <svg class="w-6 h-6 group-hover:drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
              <a href="tel:8806328987" class="group text-blue-300 hover:text-blue-200 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <svg class="w-6 h-6 group-hover:drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Image/Visual -->
          <div class="relative animate-fade-in animation-delay-1000">
            <div class="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              <!-- Main Circle with animated border -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full shadow-2xl backdrop-blur-xl border border-white/20 animate-pulse-border"></div>
              
              <!-- Floating Elements with enhanced animations -->
              <div class="absolute -top-4 -right-4 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center animate-orbit border border-white/20">
                <span class="text-2xl animate-bounce">💻</span>
              </div>
              <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center animate-orbit-reverse animation-delay-1000 border border-white/20">
                <span class="text-xl animate-bounce">🚀</span>
              </div>
              <div class="absolute top-1/2 -left-8 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center animate-orbit animation-delay-2000 border border-white/20">
                <span class="text-lg animate-bounce">⚡</span>
              </div>
              
              <!-- Additional floating elements -->
              <div class="absolute top-1/4 -right-12 w-8 h-8 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full animate-float-fast"></div>
              <div class="absolute bottom-1/4 -left-12 w-6 h-6 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full animate-float-fast animation-delay-500"></div>
              
              <!-- Profile Placeholder with enhanced styling -->
              <div class="absolute inset-4 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center shadow-inner border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div class="text-center">
                  <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                    <span class="text-white text-3xl font-bold">SJ</span>
                  </div>
                  <h3 class="text-lg font-semibold text-white">Sanket Jagtap</h3>
                  <p class="text-sm text-blue-200">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator with enhanced animation -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" class="group flex flex-col items-center text-blue-300 hover:text-blue-200 transition-all duration-300">
          <span class="text-sm mb-2 group-hover:scale-110 transition-transform duration-300">Scroll Down</span>
          <svg class="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </a>
      </div>
    </section>
  `,
  styles: [`
    /* Custom Animations */
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes float-fast {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-15px) scale(1.1); }
    }
    
    @keyframes rotate-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.05); }
    }
    
    @keyframes pulse-border {
      0%, 100% { border-color: rgba(255, 255, 255, 0.2); }
      50% { border-color: rgba(59, 130, 246, 0.5); }
    }
    
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    @keyframes grid-pulse {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.3; }
    }
    
    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
    }
    
    @keyframes orbit-reverse {
      0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
      100% { transform: rotate(-360deg) translateX(40px) rotate(360deg); }
    }
    
    @keyframes fade-in {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slide-up {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    /* Animation Classes */
    .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
    .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
    .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
    .animate-pulse-border { animation: pulse-border 3s ease-in-out infinite; }
    .animate-gradient-x { 
      background-size: 200% 200%;
      animation: gradient-x 3s ease infinite;
    }
    .animate-grid-pulse { animation: grid-pulse 2s ease-in-out infinite; }
    .animate-orbit { animation: orbit 10s linear infinite; }
    .animate-orbit-reverse { animation: orbit-reverse 12s linear infinite; }
    .animate-fade-in { animation: fade-in 1s ease-out; }
    .animate-slide-up { animation: slide-up 0.8s ease-out; }
    .animate-hexagon-float { animation: hexagon-float 6s ease-in-out infinite; }
    .animate-line-pulse { animation: line-pulse 3s ease-in-out infinite; }
    .animate-dot-pulse { animation: dot-pulse 2s ease-in-out infinite; }
    .animate-wave { animation: wave 8s linear infinite; }
    .animate-wave-reverse { animation: wave-reverse 8s linear infinite; }
    .animate-particle-float { animation: particle-float 7s ease-in-out infinite; }
    .animate-morph-shape { animation: morph-shape 10s ease-in-out infinite; }
    .animate-glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }
    .animate-color-shift { animation: color-shift 8s ease-in-out infinite; }
    
    /* Animation Delays */
    .animation-delay-200 { animation-delay: 0.2s; }
    .animation-delay-400 { animation-delay: 0.4s; }
    .animation-delay-600 { animation-delay: 0.6s; }
    .animation-delay-800 { animation-delay: 0.8s; }
    .animation-delay-1000 { animation-delay: 1s; }
    .animation-delay-1500 { animation-delay: 1.5s; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-3000 { animation-delay: 3s; }
    .animation-delay-4000 { animation-delay: 4s; }
    
    /* Enhanced Mouse Follower */
    .mouse-follower-container {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
    }
    
    .mouse-follower-main {
      position: fixed;
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      animation: pulse-glow 2s ease-in-out infinite;
      transition: none !important;
    }
    
    .mouse-follower-trail-1,
    .mouse-follower-trail-2,
    .mouse-follower-trail-3,
    .mouse-follower-trail-4 {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: none !important;
    }
    
    .mouse-follower-glow {
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      mix-blend-mode: screen;
      transition: none !important;
    }
    
    .mouse-sparkle-1,
    .mouse-sparkle-2,
    .mouse-sparkle-3 {
      position: fixed;
      pointer-events: none;
      z-index: 10001;
      animation: sparkle 1.5s ease-in-out infinite;
    }
    
    .mouse-sparkle-2 {
      animation-delay: 0.5s;
    }
    
    .mouse-sparkle-3 {
      animation-delay: 1s;
    }
    
    @keyframes pulse-glow {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      }
      50% { 
        transform: scale(1.2);
        box-shadow: 0 0 30px rgba(147, 51, 234, 0.7);
      }
    }
    
    @keyframes hexagon-float {
      0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
      25% { transform: translateY(-15px) rotate(90deg) scale(1.1); }
      50% { transform: translateY(-25px) rotate(180deg) scale(0.9); }
      75% { transform: translateY(-15px) rotate(270deg) scale(1.05); }
    }
    
    @keyframes line-pulse {
      0%, 100% { opacity: 0.3; transform: scaleY(1); }
      50% { opacity: 0.8; transform: scaleY(1.2); }
    }
    
    @keyframes dot-pulse {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.5); }
    }
    
    @keyframes wave {
      0% { transform: translateX(-100%) skewX(0deg); }
      100% { transform: translateX(100%) skewX(5deg); }
    }
    
    @keyframes wave-reverse {
      0% { transform: translateX(100%) skewX(0deg); }
      100% { transform: translateX(-100%) skewX(-5deg); }
    }
    
    @keyframes particle-float {
      0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes morph-shape {
      0%, 100% { border-radius: 50%; transform: rotate(0deg); }
      25% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(90deg); }
      50% { border-radius: 20% 80% 80% 20% / 20% 20% 80% 80%; transform: rotate(180deg); }
      75% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; transform: rotate(270deg); }
    }
    
    @keyframes glow-pulse {
      0%, 100% { filter: brightness(1) blur(0px); }
      50% { filter: brightness(1.5) blur(2px); }
    }
    
    @keyframes color-shift {
      0% { background: linear-gradient(45deg, #3b82f6, #8b5cf6); }
      25% { background: linear-gradient(45deg, #8b5cf6, #ec4899); }
      50% { background: linear-gradient(45deg, #ec4899, #06b6d4); }
      75% { background: linear-gradient(45deg, #06b6d4, #10b981); }
      100% { background: linear-gradient(45deg, #10b981, #3b82f6); }
    }
    
    /* Enhanced hover effects */
    .group:hover .group-hover\\:translate-x-1 {
      transform: translateX(0.25rem);
    }
    
    .group:hover .group-hover\\:scale-110 {
      transform: scale(1.1);
    }
    
    .group:hover .group-hover\\:-translate-y-1 {
      transform: translateY(-0.25rem);
    }
    
    .group:hover .group-hover\\:drop-shadow-lg {
      filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    }
    
    /* Smooth transitions for all elements */
    * {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, #2563eb, #7c3aed);
    }
  `]
})
export class HeroComponent implements OnInit {
  Math = Math; // Make Math available in template
  
  // Pre-generated random positions to avoid change detection issues
  dotPositions: Array<{left: string, top: string, delay: string}> = [];
  particlePositions: Array<{left: string, top: string, delay: string, duration: string}> = [];
  
  constructor() {
    // Generate static random positions for dots
    for (let i = 0; i < 50; i++) {
      this.dotPositions.push({
        left: (Math.random() * 100) + '%',
        top: (Math.random() * 100) + '%',
        delay: (i * 0.2) + 's'
      });
    }
    
    // Generate static random positions for particles
    for (let i = 0; i < 20; i++) {
      this.particlePositions.push({
        left: (Math.random() * 100) + '%',
        top: (Math.random() * 100) + '%',
        delay: (i * 0.3) + 's',
        duration: (3 + Math.random() * 4) + 's'
      });
    }
  }
  ngOnInit() {
    // Initialize particles.js with enhanced configuration
    if (typeof window !== 'undefined') {
      import('particles.js').then((mod: any) => {
        try {
          const fn = (window as any).particlesJS || mod?.particlesJS || mod?.default;
          if (typeof fn !== 'function') {
            throw new Error('particlesJS function not available');
          }
          fn('particles-js', {
            particles: {
              number: { 
                value: 80,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: { 
                value: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']
              },
              shape: { 
                type: 'circle',
                stroke: {
                  width: 0,
                  color: '#000000'
                }
              },
              opacity: { 
                value: 0.6,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: { 
                value: 3,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { 
                  enable: true, 
                  mode: 'repulse',
                  parallax: {
                    enable: false,
                    force: 2,
                    smooth: 10
                  }
                },
                onclick: { 
                  enable: true, 
                  mode: 'push' 
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true,
            background: {
              color: 'transparent',
              image: '',
              position: '50% 50%',
              repeat: 'no-repeat',
              size: 'cover'
            }
          });
        } catch (error) {
          console.log('Particles.js initialization failed:', error);
        }
      }).catch((error) => {
        console.log('Failed to load particles.js:', error);
      });
      
      // Initialize mouse follower
      this.initMouseFollower();
    }
  }
  
  private initMouseFollower() {
    const container = document.querySelector('.mouse-follower-container') as HTMLElement;
    if (!container) return;
    
    const mainCursor = container.querySelector('.mouse-follower-main') as HTMLElement;
    const trail1 = container.querySelector('.mouse-follower-trail-1') as HTMLElement;
    const trail2 = container.querySelector('.mouse-follower-trail-2') as HTMLElement;
    const trail3 = container.querySelector('.mouse-follower-trail-3') as HTMLElement;
    const trail4 = container.querySelector('.mouse-follower-trail-4') as HTMLElement;
    const glow = container.querySelector('.mouse-follower-glow') as HTMLElement;
    const sparkle1 = container.querySelector('.mouse-sparkle-1') as HTMLElement;
    const sparkle2 = container.querySelector('.mouse-sparkle-2') as HTMLElement;
    const sparkle3 = container.querySelector('.mouse-sparkle-3') as HTMLElement;
    
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let movementTimer: any;
    
    // Smooth following variables for each element
    let mainCursorX = 0, mainCursorY = 0;
    let trail1X = 0, trail1Y = 0;
    let trail2X = 0, trail2Y = 0;
    let trail3X = 0, trail3Y = 0;
    let trail4X = 0, trail4Y = 0;
    let glowX = 0, glowY = 0;
    
    // Initialize positions to prevent initial jump
    mainCursorX = mouseX;
    mainCursorY = mouseY;
    trail1X = mouseX;
    trail1Y = mouseY;
    trail2X = mouseX;
    trail2Y = mouseY;
    trail3X = mouseX;
    trail3Y = mouseY;
    trail4X = mouseX;
    trail4Y = mouseY;
    glowX = mouseX;
    glowY = mouseY;
    
    // Mouse position tracking
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isMoving) {
        isMoving = true;
        container.style.opacity = '1';
      }
      
      // Clear existing timer
      clearTimeout(movementTimer);
      
      // Hide cursor after 1 second of no movement
      movementTimer = setTimeout(() => {
        isMoving = false;
        container.style.opacity = '0';
      }, 1000);
      
      // Create sparkle effect randomly
      if (Math.random() < 0.1) {
        this.createSparkleEffect(mouseX, mouseY);
      }
    });
    
    // Mouse leave detection
    document.addEventListener('mouseleave', () => {
      container.style.opacity = '0';
    });
    
    // Mouse enter detection
    document.addEventListener('mouseenter', () => {
      if (isMoving) {
        container.style.opacity = '1';
      }
    });
    
    // Smooth animation loop with interpolation
    function animate() {
      // Main cursor - immediate follow with slight smoothing
      mainCursorX += (mouseX - mainCursorX) * 0.3;
      mainCursorY += (mouseY - mainCursorY) * 0.3;
      
      if (mainCursor) {
        mainCursor.style.left = mainCursorX - 12 + 'px';
        mainCursor.style.top = mainCursorY - 12 + 'px';
      }
      
      // Glow effect - slightly delayed
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      
      if (glow) {
        glow.style.left = glowX - 32 + 'px';
        glow.style.top = glowY - 32 + 'px';
      }
      
      // Trailing bubbles with different smoothing speeds
      trail1X += (mouseX - trail1X) * 0.1;
      trail1Y += (mouseY - trail1Y) * 0.1;
      
      if (trail1) {
        trail1.style.left = trail1X - 8 + 'px';
        trail1.style.top = trail1Y - 8 + 'px';
      }
      
      trail2X += (mouseX - trail2X) * 0.08;
      trail2Y += (mouseY - trail2Y) * 0.08;
      
      if (trail2) {
        trail2.style.left = trail2X - 6 + 'px';
        trail2.style.top = trail2Y - 6 + 'px';
      }
      
      trail3X += (mouseX - trail3X) * 0.06;
      trail3Y += (mouseY - trail3Y) * 0.06;
      
      if (trail3) {
        trail3.style.left = trail3X - 4 + 'px';
        trail3.style.top = trail3Y - 4 + 'px';
      }
      
      trail4X += (mouseX - trail4X) * 0.04;
      trail4Y += (mouseY - trail4Y) * 0.04;
      
      if (trail4) {
        trail4.style.left = trail4X - 2 + 'px';
        trail4.style.top = trail4Y - 2 + 'px';
      }
      
      requestAnimationFrame(animate);
    }
    
    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .group');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        if (mainCursor) {
          mainCursor.style.transform = 'scale(1.5)';
          mainCursor.style.background = 'linear-gradient(45deg, #ec4899, #8b5cf6)';
        }
        if (glow) {
          glow.style.transform = 'scale(1.2)';
          glow.style.background = 'linear-gradient(45deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))';
        }
      });
      
      element.addEventListener('mouseleave', () => {
        if (mainCursor) {
          mainCursor.style.transform = 'scale(1)';
          mainCursor.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
        }
        if (glow) {
          glow.style.transform = 'scale(1)';
          glow.style.background = 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))';
        }
      });
    });
    
    // Click effects
    document.addEventListener('click', (e) => {
      this.createClickEffect(e.clientX, e.clientY);
    });
    
    animate();
  }
  
  private createSparkleEffect(x: number, y: number) {
    const sparkle = document.createElement('div');
    sparkle.className = 'absolute w-2 h-2 bg-white rounded-full pointer-events-none opacity-100';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.zIndex = '10002';
    sparkle.style.position = 'fixed';
    sparkle.style.transform = 'scale(0)';
    sparkle.style.transition = 'all 0.6s ease-out';
    
    document.body.appendChild(sparkle);
    
    // Animate sparkle
    setTimeout(() => {
      sparkle.style.transform = 'scale(1) rotate(180deg)';
      sparkle.style.opacity = '0';
    }, 10);
    
    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 600);
  }
  
  private createClickEffect(x: number, y: number) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute pointer-events-none';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.zIndex = '10003';
    ripple.style.position = 'fixed';
    ripple.style.width = '4px';
    ripple.style.height = '4px';
    ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(59,130,246,0.6) 50%, transparent 100%)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'all 0.8s ease-out';
    
    document.body.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
      ripple.style.transform = 'scale(20)';
      ripple.style.opacity = '0';
    }, 10);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
    
    // Create multiple sparkles around click point
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const angle = (i * 60) * (Math.PI / 180);
        const sparkleX = x + Math.cos(angle) * 30;
        const sparkleY = y + Math.sin(angle) * 30;
        this.createSparkleEffect(sparkleX, sparkleY);
      }, i * 50);
    }
  }
}