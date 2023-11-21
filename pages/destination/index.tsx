import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { ChevronsUpDownIcon, ChevronUpIcon, ImageIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';
import { twMerge } from 'tailwind-merge';

import { useDestinationsData } from '@/libs/swr';
import useToast from '@/hooks/use-hot-toast';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { InputDebounce } from '@/components/ui/InputDebounce';
import { Label } from '@/components/ui/Label';

import Layout from '@/components/layout/Layout';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Destination.auth = true;

export default function Destination() {
  const { data, error } = useDestinationsData();
  const { pushToast, updateToast, dismissToast } = useToast();
  const [openDialog, setOpenDialog] = useState({ create: false, edit: false, delete: false });
  const [item, setItem] = useState({ id: null, name: '', image_url: '', island_id: undefined });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${item.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination?id=${item.id}`);
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, delete: false }));
        setItem({ id: null, name: '', image_url: '', island_id: null });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination`);
      }
    } catch (error) {
      console.error(error);
      const { detail } = error?.response?.data;
      if (detail) {
        updateToast({ toastId, message: detail, isError: true });
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  function handleShowDeleteDialog(id: any, name: any) {
    setItem((prev) => ({ ...prev, id: id, name: name }));
    setOpenDialog((prev) => ({ ...prev, delete: true }));
  }

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
                  <p className='break-all text-ellipsis overflow-hidden w-40 lg:w-44 xl:w-full'>{original.name}</p>
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
                  'scrollbar-thin scrollbar-thinner scrollbar-thumb-rounded scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700',
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
                <p className='text-neutral-700 dark:text-white font-semibold leading-6 text-lg mt-3 mb-2'>
                  {original.name}
                </p>
                <p className='text-[15px] dark:text-neutral-200 text-neutral-600'>{original.description}</p>
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
          return values.location;
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
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(original);
          // console.log(`${values.id} - ${values.name} - ${original.name} - ${original.id}`)
          return (
            <div>
              <Button asChild title={`Edit ${original.name}`} size='sm' className='mr-2 px-2'>
                <Link href={`/destination/edit/${original.id}`}>
                  <PencilIcon className='h-4 w-4' />
                </Link>
              </Button>
              <Button
                title={`Delete ${original.name}`}
                size='sm'
                variant='destructive'
                className='px-2'
                onClick={() => handleShowDeleteDialog(original.id, original.name)}
              >
                <TrashIcon className='h-4 w-4' />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const tableInstance = useRef(null);

  if (error) {
    return (
      <Layout title='Destination - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Destination - MyVacation'
      prefetch={['/api/destination']}
      description='View and Manage Destination - MyVacation'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Destination</Title>
        <Button asChild variant='success'>
          <Link href='/destination/add'>
            <PlusIcon className='mr-2 h-4 w-4' />
            New Destination
          </Link>
        </Button>
      </div>

      <Label htmlFor='search'>Search</Label>
      <InputDebounce
        id='search'
        name='search'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => {
          setInputDebounceValue(value);
          tableInstance?.current?.setGlobalFilter(value);
        }}
        className='mt-2 mb-4'
      />

      {data ? (
        <ReactTable columns={column} data={data} ref={tableInstance} page_size={20} itemPerPage={[10, 20, 50, 100]} />
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th className='flex gap-1 items-center'>
                No <ChevronUpIcon className='w-4 h-4 opacity-50' />
              </TableSimple.th>
              <TableSimple.th className='text-left sm:w-[40%] md:w-[38%]'>
                <div className='flex gap-1 items-center'>
                  Name <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th className='sm:w-[30%] md:w-[40%]'>
                <div className='flex gap-1 items-center'>
                  Location <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th className='sm:w-[30%] md:w-[21%]'>
                <div className='flex gap-1 items-center'>
                  Island
                  <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th shrink>Action</TableSimple.th>
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
              <TableSimple.td className='flex justify-end gap-2'>
                <Shimmer className='p-3 w-8' />
                <Shimmer className='p-3 w-8' />
              </TableSimple.td>
            </TableSimple.tr>
          ))}
        </TableSimple>
      )}

      {/* Delete Dialog */}
      <Dialog open={openDialog.delete} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, delete: false }))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Destination</DialogTitle>
            <DialogDescription>Delete destination here. Click save when you done.</DialogDescription>
          </DialogHeader>
          <div className='py-4 text-center sm:text-left'>
            Are you sure want to delete <span className='font-semibold'>{item.name}</span> ?
          </div>
          <DialogFooter className='gap-y-2'>
            <Button variant='ghost' onClick={() => setOpenDialog((prev) => ({ ...prev, delete: false }))}>
              Cancel
            </Button>
            <Button variant='destructive' type='submit' onClick={handleDelete}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
