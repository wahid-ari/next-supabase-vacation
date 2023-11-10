import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { useIslandsData } from '@/libs/swr';
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

import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Island.auth = true;

export default function Island() {
  const { data, error } = useIslandsData();
  const { pushToast, updateToast, dismissToast } = useToast();
  const [openDialog, setOpenDialog] = useState({ create: false, edit: false, delete: false });
  const [item, setItem] = useState({ id: null, name: '', image_url: '' });
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  const filteredData =
    inputDebounceValue === ''
      ? data
      : data.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(inputDebounceValue.toLowerCase().replace(/\s+/g, '')),
        );

  async function handleCreate() {
    const toastId = pushToast({
      message: `Creating ${item.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/island`, {
        name: item.name,
        image_url: item.image_url,
      });
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, create: false }));
        setItem({ id: null, name: '', image_url: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/island`);
      }
    } catch (error) {
      console.error(error);
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
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Updating island',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/island`, item);
      if (res.status == 201) {
        setOpenDialog((prev) => ({ ...prev, edit: false }));
        setItem({ id: null, name: '', image_url: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/island`);
      }
    } catch (error) {
      console.error(error);
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
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${item.name}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/island?id=${item.id}`);
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, delete: false }));
        setItem({ id: null, name: '', image_url: '' });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/island`);
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

  function handleShowEditDialog(id: any, name: any, image_url: any) {
    setItem({ id: id, name: name, image_url: image_url });
    setOpenDialog((prev) => ({ ...prev, edit: true }));
  }

  function handleShowDeleteDialog(id: any, name: any) {
    setItem({ id: id, name: name, image_url: '' });
    setOpenDialog((prev) => ({ ...prev, delete: true }));
  }

  if (error) {
    return (
      <Layout title='Island - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Island - MyVacation' prefetch={['/api/island']} description='View and Manage Island - MyVacation'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Island</Title>
        <Button
          variant='success'
          onClick={() => {
            setItem({ id: null, name: '', image_url: '' });
            setOpenDialog((prev) => ({ ...prev, create: true }));
          }}
        >
          <PlusIcon className='mr-2 h-4 w-4' />
          New Island
        </Button>
      </div>

      <Label htmlFor='search'>Search</Label>
      <InputDebounce
        id='search'
        name='search'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => setInputDebounceValue(value)}
        className='mt-2 mb-4'
      />

      {/* Create Dialog */}
      <Dialog open={openDialog.create} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, create: false }))}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create New Island</DialogTitle>
            <DialogDescription>Create new island here. Click save when you done.</DialogDescription>
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
                placeholder='Jawa'
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
            <DialogTitle>Edit Island</DialogTitle>
            <DialogDescription>Make changes to island here. Click save when you done.</DialogDescription>
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
                placeholder='Jawa'
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
            <DialogTitle>Delete Island</DialogTitle>
            <DialogDescription>Delete island here. Click save when you done.</DialogDescription>
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

      {filteredData ? (
        <TableSimple
          head={
            <>
              <TableSimple.td shrink>No</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td className='w-32 text-center'>Destination</TableSimple.td>
              <TableSimple.td shrink>Action</TableSimple.td>
            </>
          }
        >
          {filteredData.map((item: any, index: number) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td shrink>{index + 1}</TableSimple.td>
                <TableSimple.td>
                  <Link
                    href={`island/detail/${item.id}`}
                    className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    {item.name}
                  </Link>
                </TableSimple.td>
                <TableSimple.td className='text-center'>{item?.vacation_destination?.length}</TableSimple.td>
                <TableSimple.td>
                  <Button
                    title={`Edit ${item.name}`}
                    size='sm'
                    className='mr-2 px-2'
                    onClick={() => handleShowEditDialog(item.id, item.name, item.image_url)}
                  >
                    <PencilIcon className='h-4 w-4' />
                  </Button>
                  <Button
                    title={`Delete ${item.name}`}
                    size='sm'
                    variant='destructive'
                    className='px-2'
                    onClick={() => handleShowDeleteDialog(item.id, item.name)}
                  >
                    <TrashIcon className='h-4 w-4' />
                  </Button>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th shrink>No</TableSimple.th>
              <TableSimple.th className='text-left'>Name</TableSimple.th>
              <TableSimple.th className='w-32 text-center'>Destination</TableSimple.th>
              <TableSimple.th className='w-24 text-left'>Action</TableSimple.th>
            </>
          }
        >
          {[...Array(10).keys()].map((e, index) => (
            <TableSimple.tr key={index}>
              <TableSimple.td shrink>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3' />
              </TableSimple.td>
              <TableSimple.td>
                <Shimmer className='p-3 w-8 mx-auto' />
              </TableSimple.td>
              <TableSimple.td className='flex justify-end gap-2'>
                <Shimmer className='p-3 w-8' />
                <Shimmer className='p-3 w-8' />
              </TableSimple.td>
            </TableSimple.tr>
          ))}
        </TableSimple>
      )}
    </Layout>
  );
}
