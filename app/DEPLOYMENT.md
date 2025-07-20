# Cloudflare Pages Deployment Guide

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Domain Setup**: Ensure `truslerlegal.com` is managed by Cloudflare
3. **Wrangler CLI**: Install globally with `npm install -g wrangler`

## Environment Variables

Set these in your Cloudflare Pages project settings:

```bash
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
NEXTAUTH_SECRET=your-32-character-secret-key
NEXTAUTH_URL=https://portal.truslerlegal.com
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
OPENWEATHER_API_KEY=your-weather-api-key
NEWS_API_KEY=your-news-api-key
```

## Deployment Steps

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Cloudflare Pages configuration"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages → Create a project
   - Connect your GitHub repository
   - Select the repository: `tl-start`
   - Set build settings:
     - **Framework preset**: Next.js
     - **Build command**: `npm run cf-build`
     - **Build output directory**: `.next`
     - **Root directory**: `app`

3. **Configure Environment Variables**:
   - In Pages project settings → Environment variables
   - Add all variables from `.env.example`

### Option 2: Direct Upload

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build the Project**:
   ```bash
   npm run build
   ```

3. **Deploy with Wrangler**:
   ```bash
   npx wrangler pages deploy .next --project-name trusler-legal-portal
   ```

## Custom Domain Setup

1. **Add Custom Domain**:
   - In your Pages project → Custom domains
   - Add `portal.truslerlegal.com`
   - Cloudflare will automatically configure DNS

2. **SSL Certificate**:
   - Cloudflare provides automatic SSL
   - Certificate will be provisioned within minutes

## Database Migration

Ensure your Neon database is accessible from Cloudflare:

```bash
npx prisma migrate deploy
npx prisma generate
```

## Post-Deployment Checklist

- [ ] Custom domain `portal.truslerlegal.com` resolves correctly
- [ ] SSL certificate is active and valid
- [ ] Authentication flow works (NextAuth.js)
- [ ] Database connection is successful
- [ ] API routes respond correctly (`/api/weather`, `/api/news`, `/api/pollen`)
- [ ] Theme switching functions properly
- [ ] All widgets load data successfully

## Troubleshooting

### Build Failures
- Check environment variables are set correctly
- Verify Node.js version compatibility (use Node 18+)
- Review build logs in Cloudflare dashboard

### Runtime Errors
- Check browser console for client-side errors
- Monitor Cloudflare Functions logs for server-side issues
- Verify database connectivity

### Performance Optimization
- Enable Cloudflare caching for static assets
- Use Cloudflare Image Optimization if needed
- Monitor Core Web Vitals in Cloudflare Analytics