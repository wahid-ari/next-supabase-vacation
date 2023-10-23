import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border dark:border-neutral-800 px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200',
        secondary:
          'border-transparent bg-neutral-100 dark:bg-neutral-800 text-secondary-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700',
        destructive: 'border-transparent bg-red-600 text-white hover:bg-red-600/80',
        outline: 'dark:text-white text-neutral-900',
        link: 'dark:text-white text-neutral-900 hover:text-sky-500 dark:hover:text-sky-500 cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
