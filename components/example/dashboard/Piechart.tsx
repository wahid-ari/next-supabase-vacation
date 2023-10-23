'use client';

import { useTheme } from 'next-themes';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import useWindowSize from '@/hooks/use-window-size';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
    amount: Math.floor(Math.random() * 1000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
    amount: Math.floor(Math.random() * 1000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
    amount: Math.floor(Math.random() * 1000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
    amount: Math.floor(Math.random() * 1000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
    amount: Math.floor(Math.random() * 1000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
    amount: Math.floor(Math.random() * 1000) + 1000,
  },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: any; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className='rounded bg-white/80 p-3 shadow backdrop-blur-sm dark:bg-neutral-900/80'>
        <p className='mb-2 text-base font-medium'>{payload[0].name}</p>
        <p className='mb-2 text-sm font-medium'>{`Total : $${payload[0].value}`}</p>
        {/* <p className='mb-2 font-medium text-sm'>{`Amount : $${payload[1].value}`}</p> */}
        {/* <p className='intro'>{getIntroOfPage(label)}</p> */}
        <p className='text-[13px]'>Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
}

const COLORS = [
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

const renderColorfulLegendText = (value: string, entry: any) => {
  // const { color } = entry;
  // style={{ color }}
  return <span className='text-neutral-800 dark:text-neutral-200'>{value}</span>;
};

export function Piechart() {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer width='100%' height={350}>
      <PieChart>
        <Pie
          data={data}
          type='monotone'
          dataKey='total'
          strokeWidth={2}
          stroke={theme == 'dark' ? '#171717' : '#fff'}
          fill='#adfa1d'
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={width < 450 ? 80 : 90}
          label={width < 500 ? false : true}
          labelLine={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
            strokeWidth: 1,
            fill: 'transparent',
            strokeDasharray: 10,
          }}
        />
        <Legend formatter={renderColorfulLegendText} />
      </PieChart>
    </ResponsiveContainer>
  );
}
