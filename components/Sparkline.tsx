import { useId } from "react";

interface SparklineProps {
  data: number[];
}

function normalizeData(data: number[]): number[] {
  const points = data.filter((value) => Number.isFinite(value));
  if (points.length === 0) {
    return [];
  }

  const min = Math.min(...points);
  const max = Math.max(...points);

  if (min === max) {
    return new Array(points.length).fill(16);
  }

  return points.map((value) => {
    const ratio = (value - min) / (max - min);
    return 32 - ratio * 32;
  });
}

export function Sparkline({ data }: SparklineProps) {
  const gradientId = useId();
  const normalized = normalizeData(data);
  const width = 100;
  const height = 32;

  if (normalized.length === 0) {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Sin datos">
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      </svg>
    );
  }

  const step = width / Math.max(normalized.length - 1, 1);
  const path = normalized
    .map((value, index) => `${index === 0 ? "M" : "L"}${index * step},${value.toFixed(2)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label="Evolución 7 días"
      className="text-solana-green"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#14F195" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#9945FF" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
