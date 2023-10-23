import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const headingVariants = cva('text-neutral-900 dark:text-white', {
  variants: {
    variant: {
      default: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 text-3xl font-bold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-medium tracking-tight',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

export function Heading({ children, className, as, variant, ...props }: HeadingProps) {
  const Comp = as ? as : 'h1';
  return (
    <Comp className={cn(headingVariants({ variant, className }))} {...props}>
      {children}
    </Comp>
  );
}
