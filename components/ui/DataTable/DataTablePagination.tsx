import { Table } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  showText?: string;
  itemPerPage?: number[];
}

export function DataTablePagination<TData>({
  table,
  showText,
  itemPerPage = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  return (
    <div>
      <div className='grid grid-cols-1 gap-x-4 gap-y-2  py-4 sm:grid-cols-2'>
        <div className='text-center text-[13px] text-neutral-600 dark:text-neutral-300 sm:text-left'>
          {showText || ''}
        </div>
        <div className='text-center text-[13px] text-neutral-600 dark:text-neutral-300 sm:text-right'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='flex items-center justify-center gap-4 sm:justify-start'>
          <div className='flex items-center gap-2'>
            <p className='text-sm font-medium'>Show</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger id='show' aria-label='show' title='Show' className='h-8 w-[70px]'>
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {itemPerPage.map((pageSize, index) => (
                  <SelectItem key={index} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <p className='hidden text-sm font-medium sm:flex'>Go to page</p>
            <p className='text-sm font-medium sm:hidden'>Page</p>
            <Input
              placeholder='1'
              title='Page'
              type='number'
              min={1}
              max={table.getPageOptions().length}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e: any) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className='h-8 w-[72px]'
            />
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 sm:justify-end'>
          <div className='flex items-center space-x-2'>
            <Button
              title='First Page'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <ChevronsLeft className='h-4 w-4' />
            </Button>
            <Button
              title='Previous Page'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <div className='flex items-center justify-center text-[13px] font-medium sm:text-sm'>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button
              title='Next Page'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              title='Last Page'
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <ChevronsRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
