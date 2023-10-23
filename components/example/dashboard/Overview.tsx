'use client';

import { useTheme } from 'next-themes';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// import useWindowSize from '@/hooks/useWindowSize';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function optionsBarChart(theme?: string) {
//   return {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#888',
//         },
//         grid: {
//           color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
//         },
//       },
//       y: {
//         ticks: {
//           color: '#888',
//           stepSize: 1,
//         },
//         grid: {
//           color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
//         },
//       },
//     },
//   };
// }

// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//   datasets: [
//     {
//       label: 'Total',
//       backgroundColor: '#adfa1d',
//       categoryPercentage: 0.8,
//       barPercentage: 0.8,
//       data: [1000, 2000, 3000, 4000],
//     },
//   ],
// };

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: any; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className='rounded bg-white/80 p-3 shadow backdrop-blur-sm dark:bg-neutral-900/80'>
        <p className='mb-2 font-medium'>{`${label} : $${payload[0].value}`}</p>
        {/* <p className='intro'>{getIntroOfPage(label)}</p> */}
        <p className='text-[13px]'>Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
}

export function Overview() {
  const { theme } = useTheme();
  // const { width } = useWindowSize();
  return (
    // <Bar options={optionsBarChart(theme)} data={data} height={width > 500 ? 200 : 250} />
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
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
        <Bar dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: theme == 'dark' ? '#525252' : '#a3a3a3',
            strokeWidth: 1,
            fill: 'transparent',
            strokeDasharray: 10,
          }}
        />
        {/* <CartesianGrid strokeDasharray='4' /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}
