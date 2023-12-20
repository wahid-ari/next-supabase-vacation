import { forwardRef, useImperativeHandle, useMemo } from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronUpIcon,
} from 'lucide-react';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { twMerge } from 'tailwind-merge';

type Props = {
  columns: any;
  data: object[];
  page_size?: number;
  className?: string;
  bordered?: boolean;
  itemPerPage?: number[];
  keyword?: string;
  showInfo?: boolean;
  filteredLength?: number;
  [props: string]: any;
};

export const ReactTable = forwardRef(
  (
    {
      columns,
      data,
      page_size = 5,
      className,
      bordered,
      itemPerPage = [5, 10, 20],
      keyword,
      showInfo,
      filteredLength,
      ...props
    }: Props,
    ref,
  ) => {
    // Use the state and functions returned from useTable to build your UI
    const defaultColumn = useMemo(
      () => ({
        minWidth: 200,
        width: 500,
      }),
      [],
    );
    const instance = useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: {
          pageSize: page_size,
          pageIndex: 0,
          sortBy: [
            {
              id: 'id',
              desc: false,
            },
            {
              id: 'songs.id',
              desc: false,
            },
          ],
        },
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination,
    );
    const {
      getTableProps,
      getTableBodyProps,
      prepareRow,
      headerGroups,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      // Get the state from the instance
      state: { pageIndex, pageSize },
    } = instance;
    useImperativeHandle(ref, () => instance);

    // this is for showing total data in table
    let show = pageSize * (pageIndex + 1);
    if (keyword == '') {
      // if not searching and in the last page
      if (pageIndex == pageOptions.length - 1) {
        show = data.length;
      }
    } else {
      // if searching and in the last page
      if (pageIndex == pageOptions.length - 1) {
        show = filteredLength;
      }
    }
    // if searching, show total data from filteredLength
    let dataLength = keyword == '' ? data.length : filteredLength;
    let showText = `Showing ${pageIndex * pageSize + 1} to ${show} from ${dataLength} ${
      keyword == '' ? 'total' : 'filtered'
    } data`;

    return (
      <div className={twMerge('w-full rounded border dark:border-neutral-800', className)}>
        <div className='scrollbar-thumb-rounded overflow-auto scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800'>
          <table
            {...getTableProps()}
            {...props}
            className='w-full whitespace-nowrap text-neutral-800 dark:text-neutral-100'
          >
            <thead>
              {headerGroups.map((headerGroup: any, i: number) => (
                <tr
                  key={i + 1}
                  {...headerGroup.getHeaderGroupProps()}
                  className='border-b bg-neutral-50 text-left text-sm font-medium dark:border-neutral-800 dark:bg-[#202020]'
                >
                  {headerGroup.headers.map((column: any, i: number) => (
                    <th
                      key={i + 1}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={`p-3 font-medium first:w-1 ${column.Header == 'Action' && 'w-1'}
                    ${bordered ? 'border-x first:border-l-0 last:border-r-0 dark:border-x-neutral-800' : ''}`}
                    >
                      <span className='flex items-center gap-1.5'>
                        {column.render('Header')}
                        {!column.disableSortBy ? (
                          column.isSorted ? (
                            column.isSortedDesc ? (
                              <ChevronDownIcon className='h-4 w-4 text-neutral-400' />
                            ) : (
                              <ChevronUpIcon className='h-4 w-4 text-neutral-400' />
                            )
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 25 25'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='h-[20px] w-5 text-neutral-500'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
                              />
                            </svg>
                          )
                        ) : null}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any, i: number) => {
                prepareRow(row);
                return (
                  <tr
                    key={i + 1}
                    {...row.getRowProps()}
                    className='border-b bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'
                  >
                    {row.cells.map((cell: any, i: number) => {
                      return (
                        <td
                          key={i + 1}
                          {...cell.getCellProps()}
                          className={`p-3 ${
                            bordered ? 'border-x first:border-l-0 last:border-r-0 dark:border-x-neutral-800' : ''
                          }`}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showInfo ? (
          dataLength > 0 ? (
            <p className='pl-3 pt-3 text-center text-[13px] text-neutral-600 sm:text-left dark:text-neutral-300'>
              {showText}
            </p>
          ) : (
            <p className='border-b pb-3 pt-3 text-center text-sm text-neutral-600 dark:border-b-neutral-800 dark:text-neutral-300'>
              No Data
            </p>
          )
        ) : null}

        <div className='grid grid-cols-1 gap-4 pb-5 pt-3 sm:grid-cols-2 sm:p-3'>
          <div className='flex items-center justify-center gap-2 sm:justify-start'>
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              aria-label='First'
              title='First'
              className={twMerge(
                'rounded border border-transparent p-1 transition-all duration-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
                canPreviousPage
                  ? 'hover:border hover:border-neutral-300 dark:hover:border-neutral-700'
                  : 'cursor-not-allowed',
              )}
            >
              <ChevronsLeftIcon className='h-5 w-5 text-neutral-600 transition-all hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white' />
            </button>{' '}
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              aria-label='Prev'
              title='Prev'
              className={twMerge(
                'rounded border border-transparent p-1 transition-all duration-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
                canPreviousPage
                  ? 'hover:border hover:border-neutral-300 dark:hover:border-neutral-700'
                  : 'cursor-not-allowed',
              )}
            >
              <ChevronLeftIcon className='h-5 w-5 text-neutral-600 transition-all hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100' />
            </button>{' '}
            <span className='mx-2 text-sm font-medium text-neutral-600 transition-all hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'>
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              aria-label='Next'
              title='Next'
              className={twMerge(
                'rounded border border-transparent p-1 transition-all duration-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
                canNextPage
                  ? 'hover:border hover:border-neutral-300 dark:hover:border-neutral-700'
                  : 'cursor-not-allowed',
              )}
            >
              <ChevronRightIcon className='h-5 w-5 text-neutral-600 transition-all hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white' />
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              aria-label='Last'
              title='Last'
              className={twMerge(
                'rounded border border-transparent p-1 transition-all duration-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
                canNextPage
                  ? 'hover:border hover:border-neutral-300 dark:hover:border-neutral-700'
                  : 'cursor-not-allowed',
              )}
            >
              <ChevronsRightIcon className='h-5 w-5 text-neutral-600 transition-all hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white' />
            </button>{' '}
          </div>

          <div className='flex items-center justify-center gap-2 sm:justify-end'>
            <span className='text-sm text-neutral-800 dark:text-neutral-200'>Go to page</span>
            <input
              title='Page'
              type='number'
              min={1}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              className={twMerge(
                'w-[72px] rounded-md border border-neutral-300 bg-white px-3 py-[0.4rem] text-sm outline-none',
                'transition-all focus:border-transparent focus:outline-none focus:ring-2 dark:focus:border-transparent',
                'focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white',
              )}
              placeholder='1'
            />
            <select
              title='Data'
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className={twMerge(
                'block w-[110px] cursor-pointer rounded-md border border-neutral-300 bg-white px-3',
                'py-[0.4rem] text-sm outline-none transition-all focus:border-transparent focus:outline-none dark:focus:border-transparent',
                'focus:ring-2 focus:ring-sky-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white',
              )}
            >
              {itemPerPage.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  },
);

ReactTable.displayName = 'ReactTable';

export default ReactTable;
