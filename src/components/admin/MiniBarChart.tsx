interface MiniBarChartProps {
  data: { label: string; value: number }[]
}

export function MiniBarChart({ data }: MiniBarChartProps) {
  const max = Math.max(...data.map(d => d.value), 1)

  return <div className="flex h-32 items-end gap-1.5">
    {data.map((point, index) => (
      <div key={index} className="group relative flex flex-1 flex-col items-center justify-end">
        <div
          className="w-full rounded-t-sm bg-burgundy/70 transition-colors group-hover:bg-burgundy dark:bg-burgundy/60"
          style={{ height: `${Math.max(4, (point.value / max) * 100)}%` }}
        />
        <span className="absolute -top-6 hidden rounded bg-ink px-1.5 py-0.5 text-[10px] text-cream group-hover:block dark:bg-ink-dark dark:text-ink">
          {point.value}
        </span>
      </div>
    ))}
  </div>
}