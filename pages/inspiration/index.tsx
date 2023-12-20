import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import {
  ChevronsUpDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
import { mutate } from 'swr';
import { twMerge } from 'tailwind-merge';

import { useInspirationsData } from '@/libs/swr';
import { cn } from '@/libs/utils';
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

// Inspiration.auth = true;

export default function Inspiration() {
  const { data, error } = useInspirationsData();
  const { pushToast, updateToast, dismissToast } = useToast();
  const [openDialog, setOpenDialog] = useState({ delete: false });
  const [item, setItem] = useState({ id: null, title: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${item.title}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration?id=${item.id}`);
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, delete: false }));
        setItem({ id: null, title: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration`);
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

  function handleShowDeleteDialog(id: any, title: any) {
    setItem((prev) => ({ ...prev, id: id, title: title }));
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
        Header: 'Title',
        accessor: 'title',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  href={`/inspiration#`}
                  className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <p className='w-40 overflow-hidden text-ellipsis break-all lg:w-44 xl:w-full'>{original.title}</p>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                side='top'
                style={{
                  // to keep both padding same when scrollbar showed
                  scrollbarGutter: 'stable both-edges',
                }}
                className={twMerge(
                  'max-h-64 w-full max-w-sm overflow-auto',
                  'scrollbar-thinner scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700',
                )}
              >
                {original.image_url ? (
                  <div className='relative h-44 w-full'>
                    <Image
                      fill
                      alt={original.title}
                      src={original.image_url}
                      unoptimized
                      quality={50}
                      priority={false}
                      loading='lazy'
                      className='rounded-t object-cover object-center'
                    />
                  </div>
                ) : (
                  <div className='flex h-44 w-full items-center justify-center rounded-t bg-neutral-200 dark:bg-neutral-700'>
                    <ImageIcon className='size-16 text-neutral-500' />
                  </div>
                )}
                <p className='mb-2 mt-3 text-lg font-semibold leading-6 text-neutral-700 dark:text-white'>
                  {original.title}
                </p>
                <div
                  className='ql-editor !prose !prose-blue !max-w-none !p-0 dark:!prose-invert prose-a:!font-normal'
                  // TODO Docs https://stackoverflow.com/questions/35810238/how-to-remove-nbsp-by-javascript
                  dangerouslySetInnerHTML={{ __html: original?.content.replace(/&nbsp;/g, ' ') }}
                />
              </HoverCardContent>
            </HoverCard>
          );
        },
      },
      {
        Header: 'URL',
        accessor: 'url',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return original?.url ? (
            <a
              href={original?.url}
              className='flex w-16 items-center rounded font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              target='_blank'
              rel='noreferrer'
            >
              Open
              <ExternalLinkIcon className='ml-1 size-4' />
            </a>
          ) : (
            '-'
          );
          // <Link
          //   href={`/island/detail/${original.vacation_island?.id}`}
          //   className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          // >
          //   {original.url}
          // </Link>
        },
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          // console.log(original);
          // console.log(`${values.id} - ${values.title} - ${original.title} - ${original.id}`)
          return (
            <div>
              <Button asChild title={`Edit ${original.title}`} size='sm' className='mr-2 px-2'>
                <Link href={`/inspiration/edit/${original.id}`}>
                  <PencilIcon className='size-4' />
                </Link>
              </Button>
              <Button
                title={`Delete ${original.title}`}
                size='sm'
                variant='destructive'
                className='px-2'
                onClick={() => handleShowDeleteDialog(original.id, original.title)}
              >
                <TrashIcon className='size-4' />
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
      <Layout title='Inspiration - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Inspiration - MyVacation'
      prefetch={['/api/inspiration']}
      description='View and Manage Inspiration - MyVacation'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Inspiration</Title>
        <Button asChild variant='success'>
          <Link href='/inspiration/add'>
            <PlusIcon className='mr-2 size-4' />
            New Inspiration
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
        className='mb-4 mt-2'
      />

      {data ? (
        <ReactTable columns={column} data={data} ref={tableInstance} page_size={20} itemPerPage={[10, 20, 50, 100]} />
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th className='flex items-center gap-1'>
                No <ChevronUpIcon className='size-4 opacity-50' />
              </TableSimple.th>
              <TableSimple.th className='text-left sm:w-[50%] md:w-[45%]'>
                <div className='flex items-center gap-1'>
                  Title <ChevronsUpDownIcon className='size-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th className='sm:w-[30%] md:w-[35%]'>
                <div className='flex items-center gap-1'>
                  URL <ChevronsUpDownIcon className='size-4 opacity-50' />
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
              <TableSimple.td className='flex justify-end gap-2'>
                <Shimmer className='w-8 p-3' />
                <Shimmer className='w-8 p-3' />
              </TableSimple.td>
            </TableSimple.tr>
          ))}
        </TableSimple>
      )}

      {/* Delete Dialog */}
      <Dialog open={openDialog.delete} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, delete: false }))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Inspiration</DialogTitle>
            <DialogDescription>Delete inspiration here. Click save when you done.</DialogDescription>
          </DialogHeader>
          <div className='py-4 text-center sm:text-left'>
            Are you sure want to delete <span className='font-semibold'>{item.title}</span> ?
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
