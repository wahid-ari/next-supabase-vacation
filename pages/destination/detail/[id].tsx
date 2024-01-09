import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { twMerge } from 'tailwind-merge';

import { useDestinationData } from '@/libs/swr';
import { cn, youTubeGetID } from '@/libs/utils';

import { Text } from '@/components/ui/Text';

import Layout from '@/components/layout/Layout';
import Shimmer from '@/components/systems/Shimmer';

const ReactLeaflet = dynamic(() => import('@/components/custom/Map'), {
  ssr: false,
  loading: () => (
    <Shimmer>
      <div className='h-56 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    </Shimmer>
  ),
});

Destination.auth = true;

export default function Destination() {
  const router = useRouter();
  const id = router.query?.id as string;
  const link = `${process.env.NEXT_PUBLIC_API_ROUTE}${router?.asPath}`;
  const { data, error } = useDestinationData(id);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Destination Detail - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' - MyVacation' : 'Destination Detail - MyVacation'}`}
      description={`${data ? data?.description : 'View Detail Destination - MyVacation'}`}
    >
      {data ? (
        data?.header_image_url && (
          <div className='relative mx-auto mb-8 h-64 w-full rounded sm:h-72 lg:h-80 xl:h-96'>
            <Image
              fill
              alt={data?.name}
              src={data?.header_image_url}
              unoptimized
              quality={50}
              className={twMerge('rounded object-cover', isLoading ? 'blur-sm' : 'blur-0')}
              onLoad={() => setLoading(false)}
              priority
            />
          </div>
        )
      ) : (
        <Shimmer className='mx-auto mb-8 h-64 w-full rounded sm:h-72 lg:h-80 xl:h-96'>
          <div className='h-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
        </Shimmer>
      )}

      {data ? (
        <>
          <h1 className='mb-4 text-3xl font-bold'>{data?.name}</h1>
          <Text className='leading-7 text-gray-700 dark:text-neutral-200'>{data?.description}</Text>
        </>
      ) : (
        <>
          <Shimmer className='mb-6 h-9 w-64 rounded' />
          <Shimmer className='mb-2 w-full rounded p-3' />
          <Shimmer className='mb-4 max-w-xl rounded p-3' />
        </>
      )}

      <table className='my-4 text-[15px]'>
        <tbody>
          <tr>
            <td className='pb-3 pr-4 font-medium'>Location</td>
            <td className='pb-3'>{data?.location ? data.location : '-'}</td>
          </tr>
          <tr>
            <td className='pb-3 pr-4 font-medium'>Categories</td>
            <td className='pb-3'>
              <p className='font-medium text-neutral-700 dark:text-neutral-200'>
                {data?.category_array.map((item: any, index: number) => {
                  return (
                    <span key={index + 1}>
                      <Link
                        href={`/category/detail/${item.id}`}
                        className='rounded font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                      >
                        {item.name}
                      </Link>
                      {index < data.category_array.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
                {data?.category_array?.length < 1 && '-'}
              </p>
            </td>
          </tr>
          <tr>
            <td className='pb-3 pr-4 font-medium'>Province</td>
            <td className='pb-3'>
              {data?.vacation_province?.id ? (
                <Link
                  href={`/province/detail/${data?.vacation_province?.id}`}
                  className='rounded font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  {data?.vacation_province?.name}
                </Link>
              ) : (
                '-'
              )}
            </td>
          </tr>
          <tr>
            <td className='pb-3 pr-4 font-medium'>Island</td>
            <td className='pb-3'>
              {data?.vacation_island?.id ? (
                <Link
                  href={`/island/detail/${data?.vacation_island?.id}`}
                  className='rounded font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  {data?.vacation_island?.name}
                </Link>
              ) : (
                '-'
              )}
            </td>
          </tr>
          <tr>
            <td className='pb-3 pr-4 font-medium'>Share</td>
            <td className='pb-3'>
              <div className='flex gap-1'>
                <FacebookShareButton url={link} quote={data?.name}>
                  <FacebookIcon size={24} round={true} />
                </FacebookShareButton>
                <TwitterShareButton url={link} title={data?.name}>
                  <TwitterIcon size={24} round={true} />
                </TwitterShareButton>
                <TelegramShareButton url={link} title={data?.name}>
                  <TelegramIcon size={24} round={true} />
                </TelegramShareButton>
                <WhatsappShareButton url={link} title={data?.name}>
                  <WhatsappIcon size={24} round={true} />
                </WhatsappShareButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {data?.video_url && (
        <iframe
          className='mx-auto my-8 h-64 w-full rounded sm:h-72 sm:w-5/6 md:w-4/6 lg:h-80 xl:h-96'
          src={`https://www.youtube.com/embed/${youTubeGetID(data?.video_url)}`}
          title={data?.name}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      )}

      <div
        className={cn(
          'ql-editor !prose !max-w-none !p-0 dark:!prose-invert prose-video:!w-96',
          'prose-img:mx-auto prose-img:h-64 prose-img:rounded prose-img:object-center',
          'prose-img:w-full prose-img:!max-w-2xl prose-img:sm:h-72 prose-img:md:h-96',
          '!prose-blue prose-a:!font-normal prose-blockquote:!my-3',
        )}
        dangerouslySetInnerHTML={{ __html: data?.content }}
      />

      {data?.latlng && <ReactLeaflet name={data?.name} marker={data?.latlng} className='mt-8 h-80' zoom={6} />}
    </Layout>
  );
}
