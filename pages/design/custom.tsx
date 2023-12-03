import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { cn, youTubeGetCoverImage, youTubeGetID } from '@/libs/utils';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';

import Layout from '@/components/layout/Layout';
import Pagination from '@/components/systems/Pagination';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

const videoData = [
  {
    id: 0,
    video_url: 'https://www.youtube.com/watch?v=XmtXC_n6X6Q',
    title: 'Our Planet | From Deserts to Grasslands | FULL EPISODE | Netflix',
  },
  {
    id: 1,
    video_url: 'https://www.youtube.com/watch?v=GfO-3Oir-qM',
    title: 'Our Planet | One Planet | FULL EPISODE | Netflix',
  },
  {
    id: 2,
    video_url: 'https://www.youtube.com/watch?v=JkaxUblCGz0',
    title: 'Our Planet | Forests | FULL EPISODE | Netflix',
  },
  {
    id: 3,
    video_url: 'https://www.youtube.com/watch?v=um2Q9aUecy0',
    title: 'Our Planet | Jungles | FULL EPISODE | Netflix',
  },
];

const imagesData = [
  {
    id: 0,
    format: 'avif',
    href: 'https://unsplash.com/photos/X5REiD-cIlw',
    public_id: 'https://images.unsplash.com/photo-1656268164012-119304af0c69?auto=format&fit=crop&w=500',
  },
  {
    id: 1,
    format: 'avif',
    href: 'https://unsplash.com/photos/z6BYp6it5Rg',
    public_id: 'https://images.unsplash.com/photo-1655853459092-a7bae19f9806?auto=format&fit=crop&w=500',
  },
  {
    id: 2,
    format: 'avif',
    href: 'https://unsplash.com/photos/t9MP5ZyTxlI',
    public_id: 'https://images.unsplash.com/photo-1506368670575-2ecb8dd6d86e?auto=format&fit=crop&w=500',
  },
];

