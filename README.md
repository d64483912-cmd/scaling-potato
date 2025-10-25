# Deep Research - AI-Powered Research Assistant (Web App)

A full-stack web application for performing iterative, deep research on any topic using AI and web scraping. This is a customized version of the [original deep-research project](https://github.com/dzhng/deep-research.git), transformed into a modern web application with a sleek monochrome-dark interface.

## ✨ Features

- **🌐 Modern Web Interface**: Beautiful Next.js frontend with monochrome-dark theme
- **🤖 AI-Powered Research**: Iterative research using OpenRouter's free AI models
- **🔍 Deep Dive Capability**: Configurable breadth and depth parameters for comprehensive research
- **📊 Real-time Progress**: Live progress tracking during research execution
- **📝 Comprehensive Results**: Detailed answers, key learnings, and source citations
- **🆓 Free to Use**: Powered by OpenRouter's free tier models (Google Gemini 2.0 Flash)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16 with React, TypeScript, and Tailwind CSS
- **Backend**: Express.js API server with TypeScript
- **AI Provider**: OpenRouter API (free models)
- **Web Scraping**: Firecrawl for content extraction

### Project Structure
```
.
├── src/                  # Backend source code
│   ├── ai/              # AI providers and utilities
│   ├── api.ts           # Express API server
│   ├── deep-research.ts # Core research logic
│   └── run.ts           # CLI interface
├── client/              # Next.js frontend
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   └── public/          # Static assets
├── .env.local           # Environment variables
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x
- npm or yarn
- API Keys:
  - **OpenRouter API Key** (get free key at [OpenRouter](https://openrouter.ai))
  - **Firecrawl API Key** (get key at [Firecrawl](https://firecrawl.dev))

### Installation

1. **Clone the repository** (already done if you're reading this)

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client && npm install && cd ..
   ```

3. **Configure environment variables**

   Edit `.env.local` in the root directory:
   ```bash
   # Required: Firecrawl API key for web scraping
   FIRECRAWL_KEY="your_firecrawl_api_key"
   
   # Required: OpenRouter API key (free tier available)
   OPENROUTER_API_KEY="your_openrouter_api_key"
   
   # Optional: Specify a different model (default: google/gemini-2.0-flash-exp:free)
   # OPENROUTER_MODEL="google/gemini-2.0-flash-exp:free"
   
   # Optional: Context size
   CONTEXT_SIZE="128000"
   ```

   Edit `client/.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3051
   ```

### Running the Application

#### Option 1: Using the RUN button (Recommended in Clacky)
Simply click the "RUN" button in the Clacky IDE. This will start both the backend API and frontend automatically.

#### Option 2: Manual Start
```bash
# Terminal 1: Start the backend API
npm run api

# Terminal 2: Start the frontend
cd client && npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3051

#### Option 3: Using the convenience script
```bash
npm run dev
```

## 📖 Usage

1. **Open the web application** at http://localhost:3000

2. **Enter your research query** in the text area

3. **Configure parameters**:
   - **Breadth** (2-10): Number of search queries per iteration
   - **Depth** (1-5): Number of recursive research iterations

4. **Click "Start Research"** and watch the progress in real-time

5. **View results** in organized tabs:
   - **Answer**: Concise answer to your query
   - **Learnings**: Detailed findings from the research
   - **Sources**: All URLs visited during research

## 🎨 Design

The application features a **monochrome-dark theme** with:
- Clean, minimalist interface
- Excellent readability with carefully chosen contrast
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Custom scrollbars matching the theme

## 🔧 API Endpoints

### Backend API (Port 3051)

#### Health Check
```bash
GET /api/health
```

#### Perform Research
```bash
POST /api/research
Content-Type: application/json

{
  "query": "Your research question",
  "breadth": 4,  // Number of queries per iteration (default: 3)
  "depth": 2     // Number of recursive iterations (default: 3)
}

Response:
{
  "success": true,
  "answer": "Research answer...",
  "learnings": ["Learning 1", "Learning 2", ...],
  "visitedUrls": ["https://example.com", ...]
}
```

#### Generate Report
```bash
POST /api/generate-report
Content-Type: application/json

{
  "query": "Your research question",
  "breadth": 4,
  "depth": 2
}

Response:
{
  "success": true,
  "report": "Markdown formatted report...",
  "learnings": [...],
  "visitedUrls": [...]
}
```

## 🔑 About OpenRouter

This application uses [OpenRouter](https://openrouter.ai) for AI capabilities, which provides:
- **Free tier models** including Google Gemini 2.0 Flash
- **OpenAI-compatible API** for easy integration
- **Multiple model options** for different use cases

### Free Models Available
- `google/gemini-2.0-flash-exp:free` (Default)
- `meta-llama/llama-3.2-3b-instruct:free`
- `qwen/qwen-2-7b-instruct:free`

To change the model, set the `OPENROUTER_MODEL` environment variable.

## 🛠️ Development

### File Structure

**Backend:**
- `src/api.ts` - Express API server
- `src/deep-research.ts` - Core research logic
- `src/ai/providers.ts` - AI model providers (OpenRouter, OpenAI, Fireworks)
- `src/prompt.ts` - System prompts for AI

**Frontend:**
- `client/app/page.tsx` - Main application page
- `client/components/ResearchForm.tsx` - Research input form
- `client/components/ResearchProgress.tsx` - Progress display
- `client/components/ResearchResults.tsx` - Results display with tabs

### Environment Configuration

The project uses `.1024` (`.environments.yaml`) for Clacky environment configuration:
```yaml
run_command:
  - 'cd /home/runner/app && npx tsx --env-file=.env.local src/api.ts'
  - 'cd /home/runner/app/client && npm run dev'
dependency_command: 'cd /home/runner/app && npm install && cd client && npm install'
```

## 🎯 Key Improvements Over Original

1. **Web Interface**: Modern, user-friendly web application instead of CLI
2. **Free AI Models**: Uses OpenRouter's free tier instead of requiring paid OpenAI API
3. **Better UX**: Real-time progress tracking and organized result display
4. **Monochrome Theme**: Beautiful dark theme optimized for readability
5. **Full-Stack**: Separated concerns with dedicated frontend and backend

## 🔍 How It Works

1. **Query Generation**: AI generates multiple targeted search queries based on your input
2. **Web Scraping**: Firecrawl fetches and processes web content from search results
3. **Analysis**: AI analyzes content and extracts key learnings
4. **Iteration**: Process repeats recursively based on depth setting
5. **Synthesis**: Final answer is generated from all accumulated learnings

## 🚀 Vercel Deployment

Deploy your own instance to Vercel in just a few clicks!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Quick Deployment Steps:

1. **Click the Deploy button** or go to [Vercel](https://vercel.com/new)
2. **Import your repository** from GitHub
3. **Configure build settings**:
   - Framework: Next.js
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/.next`
4. **Add environment variables**:
   - `OPENROUTER_API_KEY` - Your OpenRouter API key
   - `FIRECRAWL_API_KEY` - Your Firecrawl API key
   - (Optional) `OPENROUTER_MODEL` - Model to use (default: google/gemini-2.0-flash-exp:free)
5. **Deploy** and get your production URL!

**📚 Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

### Key Features for Vercel:
- Next.js API routes replace Express backend
- Optimized for serverless deployment
- Global CDN distribution
- Automatic HTTPS
- Zero configuration deployment

## 📝 Notes

- The free tier of OpenRouter has rate limits, so be mindful of usage
- Firecrawl API also has rate limits on free tier
- Increase breadth and depth for more comprehensive research (but slower)
- Results are not saved by default; copy them before starting a new search
- For Vercel deployment, Pro plan or higher is recommended for longer function timeouts

## 🤝 Contributing

This is a customized version of the original project. For the original:
- Original Repo: https://github.com/dzhng/deep-research.git
- Original Author: [@dzhng](https://x.com/dzhng)
- Sponsored by: [Aomni](https://aomni.com)

## 📄 License

MIT License - feel free to use and modify as needed.

## 🙏 Acknowledgments

- Original project by [@dzhng](https://x.com/dzhng)
- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenRouter](https://openrouter.ai)
- Web scraping by [Firecrawl](https://firecrawl.dev)
