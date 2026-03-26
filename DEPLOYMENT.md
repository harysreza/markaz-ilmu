# Deployment Guide — Markaz Ilmu

## Overview

Markaz Ilmu is a monolithic **Next.js 16** application that bundles the public-facing frontend, the admin panel, and all REST API routes into a single deployable unit. The only external dependency is the database.

| Layer | Technology |
|-------|-----------|
| Frontend + Backend | Next.js 16 (App Router, Turbopack) |
| Database ORM | Prisma v5 |
| Database Engine | SQLite (default) / PostgreSQL (Vercel) |
| Authentication | NextAuth.js v5 (JWT, Credentials) |
| Runtime | Node.js ≥ 20 |

---

## Environment Variables

These three variables are **required** in every environment. Never commit them to Git (`.env*` is already in `.gitignore`).

```env
# Absolute path for production SQLite (see platform sections for exact value)
# For PostgreSQL: postgresql://user:password@host:5432/dbname
DATABASE_URL="file:/var/www/markaz-ilmu/data/prod.db"

# Strong random secret — generate with: openssl rand -base64 32
NEXTAUTH_SECRET="replace-with-64-char-random-string"

# Full public URL of your site including protocol, no trailing slash
NEXTAUTH_URL="https://markaz-ilmu.com"
```

### Generate `NEXTAUTH_SECRET`

```bash
openssl rand -base64 32
```

> **Security note**: The default value in `.env` (`markaz-ilmu-admin-secret-key-2026-please-change-in-production`) must **never** be used in production. A compromised secret allows forging session tokens.

---

## Option 1 — VPS (Ubuntu/Debian) — Recommended for SQLite

This is the most straightforward path. SQLite runs from a persistent file on disk, zero additional services required.

### 1.1 Server Requirements

- Ubuntu 22.04 LTS or Debian 12
- 1 vCPU, 1 GB RAM minimum (2 GB recommended)
- 10 GB storage minimum
- Open ports: `80`, `443`

### 1.2 Install Node.js and PM2

```bash
# Install Node.js 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node -v   # v20.x.x
npm -v

# Install PM2 process manager globally
sudo npm install -g pm2
```

### 1.3 Install and Configure Nginx

```bash
sudo apt-get install -y nginx

# Create site config
sudo nano /etc/nginx/sites-available/markaz-ilmu
```

Paste this configuration (replace `markaz-ilmu.com` with your domain):

```nginx
server {
    listen 80;
    server_name markaz-ilmu.com www.markaz-ilmu.com;

    # Redirect HTTP to HTTPS (uncomment after SSL setup)
    # return 301 https://$host$request_uri;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/markaz-ilmu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 1.4 Issue SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d markaz-ilmu.com -d www.markaz-ilmu.com

# Auto-renew
sudo systemctl enable certbot.timer
```

After Certbot runs, uncomment the `return 301` redirect line in the Nginx config and reload.

### 1.5 Clone and Configure the Application

```bash
# Create app directory
sudo mkdir -p /var/www/markaz-ilmu/data
sudo chown -R $USER:$USER /var/www/markaz-ilmu

# Clone repository
cd /var/www/markaz-ilmu
git clone https://github.com/your-org/markaz-ilmu.git app
cd app

# Create production environment file
cat > .env << 'EOF'
DATABASE_URL="file:/var/www/markaz-ilmu/data/prod.db"
NEXTAUTH_SECRET="your-generated-64-char-secret-here"
NEXTAUTH_URL="https://markaz-ilmu.com"
EOF

# Install dependencies
npm install
```

### 1.6 Build and Initialize the Database

```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma db push

# Seed initial data (admin user + defaults)
npm run db:seed

# Build the Next.js application
npm run build
```

### 1.7 Start with PM2

```bash
# Start the application
pm2 start npm --name "markaz-ilmu" -- start

# Save PM2 process list so it restarts on reboot
pm2 save

# Configure PM2 to start on system boot
pm2 startup
# Follow the command printed by pm2 startup (copy-paste and run it)

# Verify it is running
pm2 status
pm2 logs markaz-ilmu --lines 50
```

### 1.8 Verify Deployment

```bash
# Check the app responds locally
curl -I http://127.0.0.1:3000

# Check through Nginx
curl -I https://markaz-ilmu.com

# Check admin login page
curl -I https://markaz-ilmu.com/admin/login
```

---

## Option 2 — Railway

Railway supports persistent volumes, making SQLite viable on a managed platform.

### 2.1 Prerequisites

