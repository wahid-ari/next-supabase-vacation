import Link from 'next/link';

import { cn } from '@/libs/utils';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn('flex items-center space-x-2 lg:space-x-6', className)} {...props}>
      <Link
        href='/design/example#'
        className='text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-white'
      >
        Overview
      </Link>
      <Link
        href='/design/example#'
        className='hidden text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white sm:flex'
      >
        Customers
      </Link>
    </nav>
  );
}
