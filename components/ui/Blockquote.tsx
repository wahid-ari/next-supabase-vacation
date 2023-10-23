import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const blockquoteVariants = cva('mt-6 border-l-2 dark:border-l-neutral-700 pl-6 italic', {
  variants: {
    variant: {
      default: 'text-neutral-800 dark:text-neutral-100',
      muted: 'text-neutral-600 dark:text-neutral-400',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    },
    weight: {
      default: 'font-normal',
      light: 'font-light',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    weight: 'default',
  },
});

export interface BlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {}

export function Blockquote({ children, className, variant, size, weight, ...props }: BlockquoteProps) {
  return (
    <blockquote className={cn(blockquoteVariants({ variant, size, weight, className }))} {...props}>
      &quot;{children}&quot;
    </blockquote>
  );
}
