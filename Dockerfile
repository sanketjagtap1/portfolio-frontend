# ---- Build stage ----
# NOTE: API URLs are baked in at build time from src/environments/environment.ts.
# Set that file to your public site URL before building (see DEPLOYMENT.md).
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
