'use client';

import { Table } from '@tanstack/react-table';
import { Settings2, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { DataTableFilter } from '@/components/ui/DataTable/DataTableFilter';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';

export const status = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'Success',
    value: 'success',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex flex-wrap items-center gap-x-2 gap-y-3 pb-4'>
      <Input
        placeholder='Search data...'
        // filter by email
        // value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
        value={table.getState().globalFilter ?? ''}
        onChange={(event) => {
          // filter by email
          // table.getColumn('email')?.setFilterValue(event.target.value);
          table.setGlobalFilter(event.target.value);
        }}
        className='h-9 w-full lg:max-w-[250px]'
      />
      <div className='flex items-center justify-between'>
        {table.getColumn('status') && (
          <DataTableFilter column={table.getColumn('status')} title='Status' options={status} />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter('');
            }}
            className='ml-2 h-8 px-2 lg:px-3'
          >
            Reset
            <X className='ml-1 hidden h-4 w-4 sm:block' />
          </Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='ml-auto h-9 px-2 sm:px-3'>
            <Settings2 className='mr-2 h-4 w-4' />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Toggle Column</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
