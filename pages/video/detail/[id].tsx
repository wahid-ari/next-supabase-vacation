import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronsUpDownIcon, ChevronUpIcon } from 'lucide-react';

import { useProvinceData } from '@/libs/swr';
import { useDebounce } from '@/hooks/use-debounce';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import Layout from '@/components/layout/Layout';
import LabeledInput from '@/components/systems/LabeledInput';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Province.auth = true;

export default function Province() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useProvinceData(id);
  const [inputDebounce, setInputDebounce] = useState('');
  const debouncedValue = useDebounce(inputDebounce);

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
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/destination/detail/${values?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values?.name}
            </Link>
          );
        },
      },
      {
        Header: 'Location',
        accessor: 'location',
        width: 300,
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  useEffect(() => {
    tableInstance.current?.setGlobalFilter(debouncedValue);
  }, [debouncedValue]);

  if (error) {
    return (
      <Layout title='Province Detail - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' - MyVacation' : 'Province Detail - MyVacation'}`}
      description='View Detail Province - MyVacation'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name} Destination</Title> : <Title>Province Detail</Title>}
      </div>

      {data ? (
        data?.destinations?.length > 0 ? (
          <>
            <Label htmlFor='search'>Search</Label>
            <Input
              id='search'
              name='search'
              placeholder='Search'
              value={inputDebounce}
              onChange={(e) => {
                setInputDebounce(e.target.value);
              }}
              className='mt-2 mb-4'
            />

            <ReactTable columns={column} data={data?.destinations} ref={tableInstance} page_size={20} />
          </>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Destination in {data?.name} Province</p>
          </div>
        )
      ) : (
        <>
          <LabeledInput label='Search Data' id='caridata' name='caridata' placeholder='Keyword' />
          <TableSimple
            head={
              <>
                <TableSimple.th className='flex gap-1 items-center'>
                  No <ChevronUpIcon className='w-4 h-4 opacity-50' />
                </TableSimple.th>
                <TableSimple.th className='text-left sm:w-[50%]'>
                  <div className='flex gap-1 items-center'>
                    Name <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
                  </div>
                </TableSimple.th>
                <TableSimple.th className='sm:w-[50%]'>
                  <div className='flex gap-1 items-center'>
                    Location <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
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
              </TableSimple.tr>
            ))}
          </TableSimple>
        </>
      )}
    </Layout>
  );
}
