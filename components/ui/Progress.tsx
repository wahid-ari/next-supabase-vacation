'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/libs/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showValue?: boolean;
  }
>(({ className, value, color, showValue, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-4 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800', className)}
    {...props}
  >
    {showValue && (
      <span
        className={cn(
          'absolute z-[1] -mt-0.5 translate-x-[45%] pl-2 text-[10px] font-medium text-white dark:text-white',
          value == 0 && 'text-neutral-800',
        )}
        style={{ width: `${value}%` }}
      >
        {value}%
      </span>
    )}
    <ProgressPrimitive.Indicator
      className={cn('h-full w-full flex-1 bg-sky-600 transition-all', color)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    ></ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
