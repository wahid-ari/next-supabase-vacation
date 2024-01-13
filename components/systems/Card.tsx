import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

type Props = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Card({ children, className, ...props }: Props) {
  return (
    <div {...props} className={cn('rounded-lg border p-3 dark:border-neutral-800 lg:p-6', className)}>
      {children}
    </div>
  );
}
