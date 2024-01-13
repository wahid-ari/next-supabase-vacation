import { ReactNode } from 'react';
import Link from 'next/link';

import { cn } from '@/libs/utils';

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
  [props: string]: any;
};

export default function LinkButton({ children, className, href, ...props }: Props) {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-all',
        'hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400',
        className,
      )}
    >
      {children}
    </Link>
  );
}

LinkButton.secondary = ({ children, className, href, ...props }: Props) => {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'rounded border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-800',
        'outline-none transition-all hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-400',
        'dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900',
        className,
      )}
    >
      {children}
    </Link>
  );
};

LinkButton.tertary = ({ children, className, href, ...props }: Props) => {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        'rounded px-3 py-1.5 text-sm font-medium text-neutral-600 outline-none transition-all hover:bg-neutral-100',
        'focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        className,
      )}
    >
      {children}
    </Link>
  );
};
