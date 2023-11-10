import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  small?: boolean;
  [props: string]: any;
};

export default function Container({ children, className, small, ...props }: Props) {
  return (
    <div
      {...props}
      className={twMerge(
        small ? 'p-2' : 'p-8',
        'relative mb-2 rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]',
        className,
      )}
    >
      {children}
    </div>
  );
}