export default function Custom() {
  const [currentPage, setCurrentPage] = useState(0);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [openDialogUi, setOpenDialogUi] = useState(false);
  const [imageOpened, setImageOpened] = useState({ id: null, format: '', href: '', public_id: '' });
  function openImage(id: any) {
    const filteredImage = imagesData.filter((image) => image.id == id)[0];
    setImageOpened(filteredImage);
    setOpenDialogUi(true);
  }

  const prevRefVideo = useRef(null);
  const nextRefVideo = useRef(null);
  const [videoPreview, setVideoPreview] = useState({ open: false, title: '', video_url: '' });
  const youtube_url = youTubeGetID(videoPreview?.video_url);

  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  return (
    <Layout title='Components - MyVacation' description='Example Components - MyVacation'>
      <Title>Components</Title>

      <Wrapper id='tableofcontent' name='Table of Content' noChildren noClassName noProps>
        <div className='columns-2 text-sky-600 dark:text-sky-500 sm:columns-3'>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#pagination'>
              Pagination
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#dialog-swiper'>
              DialogSwiper
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#swiper-dialog'>
              SwiperDialog
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='pagination'
        name='Pagination'
        props={[
          'currentPage',
          'setCurrentPage',
          'totalPages',
          'edgePageCount',
          'middlePagesSiblingCount',
          'showPrevNext',
          'showFirstLast',
          'testId',
        ]}
        noChildren
      >
        <Pagination
          testId='pagination'
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={10}
          showFirstLast
          showPrevNext
        />
        <div className='flex justify-center'>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={7}
            showPrevNext
            className='mt-4'
          />
        </div>
        <div className='text-center'>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={5}
            showPrevNext
            className='mt-4'
          />
        </div>
        <Text className='mt-4'>Pagination : {currentPage + 1}</Text>
      </Wrapper>

      <Wrapper id='dialog-swiper' name='DialogSwiper' noClassName noProps noChildren>
        <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {imagesData.map((image, index) => (
            <button onClick={() => openImage(image.id)} key={index} className='relative h-64'>
              <Image alt='Image' src={image.public_id} fill className='object-cover' />
            </button>
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
              initialSlide={imageOpened.id}
              loop={true}
              className='py-4 w-full'
            >
              {imagesData.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3'>
                    <div className='relative h-full min-h-[300px] sm:min-h-[450px] w-full'>
                      <Image
                        alt='Image'
                        src={image.public_id}
                        fill
                        className='object-cover rounded-t-lg sm:rounded-t-none sm:rounded-l-lg sm:rounded-tl-lg'
                      />
                    </div>
                    <div className='p-4 sm:pt-4 sm:pr-8'>
                      <ScrollArea className='h-40 sm:h-[450px]'>
                        <h3 className='font-semibold text-xl mb-4'>Esse eu tempor nisi aliquip excepteur.</h3>
                        <p>
                          Esse eu tempor nisi aliquip excepteur. Enim irure cillum nostrud aliqua voluptate consequat
                          labore ea ex laboris occaecat deserunt. Amet culpa nisi adipisicing id ad quis consequat. Sint
                          consectetur ex occaecat non id mollit duis adipisicing. In veniam commodo minim exercitation
                          incididunt exercitation aliquip aliqua do pariatur mollit excepteur labore ea. Esse eu tempor
                          nisi aliquip excepteur.
                        </p>
                      </ScrollArea>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              ref={prevRef}
              className={cn(
                'absolute z-[70] left-4 lg:-left-16 top-[30%] sm:top-[45%] rounded-full p-2 shadow-lg transition-all cursor-pointer',
                'border dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowLeftIcon className='h-6 w-6 dark:text-white' />
            </button>
            <button
              ref={nextRef}
              className={cn(
                'absolute z-[70] right-4 lg:-right-16 top-[30%] sm:top-[45%] rounded-full p-2 shadow-lg transition-all cursor-pointer',
                'border dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowRightIcon className='h-6 w-6 dark:text-white' />
            </button>
          </DialogContent>
        </Dialog>
      </Wrapper>

      <Wrapper id='swiper-dialog' name='SwiperDialog' noClassName noProps noChildren>
        <div className='relative w-full lg:max-w-2xl xl:max-w-4xl mx-auto'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRefVideo.current,
              nextEl: nextRefVideo.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRefVideo.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRefVideo.current;
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
            {videoData?.map((video, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={cn(
                      'relative h-64 lg:h-72 xl:h-80 rounded-md group overflow-hidden',
                      isActive && 'h-[280px] lg:h-[320px] xl:h-[370px]',
                      !isActive && 'mt-4 lg:mt-6',
                    )}
                  >
                    <Image
                      className='w-full object-cover rounded-md transition-all duration-300 scale-125'
                      src={youTubeGetCoverImage(youTubeGetID(video.video_url))}
                      alt={video.title}
                      fill
                      unoptimized
                    />
                    <button
                      onClick={() => setVideoPreview({ open: true, title: video?.title, video_url: video?.video_url })}
                      className={cn(
                        'group absolute inset-0 rounded-md cursor-pointer focus-visible:outline-none',
                        'bg-gradient-to-b from-transparent via-transparent to-neutral-950',
                        !isActive && 'bg-black/50',
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
            ref={prevRefVideo}
            className={cn(
              'absolute left-4 lg:left-16 z-10 top-[42%] sm:top-[45%] rounded-full p-2 lg:p-3 shadow-lg transition-all cursor-pointer',
              'border dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-5 w-5 lg:h-6 lg:w-6 dark:text-white' />
          </button>
          <button
            ref={nextRefVideo}
            className={cn(
              'absolute right-4 lg:right-16 z-10 top-[42%] sm:top-[45%] rounded-full p-2 lg:p-3 shadow-lg transition-all cursor-pointer',
              'border dark:border-neutral-800 bg-neutral-100 hover:bg-neutral-200 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-5 w-5 lg:h-6 lg:w-6 dark:text-white' />
          </button>
        </div>

        {/* Preview Dialog */}
        <Dialog open={videoPreview.open} onOpenChange={() => setVideoPreview((prev) => ({ ...prev, open: false }))}>
          <DialogContent className='max-w-5xl p-3 md:p-6'>
            {/* <DialogHeader className='text-left'>
            <DialogTitle className='pr-4'>{videoPreview.title}</DialogTitle>
          </DialogHeader> */}
            <iframe
              className='h-64 sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] w-full rounded'
              src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
              title={videoPreview.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </DialogContent>
        </Dialog>
      </Wrapper>
    </Layout>
  );
}
