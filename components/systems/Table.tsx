import { ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/systems/Button';

type Props = {
  children: ReactNode;
  className?: string;
  head?: ReactNode;
  totalPage?: number;
  totalData?: number;
  currentPage?: number;
  next?: () => void;
  prev?: () => void;
  rowPerPage?: number;
  noPagination?: boolean;
  [props: string]: any;
};

export default function Table({
  children,
  className,
  head,
  totalPage = 0,
  totalData = 0,
  currentPage = 0,
  next,
  prev,
  rowPerPage,
  noPagination,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        'w-full rounded border shadow-sm dark:border-neutral-800 lg:max-w-[calc(100vw_-_17rem)]',
        className
      )}
    >
      <div className='w-full overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 lg:max-w-[calc(100vw_-_17rem)]'>
        <table {...props} className='w-full table-auto whitespace-nowrap text-neutral-800 dark:text-neutral-100'>
          <thead>
            <tr className='whitespace-nowrap border-b bg-neutral-50 text-sm font-medium dark:border-neutral-800 dark:bg-[#202020]'>
              {head}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {noPagination ? (
        ''
      ) : (
        <div className='bg-white text-[13px] font-medium text-neutral-600 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-300'>
          <div className='flex w-full items-center justify-between gap-2 px-4 py-3'>
            {rowPerPage === 5 ? (
              totalData === 0 ? (
                <p className='whitespace-nowrap'>No data</p>
              ) : (
                <p className='whitespace-nowrap'>
                  Showing {(currentPage - 1) * 5 + 1} - {currentPage * 5}{' '}
                  {/* dari <span className="font-bold">{totalData}</span> data */}
                </p>
              )
            ) : totalData === 0 ? (
              <p className='whitespace-nowrap'>No data</p>
            ) : (
              <p className='whitespace-nowrap'>
                Showing {(currentPage - 1) * 5 + 1} - {currentPage !== totalPage ? currentPage * 5 : totalData} from{' '}
                {totalData} data
              </p>
            )}
            <div className='flex items-center justify-end gap-2'>
              <Button.secondary
                title='Prev'
                aria-label='Prev'
                onClick={prev}
                disabled={currentPage < 2}
                className='flex h-8 w-8 items-center justify-center !p-0'
              >
                <ChevronLeftIcon className='h-4 w-4' />
              </Button.secondary>
              <Button.secondary
                title='Next'
                aria-label='Next'
                onClick={next}
                disabled={currentPage === totalPage}
                className='flex h-8 w-8 items-center justify-center !p-0'
              >
                <ChevronRightIcon className='h-4 w-4' />
              </Button.secondary>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type TrProps = {
  children: ReactNode;
  className?: string;
  [props: string]: any;
};

Table.tr = ({ children, className, ...props }: TrProps) => {
  return (
    <tr
      {...props}
      className={twMerge(
        'border-b bg-white text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-200',
        className
      )}
    >
      {children}
    </tr>
  );
};

type TdProps = {
  children: ReactNode;
  className?: string;
  shrink?: boolean;
  [props: string]: any;
};

Table.td = ({ children, className, shrink, ...props }: TdProps) => {
  return (
    <td {...props} className={twMerge('p-3', shrink && 'w-1', className)}>
      {children}
    </td>
  );
};

type ThProps = {
  children: ReactNode;
  className?: string;
  shrink?: boolean;
  [props: string]: any;
};

Table.th = ({ children, className, shrink, ...props }: ThProps) => {
  return (
    <th {...props} className={twMerge('p-3 font-medium', shrink && 'w-1', className)}>
      {children}
    </th>
  );
};
