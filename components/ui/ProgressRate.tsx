interface ProgressRateProps {
  completed: number;
  total: number;
  rate: number;
}

export function ProgressRate({ completed, total, rate }: ProgressRateProps) {
  return (
    <span className="inline-flex min-w-24 items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900">
      {completed}/{total} ({rate}%)
    </span>
  );
}
