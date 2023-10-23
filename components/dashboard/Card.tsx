import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Card({
  title,
  link,
  count,
  icon,
  ...props
}: {
  title: string;
  link: string;
  count: number;
  icon?: ReactNode;
  [props: string]: any;
}) {
  return (
    <Link
      href={link}
      {...props}
      className={twMerge(
        'group flex items-center justify-between gap-2 rounded-md border p-4 shadow',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800'
      )}
    >
      <div>
        <p className='mb-1 text-xl font-extrabold text-neutral-800 dark:text-neutral-100'>{count}</p>
        <p className='text-base font-semibold text-neutral-600 transition-all group-hover:text-sky-500 dark:text-neutral-300'>
          {title}
        </p>
      </div>
      <div className='h-12 w-12 text-neutral-300 transition-all duration-500 group-hover:text-sky-500 dark:text-neutral-700 dark:group-hover:text-sky-600'>
        {icon}
      </div>
    </Link>
  );
}
