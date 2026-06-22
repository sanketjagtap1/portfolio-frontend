// Production environment.
// IMPORTANT: point apiBaseUrl at your deployed backend before going live.
export const environment = {
  production: true,
  // Portfolio/blog/admin REST API. Same origin as the site; nginx proxies
  // /api/ and /uploads/ to the backend container on localhost:6000.
  apiBaseUrl: 'https://sanket-jagtap.in',
  // Base URL where uploaded images are served (the backend /uploads folder).
  fileApiUrl: 'https://sanket-jagtap.in/uploads',
};
