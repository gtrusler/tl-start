# Trusler Legal Portal - Deployment Guide

## Quick Reference

| Environment | Command | URL |
|-------------|---------|-----|
| Local Dev | `npm run dev` | http://localhost:3000 |
| Production | `npm run deploy` | https://portal.truslerlegal.com |
| Workers Dev | Auto-deployed | https://trusler-legal-portal.gtrusler.workers.dev |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare Edge                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │  CDN/SSL/DNS    │───▶│  Workers Runtime │                    │
│  │  (Automatic)    │    │  (OpenNext)      │                    │
│  └─────────────────┘    └────────┬─────────┘                    │
│                                  │                              │
│         ┌────────────────────────┼────────────────────┐         │
│         ▼                        ▼                    ▼         │
│  ┌─────────────┐         ┌─────────────┐      ┌─────────────┐   │
│  │ Static      │         │ API Routes  │      │ D1 Database │   │
│  │ Assets      │         │ (SSR)       │      │ (Binding)   │   │
│  └─────────────┘         └─────────────┘      └─────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │    Neon PostgreSQL      │
                    │    (External DB)        │
                    └─────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────┐
         ▼                        ▼                    ▼
  ┌─────────────┐         ┌─────────────┐      ┌─────────────┐
  │ OpenWeather │         │ NewsAPI     │      │ Google OAuth│
  │ API         │         │             │      │             │
  └─────────────┘         └─────────────┘      └─────────────┘
```

---

## Local Development

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20.x | `nvm install 20` |
| npm | 10.x | Bundled with Node |
| Wrangler CLI | 4.x | `npm install -g wrangler` |

### Setup

```bash
# Clone and navigate
git clone https://github.com/gtrusler/tl-start.git
cd tl-start/app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run database migrations (if using local DB)
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables (Local)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | 32+ character secret for session encryption |
| `NEXTAUTH_URL` | Yes | `http://localhost:3000` for local dev |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth client secret |
| `OPENWEATHER_API_KEY` | No | OpenWeatherMap API key for weather widget |
| `NEWS_API_KEY` | No | NewsAPI key for news widget |

---

## Production Deployment

### Infrastructure

| Component | Service | Details |
|-----------|---------|---------|
| Runtime | Cloudflare Workers | OpenNext adapter |
| CDN/SSL | Cloudflare | Automatic SSL, edge caching |
| Database | Neon PostgreSQL | Serverless Postgres |
| Domain | Cloudflare DNS | `portal.truslerlegal.com` |
| CI/CD | GitHub Actions | Auto-deploy on push to `main` |

### Automatic Deployment (Recommended)

Deployments trigger automatically when you push to `main` with changes in `app/**`:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will:
1. Install dependencies
2. Build with OpenNext (`npm run build:worker`)
3. Deploy to Cloudflare Workers

Monitor deployment: https://github.com/gtrusler/tl-start/actions

### Manual Deployment

```bash
cd app

# Build for Cloudflare Workers
npm run build:worker

# Deploy
wrangler deploy
```

Or combined:

```bash
npm run deploy
```

---

## Cloudflare Configuration

### Key Files

| File | Purpose |
|------|---------|
| `app/wrangler.toml` | Cloudflare Workers configuration |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
| `app/.open-next/` | Build output (generated) |

### wrangler.toml Settings

```toml
name = "trusler-legal-portal"
main = ".open-next/worker.js"
compatibility_date = "2025-07-19"
compatibility_flags = ["nodejs_compat"]

[[routes]]
pattern = "portal.truslerlegal.com"
custom_domain = true

[assets]
directory = ".open-next/assets"
binding = "STATIC_ASSETS"
```

### Secrets Configuration

Set secrets via Wrangler CLI (never commit to repo):

```bash
# Required secrets
wrangler secret put DATABASE_URL
wrangler secret put NEXTAUTH_SECRET
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET

# Optional secrets
wrangler secret put OPENWEATHER_API_KEY
wrangler secret put NEWS_API_KEY
```

### GitHub Actions Secret

Add to repository Settings → Secrets → Actions:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Workers edit permission |

Create token at: https://dash.cloudflare.com/profile/api-tokens

Required permissions:
- Account: Cloudflare Workers Scripts (Edit)
- Zone: Workers Routes (Edit)

---

## DNS Configuration

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | portal | trusler-legal-portal.gtrusler.workers.dev | Yes |

Or use custom domain in wrangler.toml (already configured).

---

## API Reference

### Authentication

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/google` | Initiate Google OAuth flow |
| GET | `/api/auth/callback/google` | OAuth callback handler |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/signout` | Sign out user |

### Data APIs

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/weather` | Austin weather data |
| GET | `/api/news` | Legal news headlines |
| GET | `/api/pollen` | Austin allergy/pollen data |
| POST | `/api/upload-temp-file` | Upload temporary file |

### Example Response: `/api/weather`

```json
{
  "temperature": 75,
  "description": "Partly cloudy",
  "humidity": 45,
  "windSpeed": 12,
  "icon": "cloud",
  "location": "Austin, TX"
}
```

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- OAuth Accounts
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

-- Sessions
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  session_token TEXT UNIQUE NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);
```

### Database Migrations

```bash
# Generate migration from schema changes
npx prisma migrate dev --name description

# Apply migrations to production
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

---

## npm Scripts Reference

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start local development server (port 3000) |
| `npm run build` | Standard Next.js production build |
| `npm run build:worker` | Build for Cloudflare Workers (OpenNext) |
| `npm run deploy` | Build + deploy to Cloudflare |
| `npm run start` | Start production server (standard Next.js) |
| `npm run lint` | Run ESLint |
| `npm run cf-build` | CI build command (install + build:worker) |

---

## Troubleshooting

### Deployment Not Triggering

```bash
# Check if changes are in app/ directory
git diff --name-only HEAD~1

# Manually trigger deployment
gh workflow run deploy.yml
```

### Check Deployment Status

```bash
# View recent workflow runs
gh run list --limit 5

# View specific run logs
gh run view <run-id> --log
```

### Wrangler Issues

```bash
# Login to Cloudflare
wrangler login

# Check configuration
wrangler whoami

# View deployment logs
wrangler tail
```

### Build Failures

```bash
# Clear build cache
rm -rf .next .open-next node_modules
npm install
npm run build:worker
```

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Check migrations status
npx prisma migrate status
```

### Cache Issues (Live Site)

- Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
- Try incognito/private window
- Purge cache in Cloudflare dashboard

---

## Post-Deployment Checklist

- [ ] Site loads at https://portal.truslerlegal.com
- [ ] SSL certificate active (padlock icon)
- [ ] Google OAuth sign-in works
- [ ] Weather widget displays data
- [ ] News widget displays headlines
- [ ] Pollen/allergy widget works
- [ ] All resource links functional
- [ ] Theme switching works
- [ ] Sign out works correctly

---

## Monitoring

### Cloudflare Dashboard
- Workers & Pages → trusler-legal-portal
- Analytics, requests, errors, CPU time

### GitHub Actions
- Repository → Actions tab
- View deployment history and logs

### Logs

```bash
# Stream live logs
wrangler tail

# Filter errors only
wrangler tail --format=pretty | grep -i error
```
