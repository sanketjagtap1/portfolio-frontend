import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Brand/tech logo tile backed by the devicon CDN, with a lettered fallback
 * when the logo can't be resolved. Usage:
 *   <app-brand-icon key="angular" label="Angular"></app-brand-icon>
 */
@Component({
  selector: 'app-brand-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-center rounded-lg border border-line bg-white/[0.03]"
         [style.width.px]="box" [style.height.px]="box">
      <img *ngIf="url && !failed" [src]="url" [alt]="label"
           class="object-contain" [style.width.px]="box - 14" [style.height.px]="box - 14"
           loading="lazy" (error)="failed = true" />
      <span *ngIf="!url || failed" class="font-bold text-ink" [style.font-size.px]="box / 2.4">
        {{ (label || '?').charAt(0) }}
      </span>
    </div>
  `,
})
export class BrandIconComponent {
  @Input() label = '';
  @Input() box = 40;
  @Input() set key(v: string) {
    const slug = SLUGS[v?.toLowerCase()];
    this.url = slug ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg` : '';
  }
  url = '';
  failed = false;
}

// Map of friendly key -> devicon "path/name" (colored original variant).
const SLUGS: Record<string, string> = {
  angular: 'angularjs/angularjs-original',
  react: 'react/react-original',
  'react native': 'react/react-original',
  node: 'nodejs/nodejs-original',
  'node.js': 'nodejs/nodejs-original',
  nodejs: 'nodejs/nodejs-original',
  typescript: 'typescript/typescript-original',
  javascript: 'javascript/javascript-original',
  flutter: 'flutter/flutter-original',
  dart: 'dart/dart-original',
  python: 'python/python-original',
  mysql: 'mysql/mysql-original',
  postgresql: 'postgresql/postgresql-original',
  postgres: 'postgresql/postgresql-original',
  mongodb: 'mongodb/mongodb-original',
  redis: 'redis/redis-original',
  docker: 'docker/docker-original',
  kubernetes: 'kubernetes/kubernetes-plain',
  aws: 'amazonwebservices/amazonwebservices-original-wordmark',
  git: 'git/git-original',
  github: 'github/github-original',
  gitlab: 'gitlab/gitlab-original',
  nginx: 'nginx/nginx-original',
  linux: 'linux/linux-original',
  express: 'express/express-original',
  'express.js': 'express/express-original',
  nestjs: 'nestjs/nestjs-original',
  graphql: 'graphql/graphql-plain',
  prisma: 'prisma/prisma-original',
  tailwindcss: 'tailwindcss/tailwindcss-original',
  'tailwind css': 'tailwindcss/tailwindcss-original',
  sass: 'sass/sass-original',
  html5: 'html5/html5-original',
  css3: 'css3/css3-original',
  bootstrap: 'bootstrap/bootstrap-original',
  redux: 'redux/redux-original',
  firebase: 'firebase/firebase-plain',
  jest: 'jest/jest-plain',
  jira: 'jira/jira-original',
  postman: 'postman/postman-original',
  webpack: 'webpack/webpack-original',
  vscode: 'vscode/vscode-original',
  sonarqube: 'sonarqube/sonarqube-original',
  socketio: 'socketio/socketio-original',
  ionic: 'ionic/ionic-original',
  sequelize: 'sequelize/sequelize-original',
  oracle: 'oracle/oracle-original',
  php: 'php/php-original',
};
