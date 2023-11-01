import { useTheme } from 'next-themes';

import useWindowSize from '@/hooks/use-window-size';

export const RECHARTS_COLORS = [
  '#36b9cc',
  '#1cc88a',
  '#6f42c1',
  '#e74a3b',
  '#fd7e14',
  '#f6c23e',
  '#84cc16',
  '#22c55e',
  '#2563eb',
  '#f43f5e',
  '#8b5cf6',
  '#ea580c',
  '#facc15',
];

export function CustomTooltip({
  active,
  payload,
  label,
  category = 'Category',
}: {
  active?: boolean;
  payload?: any;
  label?: string;
  category?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className='rounded bg-white/80 p-3 shadow backdrop-blur-sm dark:bg-neutral-900/80'>
        <p className='mb-2 font-medium'>{`${category} : ${label || payload[0].payload.label}`}</p>
        <p className='font-medium'>{`Total Destination : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

export function CustomXAxisTick({ x, y, payload }: any) {
  const { theme } = useTheme();
  const windowSize = useWindowSize();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor='end'
        fill={theme == 'light' ? '#525252' : '#a3a3a3'}
        color={theme == 'light' ? '#525252' : '#a3a3a3'}
        fontSize={windowSize.width > 550 ? 13 : 12}
        transform='rotate(-35)'
      >
        {payload.value}
      </text>
    </g>
  );
}

export function renderColorfulLegendText(value: string, entry: any) {
  return (
    <span className='text-neutral-700 dark:text-neutral-300'>
      {entry.payload.label} - <span className='font-semibold'>{entry.payload.total}</span>
    </span>
  );
}
