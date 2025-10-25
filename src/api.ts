import cors from 'cors';
import express, { Request, Response } from 'express';

import { deepResearch, writeFinalAnswer,writeFinalReport } from './deep-research';

const app = express();
const port = process.env.PORT || 3051;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function for consistent logging
function log(...args: any[]) {
  console.log(...args);
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API endpoint to run research
app.post('/api/research', async (req: Request, res: Response) => {
  try {
    const { query, depth = 3, breadth = 3 } = req.body;
    
    // Get custom settings from headers if provided
    const customApiKey = req.headers['x-openrouter-api-key'] as string;
    const customModel = req.headers['x-selected-model'] as string;
    
    // Temporarily set environment variables for this request if custom values provided
    const originalApiKey = process.env.OPENROUTER_API_KEY;
    const originalModel = process.env.OPENROUTER_MODEL;
    
    if (customApiKey) {
      process.env.OPENROUTER_API_KEY = customApiKey;
    }
    if (customModel) {
      process.env.OPENROUTER_MODEL = customModel;
    }

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    log('\nStarting research...\n');
    if (customApiKey) log('Using custom API key from client');
    if (customModel) log(`Using custom model: ${customModel}`);

    const { learnings, visitedUrls } = await deepResearch({
      query,
      breadth,
      depth,
    });

    log(`\n\nLearnings:\n\n${learnings.join('\n')}`);
    log(
      `\n\nVisited URLs (${visitedUrls.length}):\n\n${visitedUrls.join('\n')}`,
    );

    const answer = await writeFinalAnswer({
      prompt: query,
      learnings,
    });

    // Return the results
    const result = {
      success: true,
      answer,
      learnings,
      visitedUrls,
    };
    
    // Restore original environment variables
    if (customApiKey) {
      if (originalApiKey) {
        process.env.OPENROUTER_API_KEY = originalApiKey;
      } else {
        delete process.env.OPENROUTER_API_KEY;
      }
    }
    if (customModel) {
      if (originalModel) {
        process.env.OPENROUTER_MODEL = originalModel;
      } else {
        delete process.env.OPENROUTER_MODEL;
      }
    }
    
    return res.json(result);
  } catch (error: unknown) {
    console.error('Error in research API:', error);
    
    // Restore original environment variables even on error
    const customApiKey = req.headers['x-openrouter-api-key'] as string;
    const customModel = req.headers['x-selected-model'] as string;
    const originalApiKey = process.env.OPENROUTER_API_KEY;
    const originalModel = process.env.OPENROUTER_MODEL;
    
    if (customApiKey && originalApiKey) {
      process.env.OPENROUTER_API_KEY = originalApiKey;
    }
    if (customModel && originalModel) {
      process.env.OPENROUTER_MODEL = originalModel;
    }
    
    return res.status(500).json({
      error: 'An error occurred during research',
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

// generate report API
app.post('/api/generate-report',async(req:Request,res:Response)=>{
  try{
    const {query,depth = 3,breadth=3 } = req.body;
    if(!query){
      return res.status(400).json({error:'Query is required'});
    }
    log('\n Starting research...\n')
    const {learnings,visitedUrls} = await deepResearch({
      query,
      breadth,
      depth
    });
    log(`\n\nLearnings:\n\n${learnings.join('\n')}`);
    log(
      `\n\nVisited URLs (${visitedUrls.length}):\n\n${visitedUrls.join('\n')}`,
    );
    const report = await writeFinalReport({
      prompt:query,
      learnings,
      visitedUrls
    });

    return res.json({
      success: true,
      report,
      learnings,
      visitedUrls,
    });
    
  }catch(error:unknown){
    console.error("Error in generate report API:",error)
    return res.status(500).json({
      error:'An error occurred during research',
      message:error instanceof Error? error.message: String(error),
    })
  }
})



// Start the server
app.listen(port, () => {
  console.log(`Deep Research API running on port ${port}`);
});

export default app;
