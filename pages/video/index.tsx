import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ChevronsUpDownIcon, ChevronUpIcon, PencilIcon, PlayIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { useIslandsData, useVideosData } from '@/libs/swr';
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

// Video.auth = true;

export default function Video() {
  const { data, error } = useVideosData();
  const { data: island, error: errorIsland } = useIslandsData();
  const { pushToast, updateToast, dismissToast } = useToast();
  const [openDialog, setOpenDialog] = useState({ create: false, edit: false, delete: false, preview: false });
  const [item, setItem] = useState({
    id: null,
    title: '',
    video_url: '',
    province_id: undefined,
    island_id: undefined,
  });
  const [videoPreview, setVideoPreview] = useState({
    title: '',
    video_url: '',
  });
  // videoPreview.video_url maybe "https://youtu.be/qSqVVswa420" or "https://www.youtube.com/watch?v=2m1drlOZSDw"
  // if videoPreview.video_url includes "watch" word, then url maybe like "https://www.youtube.com/watch?v=2m1drlOZSDw"
  const youtube_url = videoPreview?.video_url?.includes('watch')
    ? videoPreview?.video_url?.split('=')[1]
    : videoPreview?.video_url?.split('/')[3];
  const [inputDebounceValue, setInputDebounceValue] = useState('');

  async function handleCreate() {
    const toastId = pushToast({
      message: `Creating ${item.title}`,
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/video`, {
        title: item.title,
        video_url: item.video_url,
        island_id: item.island_id,
      });
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, create: false }));
        setItem({ id: null, title: '', video_url: '', province_id: undefined, island_id: undefined });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/video`);
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
      message: 'Updating video',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/video`, item);
      if (res.status == 201) {
        setOpenDialog((prev) => ({ ...prev, edit: false }));
        setItem({ id: null, title: '', video_url: '', province_id: undefined, island_id: undefined });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/video`);
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
      message: `Deleting ${item.title}`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/video?id=${item.id}`);
      if (res.status == 200) {
        setOpenDialog((prev) => ({ ...prev, delete: false }));
        setItem({ id: null, title: '', video_url: '', province_id: undefined, island_id: undefined });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/video`);
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

  function handleShowEditDialog(id: any, title: any, video_url: any, province_id: any, island_id: any) {
    setItem({ id: id, title: title, video_url: video_url, province_id: province_id, island_id: island_id });
    setOpenDialog((prev) => ({ ...prev, edit: true }));
  }

  function handleShowDeleteDialog(id: any, name: any) {
    setItem((prev) => ({ ...prev, id: id, name: name }));
    setOpenDialog((prev) => ({ ...prev, delete: true }));
  }

  function handleShowVideoDialog(title: any, video_url: any) {
    setVideoPreview({ title: title, video_url: video_url });
    setOpenDialog((prev) => ({ ...prev, preview: true }));
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
            <Link
              href={`/video/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values.title}
            </Link>
          );
        },
      },
      {
        Header: 'Province',
        accessor: 'vacation_province.name',
        width: 300,
        Cell: (row: any) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/province/detail/${original.vacation_province?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {original.vacation_province?.name}
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
                title={`Play ${original.title}`}
                size='sm'
                variant='success'
                className='mr-2 px-2'
                onClick={() => handleShowVideoDialog(original.title, original.video_url)}
              >
                <PlayIcon className='h-4 w-4' />
              </Button>
              <Button
                title={`Edit ${original.title}`}
                size='sm'
                className='mr-2 px-2'
                onClick={() =>
                  handleShowEditDialog(
                    original.id,
                    original.title,
                    original.video_url,
                    original?.vacation_province?.id,
                    original?.vacation_island?.id
                  )
                }
              >
                <PencilIcon className='h-4 w-4' />
              </Button>
              <Button
                title={`Delete ${original.title}`}
                size='sm'
                variant='destructive'
                className='px-2'
                onClick={() => handleShowDeleteDialog(original.id, original.title)}
              >
                <TrashIcon className='h-4 w-4' />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error || errorIsland) {
    return (
      <Layout title='Video - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Video - MyVacation' prefetch={['/api/video']} description='View and Manage Video - MyVacation'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Video</Title>
        <Button
          variant='success'
          onClick={() => {
            setItem({ id: null, title: '', video_url: '', province_id: null, island_id: null });
            setOpenDialog((prev) => ({ ...prev, create: true }));
          }}
        >
          <PlusIcon className='mr-2 h-4 w-4' />
          New Video
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
            <DialogTitle>Create New Video</DialogTitle>
            <DialogDescription>Create new video here. Click save when you done.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='title' className='sm:text-right leading-5'>
                Title
              </Label>
              <Input
                id='title'
                type='text'
                name='title'
                value={item.title}
                onChange={(e) => setItem((prev) => ({ ...prev, title: e.target.value }))}
                placeholder='Jawa Timur'
                className='sm:col-span-3'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='video-url' className='sm:text-right leading-5'>
                Video URL
              </Label>
              <Input
                id='video-url'
                type='text'
                name='Video URL'
                value={item.video_url}
                onChange={(e) => setItem((prev) => ({ ...prev, video_url: e.target.value }))}
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
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>Make changes to video here. Click save when you done.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='title' className='sm:text-right leading-5'>
                Title
              </Label>
              <Input
                id='title'
                type='text'
                name='title'
                value={item.title}
                onChange={(e) => setItem((prev) => ({ ...prev, title: e.target.value }))}
                placeholder='Jawa Timur'
                className='sm:col-span-3'
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4'>
              <Label htmlFor='video-url' className='sm:text-right leading-5'>
                Video URL
              </Label>
              <Input
                id='video-url'
                type='text'
                name='Video URL'
                value={item.video_url}
                onChange={(e) => setItem((prev) => ({ ...prev, video_url: e.target.value }))}
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
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>Delete video here. Click save when you done.</DialogDescription>
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

      {/* Preview Dialog */}
      <Dialog open={openDialog.preview} onOpenChange={() => setOpenDialog((prev) => ({ ...prev, preview: false }))}>
        <DialogContent className='sm:max-w-[720px]'>
          <DialogHeader className='text-left'>
            <DialogTitle className='pr-4'>{videoPreview.title}</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            <iframe
              className='h-72 lg:h-80 xl:h-96 w-full rounded'
              src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
              title={videoPreview.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
