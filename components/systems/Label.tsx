import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Label({ children, className, ...props }: Props) {
  return (
    <label {...props} className={twMerge('block text-neutral-800 dark:text-neutral-300', className)}>
      {children}
    </label>
  );
}
