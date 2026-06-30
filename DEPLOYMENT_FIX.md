# Vendor Settings Pages Deployment Fix

## Problem
The vendor settings pages (Store Settings, Payout Methods, Earnings Report, Help & Support) were working locally but not on the server (Vercel/Netlify deployment).

## Root Cause
Routes with `options={{ href: null }}` in Expo Router tab navigators may not be properly included during static export for web deployment. These "hidden" routes work in development mode but fail to generate the necessary route files during production builds.

## Solution
Moved vendor settings pages from hidden tab routes to a separate route structure:

### Files Moved
- `app/(vendor)/help-support.tsx` → `app/vendor-settings/support.tsx`
- `app/(vendor)/earnings-report.tsx` → `app/vendor-settings/earnings.tsx`
- `app/(vendor)/store-settings.tsx` → `app/vendor-settings/store.tsx`
- `app/(vendor)/payout-methods.tsx` → `app/vendor-settings/payout.tsx`

### Configuration Updates

1. **Created new layout**: `app/vendor-settings/_layout.tsx`
   - Stack navigator for vendor settings pages
   - Consistent styling with the rest of the app

2. **Updated routing**:
   - Removed hidden screens from `app/(vendor)/_layout.tsx`
   - Updated routes in `app/(vendor)/account.tsx` to point to new paths
   - Added vendor-settings route to root `app/_layout.tsx`

3. **Deployment Configuration**:
   - Updated `vercel.json` with proper routing and cache headers
   - Updated `netlify.toml` for consistent deployment
   - Created `.vercelignore` to exclude unnecessary files
   - Added `app/+html.tsx` for proper HTML root configuration
   - Added `app/+not-found.tsx` for 404 handling

4. **Enhanced `app.json`**:
   - Added web router configuration: `"router": { "origin": false }`
   - Ensures proper client-side routing for SPAs

## Testing
1. Test locally: `npm run start`
2. Build for web: `npm run build:web`
3. Preview build: `npm run preview` (requires: `npm install -g serve`)
4. Deploy to Vercel/Netlify and test all vendor settings pages

## Routes Now Working
- `/vendor-settings/store` - Store Settings
- `/vendor-settings/payout` - Payout Methods
- `/vendor-settings/earnings` - Earnings Report
- `/vendor-settings/support` - Help & Support

All routes are now properly exported during static builds and will work on server deployments.
