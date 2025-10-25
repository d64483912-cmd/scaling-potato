# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### Step 1: Get Your API Keys

#### OpenRouter (Required - Free Tier Available)
1. Go to https://openrouter.ai
2. Sign up for a free account
3. Navigate to "Keys" section
4. Create a new API key
5. Copy the key (starts with `sk-or-...`)

#### Firecrawl (Required)
1. Go to https://firecrawl.dev
2. Sign up for an account
3. Get your API key from the dashboard
4. Copy the key

### Step 2: Configure Environment

Edit `.env.local` in the project root:

```bash
# Replace YOUR_FIRECRAWL_KEY with your actual key
FIRECRAWL_KEY="fc-..."

# Replace YOUR_OPENROUTER_KEY with your actual key
OPENROUTER_API_KEY="sk-or-..."

# Optional: Change the model (default is fine for most uses)
# OPENROUTER_MODEL="google/gemini-2.0-flash-exp:free"

CONTEXT_SIZE="128000"
```

Edit `client/.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3051
```

### Step 3: Run the Application

In Clacky IDE:
1. Click the **RUN** button
2. Wait for both servers to start
3. Open the application in your browser (port 3000)

Or manually:
```bash
# Install dependencies (first time only)
npm install
cd client && npm install && cd ..

# Start backend (Terminal 1)
npm run api

# Start frontend (Terminal 2)
cd client && npm run dev
```

## ✅ Verify It's Working

1. Backend health check:
   ```bash
   curl http://localhost:3051/api/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. Frontend:
   - Open http://localhost:3000 in your browser
   - You should see the Deep Research interface

## 🎯 First Research Query

Try this simple query to test the system:
- **Query**: "What are the latest developments in AI?"
- **Breadth**: 4
- **Depth**: 2

This should take 1-3 minutes to complete.

## 🔧 Troubleshooting

### Backend won't start
- Check if port 3051 is already in use: `lsof -i :3051`
- Verify your `.env.local` file has valid API keys
- Check the terminal for error messages

### Frontend won't start
- Check if port 3000 is already in use: `lsof -i :3000`
- Make sure you ran `npm install` in the `client` directory
- Try deleting `client/.next` folder and restart

### API requests fail
- Verify both backend and frontend are running
- Check browser console for error messages
- Ensure CORS is not blocking requests
- Verify API keys are correctly set in `.env.local`

### Rate limit errors
- OpenRouter free tier has rate limits
- Firecrawl free tier has rate limits
- Try reducing breadth and depth parameters
- Wait a few minutes before trying again

## 📚 Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Explore the API endpoints
3. Customize the theme in `client/tailwind.config.ts`
4. Try different OpenRouter models

## 🆘 Need Help?

- Check the [main README](README.md) for detailed information
- Review the API documentation
- Check the terminal logs for error messages
- Verify all API keys are valid and have remaining quota

## 🎉 You're All Set!

Start researching with AI! The application is designed to provide deep, comprehensive research on any topic you're curious about.
