'use client';

import { useState } from 'react';

interface ResearchResultsProps {
  answer?: string;
  learnings?: string[];
  visitedUrls?: string[];
  report?: string;
}

export default function ResearchResults({ answer, learnings, visitedUrls, report }: ResearchResultsProps) {
  const [activeTab, setActiveTab] = useState<'answer' | 'learnings' | 'sources' | 'report'>('answer');

  if (!answer && !learnings && !visitedUrls && !report) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex space-x-2 border-b border-border">
        {answer && (
          <button
            onClick={() => setActiveTab('answer')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'answer'
                ? 'text-foreground border-b-2 border-accent'
                : 'text-foreground-tertiary hover:text-foreground-secondary'
            }`}
          >
            Answer
          </button>
        )}
        {report && (
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'report'
                ? 'text-foreground border-b-2 border-accent'
                : 'text-foreground-tertiary hover:text-foreground-secondary'
            }`}
          >
            Report
          </button>
        )}
        {learnings && learnings.length > 0 && (
          <button
            onClick={() => setActiveTab('learnings')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'learnings'
                ? 'text-foreground border-b-2 border-accent'
                : 'text-foreground-tertiary hover:text-foreground-secondary'
            }`}
          >
            Learnings ({learnings.length})
          </button>
        )}
        {visitedUrls && visitedUrls.length > 0 && (
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'sources'
                ? 'text-foreground border-b-2 border-accent'
                : 'text-foreground-tertiary hover:text-foreground-secondary'
            }`}
          >
            Sources ({visitedUrls.length})
          </button>
        )}
      </div>

      <div className="p-6 bg-background-secondary border border-border rounded-lg">
        {activeTab === 'answer' && answer && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Research Answer</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground-secondary whitespace-pre-wrap">{answer}</p>
            </div>
          </div>
        )}

        {activeTab === 'report' && report && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Research Report</h3>
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-foreground-secondary whitespace-pre-wrap markdown-content"
                dangerouslySetInnerHTML={{ __html: report }}
              />
            </div>
          </div>
        )}

        {activeTab === 'learnings' && learnings && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Key Learnings</h3>
            <ul className="space-y-3">
              {learnings.map((learning, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground-secondary flex-1">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'sources' && visitedUrls && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Sources</h3>
            <ul className="space-y-2">
              {visitedUrls.map((url, index) => (
                <li key={index}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover underline break-all"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
