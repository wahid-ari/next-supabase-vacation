'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { DataTablePagination } from '@/components/ui/DataTable/DataTablePagination';
import { DataTableToolbar } from '@/components/ui/DataTable/DataTableToolbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  itemPerPage?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  itemPerPage = [10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: itemPerPage[0],
      },
    },
  });

  // this is for showing total data in table
  let pageSize = table.getState().pagination.pageSize;
  let show = pageSize * (table.getState().pagination.pageIndex + 1);
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    (table.getState().globalFilter != undefined && table.getState().globalFilter != '');

  if (!isFiltered) {
    // if not searching and in the last page
    if (table.getState().pagination.pageIndex == table?.getPageOptions().length - 1) {
      show = data.length;
    }
  } else {
    // if searching and in the last page
    if (table.getState().pagination.pageIndex == table?.getPageOptions().length - 1) {
      show = table.getFilteredRowModel().rows.length;
    }
  }

  // if searching, show total data from filteredLength
  let dataLength = table.getFilteredRowModel().rows.length;
  let showText = `Showing ${table.getState().pagination.pageIndex * pageSize + 1} to ${show} from ${dataLength} ${
    isFiltered ? 'filtered' : 'total'
  } data`;

  return (
    <div>
      <DataTableToolbar table={table} />
      <div className='rounded-md border dark:border-neutral-700'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} noHover>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} showText={showText} itemPerPage={itemPerPage} />
    </div>
  );
}
