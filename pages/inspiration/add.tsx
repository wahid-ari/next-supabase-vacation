import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'sonner';
import { mutate } from 'swr';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// import useToast from '@/hooks/use-hot-toast';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';
import Tabs from '@/components/systems/Tabs';
import Title from '@/components/systems/Title';

// Inspiration.auth = true;

const ReactLeaflet = dynamic(() => import('@/components/custom/Map'), {
  ssr: false,
  loading: () => (
    <Shimmer>
      <div className='h-80 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    </Shimmer>
  ),
});

export default function Inspiration() {
  const router = useRouter();
  // const { updateToast, pushToast, dismissToast } = useToast();
  const [createItem, setCreateItem] = useState({
    title: '',
    image_url: '',
    url: '',
    content: ``,
  });
  const [marker, setMarker] = useState([-2.3723687086440504, 113.11523437500001]);
  // const [createItem, setCreateItem] = useState({
  //   title: 'Inspiration',
  //   image_url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=60&w=500',
  //   url: 'https://www.instagram.com/p/CZT8o7mhogG/',
  //   content: `<p class="ql-align-justify"><strong>Lorem Ipsum</strong> is <a href='https://google.com'>simply</a> dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>`,
  // });

  async function handleSave(e: any) {
    e.preventDefault();
    // const toastId = pushToast({
    //   message: 'Creating inspiration',
    //   isLoading: true,
    // });
    const toastId = toast.loading('Creating inspiration');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration`, {
        ...createItem,
        latlng: marker,
      });
      if (res.status == 200) {
        // updateToast({ toastId, message: res?.data?.message, isError: false });
        toast.success(res?.data?.message, {
          id: toastId,
        });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/inspiration`);
        router.push('/inspiration');
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
        // show all error
        // dismissToast();
        toast.dismiss();
        errors.forEach((item: any) => {
          // pushToast({ message: item?.message, isError: true });
          toast.error(item?.message);
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        //   toast.error(item?.message, {
        //     id: toastId,
        //   });
        // })
      } else {
        // updateToast({ toastId, message: error?.response?.data?.message, isError: true });
        toast.error(error?.response?.data?.message, {
          id: toastId,
        });
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
    [],
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

  return (
    <Layout title='Create Inspiration - MyVacation' description='Create New Inspiration - MyVacation'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Create Inspiration</Title>
      </div>

      <form onSubmit={handleSave}>
        <div className='mb-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                type='text'
                name='title'
                value={createItem.title}
                onChange={(e: any) => setCreateItem((prev) => ({ ...prev, title: e.target.value }))}
                placeholder='Inspiration Title'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='image_url'>Image URL</Label>
              <Input
                id='image_url'
                type='text'
                name='image_url'
                value={createItem.image_url}
                onChange={(e) => setCreateItem((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder='Image URL'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='url'>Content URL</Label>
              <Input
                id='url'
                type='text'
                name='url'
                value={createItem.url}
                onChange={(e) => setCreateItem((prev) => ({ ...prev, url: e.target.value }))}
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
                onChange={(e) => setCreateItem({ ...createItem, content: e })}
                modules={modules}
                value={createItem.content}
              />
            </Tabs.panel>
            <Tabs.panel>
              {createItem.content != '' && createItem.content != '<p><br></p>' && (
                <>
                  <div className='relative mb-4 h-52 w-64'>
                    <Image
                      fill
                      alt={'Preview'}
                      src={createItem.image_url}
                      unoptimized
                      quality={50}
                      priority={false}
                      loading='lazy'
                      className='rounded-t object-cover object-center'
                    />
                  </div>
                  <div
                    className='ql-editor !prose !prose-blue !max-w-none !p-0 dark:!prose-invert prose-a:!font-normal'
                    // TODO Docs https://stackoverflow.com/questions/35810238/how-to-remove-nbsp-by-javascript
                    dangerouslySetInnerHTML={{ __html: createItem?.content.replace(/&nbsp;/g, ' ') }}
                  />
                </>
              )}
            </Tabs.panel>
          </Tabs>
        </div>
        <div className='mt-2 space-y-2'>
          <Label htmlFor='content'>Location</Label>
          <ReactLeaflet name={createItem.title} marker={marker} setMarker={setMarker} enableEdit enableSearch />
        </div>

        <Button type='submit' variant='success' className='mt-4 w-full'>
          Save changes
        </Button>
      </form>
    </Layout>
  );
}
