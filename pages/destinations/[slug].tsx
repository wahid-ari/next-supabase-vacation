import { useMemo, useState } from 'react';
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

import { useDestinationData, useDestinationsData } from '@/libs/swr';
import { cn, youTubeGetID } from '@/libs/utils';

import { Text } from '@/components/ui/Text';

import DestinationListItem from '@/components/card/DestinationListItem';
import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export async function getServerSideProps(context: any) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination?slug=${slug}&seo=true`).then((res) =>
    res.json(),
  );
  return {
    props: {
      slug: slug,
      seo: res,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/destination?slug=${slug}&seo=true`]: res,
      },
    },
  };
}

export default function Destinations({ slug, seo }) {
  const router = useRouter();
  const link = `${process.env.NEXT_PUBLIC_API_ROUTE}${router?.asPath}`;
  const { data, error } = useDestinationData(null, slug);
  const [isLoading, setLoading] = useState(true);
  const { data: destination, error: errorDestination } = useDestinationsData();
  // using useMemo to prevent reshuffled data if page refreshed
  const destinationWithImage = useMemo(
    () => destination?.filter((item: any) => item.image_url != null && item.image_url != '' && item.slug !== slug),
    [destination, slug],
  );
  const shuffled = useMemo(() => destinationWithImage?.sort(() => 0.5 - Math.random()), [destinationWithImage]);
  const fiveDestinationWithImage = shuffled?.slice(0, 5);

  if (error || errorDestination) {
    return (
      <FrontLayout title='Destination Detail - MyVacation' description='View Detail Destination - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      transparentNavbar
      className='-mt-20 max-w-full p-0 2xl:max-w-7xl'
      title={`${seo ? seo?.name + ' - MyVacation' : 'Destination Detail - MyVacation'}`}
      description={`${seo ? seo?.description : 'View Detail Destination - MyVacation'}`}
    >
      {data ? (
        data?.header_image_url && (
          <div className='relative mx-auto mb-8 mt-4 h-72 w-full sm:h-96 md:h-[400px] lg:h-[450px] xl:h-[550px]'>
            <Image
              fill
              alt={data?.name}
              src={data?.header_image_url}
              unoptimized
              quality={50}
              className={twMerge('object-cover', isLoading ? 'blur-sm' : 'blur-0')}
              onLoad={() => setLoading(false)}
              priority
            />
          </div>
        )
      ) : (
        <Shimmer className='mx-auto mb-8 mt-4 h-72 w-full sm:h-96 md:h-[400px] lg:h-[450px] xl:h-[550px]' />
      )}

      <div className='mx-auto max-w-7xl p-4 pb-12'>
        <div className='grid gap-x-16 gap-y-8 lg:grid-cols-6'>
          {/* MAIN CONTENT */}
          <article className='lg:col-span-4'>
            {data ? (
              <>
                <h1 className='mb-4 text-3xl font-bold'>{data?.name}</h1>
                <Text className='text-justify leading-7 text-gray-700 dark:text-neutral-200'>{data?.description}</Text>
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
                              href={`/categories/${item?.slug}`}
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
                        href={`/provinces/${data?.vacation_province?.slug}`}
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
                        href={`/islands/${data?.vacation_island?.slug}`}
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
                'ql-editor !prose !max-w-none !p-0 dark:!prose-invert prose-p:text-justify prose-video:!w-96',
                'prose-img:mx-auto prose-img:h-64 prose-img:rounded prose-img:object-center',
                'prose-img:w-full prose-img:!max-w-2xl prose-img:sm:h-72 prose-img:md:h-96',
                '!prose-blue prose-a:!font-normal prose-blockquote:!my-3',
              )}
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />
          </article>
          {/* MAIN CONTENT */}
          {/* RIGHT CONTENT */}
          <div className='pt-2 lg:col-span-2'>
            <p className='text-xl font-semibold dark:text-white'>Popular Destinations</p>
            <div className='mt-6 space-y-4'>
              {fiveDestinationWithImage
                ? fiveDestinationWithImage?.map((item: any, index: number) => (
                    <div key={index} className='relative'>
                      <DestinationListItem
                        href={`/destinations/${item.slug}`}
                        image_url={item.image_url}
                        name={item.name}
                        location={item.location}
                      />
                    </div>
                  ))
                : [...Array(5).keys()].map((i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <Shimmer>
                        <div className='h-20 w-20 rounded bg-neutral-300/70 dark:bg-neutral-700/50' />
                      </Shimmer>
                      <div className='space-y-2'>
                        <Shimmer className='h-5 w-32 p-3' />
                        <Shimmer className='h-3 w-40 p-3' />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </FrontLayout>
  );
}
