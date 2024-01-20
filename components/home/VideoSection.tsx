import { useMemo, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import Link from 'next/link';

import { cn, youTubeGetID } from '@/libs/utils';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';

import VideoCardItem from '@/components/card/VideoCardItem';
import Shimmer from '@/components/systems/Shimmer';

export default function VideoSection({ data }: { data: any }) {
  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  // use the `useState` hook instead of `useRef`
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const shuffledVideoData = useMemo(() => data?.sort(() => 0.5 - Math.random()).slice(0, 9), [data]);
  const [videoPreview, setVideoPreview] = useState({ open: false, title: '', video_url: '' });
  const youtube_url = youTubeGetID(videoPreview?.video_url);

  return (
    <>
      <section className='my-16'>
        <Link
          href='/videos'
          className='rounded text-3xl font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          Video
        </Link>
        {shuffledVideoData ? (
          <div className='relative mt-6'>
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
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                },
                650: {
                  slidesPerView: 2,
                },
                900: {
                  slidesPerView: 3,
                },
              }}
            >
              {shuffledVideoData?.map((item, index) => (
                <SwiperSlide key={index} className='p-0.5'>
                  <div key={index} className='relative'>
                    <VideoCardItem
                      className='scale-150'
                      title={item?.title}
                      url={item?.video_url}
                      onPlay={() => setVideoPreview({ open: true, title: item?.title, video_url: item?.video_url })}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              aria-label='Prev'
              // ref={prevRef}
              ref={(node) => setPrevEl(node)}
              className={cn(
                'absolute left-4 top-1/2 z-[1] -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all',
                'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowLeftIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
            </button>
            <button
              aria-label='Next'
              // ref={nextRef}
              ref={(node) => setNextEl(node)}
              className={cn(
                'absolute right-4 top-1/2 z-[1] -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all',
                'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowRightIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
            </button>
          </div>
        ) : (
          <div className='mt-8 grid grid-cols-1 gap-6 min-[550px]:grid-cols-2 xl:grid-cols-3'>
            {[...Array(3).keys()].map((i) => (
              <Shimmer key={i}>
                <div className='space-y-3'>
                  <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-4 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </div>
              </Shimmer>
            ))}
          </div>
        )}
      </section>
      {/* Preview Dialog */}
      <Dialog open={videoPreview.open} onOpenChange={() => setVideoPreview((prev) => ({ ...prev, open: false }))}>
        <DialogContent className='max-w-5xl p-3 md:p-6'>
          <DialogHeader className='text-left'>
            <DialogTitle className='pr-8 leading-6'>{videoPreview.title}</DialogTitle>
          </DialogHeader>
          {/* <YouTubeEmbed videoid={youtube_url} /> */}
          <iframe
            className='h-64 w-full rounded sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]'
            src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
            title={videoPreview.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
}
