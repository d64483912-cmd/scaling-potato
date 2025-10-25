# 🔧 Vercel Deployment Fix - Instructions

## Problem
The deployment at https://scaling-potato.vercel.app/ shows a 404 error because Vercel needs to be configured to use the `client` directory as the root.

## Solution: Reconfigure Vercel Project

### Option 1: Set Root Directory to `client` (Recommended)

1. **Go to your Vercel project settings**:
   - Visit: https://vercel.com/d64483912-cmd/scaling-potato/settings
   - Or go to your Vercel dashboard → Select the `scaling-potato` project → Settings

2. **Update Root Directory**:
   - Scroll to "Build & Development Settings"
   - Find "Root Directory"
   - Click "Edit"
   - Set to: `client`
   - Click "Save"

3. **Clear other custom settings** (if any):
   - Build Command: Leave EMPTY (Next.js will auto-detect)
   - Output Directory: Leave EMPTY
   - Install Command: Leave EMPTY

4. **Redeploy**:
   - Go to Deployments tab
   - Click "..." next to latest deployment
   - Select "Redeploy"
   - Or push a new commit to trigger deployment

### Option 2: Use vercel.json Configuration

If you want to keep the root directory as `./`:

The project already has a `vercel.json` file that configures the build correctly. Vercel should automatically detect and use it. If it's not working:

1. **Check vercel.json is recognized**:
   - Go to your latest deployment logs
   - Look for "Reading vercel.json" or similar message

2. **If not recognized, manually trigger redeploy**:
   - Go to Deployments → Select latest → Redeploy

## Environment Variables (Required)

Don't forget to set these in Vercel project settings:

1. **Go to Settings → Environment Variables**

2. **Add these variables**:
   ```
   OPENROUTER_API_KEY = your_openrouter_api_key
   FIRECRAWL_API_KEY = your_firecrawl_api_key
   ```

3. **Optional variables**:
   ```
   OPENROUTER_MODEL = google/gemini-2.0-flash-exp:free
   CONTEXT_SIZE = 128000
   ```

4. **Apply to**: Production, Preview, and Development

5. **Redeploy** after adding environment variables

## Verify the Fix

After redeploying, check:

1. ✅ Homepage loads at https://scaling-potato.vercel.app/
2. ✅ You see the "Deep Research" interface
3. ✅ Hamburger menu opens (settings)
4. ✅ API health check works: https://scaling-potato.vercel.app/api/health

## Troubleshooting

### Still showing 404?

1. **Check build logs**:
   - Go to latest deployment
   - Click "View Function Logs"
   - Look for errors

2. **Verify files are deployed**:
   - In deployment details, check "Source Files"
   - Should see `client/app/`, `client/components/`, etc.

3. **Check Framework Detection**:
   - Deployment logs should show "Detected Next.js"
   - If not, manually set Framework Preset to "Next.js"

### Build fails?

1. **Check TypeScript errors** in build logs
2. **Verify dependencies** are correct in `client/package.json`
3. **Check environment variables** are set correctly

### Function timeout errors?

- Upgrade to Vercel Pro plan (Hobby plan has 10s timeout, research needs 300s)
- Or use shorter breadth/depth parameters

## Quick Links

- **Project URL**: https://scaling-potato.vercel.app/
- **Project Settings**: https://vercel.com/d64483912-cmd/scaling-potato/settings
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/d64483912-cmd/scaling-potato

## What Was Fixed in This Update

1. ✅ Updated `vercel.json` with proper configuration
2. ✅ Added `vercel-build` script to `package.json`
3. ✅ Created `.vercelignore` to optimize deployment
4. ✅ Updated deployment documentation
5. ✅ Added clear instructions for root directory setting

## Expected Result

After following these instructions, your deployment should:
- ✅ Show the Deep Research homepage
- ✅ Load the Next.js app correctly
- ✅ Have all API routes working
- ✅ Support user settings (API keys, themes, etc.)

---

**Need Help?**
- Check DEPLOYMENT.md for full deployment guide
- Review Vercel logs for specific errors
- Ensure all environment variables are set

**Last Updated**: 2025-10-25
