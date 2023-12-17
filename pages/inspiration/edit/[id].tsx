import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { mutate } from 'swr';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { useInspirationData } from '@/libs/swr';
import useToast from '@/hooks/use-hot-toast';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import Tabs from '@/components/systems/Tabs';
import Title from '@/components/systems/Title';

// Inspiration.auth = true;

export default function Inspiration() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useInspirationData(id);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    title: '',
    image_url: '',
    url: '',
    content: ``,
  });
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (data) {
      setEditItem({
        title: data?.title,
        image_url: data?.image_url,
        url: data?.url,
        content: data?.content,
      });
      setDataReady(true);
    }
  }, [data]);

  async function handleEdit(e: any) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Updating inspiration',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration`, { id: id, ...editItem });
      if (res.status == 201) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration`);
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration?id=${id}`);
        router.push('/inspiration');
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
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
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
  }

  const ReactQuill = useMemo(
    () =>
      dynamic(
        () => {
          return import('react-quill');
        },
        {
          ssr: false,
          loading: () => (
            <Shimmer>
              <div className='h-8 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='mt-4 h-40 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          ),
        },
      ),
    // FIX error use depedency here to fix data missing when reopening edit page
    [dataReady],
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      },
    }),
    [],
  );

  if (error) {
    return (
      <Layout title='Edit Inspiration - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Edit Inspiration - MyVacation' description='Edit New Inspiration - MyVacation'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Edit Inspiration</Title>
      </div>

      {data ? (
        <form onSubmit={handleEdit}>
          <div className='mb-4'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  type='text'
                  name='title'
                  value={editItem.title}
                  onChange={(e: any) => setEditItem((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder='Inspiration Title'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='image_url'>Image URL</Label>
                <Input
                  id='image_url'
                  type='text'
                  name='image_url'
                  value={editItem.image_url}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder='Image URL'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='url'>Content URL</Label>
                <Input
                  id='url'
                  type='text'
                  name='url'
                  value={editItem.url}
                  onChange={(e) => setEditItem((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder='Content URL'
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor='content'>Content</Label>
            <Tabs items={['Editor', 'Preview']}>
              <Tabs.panel>
                <ReactQuill
                  id='content'
                  theme='snow'
                  placeholder='Inspiration Content'
                  onChange={(e) => setEditItem({ ...editItem, content: e })}
                  modules={modules}
                  value={editItem?.content}
                />
              </Tabs.panel>
              <Tabs.panel>
                {editItem?.content != '' && editItem?.content != '<p><br></p>' && (
                  <>
                    <div className='relative mb-4 h-52 w-64'>
                      <Image
                        fill
                        alt={'Preview'}
                        src={editItem.image_url}
                        unoptimized
                        quality={50}
                        priority={false}
                        loading='lazy'
                        className='rounded-t object-cover object-center'
                      />
                    </div>
                    <div
                      className='ql-editor !prose !max-w-none !p-0 dark:!prose-invert'
                      dangerouslySetInnerHTML={{ __html: editItem?.content }}
                    />
                  </>
                )}
              </Tabs.panel>
            </Tabs>
          </div>

          <Button type='submit' variant='success' className='mt-4 w-full'>
            Save changes
          </Button>
        </form>
      ) : (
        <>
          <div>
            {[...Array(3).keys()].map((_, i) => (
              <Shimmer key={i} className='mb-4 p-2'>
                <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </Shimmer>
            ))}
          </div>
          <Shimmer className='mb-4 p-2'>
            <div className='mb-2 h-4 w-16 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='h-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>
        </>
      )}
    </Layout>
  );
}
