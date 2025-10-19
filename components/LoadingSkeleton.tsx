interface LoadingSkeletonProps {
  lines?: number;
}

export function LoadingSkeleton({ lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-5 w-full animate-pulse rounded-lg bg-gradient-to-r from-white/10 via-white/5 to-white/10"
        />
      ))}
    </div>
  );
}
