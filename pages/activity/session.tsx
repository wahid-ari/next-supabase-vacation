import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TrashIcon } from 'lucide-react';
import { mutate } from 'swr';

import { useSessionsData } from '@/libs/swr';
import { cn } from '@/libs/utils';
import useToast from '@/hooks/use-hot-toast';

import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import Shimmer from '@/components/systems/Shimmer';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

// Session.auth = true;

export default function Session() {
  const router = useRouter();
  const { data, error } = useSessionsData();
  const { updateToast, pushToast } = useToast();
  const [inputDebounceValue, setInputDebounceValue] = useState('');
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);

  const filteredData =
    inputDebounceValue === ''
      ? data
      : data.filter((item: any) =>
          item.vacation_user.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(inputDebounceValue.toLowerCase().replace(/\s+/g, ''))
        );

  async function handleDeleteAll() {
    const toastId = pushToast({
      message: `Deleting All Session`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`);
      if (res.status == 200) {
        setOpenDeleteAllDialog(false);
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`);
        router.push('/activity/session');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
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
        {/* <Button.danger onClick={() => setOpenDeleteAllDialog(true)} className='flex items-center gap-2'>
          <TrashIcon className='h-5 w-5' />
          Delete All
        </Button.danger> */}
      </div>

      <Dialog
        title='Delete All Session'
        open={openDeleteAllDialog}
        isDanger
        setOpen={setOpenDeleteAllDialog}
        onClose={() => setOpenDeleteAllDialog(false)}
        onConfirm={handleDeleteAll}
      >
        <div className='mt-5 text-center sm:text-left'>Are you sure want to delete All Session ?</div>
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
              <TableSimple.td shrink>No</TableSimple.td>
              <TableSimple.td shrink>ID</TableSimple.td>
              <TableSimple.td className={cn(filteredData.length < 1 && 'w-32 text-center')}>Name</TableSimple.td>
              <TableSimple.td>Token</TableSimple.td>
              <TableSimple.td shrink>Date</TableSimple.td>
              <TableSimple.td shrink>Time</TableSimple.td>
            </>
          }
          caption={filteredData.length > 0 ? '' : 'No Data'}
        >
          {filteredData.map((item: any, index: number) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td shrink>{index + 1}</TableSimple.td>
                <TableSimple.td>{item.user_id}</TableSimple.td>
                <TableSimple.td>{item.vacation_user.name}</TableSimple.td>
                <TableSimple.td>{item.token.split('.')[2]}</TableSimple.td>
                <TableSimple.td>{item.created_at.split('T')[0]}</TableSimple.td>
                <TableSimple.td>{getTime(item.created_at)}</TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      ) : (
        <TableSimple
          head={
            <>
              <TableSimple.th shrink>No</TableSimple.th>
              <TableSimple.th shrink>ID</TableSimple.th>
              <TableSimple.th className='w-28'>Name</TableSimple.th>
              <TableSimple.th className='text-left'>Token</TableSimple.th>
              <TableSimple.th className='w-28'>Date</TableSimple.th>
              <TableSimple.th className='w-28'>Time</TableSimple.th>
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
