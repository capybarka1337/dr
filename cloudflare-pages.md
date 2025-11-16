# Cloudflare Pages Configuration

## Basic Settings

- **Project name**: `dr`
- **Production branch**: `main` (or `master`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (or leave empty)
- **Deploy command**: **LEAVE EMPTY** ⚠️ (Cloudflare Pages auto-deploys from build output directory)

## Framework Settings

- **Framework preset**: Vite

## Build Configuration

The project uses:
- Node.js (recommend version 18.x or later)
- Vite as build tool
- TypeScript compilation followed by Vite build

## Environment Variables

No environment variables required for this project.

## Deploy Process

1. Connect your GitHub repository to Cloudflare Pages
2. Select the repository `capybarka1337/dr`
3. Configure settings as listed above
4. Click "Save and Deploy"

Cloudflare Pages will automatically:
- Install dependencies (`npm install`)
- Run build command (`npm run build`)
- Deploy the `dist` folder contents

## Preview Deployments

All non-production branches will automatically get preview deployments with the same build settings.
