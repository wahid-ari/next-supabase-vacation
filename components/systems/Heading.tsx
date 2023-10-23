import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  className?: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  [props: string]: any;
};

export default function Heading({ children, className, h1, h2, h3, ...props }: Props) {
  if (h1) {
    return (
      <h1 {...props} className={twMerge('mb-4 text-3xl font-medium text-neutral-800 dark:text-neutral-100', className)}>
        {children}
      </h1>
    );
  } else if (h2) {
    return (
      <h2 {...props} className={twMerge('mb-4 text-2xl font-medium text-neutral-800 dark:text-neutral-100', className)}>
        {children}
      </h2>
    );
  } else if (h3) {
    return (
      <h3 {...props} className={twMerge('mb-4 text-xl font-medium text-neutral-800 dark:text-neutral-100', className)}>
        {children}
      </h3>
    );
  }
  return (
    <h4 {...props} className={twMerge('mb-4 text-lg font-medium text-neutral-800 dark:text-neutral-100', className)}>
      {children}
    </h4>
  );
}
