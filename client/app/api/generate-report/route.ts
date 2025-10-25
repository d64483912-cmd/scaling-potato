import { NextRequest, NextResponse } from 'next/server';

// Import the deep research functions from the root src directory
// @ts-ignore - TypeScript may complain about relative imports outside the app directory
import { deepResearch, writeFinalReport } from '../../../../src/deep-research';

export const maxDuration = 300; // 5 minutes max for research

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, depth = 3, breadth = 3 } = body;

    // Get custom settings from headers if provided
    const customApiKey = request.headers.get('x-openrouter-api-key');
    const customModel = request.headers.get('x-selected-model');

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
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    console.log('\nStarting research...\n');
    if (customApiKey) console.log('Using custom API key from client');
    if (customModel) console.log(`Using custom model: ${customModel}`);

    const { learnings, visitedUrls } = await deepResearch({
      query,
      breadth,
      depth,
    });

    console.log(`\n\nLearnings:\n\n${learnings.join('\n')}`);
    console.log(
      `\n\nVisited URLs (${visitedUrls.length}):\n\n${visitedUrls.join('\n')}`
    );

    const report = await writeFinalReport({
      prompt: query,
      learnings,
      visitedUrls,
    });

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

    return NextResponse.json({
      success: true,
      report,
      learnings,
      visitedUrls,
    });
  } catch (error: unknown) {
    console.error('Error in generate report API:', error);

    return NextResponse.json(
      {
        error: 'An error occurred during research',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
