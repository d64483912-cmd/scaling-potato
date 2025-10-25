# Quick Reference Card

## 🚀 Starting the Application

### Clacky IDE
```
Just click the RUN button!
```

### Manual
```bash
# Terminal 1
npm run api

# Terminal 2  
cd client && npm run dev
```

## 🔑 Required API Keys

| Service | URL | Purpose |
|---------|-----|---------|
| OpenRouter | https://openrouter.ai | AI Models (FREE) |
| Firecrawl | https://firecrawl.dev | Web Scraping |

## 🌐 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Web UI |
| Backend | http://localhost:3051 | API Server |
| Health | http://localhost:3051/api/health | Status Check |

## 📁 Key Files

### Configuration
- `.env.local` - Backend environment variables
- `client/.env.local` - Frontend environment variables
- `.gitignore` - Git ignore rules
- `/home/runner/.clackyai/.environments.yaml` - Clacky config

### Backend
- `src/api.ts` - Express API server
- `src/deep-research.ts` - Research logic
- `src/ai/providers.ts` - AI providers (OpenRouter)

### Frontend
- `client/app/page.tsx` - Main page
- `client/components/` - React components
- `client/app/globals.css` - Global styles
- `client/tailwind.config.ts` - Tailwind config

### Documentation
- `README.md` - Full documentation
- `SETUP.md` - Quick setup guide
- `PROJECT_SUMMARY.md` - Project overview
- `QUICK_REFERENCE.md` - This file

## 🎨 Theme Colors

```css
/* Backgrounds */
--background: #0a0a0a
--background-secondary: #1a1a1a
--background-tertiary: #2a2a2a

/* Text */
--foreground: #f5f5f5
--foreground-secondary: #d4d4d4
--foreground-tertiary: #a3a3a3

/* Borders & Accents */
--border: #3a3a3a
--accent: #6b6b6b
```

## 🔧 API Endpoints

### Backend API (localhost:3051)

#### Health Check
```bash
GET /api/health
# Response: {"status":"ok","timestamp":"..."}
```

#### Research
```bash
POST /api/research
Content-Type: application/json

{
  "query": "Research question",
  "breadth": 4,
  "depth": 2
}
```

#### Generate Report
```bash
POST /api/generate-report
Content-Type: application/json

{
  "query": "Research question",
  "breadth": 4,
  "depth": 2
}
```

## 📊 Parameters

| Parameter | Range | Default | Description |
|-----------|-------|---------|-------------|
| Breadth | 2-10 | 4 | Queries per iteration |
| Depth | 1-5 | 2 | Recursive iterations |

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:3051/api/health
```

### Test Frontend
```
Open browser to http://localhost:3000
```

### Test Research (Example)
```bash
curl -X POST http://localhost:3051/api/research \
  -H "Content-Type: application/json" \
  -d '{"query":"What is AI?","breadth":3,"depth":1}'
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3051
lsof -ti:3051 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Backend Not Starting
- Check `.env.local` has valid API keys
- Verify dependencies installed: `npm install`
- Check for error messages in terminal

### Frontend Not Loading
- Check backend is running first
- Clear browser cache
- Delete `client/.next` and restart

## 📦 Dependencies

### Backend
```bash
cd /home/runner/app
npm install
```

### Frontend
```bash
cd /home/runner/app/client
npm install
```

## 🔄 Common Commands

```bash
# Install dependencies
npm install && cd client && npm install && cd ..

# Start backend only
npm run api

# Start frontend only
cd client && npm run dev

# Format code
npm run format

# Original CLI mode
npm start
```

## 📝 Environment Variables

### Backend (.env.local)
```bash
FIRECRAWL_KEY="your_key"
OPENROUTER_API_KEY="your_key"
OPENROUTER_MODEL="google/gemini-2.0-flash-exp:free"
CONTEXT_SIZE="128000"
```

### Frontend (client/.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3051
```

## 🎯 Free Models (OpenRouter)

- `google/gemini-2.0-flash-exp:free` (Default)
- `meta-llama/llama-3.2-3b-instruct:free`
- `qwen/qwen-2-7b-instruct:free`

Change in `.env.local`:
```bash
OPENROUTER_MODEL="model-name:free"
```

## ⚡ Quick Tips

1. Always start backend before frontend
2. Use breadth 3-5 and depth 1-2 for quick tests
3. Free tier has rate limits - be patient
4. Copy results before starting new search
5. Check browser console for errors
6. Monitor terminal for backend logs

## 🆘 Get Help

1. Read `SETUP.md` for detailed setup
2. Check `README.md` for full documentation
3. Review `PROJECT_SUMMARY.md` for overview
4. Verify API keys are valid
5. Check terminal logs for errors

---

**Quick Access**: Bookmark this page for instant reference!
