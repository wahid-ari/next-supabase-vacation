import { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon } from 'lucide-react';

import { useVideosData } from '@/libs/swr';
import { cn, youTubeGetCoverImage, youTubeGetID } from '@/libs/utils';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';

import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export default function Videos() {
  const { data, error } = useVideosData();
  const shuffledData = data?.sort(() => 0.5 - Math.random());
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState({ open: false, title: '', video_url: '' });
  const youtube_url = youTubeGetID(videoPreview?.video_url);

  if (error) {
    return (
      <FrontLayout
        title='Video - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title='Video - MyVacation'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    >
      <div className='py-4'>
        {shuffledData ? (
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
              spaceBetween={24}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              className='py-4 w-full'
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1.3,
                },
              }}
            >
              {data?.map((video: any, index: number) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div
                      className={cn(
                        'relative h-64 sm:h-72 lg:h-80 xl:h-96 rounded-md group overflow-hidden',
                        isActive && 'sm:h-[350px] lg:h-[400px] xl:h-[450px]',
                        !isActive && 'sm:mt-8',
                      )}
                    >
                      <Image
                        className={cn(
                          'w-full object-cover rounded-md transition-all duration-500',
                          isActive && 'group-hover:scale-110',
                        )}
                        src={youTubeGetCoverImage(youTubeGetID(video.video_url))}
                        alt={video.title}
                        fill
                        unoptimized
                      />
                      <button
                        onClick={() =>
                          setVideoPreview({ open: true, title: video?.title, video_url: video?.video_url })
                        }
                        disabled={!isActive}
                        className={cn(
                          'group absolute inset-0 rounded-md cursor-pointer focus-visible:outline-none',
                          'bg-gradient-to-b from-transparent via-transparent to-neutral-950',
                          !isActive && 'bg-black/50 cursor-default',
                        )}
                      >
                        <div className='flex justify-center items-center h-full'>
                          <div
                            className={cn(
                              'bg-neutral-800/80 rounded-md p-2 sm:p-3 text-white group-hover:bg-red-600 transition-all duration-300',
                              'group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-sky-500',
                            )}
                          >
                            <PlayIcon className='h-5 w-5 sm:h-6 sm:w-6' />
                          </div>
                        </div>
                        <div className='absolute bottom-0 inset-x-0'>
                          <p className='font-medium text-lg text-center line-clamp-2 text-white px-4 mb-4'>
                            {video.title}
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              ref={prevRef}
              className={cn(
                'absolute left-4 lg:left-16 z-10 top-[42%] sm:top-[45%] rounded-full p-2 lg:p-3 shadow-lg transition-all cursor-pointer',
                'border dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowLeftIcon className='h-5 w-5 lg:h-6 lg:w-6 dark:text-white' />
            </button>
            <button
              ref={nextRef}
              className={cn(
                'absolute right-4 lg:right-16 z-10 top-[42%] sm:top-[45%] rounded-full p-2 lg:p-3 shadow-lg transition-all cursor-pointer',
                'border dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowRightIcon className='h-5 w-5 lg:h-6 lg:w-6 dark:text-white' />
            </button>
          </div>
        ) : (
          <div className='flex gap-6'>
            <Shimmer className='rounded-md h-64 sm:h-72 lg:h-80 xl:h-96 hidden sm:block sm:w-[12%] my-auto' />
            <Shimmer className='rounded-md h-64 sm:h-[350px] lg:h-[400px] xl:h-[450px] w-full' />
            <Shimmer className='rounded-md h-64 sm:h-72 lg:h-80 xl:h-96 hidden sm:block sm:w-[12%] my-auto' />
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={videoPreview.open} onOpenChange={() => setVideoPreview((prev) => ({ ...prev, open: false }))}>
        <DialogContent className='max-w-5xl p-3 md:p-6'>
          <DialogHeader className='text-left'>
            <DialogTitle className='pr-4'>{videoPreview.title}</DialogTitle>
          </DialogHeader>
          <iframe
            className='h-64 sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] w-full rounded'
            src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
            title={videoPreview.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </FrontLayout>
  );
}
