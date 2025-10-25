# Vercel Deployment Guide

This guide explains how to deploy the Deep Research Web App to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A GitHub repository with your project code
3. API keys:
   - OpenRouter API key (for AI research - get free models at [openrouter.ai](https://openrouter.ai))
   - Firecrawl API key (for web scraping - get at [firecrawl.dev](https://firecrawl.dev))

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **IMPORTANT**: Configure the project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client` (⚠️ MUST set this to `client`)
   - **Build Command**: Leave empty (will use defaults)
   - **Output Directory**: Leave empty (will use defaults)
   - **Install Command**: Leave empty (will use defaults)

   **OR** if keeping root directory as `./`:
   - **Root Directory**: `./` 
   - Vercel will use the `vercel.json` configuration automatically

### 2. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

#### Required Variables

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

#### Optional Variables

```env
OPENROUTER_MODEL=google/gemini-2.0-flash-exp:free
CONTEXT_SIZE=128000
```

**Note**: Vercel automatically sets `NODE_ENV=production` in production deployments.

### 3. Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Build the Next.js application
- Deploy to a global CDN
- Provide a production URL

## Free Model Options

The app supports several free OpenRouter models:

1. **Google Gemini 2.0 Flash** (default): `google/gemini-2.0-flash-exp:free`
2. **Meta Llama 3.2**: `meta-llama/llama-3.2-3b-instruct:free`
3. **Qwen 2**: `qwen/qwen-2-7b-instruct:free`

You can change the model in the app's settings menu or set `OPENROUTER_MODEL` environment variable.

## Architecture

The deployment uses Next.js API routes to handle backend functionality:

```
client/
├── app/
│   ├── api/
│   │   ├── research/route.ts      # Main research endpoint
│   │   ├── generate-report/route.ts # Report generation
│   │   └── health/route.ts        # Health check
│   ├── page.tsx                   # Main UI
│   └── ...
└── ...
```

The Express.js backend (`src/api.ts`) is **not used** in Vercel deployment. All functionality is handled by Next.js API routes.

## Environment Variables in the App

Users can also configure their own API keys directly in the app:

1. Click the hamburger menu (top-right)
2. Enter OpenRouter API key
3. Select preferred model
4. Changes are saved to browser localStorage

This allows users to:
- Use their own API keys
- Switch between different models
- Customize their research experience

## Troubleshooting

### Build Failures

If the build fails, check:
- All dependencies are listed in `client/package.json`
- TypeScript errors are resolved
- Environment variables are set correctly

### API Errors

If research fails:
- Verify API keys are valid and active
- Check Vercel function logs for errors
- Ensure the function timeout is sufficient (set to 300s/5min)

### Function Timeout

Deep research can take time. The API routes are configured with:
```typescript
export const maxDuration = 300; // 5 minutes
```

Make sure your Vercel plan supports this duration:
- **Hobby plan**: 10 seconds (upgrade required)
- **Pro plan**: 300 seconds (5 minutes)
- **Enterprise**: Custom

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install
cd client && npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## Updating the Deployment

After pushing changes to GitHub:
1. Vercel automatically detects the push
2. Triggers a new build
3. Deploys to production

You can also manually trigger deployments from the Vercel dashboard.

## Custom Domain

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain and follow DNS configuration instructions

## Monitoring

Vercel provides built-in monitoring:
- **Analytics**: Usage and performance metrics
- **Logs**: Function execution logs
- **Speed Insights**: Real-time performance data

Access these from your Vercel project dashboard.

## Security Notes

- Never commit API keys to your repository
- Use Vercel environment variables for secrets
- The app supports user-provided API keys stored in browser localStorage
- Consider implementing rate limiting for production use

## Support

For issues:
1. Check Vercel function logs
2. Review this documentation
3. Check the project repository issues
4. Contact Vercel support for platform issues

---

**Last Updated**: 2025
**Version**: 1.0.0
