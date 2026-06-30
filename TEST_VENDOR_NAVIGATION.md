# Vendor Navigation Testing Guide

## Pre-Deployment Testing (Local Production Build)

### Step 1: Build for Production
```bash
npm run build:web
```

**Expected Output:**
- Build completes successfully
- All vendor-settings routes are listed in the output:
  - `/vendor-settings/store (24 kB)`
  - `/vendor-settings/payout (21.8 kB)`
  - `/vendor-settings/support (23.7 kB)`
  - `/vendor-settings/earnings (25.9 kB)`

### Step 2: Serve Production Build Locally
```bash
npm run preview
```

**Expected Output:**
- Server starts on `http://localhost:3000`
- No errors in the terminal

### Step 3: Test Vendor Navigation Locally

1. **Navigate to Vendor Account:**
   - Open: `http://localhost:3000`
   - Login or navigate to vendor section
   - Go to Vendor Account tab

2. **Test Each Menu Item:**

   ✅ **Store Settings**
   - Click "Store Settings"
   - Should navigate to `/vendor-settings/store`
   - Page should display store settings form
   - Back button should return to Vendor Account
   
   ✅ **Payout Methods**
   - Click "Payout Methods"
   - Should navigate to `/vendor-settings/payout`
   - Page should display payment methods list
   - Back button should return to Vendor Account
   
   ✅ **Earnings Report**
   - Click "Earnings Report"
   - Should navigate to `/vendor-settings/earnings`
   - Page should display earnings dashboard
   - Back button should return to Vendor Account
   
   ✅ **Help & Support**
   - Click "Help & Support"
   - Should navigate to `/vendor-settings/support`
   - Page should display support options
   - Back button should return to Vendor Account

3. **Browser Console Check:**
   - Open browser DevTools (F12)
   - Check Console tab
   - Should have no navigation errors
   - Should have no 404 errors

## Deployment to Vercel

### Step 1: Commit Changes
```bash
git add app/(vendor)/account.tsx
git commit -m "Fix: Replace Link asChild with router.push for vendor navigation

- Replaced Link component with asChild pattern with direct router.push calls
- Fixes navigation issues in production build on Vercel
- All four vendor account menu items now work correctly
- Store Settings, Payout Methods, Earnings Report, Help & Support routes fixed"
```

### Step 2: Push to Trigger Deployment
```bash
git push origin main
```

### Step 3: Monitor Deployment
1. Go to Vercel dashboard
2. Watch the deployment progress
3. Check build logs for any errors
4. Wait for deployment to complete

## Post-Deployment Testing (Production)

### Step 1: Access Deployed Application
- Open your Vercel deployment URL
- Example: `https://your-app.vercel.app`

### Step 2: Navigate to Vendor Account
1. Login to the application
2. Switch to vendor mode or access vendor dashboard
3. Navigate to the "Account" tab

### Step 3: Test All Four Navigation Items

#### Test 1: Store Settings
- [ ] Click "Store Settings" menu item
- [ ] URL changes to `/vendor-settings/store`
- [ ] Store Settings page loads correctly
- [ ] Form fields are visible and interactive
- [ ] Back button navigates back to Vendor Account
- [ ] No console errors

#### Test 2: Payout Methods
- [ ] Click "Payout Methods" menu item
- [ ] URL changes to `/vendor-settings/payout`
- [ ] Payout Methods page loads correctly
- [ ] Payment methods list is displayed
- [ ] Back button navigates back to Vendor Account
- [ ] No console errors

#### Test 3: Earnings Report
- [ ] Click "Earnings Report" menu item
- [ ] URL changes to `/vendor-settings/earnings`
- [ ] Earnings Report page loads correctly
- [ ] Statistics and transactions are displayed
- [ ] Back button navigates back to Vendor Account
- [ ] No console errors

#### Test 4: Help & Support
- [ ] Click "Help & Support" menu item
- [ ] URL changes to `/vendor-settings/support`
- [ ] Help & Support page loads correctly
- [ ] Contact options and FAQs are visible
- [ ] Back button navigates back to Vendor Account
- [ ] No console errors

### Step 4: Cross-Browser Testing

Test on multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on macOS/iOS)

### Step 5: Mobile Testing

Test on mobile browsers:
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Responsive design mode in desktop browser

### Step 6: Direct URL Access

Test accessing routes directly:
- [ ] `https://your-app.vercel.app/vendor-settings/store`
- [ ] `https://your-app.vercel.app/vendor-settings/payout`
- [ ] `https://your-app.vercel.app/vendor-settings/earnings`
- [ ] `https://your-app.vercel.app/vendor-settings/support`

All should load correctly (may require authentication first).

## Troubleshooting

### If Navigation Still Fails

1. **Clear Browser Cache:**
   ```
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or clear cache in browser settings
   ```

2. **Check Vercel Deployment:**
   - Verify deployment completed successfully
   - Check Vercel build logs for errors
   - Ensure latest commit is deployed

3. **Verify Build Output:**
   ```bash
   npm run build:web
   ls -la dist/vendor-settings/
   ```
   Should show all four HTML files.

4. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for JavaScript errors
   - Check Network tab for 404 errors

5. **Verify Route Files:**
   ```bash
   ls -la app/vendor-settings/
   ```
   Should show:
   - `_layout.tsx`
   - `store.tsx`
   - `payout.tsx`
   - `earnings.tsx`
   - `support.tsx`

### If Issues Persist

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Deployment
   - Click on the deployment
   - Check "Build Logs" and "Runtime Logs"

2. **Verify Git Commit:**
   ```bash
   git log --oneline -5
   git show HEAD:app/(vendor)/account.tsx | grep "router.push"
   ```
   Should show `router.push` instead of `<Link asChild>`

3. **Redeploy:**
   ```bash
   # Trigger a fresh deployment
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

## Success Criteria

✅ **All Tests Pass When:**
- All four menu items navigate correctly
- Pages load without errors
- Back navigation works properly
- No console errors or warnings
- Works on both localhost production build and Vercel deployment
- Works across different browsers
- Works on mobile devices
- Direct URL access works correctly

## Rollback Plan

If the fix causes unexpected issues:

```bash
# Revert the commit
git revert HEAD

# Push the revert
git push origin main
```

This will restore the previous version while you investigate further.

## Documentation

After successful testing, update:
- Project README if needed
- Team documentation
- Mark this issue as resolved

## Notes

- The fix changes `Link` with `asChild` to `router.push()` calls
- This is a permanent fix, not a workaround
- No performance impact
- Works identically on all platforms
- Industry best practice for programmatic navigation
