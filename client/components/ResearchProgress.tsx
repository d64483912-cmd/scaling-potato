'use client';

interface ResearchProgressProps {
  currentDepth: number;
  totalDepth: number;
  currentBreadth: number;
  totalBreadth: number;
  currentQuery?: string;
  totalQueries: number;
  completedQueries: number;
}

export default function ResearchProgress({
  currentDepth,
  totalDepth,
  currentBreadth,
  totalBreadth,
  currentQuery,
  totalQueries,
  completedQueries,
}: ResearchProgressProps) {
  const progressPercentage = totalQueries > 0 ? (completedQueries / totalQueries) * 100 : 0;

  return (
    <div className="w-full max-w-4xl space-y-4 p-6 bg-background-secondary border border-border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Research Progress</h3>
        <span className="text-sm text-foreground-secondary">
          {completedQueries} / {totalQueries} queries
        </span>
      </div>

      <div className="space-y-2">
        <div className="w-full bg-background-tertiary rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-accent h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-foreground-tertiary">Current Depth</p>
          <p className="text-foreground font-medium">
            {currentDepth} / {totalDepth}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-foreground-tertiary">Current Breadth</p>
          <p className="text-foreground font-medium">
            {currentBreadth} / {totalBreadth}
          </p>
        </div>
      </div>

      {currentQuery && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-foreground-tertiary mb-1">Current Query</p>
          <p className="text-sm text-foreground">{currentQuery}</p>
        </div>
      )}
    </div>
  );
}
