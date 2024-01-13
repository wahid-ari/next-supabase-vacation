import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

type Props = {
  children?: ReactNode;
  className?: string;
  [props: string]: any;
};

export default function Section({ children, className, ...props }: Props) {
  return (
    <section
      {...props}
      className={cn(
        'my-2 rounded-md border bg-white p-8 py-4 dark:border-neutral-800 dark:bg-[#1F1F1F] lg:py-8',
        className,
      )}
    >
      {children}
    </section>
  );
}

Section.small = ({ children, className, ...props }: Props) => {
  return (
    <section
      {...props}
      className={cn('my-2 rounded-md border bg-white p-8 py-2 dark:border-neutral-800 dark:bg-[#1F1F1F]', className)}
    >
      {children}
    </section>
  );
};
