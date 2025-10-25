'use client';

import { useState } from 'react';

interface ResearchFormProps {
  onSubmit: (query: string, breadth: number, depth: number) => void;
  isLoading: boolean;
}

export default function ResearchForm({ onSubmit, isLoading }: ResearchFormProps) {
  const [query, setQuery] = useState('');
  const [breadth, setBreadth] = useState(4);
  const [depth, setDepth] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query, breadth, depth);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
      <div className="space-y-2">
        <label htmlFor="query" className="block text-foreground text-sm font-medium">
          Research Query
        </label>
        <textarea
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What would you like to research?"
          className="w-full h-32 px-4 py-3 bg-background-secondary border border-border rounded-lg text-foreground placeholder-foreground-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          disabled={isLoading}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="breadth" className="block text-foreground text-sm font-medium">
            Breadth: {breadth}
          </label>
          <input
            id="breadth"
            type="range"
            min="2"
            max="10"
            value={breadth}
            onChange={(e) => setBreadth(parseInt(e.target.value))}
            className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            disabled={isLoading}
          />
          <p className="text-xs text-foreground-tertiary">
            Number of search queries per iteration (recommended: 3-10)
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="depth" className="block text-foreground text-sm font-medium">
            Depth: {depth}
          </label>
          <input
            id="depth"
            type="range"
            min="1"
            max="5"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer accent-accent"
            disabled={isLoading}
          />
          <p className="text-xs text-foreground-tertiary">
            Number of recursive research iterations (recommended: 1-5)
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="w-full py-3 px-6 bg-accent hover:bg-accent-hover text-foreground font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Researching...' : 'Start Research'}
      </button>
    </form>
  );
}
