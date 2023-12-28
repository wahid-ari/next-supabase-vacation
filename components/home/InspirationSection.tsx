import { useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, InstagramIcon } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { cn } from '@/libs/utils';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { ScrollArea } from '@/components/ui/ScrollArea';

import Shimmer from '@/components/systems/Shimmer';

const ReactLeaflet = dynamic(() => import('@/components/custom/Map'), {
  ssr: false,
  loading: () => (
    <Shimmer>
      <div className='h-56 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    </Shimmer>
  ),
});

export default function InspirationSection({ data }: { data: any }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const shuffledInspirationData = useMemo(() => data?.sort(() => 0.5 - Math.random()).slice(0, 12), [data]);
  const [openDialogUi, setOpenDialogUi] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);
  function openImage(index: number) {
    setActiveSlide(index);
    setOpenDialogUi(true);
  }

  return (
    <>
      <section className='my-16'>
        <Heading as='h2' className='mb-6 text-3xl font-semibold'>
          Inspiration
        </Heading>
        <div className='mt-2 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {shuffledInspirationData
            ? shuffledInspirationData?.map((inspiration: any, index: number) => (
                <button
                  onClick={() => openImage(index)}
                  key={index}
                  className='relative h-40 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:h-52 xl:h-44'
                >
                  <Image
                    alt={inspiration?.title}
                    src={inspiration?.image_url}
                    fill
                    className='rounded-md object-cover'
                    unoptimized
                  />
                  <div className='absolute inset-0 rounded-md bg-gradient-to-t from-transparent via-transparent to-neutral-950/50'>
                    <div className='flex w-full justify-end p-2'>
                      <InstagramIcon className='h-5 w-5 text-neutral-200' />
                    </div>
                  </div>
                </button>
              ))
            : [...Array(12).keys()].map((i) => (
                <Shimmer key={i}>
                  <div className='space-y-3'>
                    <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  </div>
                </Shimmer>
              ))}
        </div>
      </section>
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
    </>
  );
}
