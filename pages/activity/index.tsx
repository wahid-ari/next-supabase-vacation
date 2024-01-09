import { useEffect, useMemo, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';

import { useLogsData } from '@/libs/swr';

import Layout from '@/components/layout/Layout';
import Badge from '@/components/systems/Badge';
import InputDebounce from '@/components/systems/InputDebounce';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

Log.auth = true;

export default function Log() {
  const { data, error } = useLogsData();
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row: any) => {
          // console.log(row.cell.row.index)
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'User',
        accessor: 'vacation_user.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.vacation_user?.name;
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original.action == 'create' ? (
            <Badge.green>CREATE</Badge.green>
          ) : original.action == 'update' ? (
            <Badge>UPDATE</Badge>
          ) : (
            <Badge.red>DELETE</Badge.red>
          );
        },
      },
      {
        Header: 'Table',
        accessor: 'table',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.table?.replace('book_', '') || '-';
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
        width: 300,
      },
      {
        Header: 'Date',
        accessor: 'created_at',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(original?.created_at);
          // return original?.created_at?.split('T')[0];
          return format(new Date(original?.created_at), 'PP');
        },
      },
      {
        Header: 'Time',
        accessor: '',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(original?.created_at);
          // let date = new Date(original?.created_at);
          // return date.toLocaleTimeString('en-US');
          // TODO Docs https://date-fns.org/v2.16.1/docs/format
          return format(new Date(original?.created_at), 'pp');
        },
      },
    ],
    [],
  );

  const tableInstance = useRef(null);
  const [filteredLength, setFilteredLength] = useState(0);
  useEffect(() => {
    setFilteredLength(tableInstance?.current?.rows?.length);
  }, [inputDebounceValue]);

  if (error) {
    return (
      <Layout title='Log - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Log - MyVacation' description='View and Manage Log - MyVacation' prefetch={['/api/log']}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Log</Title>
      </div>

      <InputDebounce
        label='Search'
        id='inputdebounce'
        name='inputdebounce'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => {
          setInputDebounceValue(value);
          tableInstance?.current?.setGlobalFilter(value);
        }}
      />

      {data ? (
        <ReactTable
          columns={column}
          data={data}
          ref={tableInstance}
          page_size={20}
          itemPerPage={[10, 20, 50, 100]}
          keyword={inputDebounceValue}
          showInfo
          filteredLength={filteredLength}
        />
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th className='flex items-center gap-1'>
                No <ChevronUpIcon className='h-4 w-4 opacity-50' />
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  User <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Action <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Table <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Description <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Date <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th>
                <div className='flex items-center justify-center gap-1'>
                  Time
                  <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                </div>
              </TableSimple.th>
            </>
          }
        >
          {[...Array(5).keys()].map((e, index) => (
            <TableSimple.tr key={index}>
              <TableSimple.td shrink>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
            </TableSimple.tr>
          ))}
        </TableSimple>
      )}
    </Layout>
  );
}
