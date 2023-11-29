import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';

import { cn } from '@/libs/utils';

type Props = {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  className?: string;
  [props: string]: any;
};

const buttonClassname = cn(
  'flex h-8 w-8 items-center justify-center text-neutral-700 dark:text-neutral-100 rounded border dark:border-neutral-700 px-1.5 transition-all',
  'enabled:hover:bg-sky-500 enabled:hover:text-white disabled:opacity-60 disabled:cursor-not-allowed',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
);

export default function Pagination({ currentPage, setCurrentPage, totalPages, className, ...props }: Props) {
  return (
    <HeadlessPagination
      {...props}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      edgePageCount={1}
      middlePagesSiblingCount={1}
      className={cn('flex h-8 w-full select-none items-center space-x-1 text-sm', className)}
      truncableText='..'
      truncableClassName='text-center px-1'
    >
      <button
        onClick={() => setCurrentPage(0)}
        disabled={currentPage === 0}
        aria-label='First'
        title='First'
        className={buttonClassname}
      >
        <ChevronsLeftIcon className='h-5 w-5' />
      </button>
      <HeadlessPagination.PrevButton aria-label='Prev' title='Prev' className={buttonClassname}>
        <ChevronLeftIcon className='h-5 w-5' />
      </HeadlessPagination.PrevButton>
      <nav className='flex'>
        <ul className='flex items-center'>
          <HeadlessPagination.PageButton
            activeClassName='bg-sky-500 text-white font-medium focus-visible:ring-sky-400'
            inactiveClassName='text-neutral-700 dark:text-neutral-300 hover:font-medium hover:text-neutral-800 dark:hover:text-white focus-visible:ring-sky-500'
            className={
              'flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-all focus-visible:outline-none focus-visible:ring-2'
            }
          />
        </ul>
      </nav>
      <HeadlessPagination.NextButton aria-label='Next' title='Next' className={buttonClassname}>
        <ChevronRightIcon className='h-5 w-5' />
      </HeadlessPagination.NextButton>
      <button
        onClick={() => setCurrentPage(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        aria-label='Last'
        title='Last'
        className={buttonClassname}
      >
        <ChevronsRightIcon className='h-5 w-5' />
      </button>
    </HeadlessPagination>
  );
}
