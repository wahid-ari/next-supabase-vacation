import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

type Props = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Label({ children, className, ...props }: Props) {
  return (
    <label {...props} className={cn('block text-neutral-800 dark:text-neutral-300', className)}>
      {children}
    </label>
  );
}
