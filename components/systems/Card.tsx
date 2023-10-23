import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Card({ children, className, ...props }: Props) {
  return (
    <div {...props} className={twMerge('rounded-lg border p-3 dark:border-neutral-800 lg:p-6', className)}>
      {children}
    </div>
  );
}
