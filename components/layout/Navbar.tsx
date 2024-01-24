import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { useShowNav } from '@/context/GlobalContext';
import { cn } from '@/libs/utils';

import Menu from '@/components/layout/Menu';
import ThemeChanger from '@/components/layout/ThemeChanger';

export default function Navbar({ className, ...props }: { className?: string; [props: string]: any }) {
  const { setShowNav } = useShowNav();

  return (
    <nav
      {...props}
      className={cn(
        'sticky top-0 z-40 h-11 dark:text-neutral-50 lg:hidden',
        'flex w-full items-center justify-between gap-4 border-b p-3 px-5 dark:border-neutral-800',
        'bg-white/50 dark:bg-neutral-900/30',
        'backdrop-blur-md backdrop-filter',
        className,
      )}
    >
      <div className='flex gap-x-3'>
        <button
          className='-ml-0.5 rounded px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          id='menu'
          aria-label='Menu'
          title='Menu'
        >
          <MenuIcon
            className='h-5 w-5 text-neutral-500 transition-all hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100'
            onClick={() => setShowNav(true)}
          />
        </button>
        <Link
          href='/'
          className={cn(
            'rounded text-center text-base font-semibold tracking-wide text-neutral-800 no-underline',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100 lg:text-2xl',
          )}
        >
          MyVacation
        </Link>
      </div>

      <div className='flex items-center gap-3'>
        <div className='cursor-pointer pt-1'>
          <ThemeChanger />
        </div>
        {/* Show on Mobile */}
        <Menu className='lg:hidden' />
      </div>
    </nav>
  );
}
