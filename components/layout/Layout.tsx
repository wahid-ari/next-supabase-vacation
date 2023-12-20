import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import Breadcrumb from '@/components/layout/Breadcrumb';
import HeadSeo from '@/components/layout/HeadSeo';
import Menu from '@/components/layout/Menu';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  prefetch?: string[];
  demo?: boolean;
  [props: string]: any;
};

export default function Layout({ children, title, description, prefetch, demo, ...props }: Props) {
  return (
    <>
      <HeadSeo title={title} description={description} prefetch={prefetch} />

      <div
        {...props}
        className='min-h-screen w-full bg-white text-sm lg:grid dark:bg-neutral-900'
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        <Sidebar className={`${demo ? '!z-0' : ''}`} />

        <main className='relative'>
          <Navbar className={`${demo ? '!z-0' : ''}`} />

          {/* Show on Mobile */}
          <div
            className={twMerge(
              'flex items-center justify-between gap-x-4 border-b px-4 py-3 lg:hidden',
              'overflow-x-auto bg-white/95 dark:border-neutral-800 dark:bg-neutral-900/90',
              'scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800',
            )}
          >
            <Breadcrumb />
          </div>

          {/* Show on Desktop */}
          <div
            className={twMerge(
              'hidden items-center justify-between gap-x-4 border-b px-4 py-3 lg:flex dark:border-neutral-800',
              'sticky top-0 z-40 bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30',
              demo && '!z-0',
            )}
          >
            <Breadcrumb />

            <Menu />
          </div>

          <div className='px-5 pb-5 pt-4'>{children}</div>
        </main>
      </div>
    </>
  );
}
