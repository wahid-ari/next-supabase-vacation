'use client';

import { useTheme } from 'next-themes';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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
        <p className='mb-2 text-base font-medium'>{label}</p>
        <p className='mb-2 text-sm font-medium'>{`Total : $${payload[0].value}`}</p>
        <p className='mb-2 text-sm font-medium'>{`Amount : $${payload[1].value}`}</p>
        {/* <p className='intro'>{getIntroOfPage(label)}</p> */}
        <p className='text-[13px]'>Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
}

const renderColorfulLegendText = (value: string, entry: any) => {
  // const { color } = entry;
  // style={{ color }}
  return <span className='capitalize text-neutral-800 dark:text-neutral-200'>{value}</span>;
};

export function Areachart() {
  const { theme } = useTheme();
  // const { width } = useWindowSize();
  return (
    <ResponsiveContainer width='100%' height={350}>
      <AreaChart data={data}>
        <XAxis
          dataKey='name'
          stroke={theme == 'dark' ? '#a3a3a3' : '#525252'}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={theme == 'dark' ? '#a3a3a3' : '#525252'}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Area type='monotone' dataKey='total' stroke='#adfa1d' fill='#adfa1d' activeDot={{ r: 8 }} strokeWidth={2} />
        <Area type='monotone' dataKey='amount' stroke='#07ba5b' fill='#07ba5b' strokeWidth={2} />
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
        {/* <CartesianGrid strokeDasharray='4' /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}
