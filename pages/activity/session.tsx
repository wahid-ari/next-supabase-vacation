import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { useSessionsData } from '@/libs/swr';
import { cn } from '@/libs/utils';
import useToast from '@/hooks/use-hot-toast';

import { Button } from '@/components/ui/Button';

import Layout from '@/components/layout/Layout';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Session.auth = true;

export default function Session() {
  const { data, error } = useSessionsData();
  const { updateToast, pushToast } = useToast();
  const [inputDebounceValue, setInputDebounceValue] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ dialog: false, id: null });

  const filteredData =
    inputDebounceValue === ''
      ? data
      : data.filter((item: any) =>
          item.vacation_user.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(inputDebounceValue.toLowerCase().replace(/\s+/g, '')),
        );

  async function handleDelete() {
    const toastId = pushToast({
      message: `Deleting ${deleteDialog.id == null ? 'All' : ''} Session`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session?id=${deleteDialog.id}`);
      if (res.status == 200) {
        setDeleteDialog({ dialog: false, id: null });
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`);
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.message, isError: true });
    }
  }

  function getTime(date: string) {
    let time = new Date(date);
    return time.toLocaleTimeString('en-US');
  }

  if (error) {
    return (
      <Layout title='Session - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Session - MyVacation' description='View and Manage Session - MyVacation' prefetch={['/api/session']}>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Session</Title>
        {/* <Button variant='destructive' onClick={() => setDeleteDialog({ dialog: true, id: null })}>
          <TrashIcon className='mr-2 h-4 w-4' />
          Delete All
        </Button> */}
      </div>

      <Dialog
        title={`Delete ${deleteDialog.id == null ? 'All' : ''} Session`}
        open={deleteDialog.dialog}
        isDanger
        setOpen={() => setDeleteDialog({ id: null, dialog: false })}
        onClose={() => setDeleteDialog({ id: null, dialog: false })}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete {deleteDialog.id == null ? 'All' : 'This'} Session ?
        </div>
      </Dialog>

      <InputDebounce
        label='Search'
        id='inputdebounce'
        name='inputdebounce'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => setInputDebounceValue(value)}
      />

      {filteredData ? (
        <TableSimple
          head={
            <>
              <TableSimple.td shrink>ID</TableSimple.td>
              <TableSimple.td className={cn(filteredData.length < 1 && 'w-32 text-center')}>Name</TableSimple.td>
              <TableSimple.td>Token</TableSimple.td>
              <TableSimple.td shrink>Date</TableSimple.td>
              <TableSimple.td shrink>Time</TableSimple.td>
              <TableSimple.td shrink>Action</TableSimple.td>
            </>
          }
          caption={filteredData.length > 0 ? '' : 'No Data'}
        >
          {filteredData.map((item: any, index: number) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td className='text-center'>{item.user_id}</TableSimple.td>
                <TableSimple.td>{item.vacation_user.name}</TableSimple.td>
                <TableSimple.td>
                  <p className='break-all text-ellipsis overflow-hidden w-32 sm:w-64 md:w-72 xl:w-full'>
                    {item.token.split('.')[2]}
                  </p>
                </TableSimple.td>
                {/* <TableSimple.td>{item.created_at.split('T')[0]}</TableSimple.td> */}
                <TableSimple.td>{format(new Date(item?.created_at), 'PP')}</TableSimple.td>
                {/* <TableSimple.td>{getTime(item.created_at)}</TableSimple.td> */}
                <TableSimple.td>{format(new Date(item?.created_at), 'pp')}</TableSimple.td>
                <TableSimple.td>
                  <Button
                    title={`Delete ${item.vacation_user.name}`}
                    size='sm'
                    variant='destructive'
                    className='px-2 ml-1.5'
                    onClick={() => setDeleteDialog({ dialog: true, id: item.id })}
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
              <TableSimple.th shrink>ID</TableSimple.th>
              <TableSimple.th className='w-28'>Name</TableSimple.th>
              <TableSimple.th className='text-left'>Token</TableSimple.th>
              <TableSimple.th className='w-28'>Date</TableSimple.th>
              <TableSimple.th className='w-28'>Time</TableSimple.th>
              <TableSimple.th className='w-28'>Action</TableSimple.th>
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
            </TableSimple.tr>
          ))}
        </TableSimple>
      )}
    </Layout>
  );
}
