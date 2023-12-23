import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, InstagramIcon } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useCategoriesData, useDestinationsData, useInspirationsData } from '@/libs/swr';
import { cn } from '@/libs/utils';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { ScrollArea } from '@/components/ui/ScrollArea';

import CategoryCardItem from '@/components/card/CategoryCardItem';
import DestinationCardItem from '@/components/card/DestinationCardItem';
import ImageBanner from '@/components/card/ImageBanner';
import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export default function Home() {
  const { data, error } = useDestinationsData();
  const { data: categories, error: errorCategories } = useCategoriesData();
  const { data: inspirations, error: errorInspirations } = useInspirationsData();
  // using useMemo to prevent reshuffled data if doing searching
  const copyData = useMemo(() => data?.filter((item: any) => item.image_url != null && item.image_url != ''), [data]);
  const shuffledData = useMemo(() => copyData?.sort(() => 0.5 - Math.random()).slice(0, 5), [copyData]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const prevRefInspiration = useRef(null);
  const nextRefInspiration = useRef(null);
  const [openDialogUi, setOpenDialogUi] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);
  function openImage(index: number) {
    setActiveSlide(index);
    setOpenDialogUi(true);
  }

  if (error || errorCategories || errorInspirations) {
    return (
      <FrontLayout
        title='Home - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      transparentNavbar
      title='Home - MyVacation'
      className='-mt-20 max-w-full p-0 2xl:max-w-7xl'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    >
      {data ? (
        <div className='relative'>
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
            slidesPerView={1}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
            }}
          >
            {shuffledData?.map((destination, index) => (
              <SwiperSlide key={index}>
                <div className='relative'>
                  <Link href={`/destinations/${destination.slug}`} className='group overflow-hidden'>
                    <div className='relative h-[50vh] w-full overflow-hidden sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[90vh]'>
                      <Image
                        className='w-full transform object-cover object-center transition-all duration-500 group-hover:scale-105'
                        src={destination.image_url}
                        alt={destination.name}
                        fill
                        unoptimized
                      />
                    </div>
                    <div className='absolute inset-0 rounded-md bg-neutral-950/50'>
                      <div className='mt-6 flex h-full items-center justify-center'>
                        <div className='max-w-[80%]'>
                          <p
                            className={cn(
                              'line-clamp-2 p-1 text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
                              'rounded font-medium text-white group-focus-visible:ring-2 group-focus-visible:ring-sky-500 md:font-semibold',
                            )}
                          >
                            {destination.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            ref={prevRef}
            className={cn(
              'absolute left-2 top-1/2 z-[1] cursor-pointer rounded-full p-2 shadow-lg transition-all md:left-8',
              'border-neutral-800 bg-black/40 hover:bg-black/60',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-w-6 h-5 w-5 text-white sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
          </button>
          <button
            ref={nextRef}
            className={cn(
              'absolute right-2 top-1/2 z-[1] cursor-pointer rounded-full p-2 shadow-lg transition-all md:right-8',
              'border-neutral-800 bg-black/40 hover:bg-black/60',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-w-6 h-5 w-5 text-white sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
          </button>
        </div>
      ) : (
        <Shimmer className='h-[50vh] w-full sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[90vh]' />
      )}

      <div className='mx-auto max-w-7xl p-4'>
        <section className='my-16'>
          <Heading as='h2' className='mb-6 text-3xl font-semibold'>
            Destination
          </Heading>
          <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {data
              ? data?.slice(0, 10).map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <DestinationCardItem
                      href={`/destinations/${item.slug}`}
                      image_url={item.image_url}
                      name={item.name}
                    />
                  </div>
                ))
              : [...Array(10).keys()].map((i) => (
                  <Shimmer key={i}>
                    <div className='space-y-3'>
                      <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                      <div className='h-4 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                    </div>
                  </Shimmer>
                ))}
          </div>
        </section>

        <ImageBanner
          text='Explore the unique culture and heritage in Indonesia!'
          href='/destinations'
          image_url='https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=1000'
        />

        <section className='my-16'>
          <Heading as='h2' className='mb-6 text-3xl font-semibold'>
            Category
          </Heading>
          <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
            {categories
              ? categories?.slice(0, 8).map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <CategoryCardItem href={`/categories/${item.slug}`} image_url={item.image_url} name={item.name} />
                  </div>
                ))
              : [...Array(8).keys()].map((i) => (
                  <Shimmer key={i}>
                    <div className='space-y-3'>
                      <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                      <div className='h-4 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                    </div>
                  </Shimmer>
                ))}
          </div>
        </section>

        <ImageBanner
          text='Spark ideas for wonderful journey in Indonesia'
          href='/categories'
          image_url='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1000'
          align='right'
        />

        <section className='my-16'>
          <Heading as='h2' className='mb-6 text-3xl font-semibold'>
            Inspiration
          </Heading>
          <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {inspirations
              ? inspirations?.slice(0, 10).map((image: any, index: number) => (
                  <button
                    onClick={() => openImage(index)}
                    key={index}
                    className='relative h-56 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    <Image
                      alt={image?.title}
                      src={image?.image_url}
                      fill
                      className='rounded object-cover'
                      unoptimized
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-neutral-950/50'>
                      <div className='flex w-full justify-end p-2'>
                        <InstagramIcon className='h-5 w-5 text-neutral-200' />
                      </div>
                    </div>
                  </button>
                ))
              : [...Array(10).keys()].map((i) => (
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
                  prevEl: prevRefInspiration.current,
                  nextEl: nextRefInspiration.current,
                }}
                onBeforeInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRefInspiration.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRefInspiration.current;
                }}
                initialSlide={activeSlide}
                loop={true}
                className='w-full py-4'
              >
                {inspirations?.slice(0, 10).map((image: any, index: number) => (
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
                                dangerouslySetInnerHTML={{ __html: image?.content?.replace(/&nbsp;/g, ' ') }}
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
                ref={prevRefInspiration}
                className={cn(
                  'absolute left-4 top-[30%] z-[70] cursor-pointer rounded-full p-2 shadow-lg transition-all sm:top-[45%] lg:-left-16',
                  'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                )}
              >
                <ArrowLeftIcon className='h-6 w-6 dark:text-white' />
              </button>
              <button
                ref={nextRefInspiration}
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
        </section>

        <ImageBanner
          text='Curated journey from the best in the industry'
          href='/inspirations'
          image_url='https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=1000'
          align='center'
          className='mb-8'
        />
      </div>
    </FrontLayout>
  );
}
