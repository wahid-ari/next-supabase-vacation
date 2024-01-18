import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { useCategoriesData, useDestinationsData, useInspirationsData, useVideosData } from '@/libs/swr';
import { cn } from '@/libs/utils';

import { Heading } from '@/components/ui/Heading';

import CategoryCardItem from '@/components/card/CategoryCardItem';
import DestinationCardItem from '@/components/card/DestinationCardItem';
import ImageBanner from '@/components/card/ImageBanner';
import FrontLayout from '@/components/front/FrontLayout';
import InspirationSection from '@/components/home/InspirationSection';
import VideoSection from '@/components/home/VideoSection';
import Shimmer from '@/components/systems/Shimmer';

export default function Home() {
  const { data, error } = useDestinationsData();
  const { data: categories, error: errorCategories } = useCategoriesData();
  const { data: videos, error: errorVideos } = useVideosData();
  const { data: inspirations, error: errorInspirations } = useInspirationsData();
  // using useMemo to prevent reshuffled data
  const copyData = useMemo(() => data?.filter((item: any) => item.image_url != null && item.image_url != ''), [data]);
  const shuffledData = useMemo(() => copyData?.sort(() => 0.5 - Math.random()).slice(0, 5), [copyData]);
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  // use the `useState` hook instead of `useRef`
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const shuffledDestinationData = useMemo(() => data?.sort(() => 0.5 - Math.random()).slice(0, 12), [data]);
  const shuffledCategoryData = useMemo(() => categories?.sort(() => 0.5 - Math.random()).slice(0, 8), [categories]);

  if (error || errorCategories || errorVideos || errorInspirations) {
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
              prevEl,
              nextEl,
              // prevEl: prevRef.current,
              // nextEl: nextRef.current,
            }}
            // onBeforeInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRef.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRef.current;
            // }}
            // onInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRef.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRef.current;
            //   swiper.navigation.init();
            //   swiper.navigation.update();
            // }}
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
                    <div className='relative h-[50vh] w-full overflow-hidden sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[105vh] 2xl:h-[90vh]'>
                      <Image
                        className='w-full transform object-cover object-center transition-all duration-500 group-hover:scale-105'
                        src={destination.image_url}
                        alt={`Visit ${destination.name}`}
                        fill
                        unoptimized
                      />
                    </div>
                    <div className='absolute inset-0 bg-neutral-950/50'>
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
            aria-label='Prev'
            // ref={prevRef}
            ref={(node) => setPrevEl(node)}
            className={cn(
              'absolute left-2 top-1/2 z-[1] cursor-pointer rounded-full p-2 shadow-lg transition-all md:left-8',
              'border-neutral-800 bg-black/40 hover:bg-black/60',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-w-6 h-5 w-5 text-white sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
          </button>
          <button
            aria-label='Next'
            // ref={nextRef}
            ref={(node) => setNextEl(node)}
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
        <Shimmer className='h-[50vh] w-full sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[105vh] 2xl:h-[90vh]' />
      )}

      <div className='mx-auto max-w-7xl px-4'>
        <section className='my-16'>
          <Heading as='h2' className='mb-6 text-3xl font-semibold'>
            Destination
          </Heading>
          <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
            {shuffledDestinationData
              ? shuffledDestinationData?.map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <DestinationCardItem
                      href={`/destinations/${item.slug}`}
                      image_url={item.image_url}
                      name={item.name}
                    />
                  </div>
                ))
              : [...Array(12).keys()].map((i) => (
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
          <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 md:grid-cols-4'>
            {shuffledCategoryData
              ? shuffledCategoryData?.map((item: any, index: number) => (
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

        <VideoSection data={videos} />

        <ImageBanner
          text='Curated journey from the best in the industry'
          href='/inspirations'
          image_url='https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=1000'
          align='center'
        />

        <InspirationSection data={inspirations} />
      </div>
    </FrontLayout>
  );
}
