'use client';

import * as React from 'react';
import { SliderProps } from '@radix-ui/react-slider';

import useWindowSize from '@/hooks/use-window-size';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { Label } from '@/components/ui/Label';
import { Slider } from '@/components/ui/Slider';

interface TemperatureSelectorProps {
  defaultValue: SliderProps['defaultValue'];
}

export function TemperatureSelector({ defaultValue }: TemperatureSelectorProps) {
  const { width } = useWindowSize();
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className='grid gap-2 pt-2'>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className='grid gap-4'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='temperature'>Temperature</Label>
              <span className='hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-neutral-600 dark:text-neutral-400'>
                {value}
              </span>
            </div>
            <Slider
              id='temperature'
              max={1}
              defaultValue={value}
              step={0.1}
              onValueChange={setValue}
              className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
              aria-label='Temperature'
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align='center' className='w-[260px] text-sm' side={width < 1024 ? 'top' : 'left'}>
          Controls randomness: lowering results in less random completions. As the temperature approaches zero, the
          model will become deterministic and repetitive.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
