import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const textVariants = cva('leading-7 [&:not(:first-child)]:mt-4', {
  variants: {
    variant: {
      default: 'text-neutral-800 dark:text-neutral-100',
      muted: 'text-neutral-600 dark:text-neutral-400',
    },
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
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

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span';
}

export function Text({ children, className, as, variant, size, weight, ...props }: TextProps) {
  const Comp = as ? as : 'p';
  return (
    <Comp className={cn(textVariants({ variant, size, weight, className }))} {...props}>
      {children}
    </Comp>
  );
}
