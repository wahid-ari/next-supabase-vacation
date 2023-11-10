import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ChevronsUpDownIcon, ChevronUpIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { useIslandsData, useProvincesData } from '@/libs/swr';
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
import { Input } from '@/components/ui/Input';
import { InputDebounce } from '@/components/ui/InputDebounce';
import { Label } from '@/components/ui/Label';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

import Layout from '@/components/layout/Layout';
import ReactTable from '@/components/systems/ReactTable';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Province.auth = true;

export default function Province() {
  const { data, error } = useProvincesData();
  const { data: island, error: errorIsland } = useIslandsData();
  const { pushToast, updateToast, dismissToast } = useToast();
  const [openDialog, setOpenDialog] = useState({ create: false, edit: false, delete: false });
  const [item, setItem] = useState({ id: null, name: '', image_url: '', island_id: undefined });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleCreate() {
    const toastId = pushToast({
      message: `Creating ${item.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/province`, {
        name: item.name,
        image_url: item.image_url,
        island_id: item.island_id,
      });
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, create: false }));
        setItem({ id: null, name: '', image_url: '', island_id: null });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/province`);
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.error)) {
        const errors = [...error?.response?.data?.error].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.error, isError: true });
      }
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Updating province',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/province`, item);
      if (res.status == 201) {
        setOpenDialog((prev) => ({ ...prev, edit: false }));
        setItem({ id: null, name: '', image_url: '', island_id: null });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/province`);
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.error)) {
        const errors = [...error?.response?.data?.error].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.error, isError: true });
      }
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${item.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/province?id=${item.id}`);
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, delete: false }));
        setItem({ id: null, name: '', image_url: '', island_id: null });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/province`);
      }
    } catch (error) {
      console.error(error);
      const { detail } = error?.response?.data;
      if (detail) {
        updateToast({ toastId, message: detail, isError: true });
      } else {
        updateToast({ toastId, message: error?.response?.data?.error, isError: true });
      }
    }
  }

  function handleShowEditDialog(id: any, name: any, image_url: any, island_id: any) {
    setItem({ id: id, name: name, image_url: image_url, island_id: island_id });
    setOpenDialog((prev) => ({ ...prev, edit: true }));
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
            <Link
              href={`/province/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values.name}
            </Link>
          );
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
        Header: 'Destination',
        accessor: 'vacation_destination.length',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return <span className='pl-8'>{original.vacation_destination?.length}</span>;
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
              <Button
                title={`Edit ${original.name}`}
                size='sm'
                className='mr-2 px-2'
                onClick={() =>
                  handleShowEditDialog(original.id, original.name, original.image_url, original?.vacation_island?.id)
                }
              >
                <PencilIcon className='h-4 w-4' />
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

  if (error || errorIsland) {
    return (
      <Layout title='Province - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Province - MyVacation'
      prefetch={['/api/province']}
      description='View and Manage Province - MyVacation'
    >
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Province</Title>
        <Button
          variant='success'
          onClick={() => {
            setItem({ id: null, name: '', image_url: '', island_id: null });
            setOpenDialog((prev) => ({ ...prev, create: true }));
          }}
        >
          <PlusIcon className='mr-2 h-4 w-4' />
          New Province
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
              <TableSimple.th className='sm:w-[30%] md:w-[28%]'>
                <div className='flex gap-1 items-center'>
                  Island <ChevronsUpDownIcon className='w-4 h-4 opacity-50' />
                </div>
              </TableSimple.th>
              <TableSimple.th className='sm:w-[30%] md:w-[27%]'>
                <div className='flex gap-1 items-center'>
                  Destination
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

      {/* Create Dialog */}
      <Dialog open={openDialog.create} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, create: false }))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create New Province</DialogTitle>
            <DialogDescription>Create new province here. Click save when you done.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='name' className='sm:text-right leading-5'>
                Name
              </Label>
              <Input
                id='name'
                type='text'
                name='name'
                value={item.name}
                onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
                placeholder='Jawa Timur'
                className='sm:col-span-3'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='image-url' className='sm:text-right leading-5'>
                Image URL
              </Label>
              <Input
                id='image-url'
                type='text'
                name='Image URL'
                value={item.image_url}
                onChange={(e) => setItem((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder='https://images.unsplash.com/photo-1697299708650-e4d1ce150d38?auto=format&fit=crop&q=80&w=500'
                className='sm:col-span-3'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='select-island' className='sm:text-right leading-5'>
                Island
              </Label>
              {island ? (
                <Select
                  value={item.island_id || undefined}
                  onValueChange={(e) => setItem((prev) => ({ ...prev, island_id: e }))}
                >
                  <SelectTrigger className='sm:col-span-3' id='select-island' aria-label='select-island'>
                    <SelectValue placeholder='Select Island' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <ScrollArea className='h-40'>
                        {island?.map((item: any) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Shimmer className='h-10 sm:col-span-3' />
              )}
            </div>
          </div>
          <DialogFooter className='gap-y-2'>
            <Button variant='ghost' onClick={() => setOpenDialog((prev) => ({ ...prev, create: false }))}>
              Cancel
            </Button>
            <Button type='submit' variant='success' onClick={handleCreate}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openDialog.edit} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, edit: false }))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Province</DialogTitle>
            <DialogDescription>Make changes to province here. Click save when you done.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='name' className='sm:text-right leading-5'>
                Name
              </Label>
              <Input
                id='name'
                type='text'
                name='Name'
                value={item.name}
                onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
                placeholder='Jawa Timur'
                className='sm:col-span-3'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='image-url' className='sm:text-right leading-5'>
                Image URL
              </Label>
              <Input
                id='image-url'
                type='text'
                name='Image URL'
                value={item.image_url}
                onChange={(e) => setItem((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder='https://images.unsplash.com/photo-1697299708650-e4d1ce150d38?auto=format&fit=crop&q=80&w=500'
                className='sm:col-span-3'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='select-island' className='sm:text-right leading-5'>
                Island
              </Label>
              {island ? (
                <Select
                  value={item.island_id || undefined}
                  onValueChange={(e) => setItem((prev) => ({ ...prev, island_id: e }))}
                >
                  <SelectTrigger className='sm:col-span-3' id='select-island' aria-label='select-island'>
                    <SelectValue placeholder='Select Island' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <ScrollArea className='h-40'>
                        {island?.map((item: any) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Shimmer className='h-10 sm:col-span-3' />
              )}
            </div>
          </div>
          <DialogFooter className='gap-y-2'>
            <Button variant='ghost' onClick={() => setOpenDialog((prev) => ({ ...prev, edit: false }))}>
              Cancel
            </Button>
            <Button type='submit' onClick={handleEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDialog.delete} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, delete: false }))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Province</DialogTitle>
            <DialogDescription>Delete province here. Click save when you done.</DialogDescription>
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
