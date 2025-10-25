'use client';

import { useState } from 'react';
import ResearchForm from '@/components/ResearchForm';
import ResearchProgress from '@/components/ResearchProgress';
import ResearchResults from '@/components/ResearchResults';
import HamburgerMenu from '@/components/HamburgerMenu';
import SettingsPanel from '@/components/SettingsPanel';
import { useSettings } from '@/contexts/SettingsContext';

interface ResearchState {
  isLoading: boolean;
  progress?: {
    currentDepth: number;
    totalDepth: number;
    currentBreadth: number;
    totalBreadth: number;
    currentQuery?: string;
    totalQueries: number;
    completedQueries: number;
  };
  results?: {
    answer?: string;
    learnings?: string[];
    visitedUrls?: string[];
    report?: string;
  };
  error?: string;
}

export default function Home() {
  const { openRouterApiKey, selectedModel } = useSettings();
  const [research, setResearch] = useState<ResearchState>({
    isLoading: false,
  });

  const handleResearch = async (query: string, breadth: number, depth: number) => {
    setResearch({
      isLoading: true,
      progress: {
        currentDepth: depth,
        totalDepth: depth,
        currentBreadth: breadth,
        totalBreadth: breadth,
        totalQueries: 0,
        completedQueries: 0,
      },
    });

    try {
      // Use relative path for API routes - works both locally and on Vercel
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(openRouterApiKey && { 'X-OpenRouter-API-Key': openRouterApiKey }),
          ...(selectedModel && { 'X-Selected-Model': selectedModel }),
        },
        body: JSON.stringify({ query, breadth, depth }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform research');
      }

      const data = await response.json();

      setResearch({
        isLoading: false,
        results: {
          answer: data.answer,
          learnings: data.learnings,
          visitedUrls: data.visitedUrls,
        },
      });
    } catch (error) {
      setResearch({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HamburgerMenu />
      <SettingsPanel />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Deep Research
            </h1>
            <p className="text-lg text-foreground-secondary max-w-2xl">
              AI-powered research assistant that performs iterative, deep research on any topic
            </p>
          </div>

          {/* Form */}
          <ResearchForm onSubmit={handleResearch} isLoading={research.isLoading} />

          {/* Progress */}
          {research.isLoading && research.progress && (
            <ResearchProgress {...research.progress} />
          )}

          {/* Error */}
          {research.error && (
            <div className="w-full max-w-4xl p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
              <p className="text-red-400">{research.error}</p>
            </div>
          )}

          {/* Results */}
          {research.results && (
            <ResearchResults {...research.results} />
          )}

          {/* Info Section */}
          <div className="w-full max-w-4xl pt-8 space-y-4 text-sm text-foreground-tertiary">
            <div className="p-6 bg-background-secondary border border-border rounded-lg space-y-3">
              <h3 className="text-foreground font-semibold">How it works:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Enter your research query and configure breadth and depth parameters</li>
                <li>The system generates multiple search queries and processes results</li>
                <li>Recursively explores deeper based on findings</li>
                <li>Provides comprehensive answers with sources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
