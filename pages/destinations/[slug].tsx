import { useMemo, useRef, useState } from 'react';
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
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { twMerge } from 'tailwind-merge';

import 'swiper/css';

import { ArrowLeftIcon, ArrowRightIcon, InstagramIcon } from 'lucide-react';

import { useDestinationData, useDestinationsData, useInspirationsData } from '@/libs/swr';
import { cn, youTubeGetID } from '@/libs/utils';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Text } from '@/components/ui/Text';

import DestinationListItem from '@/components/card/DestinationListItem';
import InspirationCardItem from '@/components/card/InspirationCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

const ReactLeaflet = dynamic(() => import('@/components/custom/Map'), {
  ssr: false,
  loading: () => (
    <Shimmer>
      <div className='h-56 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    </Shimmer>
  ),
});

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
  // Popular Destinations
  const DESTINATION_TO_SHOW = 5;
  const { data: destination, error: errorDestination } = useDestinationsData();
  // using useMemo to prevent reshuffled data if page refreshed, if slug change, refresh the random data
  const destinationWithImage = useMemo(
    () => destination?.filter((item: any) => item.image_url != null && item.image_url != '' && item.slug !== slug),
    [destination, slug],
  );
  const shuffled = useMemo(() => destinationWithImage?.sort(() => 0.5 - Math.random()), [destinationWithImage]);
  const fiveDestinationWithImage = shuffled?.slice(0, DESTINATION_TO_SHOW);

  // Travel Inspirations
  const INSPIRATION_TO_SHOW = 9;
  const { data: inspiration, error: errorInspiration } = useInspirationsData();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // using useMemo to prevent reshuffled data if page refreshed, if slug change, refresh the random data
  const shuffledInspirationData = useMemo(
    () => inspiration?.sort(() => 0.5 - Math.random()).slice(0, INSPIRATION_TO_SHOW),
    [inspiration, slug],
  );
  const [openDialogUi, setOpenDialogUi] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);
  function openImage(index: number) {
    setActiveSlide(index);
    setOpenDialogUi(true);
  }

  if (error || errorDestination || errorInspiration) {
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
            {/* Maps */}

            <p className='mb-6 text-xl font-semibold dark:text-white'>Maps</p>
            {data?.latlng ? (
              <ReactLeaflet name={data?.name} marker={data?.latlng} className='h-64' zoom={6} autoOpenPopup />
            ) : (
              <Shimmer>
                <div className='h-64 rounded bg-neutral-300/70 dark:bg-neutral-700/50' />
              </Shimmer>
            )}
            {/* Popular Destinations */}
            <p className='mt-10 text-xl font-semibold dark:text-white'>Popular Destinations</p>
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
                : [...Array(DESTINATION_TO_SHOW).keys()].map((i) => (
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
            {/* Travel Inspirations */}
            <p className='mt-10 text-xl font-semibold dark:text-white'>Travel Inspirations</p>
            <div className='mt-6 grid grid-cols-3 gap-4'>
              {shuffledInspirationData
                ? shuffledInspirationData?.map((inspiration: any, index: number) => (
                    <InspirationCardItem
                      key={index}
                      className='h-24 sm:h-40 lg:h-24'
                      onClick={() => openImage(index)}
                      alt={inspiration?.title}
                      image_url={inspiration?.image_url}
                    />
                  ))
                : [...Array(INSPIRATION_TO_SHOW).keys()].map((i) => (
                    <Shimmer key={i}>
                      <div className='space-y-3'>
                        <div className='h-16 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50 sm:h-36 lg:h-16'></div>
                      </div>
                    </Shimmer>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Travel Inspiration Dialog */}
      <Dialog open={openDialogUi} onOpenChange={setOpenDialogUi}>
        <DialogContent className='max-w-3xl p-0' closeClassName='z-[60] focus:ring-offset-0'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            initialSlide={activeSlide}
            loop={true}
            className='w-full py-4'
          >
            {shuffledInspirationData?.map((inspiration: any, index: number) => (
              <SwiperSlide key={index}>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className='relative h-full min-h-[300px] w-full sm:min-h-[450px]'>
                    <Image
                      alt={inspiration?.title}
                      src={inspiration?.image_url}
                      fill
                      className='rounded-t-lg object-cover sm:rounded-l-lg sm:rounded-t-none sm:rounded-tl-lg'
                      unoptimized
                    />
                  </div>
                  <div className='p-4 pb-6 pr-1'>
                    <ScrollArea className='flex h-40 flex-col justify-between pr-4 sm:h-[450px] sm:pr-7'>
                      <div className='flex min-h-full flex-col justify-between gap-4'>
                        <div>
                          <h3 className='mb-2 p-1 text-xl font-semibold'>{inspiration?.title}</h3>
                          <div
                            className='ql-editor !prose !prose-blue !max-w-none !p-1 dark:!prose-invert prose-a:!font-normal'
                            // TODO Docs https://stackoverflow.com/questions/35810238/how-to-remove-nbsp-by-javascript
                            dangerouslySetInnerHTML={{ __html: inspiration?.content?.replace(/&nbsp;/g, ' ') }}
                          />
                        </div>
                        <a
                          href={inspiration.url}
                          target='_blank'
                          rel='noreferrer'
                          className={cn(
                            'mx-1 flex items-center justify-center gap-2 rounded border px-3 pb-1.5 pt-1 font-medium',
                            'transition-all duration-200 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                          )}
                        >
                          <InstagramIcon className='h-4 w-4' />
                          Instagram
                        </a>
                        {inspiration.latlng && (
                          <ReactLeaflet
                            name={inspiration?.title}
                            marker={inspiration?.latlng}
                            className='h-64'
                            zoom={6}
                          />
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            ref={prevRef}
            className={cn(
              'absolute left-4 top-[30%] z-[70] cursor-pointer rounded-full p-2 shadow-lg transition-all sm:top-[45%] lg:-left-16',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-6 w-6 dark:text-white' />
          </button>
          <button
            ref={nextRef}
            className={cn(
              'absolute right-4 top-[30%] z-[70] cursor-pointer rounded-full p-2 shadow-lg transition-all sm:top-[45%] lg:-right-16',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-6 w-6 dark:text-white' />
          </button>
        </DialogContent>
      </Dialog>
    </FrontLayout>
  );
}
