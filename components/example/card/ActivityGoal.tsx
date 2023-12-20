'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DemoActivityGoal() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex items-center justify-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='size-8 shrink-0 rounded-full'
            onClick={() => onClick(-10)}
            disabled={goal <= 200}
          >
            <Minus className='size-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
          <div className='flex-1 text-center'>
            <div className='text-5xl font-bold tracking-tighter'>{goal}</div>
            <div className='text-muted-foreground text-[0.70rem] uppercase'>Calories/day</div>
          </div>
          <Button
            variant='outline'
            size='icon'
            className='size-8 shrink-0 rounded-full'
            onClick={() => onClick(10)}
            disabled={goal >= 400}
          >
            <Plus className='size-4' />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>
        <div className='my-3 h-[60px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data}>
              <Bar
                dataKey='goal'
                radius={[4, 4, 0, 0]}
                style={{
                  fill: '#0284c7',
                  opacity: 0.2,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Set Goal</Button>
      </CardFooter>
    </Card>
  );
}
