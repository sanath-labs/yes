# KisanQueue Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Development Deployment

### Local Development

```bash
# Clone the repository
git clone https://github.com/sanath-labs/yes.git
cd yes

# Install dependencies
npm install

# Start development server (with hot-reload)
npm run dev
```

The app will be available at `http://localhost:5173/`

## Production Deployment

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

This creates a `dist/` folder with optimized assets.

### Deployment Options

#### 1. Vercel (Recommended for React apps)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### 3. Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g http-server
COPY --from=build /app/dist /app
EXPOSE 8080
CMD ["http-server", "/app", "-p", "8080", "--spa"]
```

Build and run:

```bash
docker build -t kisanqueue .
docker run -p 8080:8080 kisanqueue
```

#### 4. Traditional Web Server (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/kisanqueue/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 5. HTTP Server

```bash
# Using http-server
npx http-server dist -p 8080

# Or Node.js based
npm run preview
```

## Environment Configuration

Create `.env.production`:

```
VITE_API_BASE_URL=https://api.your-domain.com
VITE_SOCKET_URL=wss://socket.your-domain.com
VITE_ENV=production
```

## Performance Optimization

The production build includes:
- Minified JavaScript and CSS
- Code splitting for faster loading
- Asset optimization
- Tree-shaking of unused code

**Bundle size:** ~193 KB gzipped

To analyze bundle size:

```bash
npm run build
# Check dist/assets/ folder
```

## Monitoring & Logs

- Monitor application errors via browser console
- Set up error tracking (Sentry, Rollbar, etc.)
- Configure server-side logging

## SSL/TLS Configuration

For production:
- Always use HTTPS
- Use valid SSL certificates
- Configure proper headers (HSTS, CSP, etc.)

## Database & Backend

Current version uses **mock data** for demonstration. For production:

1. Set up backend API server
2. Configure database (PostgreSQL, MongoDB, etc.)
3. Update API endpoints in `.env.production`
4. Implement authentication tokens/sessions

## Health Check

After deployment, verify:

```bash
# Check if site loads
curl https://your-domain.com

# Check bundle assets load
curl https://your-domain.com/assets/
```

## Troubleshooting

**Blank page on load:**
- Ensure `index.html` is served for all routes (SPA requirement)
- Check browser console for errors
- Verify all assets are loading correctly

**Styling issues:**
- Clear browser cache
- Verify Tailwind CSS build succeeded
- Check for CSP restrictions

**Performance issues:**
- Use browser DevTools to profile
- Check network tab for slow assets
- Consider CDN for static assets

## Rollback

To rollback to previous version:

```bash
# Revert to previous commit
git revert <commit-hash>
npm run build
# Redeploy
```

## Support

For deployment questions or issues, open an issue on GitHub or contact the maintainers.
