import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, InstagramIcon } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useInspirationsData } from '@/libs/swr';
import { cn } from '@/libs/utils';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';

import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export default function Inspirations() {
  const { data, error } = useInspirationsData();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [openDialogUi, setOpenDialogUi] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);
  function openImage(index: number) {
    setActiveSlide(index);
    setOpenDialogUi(true);
  }

  if (error) {
    return (
      <FrontLayout
        title='Inspiration - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title='Inspiration - MyVacation'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    >
      <div className='pt-4'>
        <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data
            ? data?.map((image: any, index: number) => (
                <button
                  onClick={() => openImage(index)}
                  key={index}
                  className='relative h-56 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <Image alt={image?.title} src={image?.image_url} fill className='rounded object-cover' unoptimized />
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
              {data?.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <div className='relative h-full min-h-[300px] w-full sm:min-h-[450px]'>
                      <Image
                        alt={image?.title}
                        src={image?.image_url}
                        fill
                        className='rounded-t-lg object-cover sm:rounded-l-lg sm:rounded-t-none sm:rounded-tl-lg'
                        unoptimized
                      />
                    </div>
                    <div className='p-4 pb-6 pr-1'>
                      <ScrollArea className='flex h-40 flex-col justify-between pr-4 sm:h-[450px] sm:pr-7'>
                        <div className='flex min-h-full flex-col justify-between gap-4'>
                          <div>
                            <h3 className='mb-2 p-1 text-xl font-semibold'>{image?.title}</h3>
                            <div
                              className='ql-editor !prose !prose-blue !max-w-none !p-1 dark:!prose-invert prose-a:!font-normal'
                              // TODO Docs https://stackoverflow.com/questions/35810238/how-to-remove-nbsp-by-javascript
                              dangerouslySetInnerHTML={{ __html: image?.content.replace(/&nbsp;/g, ' ') }}
                            />
                          </div>
                          <a
                            href={image.url}
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
      </div>
    </FrontLayout>
  );
}
