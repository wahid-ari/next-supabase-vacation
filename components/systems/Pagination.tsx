import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';

import { cn } from '@/libs/utils';

type Props = {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  edgePageCount?: number;
  middlePagesSiblingCount?: number;
  className?: string;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  testId?: string;
  [props: string]: any;
};

const buttonClassname = cn(
  'flex h-8 w-8 items-center justify-center text-neutral-700 dark:text-neutral-100 rounded border dark:border-neutral-700 px-1.5 transition-all',
  'enabled:hover:bg-neutral-200 enabled:hover:text-text-neutral-900 dark:enabled:hover:bg-neutral-800 dark:enabled:hover:text-text-white',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
);

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  edgePageCount = 1,
  middlePagesSiblingCount = 1,
  className,
  showFirstLast,
  showPrevNext,
  testId,
  ...props
}: Props) {
  return (
    <HeadlessPagination
      {...props}
      dataTestId={testId}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      edgePageCount={totalPages > 6 ? edgePageCount : 2}
      middlePagesSiblingCount={totalPages > 6 ? middlePagesSiblingCount : 2}
      className={cn('inline-flex select-none flex-wrap items-center gap-1 text-sm', className)}
      truncableText='..'
      truncableClassName='text-center'
    >
      {showFirstLast && (
        <button
          onClick={() => setCurrentPage(0)}
          disabled={currentPage === 0}
          aria-label='First'
          title='First'
          className={cn(buttonClassname, 'max-[400px]:hidden')}
        >
          <ChevronsLeftIcon className='h-5 w-5' />
        </button>
      )}
      {showPrevNext && (
        <HeadlessPagination.PrevButton aria-label='Prev' title='Prev' className={buttonClassname}>
          <ChevronLeftIcon className='h-5 w-5' />
        </HeadlessPagination.PrevButton>
      )}
      <nav className='flex flex-wrap'>
        <ul className='flex flex-wrap items-center gap-1'>
          <HeadlessPagination.PageButton
            activeClassName='bg-sky-500 text-white font-semibold focus-visible:ring-sky-400'
            inactiveClassName='text-neutral-800 dark:text-neutral-300 font-medium hover:text-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white focus-visible:ring-sky-500'
            className={
              'flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-all focus-visible:outline-none focus-visible:ring-2'
            }
          />
        </ul>
      </nav>
      {showPrevNext && (
        <HeadlessPagination.NextButton aria-label='Next' title='Next' className={buttonClassname}>
          <ChevronRightIcon className='h-5 w-5' />
        </HeadlessPagination.NextButton>
      )}
      {showFirstLast && (
        <button
          onClick={() => setCurrentPage(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          aria-label='Last'
          title='Last'
          className={cn(buttonClassname, 'max-[400px]:hidden')}
        >
          <ChevronsRightIcon className='h-5 w-5' />
        </button>
      )}
    </HeadlessPagination>
  );
}