- Railway account at [railway.app](https://railway.app)
- Railway CLI: `npm install -g @railway/cli`

### 2.2 Deploy

```bash
# Login
railway login

# Create a new project from the repo root
railway init

# Link to the project if already created
railway link

# Set environment variables
railway variables set DATABASE_URL="file:/app/data/prod.db"
railway variables set NEXTAUTH_SECRET="your-generated-secret"
railway variables set NEXTAUTH_URL="https://your-project.up.railway.app"
```

### 2.3 Add a Persistent Volume

In the Railway dashboard:

1. Go to your service → **Settings** → **Volumes**
2. Click **Add Volume**
3. Mount path: `/app/data`
4. This ensures `prod.db` survives redeploys

### 2.4 Add Build and Start Commands

In the Railway dashboard under **Settings** → **Deploy**:

| Field | Value |
|-------|-------|
| Build Command | `npm run build` |
| Start Command | `npm start` |

Or configure via `railway.toml` in the project root:

```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
```

### 2.5 Run Database Setup on First Deploy

After the first deploy, open a Railway shell:

```bash
railway run npx prisma db push
railway run npm run db:seed
```

### 2.6 Set Custom Domain

In the Railway dashboard → **Settings** → **Domains** → Add your domain. Then update:

```bash
railway variables set NEXTAUTH_URL="https://markaz-ilmu.com"
```

---

## Option 3 — Render

Similar to Railway, Render supports persistent disks.

### 3.1 Create a Web Service

1. Connect your GitHub repository at [render.com](https://render.com)
2. Create a **Web Service** with:
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

### 3.2 Add a Persistent Disk

1. In the Render dashboard → **Disks** → **Add Disk**
2. Mount path: `/var/data`
3. Size: 1 GB minimum

### 3.3 Environment Variables

Add these in the Render dashboard under **Environment**:

```
DATABASE_URL   = file:/var/data/prod.db
NEXTAUTH_SECRET = your-generated-secret
NEXTAUTH_URL    = https://your-service.onrender.com
```

### 3.4 Initialize Database

Use Render's **Shell** tab (or a one-off job):

```bash
npx prisma db push
npm run db:seed
```

---

## Option 4 — Vercel (Requires PostgreSQL)

Vercel's serverless filesystem is **read-only and ephemeral**. SQLite cannot be used. You must migrate the database to PostgreSQL.

### 4.1 Migrate Database to PostgreSQL

#### Step 1 — Update `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Step 2 — Create a PostgreSQL Database

Choose one of these managed PostgreSQL providers:

| Provider | Free Tier | Notes |
|----------|-----------|-------|
| [Neon](https://neon.tech) | ✅ Yes | Recommended — serverless PostgreSQL |
| [Supabase](https://supabase.com) | ✅ Yes | Includes dashboard UI |
| [Railway PostgreSQL](https://railway.app) | ✅ Yes | Easy add-on |

Copy the connection string from the provider. It will look like:

```
postgresql://username:password@host.provider.com:5432/dbname?sslmode=require
```

#### Step 3 — Push the Schema to PostgreSQL

```bash
# Update your local .env for the migration step
DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"

npx prisma generate
npx prisma db push
npm run db:seed
```

#### Step 4 — Install Vercel CLI and Deploy

```bash
npm install -g vercel

# From the project root
vercel

# Follow the prompts to link or create a project
```

### 4.2 Set Environment Variables on Vercel

```bash
vercel env add DATABASE_URL
# Paste your PostgreSQL connection string when prompted

vercel env add NEXTAUTH_SECRET
# Paste your 64-char random secret

vercel env add NEXTAUTH_URL
# https://your-domain.vercel.app (or custom domain)
```

Or set them in the Vercel dashboard under **Project Settings** → **Environment Variables**.

### 4.3 Deploy to Production

```bash
vercel --prod
```

### 4.4 Add a Custom Domain

In the Vercel dashboard → **Settings** → **Domains** → Add domain. Then update:

```bash
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL
# Enter: https://markaz-ilmu.com
vercel --prod
```

---

## Database Setup Reference

These commands apply to any platform after the environment is configured.

```bash
# 1. Generate the Prisma client (required before build)
npx prisma generate

# 2. Create/sync the database schema (safe — no data loss)
npx prisma db push

# 3. Seed the database with the super admin and default data
npm run db:seed

# 4. Inspect the database visually (development only)
npm run db:studio
```

### What the Seed Creates

| Resource | Detail |
|----------|--------|
| Super Admin | `admin@markaz-ilmu.com` / `admin123` |
| Bank Account | BSI — placeholder account number |
| Donation Campaign | "Infaq & Sedekah Markaz Ilmu" |
| Site Settings | 8 default key/value pairs |
| Sample Articles | 2 published articles (Akidah, Akhlak) |
| Sample Doa/Dzikir | 2 published entries |
| Sample Q&A | 2 published answers |

> **Important**: Change the super admin password immediately after first login at `/admin/pengguna`.

---

## Post-Deployment Checklist

Perform these checks after every new deployment.

### Security

- [ ] `NEXTAUTH_SECRET` is a strong random value (not the default)
- [ ] `NEXTAUTH_URL` matches the exact production domain
- [ ] Admin password changed from `admin123`
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] `.env` file is not committed to the repository

### Functionality

- [ ] `/` — Home page loads, sections render (articles, videos, audios, ebooks)
- [ ] `/artikel` — Article list page loads
- [ ] `/video-kajian` — Video page loads (empty state is handled gracefully)
- [ ] `/audio-kajian` — Audio page loads (empty state is handled gracefully)
- [ ] `/jadwal-kajian` — Events page loads
- [ ] `/donasi` — Donation page shows bank accounts
- [ ] `/admin/login` — Login page loads without redirect loops
- [ ] Admin login with seeded credentials works
- [ ] Creating a new article in admin reflects on `/artikel`

### Performance

- [ ] All static pages (`/`, `/artikel`, etc.) are prerendered (check build output)
- [ ] Images load correctly (Unsplash domain is whitelisted in `next.config.ts`)
- [ ] No console errors in the browser

---

## Updating the Application

### On a VPS with PM2

```bash
cd /var/www/markaz-ilmu/app

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Sync schema changes without data loss
npx prisma db push

# Rebuild
npm run build

# Zero-downtime reload
pm2 reload markaz-ilmu
```

### On Railway / Render

Push to the connected Git branch. Railway and Render will auto-detect the push and trigger a new build + deploy. The persistent volume (and database) is unaffected.

### On Vercel

```bash
git push origin main
# Vercel auto-deploys on push

# Or manually:
vercel --prod
```

---

## Troubleshooting

### `Error: Cannot find module '@prisma/client'`

Prisma client was not generated before build.

```bash
npx prisma generate
npm run build
```

### `Error: Environment variable not found: DATABASE_URL`

The `.env` file is missing or the platform env var is not set. Verify:

```bash
# On VPS
cat /var/www/markaz-ilmu/app/.env

# On Railway
railway variables

# On Vercel
vercel env ls
```

### Admin login causes `ERR_TOO_MANY_REDIRECTS`

The `NEXTAUTH_URL` does not match the actual domain. Fix:

```bash
# Must exactly match what's in the browser address bar
NEXTAUTH_URL="https://markaz-ilmu.com"   # correct
NEXTAUTH_URL="https://www.markaz-ilmu.com"  # different — pick one and be consistent
```

### SQLite: `SQLITE_READONLY` or database not persisting

The `DATABASE_URL` must point to an absolute path on a writable, persistent disk.

```bash
# Wrong (relative path — unreliable in production)
DATABASE_URL="file:./prod.db"

# Correct (absolute path to persistent mount)
DATABASE_URL="file:/var/www/markaz-ilmu/data/prod.db"

# Ensure the directory exists and is writable
mkdir -p /var/www/markaz-ilmu/data
chmod 755 /var/www/markaz-ilmu/data
```

### `next start` — Port Already in Use

```bash
# Find and kill the process on port 3000
sudo lsof -i :3000
sudo kill -9 <PID>

# Or change the port
PORT=3001 npm start
# Update Nginx proxy_pass to port 3001
```

### Build Fails with TypeScript Errors

```bash
# Check for errors locally
npm run build 2>&1 | grep "error TS"
```

Fix the reported errors before deploying. Do not use `--no-verify` or skip TypeScript checks in production.

### PM2 Process Not Starting After Server Reboot

```bash
# Re-run the startup hook
pm2 startup

# Save the current process list
pm2 save

# Verify
pm2 list
```

---

## Architecture Notes

- **No separate backend server**: All API routes (`/api/admin/*`) run inside the Next.js process. No additional service to start or manage.
- **No Redis / message queue**: Sessions are stored as signed JWTs. No caching layer is required.
- **Image hosting**: Currently uses Unsplash URLs and direct URL strings stored in the database. For user-uploaded images in the admin panel, integrate a storage service (Cloudinary, AWS S3, Supabase Storage) and add the domain to `next.config.ts` `remotePatterns`.
- **Email**: No email service is configured. The newsletter subscriber list is stored in the database but sending is not implemented. Add Resend, SendGrid, or Nodemailer when ready.
- **Prayer schedule**: The `/jadwal-sholat` page fetches prayer times from a public API at runtime. No configuration needed.
