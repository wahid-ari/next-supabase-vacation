import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-sky-600 shadow hover:bg-sky-700 text-white focus-visible:ring-sky-400',
        success: 'bg-emerald-600 shadow hover:bg-emerald-700 text-white focus-visible:ring-emerald-400',
        destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-400',
        outline:
          'border dark:border-neutral-700 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:ring-sky-500',
        secondary:
          'bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 focus-visible:ring-sky-500',
        ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:ring-sky-500',
        link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-sky-500',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
