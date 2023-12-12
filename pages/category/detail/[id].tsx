import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronsUpDownIcon, ChevronUpIcon, ImageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useCategoryData } from '@/libs/swr';
import { useDebounce } from '@/hooks/use-debounce';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import Layout from '@/components/layout/Layout';
import LabeledInput from '@/components/systems/LabeledInput';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Category.auth = true;

export default function Category() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useCategoryData(id);
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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href={`/destination/detail/${original.id}`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <p className='w-40 overflow-hidden text-ellipsis break-all lg:w-44 xl:w-full'>{original.name}</p>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                side='top'
                style={{
                  // to keep both padding same when scrollbar showed
                  scrollbarGutter: 'stable both-edges',
                }}
                className={twMerge(
                  'max-h-64 w-auto max-w-xs overflow-auto',
                  'scrollbar-thinner scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700',
                )}
              >
                {original.image_url ? (
                  <div className='relative h-40 w-full'>
                    <Image
                      fill
                      alt={original.name}
                      src={original.image_url}
                      unoptimized
                      quality={50}
                      priority={false}
                      loading='lazy'
                      className='rounded-t'
                    />
                  </div>
                ) : (
                  <div className='flex h-40 w-full items-center justify-center rounded-t bg-neutral-200 dark:bg-neutral-700'>
                    <ImageIcon className='h-16 w-16 text-neutral-500' />
                  </div>
                )}
                <p className='mb-2 mt-3 text-lg font-semibold leading-6 text-neutral-700 dark:text-white'>
                  {original.name}
                </p>
                <p className='text-[15px] text-neutral-600 dark:text-neutral-200'>{original.description}</p>
              </HoverCardContent>
            </HoverCard>
          );
        },
      },
      {
        Header: 'Location',
        accessor: 'location',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return values?.location;
        },
      },
      {
        Header: 'Island',
        accessor: 'vacation_island.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/island/detail/${original.vacation_island?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {original.vacation_island?.name}
            </Link>
          );
        },
      },
    ],
    [],
  );

  const tableInstance = useRef(null);

  useEffect(() => {
    tableInstance.current?.setGlobalFilter(debouncedValue);
  }, [debouncedValue]);

  if (error) {
    return (
      <Layout title='Category Detail - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' - MyVacation' : 'Category Detail - MyVacation'}`}
      description='View Detail Category - MyVacation'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name} Destination</Title> : <Title>Category Detail</Title>}
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
              className='mb-4 mt-2'
            />
            <ReactTable columns={column} data={data.destinations} ref={tableInstance} page_size={20} />
          </>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Destination in Category {data?.name} </p>
          </div>
        )
      ) : (
        <>
          <LabeledInput label='Search Data' id='caridata' name='caridata' placeholder='Keyword' />
          <TableSimple
            head={
              <>
                <TableSimple.th className='flex items-center gap-1'>
                  No <ChevronUpIcon className='h-4 w-4 opacity-50' />
                </TableSimple.th>
                <TableSimple.th className='text-left sm:w-[40%] md:w-[45%]'>
                  <div className='flex items-center gap-1'>
                    Name <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                  </div>
                </TableSimple.th>
                <TableSimple.th className='sm:w-[30%] md:w-[35%]'>
                  <div className='flex items-center gap-1'>
                    Location <ChevronsUpDownIcon className='h-4 w-4 opacity-50' />
                  </div>
                </TableSimple.th>
                <TableSimple.th className='sm:w-[30%] md:w-[20%]'>
                  <div className='flex items-center gap-1'>
                    Province
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
              </TableSimple.tr>
            ))}
          </TableSimple>
        </>
      )}
    </Layout>
  );
}
