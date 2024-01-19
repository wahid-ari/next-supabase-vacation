import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon } from 'lucide-react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { cn, youTubeGetCoverImage, youTubeGetID } from '@/libs/utils';

import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { ScrollArea } from '@/components/ui/ScrollArea';

import CategoryCardItem from '@/components/card/CategoryCardItem';
import DestinationCardItem from '@/components/card/DestinationCardItem';
import DestinationListItem from '@/components/card/DestinationListItem';
import ImageBanner from '@/components/card/ImageBanner';
import InspirationCardItem from '@/components/card/InspirationCardItem';
import VideoCardItem from '@/components/card/VideoCardItem';
import Layout from '@/components/layout/Layout';
import Pagination from '@/components/systems/Pagination';
import Shimmer from '@/components/systems/Shimmer';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';
import Wrapper from '@/components/systems/Wrapper';

const ReactLeaflet = dynamic(() => import('@/components/custom/Map'), {
  ssr: false,
  loading: () => (
    <Shimmer>
      <div className='h-64 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
    </Shimmer>
  ),
});

const destinationData = [
  {
    id: 0,
    name: 'Destination',
    image_url: 'https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=500',
  },
  {
    id: 1,
    name: 'Destination',
    image_url: 'https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=500',
  },
  {
    id: 2,
    name: 'Destination',
    image_url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=500',
  },
  {
    id: 3,
    name: 'Destination',
    image_url: 'https://images.unsplash.com/photo-1656268164012-119304af0c69?q=80&w=500',
  },
  {
    id: 4,
    name: 'Destination',
    image_url: 'https://images.unsplash.com/photo-1655853459092-a7bae19f9806?q=80&w=500',
  },
];

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
    href: 'https://unsplash.com/photos/X5REiD-cIlw?q=80&w=500',
    public_id: 'https://images.unsplash.com/photo-1656268164012-119304af0c69?auto=format&fit=crop&w=500',
  },
  {
    id: 1,
    format: 'avif',
    href: 'https://unsplash.com/photos/z6BYp6it5Rg?q=80&w=500',
    public_id: 'https://images.unsplash.com/photo-1655853459092-a7bae19f9806?auto=format&fit=crop&w=500',
  },
  {
    id: 2,
    format: 'avif',
    href: 'https://unsplash.com/photos/t9MP5ZyTxlI?q=80&w=500',
    public_id: 'https://images.unsplash.com/photo-1506368670575-2ecb8dd6d86e?auto=format&fit=crop&w=500',
  },
  {
    id: 3,
    format: 'avif',
    href: 'https://unsplash.com/photos/t9MP5ZyTxlI?q=80&w=500',
    public_id: 'https://images.unsplash.com/photo-1702653082070-f5c83c643627?auto=format&fit=crop&w=500',
  },
  {
    id: 4,
    format: 'avif',
    href: 'https://unsplash.com/photos/t9MP5ZyTxlI?q=80&w=500',
    public_id: 'https://images.unsplash.com/photo-1702893576128-21feb60299d1?auto=format&fit=crop&w=500',
  },
];

export default function Custom() {
  const [currentPage, setCurrentPage] = useState(0);
  // TODO: Docs https://github.com/nolimits4web/swiper/issues/3855#issuecomment-982499163
  // const prevRefHeader = useRef(null);
  // const nextRefHeader = useRef(null);
  const [prevHeader, setPrevHeader] = useState<HTMLElement | null>(null);
  const [nextHeader, setNextHeader] = useState<HTMLElement | null>(null);

  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  const [prev, setPrev] = useState<HTMLElement | null>(null);
  const [next, setNext] = useState<HTMLElement | null>(null);
  const [openDialogUi, setOpenDialogUi] = useState(false);
  const [imageOpened, setImageOpened] = useState({ id: null, format: '', href: '', public_id: '' });
  function openImage(id: any) {
    const filteredImage = imagesData.filter((image) => image.id == id)[0];
    setImageOpened(filteredImage);
    setOpenDialogUi(true);
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const prevRefThumb = useRef(null);
  // const nextRefThumb = useRef(null);
  const [prevThumb, setPrevThumb] = useState<HTMLElement | null>(null);
  const [nextThumb, setNextThumb] = useState<HTMLElement | null>(null);
  const [openDialogUiThumb, setOpenDialogUiThumb] = useState(false);
  const [imageOpenedThumb, setImageOpenedThumb] = useState({ id: null, format: '', href: '', public_id: '' });
  function openImageThumb(id: any) {
    const filteredImage = imagesData.filter((image) => image.id == id)[0];
    setImageOpenedThumb(filteredImage);
    setOpenDialogUiThumb(true);
  }

  // const prevRefVideo = useRef(null);
  // const nextRefVideo = useRef(null);
  const [prevVideo, setPrevVideo] = useState<HTMLElement | null>(null);
  const [nextVideo, setNextVideo] = useState<HTMLElement | null>(null);
  const [videoPreview, setVideoPreview] = useState({ open: false, title: '', video_url: '' });
  const youtube_url = youTubeGetID(videoPreview?.video_url);

  // const prevRefVideoActive = useRef(null);
  // const nextRefVideoActive = useRef(null);
  const [prevVideoActive, setPrevVideoActive] = useState<HTMLElement | null>(null);
  const [nextVideoActive, setNextVideoActive] = useState<HTMLElement | null>(null);

  // const prevRefVideoHover = useRef(null);
  // const nextRefVideoHover = useRef(null);
  const [prevVideoHover, setPrevVideoHover] = useState<HTMLElement | null>(null);
  const [nextVideoHover, setNextVideoHover] = useState<HTMLElement | null>(null);

  // const prevRefSlider = useRef(null);
  // const nextRefSlider = useRef(null);
  const [prevSlider, setPrevSlider] = useState<HTMLElement | null>(null);
  const [nextSlider, setNextSlider] = useState<HTMLElement | null>(null);

  const tocClass = 'px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none rounded';

  return (
    <Layout title='Custom - MyVacation' description='Example Custom - MyVacation'>
      <Title>Custom</Title>

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
            <Link className={tocClass} href='#dialog-swiper-thumb'>
              DialogSwiperThumb
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#swiper-dialog'>
              SwiperDialog
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#swiper-hover-video'>
              SwiperHoverVideo
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#swiper-activ-video'>
              SwiperActiveVideo
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#image-banner'>
              ImageBanner
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#destination-card-item'>
              DestinationCardItem
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#destination-list-item'>
              DestinationListItem
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#video-card-item'>
              VideoCardItem
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#category-card-item'>
              CategoryCardItem
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#slider'>
              Slider
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#slider-header'>
              Slider Header
            </Link>
          </span>
          <span className='mb-3 block underline'>
            <Link className={tocClass} href='#maps'>
              Maps
            </Link>
          </span>
        </div>
      </Wrapper>

      <Wrapper
        id='maps'
        name='Maps'
        props={['name', 'marker', 'setMarker', 'zoom', 'enableEdit', 'enableSearch', 'autoOpenPopup', 'dragging']}
        noChildren
      >
        <ReactLeaflet
          name='Location'
          marker={[-2.3723687086440504, 113.11523437500001]}
          className='h-72'
          autoOpenPopup
        />
      </Wrapper>

      <Wrapper id='slider-header' name='Slider Header' noClassName noProps noChildren>
        <div className='relative mx-auto w-full lg:max-w-2xl xl:max-w-4xl'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevHeader,
              nextEl: nextHeader,
              // prevEl: prevRefHeader.current,
              // nextEl: nextRefHeader.current,
            }}
            // onBeforeInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefHeader.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefHeader.current;
            // }}
            // onInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefHeader.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefHeader.current;
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
            {destinationData?.map((destination, index) => (
              <SwiperSlide key={index}>
                <div className='relative'>
                  <Link href={`/design/custom/#slider-header`} className='group overflow-hidden'>
                    <div className='relative h-[50vh] w-full overflow-hidden rounded-md sm:h-[65vh] md:h-[75vh] lg:h-[85vh] xl:h-[90vh]'>
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
            aria-label='Prev'
            // ref={prevRefHeader}
            ref={(node) => setPrevHeader(node)}
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
            // ref={nextRefHeader}
            ref={(node) => setNextHeader(node)}
            className={cn(
              'absolute right-2 top-1/2 z-[1] cursor-pointer rounded-full p-2 shadow-lg transition-all md:right-8',
              'border-neutral-800 bg-black/40 hover:bg-black/60',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-w-6 h-5 w-5 text-white sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
          </button>
        </div>
      </Wrapper>

      <Wrapper id='slider' name='Slider' noClassName noProps noChildren>
        <div className='relative mx-auto w-full lg:max-w-2xl xl:max-w-4xl'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevSlider,
              nextEl: nextSlider,
              // prevEl: prevRefSlider.current,
              // nextEl: nextRefSlider.current,
            }}
            // onBeforeInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefSlider.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefSlider.current;
            // }}
            // onInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefSlider.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefSlider.current;
            //   swiper.navigation.init();
            //   swiper.navigation.update();
            // }}
            spaceBetween={24}
            slidesPerView={3}
            loop={true}
            breakpoints={{
              400: {
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
            {destinationData?.map((destination, index) => (
              <SwiperSlide key={index} className='p-0.5'>
                <div className='relative'>
                  <DestinationCardItem
                    href={`/design/custom/#slider`}
                    image_url={destination?.image_url}
                    name={destination?.name}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            // ref={prevRefSlider}
            ref={(node) => setPrevSlider(node)}
            className={cn(
              'absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
          </button>
          <button
            // ref={nextRefSlider}
            ref={(node) => setNextSlider(node)}
            className={cn(
              'absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
          </button>
        </div>
      </Wrapper>

      <Wrapper id='video-card-item' name='VideoCardItem' props={['title', 'url', 'onPlay']} noChildren>
        <div className='grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3'>
          {videoData.slice(0, 3).map((video, index) => (
            <div key={index} className='relative'>
              <VideoCardItem
                className='scale-150'
                title={video?.title}
                url={video?.video_url}
                onPlay={() => setVideoPreview({ open: true, title: video?.title, video_url: video?.video_url })}
              />
            </div>
          ))}
        </div>
      </Wrapper>

      <Wrapper
        id='destination-list-item'
        name='DestinationListItem'
        props={['href', 'name', 'image_url', 'location']}
        noChildren
      >
        <div className='space-y-4'>
          <div className='relative'>
            <DestinationListItem
              href={`/design/custom/#destination-list-item`}
              image_url='https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=500'
              name='Destination List Item'
              location='Location'
            />
          </div>
          <div className='relative'>
            <DestinationListItem
              href={`/design/custom/#destination-list-item`}
              image_url='https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=500'
              name='Destination List Item'
              location='Location'
            />
          </div>
          <div className='relative'>
            <DestinationListItem
              href={`/design/custom/#destination-list-item`}
              image_url='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=500'
              name='Destination List Item'
              location='Location'
            />
          </div>
        </div>
      </Wrapper>

      <Wrapper id='category-card-item' name='CategoryCardItem' props={['href', 'name', 'image_url']} noChildren>
        <div className='grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3'>
          <div className='relative'>
            <CategoryCardItem
              href={`/design/custom/#category-card-item`}
              image_url='https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=500'
              name='Category Card Item'
            />
          </div>
          <div className='relative'>
            <CategoryCardItem
              href={`/design/custom/#category-card-item`}
              image_url='https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=500'
              name='Category Card Item'
            />
          </div>
          <div className='relative'>
            <CategoryCardItem
              href={`/design/custom/#category-card-item`}
              image_url='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=500'
              name='Category Card Item'
            />
          </div>
        </div>
      </Wrapper>

      <Wrapper id='destination-card-item' name='DestinationCardItem' props={['href', 'name', 'image_url']} noChildren>
        <div className='grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3'>
          <div className='relative'>
            <DestinationCardItem
              href={`/design/custom/#destination-card-item`}
              image_url='https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=500'
              name='Destination Card Item'
            />
          </div>
          <div className='relative'>
            <DestinationCardItem
              href={`/design/custom/#destination-card-item`}
              image_url='https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=500'
              name='Destination Card Item'
            />
          </div>
          <div className='relative'>
            <DestinationCardItem
              href={`/design/custom/#destination-card-item`}
              image_url='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=500'
              name='Destination Card Item'
            />
          </div>
        </div>
      </Wrapper>

      <Wrapper
        id='image-banner'
        name='ImageBanner'
        props={['href', 'image_url', 'align', 'text', 'textLink']}
        noChildren
      >
        <ImageBanner
          text='Velit non sint cupidatat ad consectetur elit qui ullamco.'
          href='/design/custom/#image-banner'
          image_url='https://images.unsplash.com/photo-1558005137-d9619a5c539f?q=80&w=500'
        />

        <ImageBanner
          text='Cupidatat excepteur proident exercitation sit mollit.'
          href='/design/custom/#image-banner'
          image_url='https://images.unsplash.com/photo-1650509009946-32b00cb21a0a?q=80&w=500'
          align='center'
          className='mt-8'
        />

        <ImageBanner
          text='Mollit sunt commodo nostrud ea nulla magna ut nisi aliqua.'
          href='/design/custom/#image-banner'
          image_url='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=500'
          align='right'
          className='mt-8'
        />
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
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {imagesData.slice(0, 4).map((image, index) => (
            <InspirationCardItem
              key={index}
              onClick={() => openImage(image.id)}
              alt='Image'
              image_url={image.public_id}
            />
          ))}
        </div>

        <Dialog open={openDialogUi} onOpenChange={setOpenDialogUi}>
          <DialogContent className='max-w-3xl p-0' closeClassName='z-[60] focus:ring-offset-0'>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prev,
                nextEl: next,
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
              initialSlide={imageOpened.id}
              loop={true}
              className='w-full py-4'
            >
              {imagesData.slice(0, 4).map((image, index) => (
                <SwiperSlide key={index}>
                  <div className='grid grid-cols-1 gap-x-3 sm:grid-cols-2'>
                    <div className='relative h-full min-h-[300px] w-full sm:min-h-[450px]'>
                      <Image
                        alt='Image'
                        src={image.public_id}
                        fill
                        className='rounded-t-lg object-cover sm:rounded-l-lg sm:rounded-t-none sm:rounded-tl-lg'
                        unoptimized
                      />
                    </div>
                    <div className='p-4 sm:pr-8 sm:pt-4'>
                      <ScrollArea className='h-40 sm:h-[450px]'>
                        <h3 className='mb-4 text-xl font-semibold'>Esse eu tempor nisi aliquip excepteur.</h3>
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
              // ref={prevRef}
              ref={(node) => setPrev(node)}
              className={cn(
                'absolute left-4 top-[30%] z-[70] cursor-pointer rounded-full p-2 shadow-lg transition-all sm:top-[45%] lg:-left-16',
                'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowLeftIcon className='h-6 w-6 dark:text-white' />
            </button>
            <button
              // ref={nextRef}
              ref={(node) => setNext(node)}
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
      </Wrapper>

      <Wrapper id='dialog-swiper-thumb' name='DialogSwiperThumb' noClassName noProps noChildren>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {imagesData.map((image, index) => (
            <InspirationCardItem
              key={index}
              className='h-44'
              onClick={() => openImageThumb(image.id)}
              alt='Image'
              image_url={image.public_id}
            />
          ))}
        </div>

        <Dialog open={openDialogUiThumb} onOpenChange={setOpenDialogUiThumb}>
          <DialogContent className='max-w-3xl p-0' closeClassName='z-[60] focus:ring-offset-0'>
            <Swiper
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[Navigation, Thumbs]}
              navigation={{
                prevEl: prevThumb,
                nextEl: nextThumb,
                // prevEl: prevRefThumb.current,
                // nextEl: nextRefThumb.current,
              }}
              // onBeforeInit={(swiper) => {
              //   // @ts-ignore
              //   swiper.params.navigation.prevEl = prevRefThumb.current;
              //   // @ts-ignore
              //   swiper.params.navigation.nextEl = nextRefThumb.current;
              // }}
              // onInit={(swiper) => {
              //   // @ts-ignore
              //   swiper.params.navigation.prevEl = prevRefThumb.current;
              //   // @ts-ignore
              //   swiper.params.navigation.nextEl = nextRefThumb.current;
              //   swiper.navigation.init();
              //   swiper.navigation.update();
              // }}
              initialSlide={imageOpenedThumb.id}
              loop={true}
              className='w-full py-4'
            >
              {imagesData.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className='grid grid-cols-1 gap-x-3 sm:grid-cols-2'>
                    <div className='relative h-full min-h-[200px] w-full sm:min-h-[350px]'>
                      <Image
                        alt='Image'
                        src={image.public_id}
                        fill
                        className='rounded-t-lg object-cover sm:rounded-t-none sm:rounded-tl-lg'
                        unoptimized
                      />
                    </div>
                    <div className='p-4 sm:pr-8 sm:pt-4'>
                      <ScrollArea className='h-40 sm:h-[350px]'>
                        <h3 className='mb-4 text-xl font-semibold'>Esse eu tempor nisi aliquip excepteur.</h3>
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
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className='swiper-thumbs w-full py-4'
            >
              {imagesData.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className='relative h-20 w-full sm:h-24'>
                    <Image
                      alt='Image'
                      src={image.public_id}
                      fill
                      className='cursor-pointer rounded object-cover object-center'
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              // ref={prevRefThumb}
              ref={(node) => setPrevThumb(node)}
              className={cn(
                'absolute left-4 top-[30%] z-[70] cursor-pointer rounded-full p-2 shadow-lg transition-all sm:top-[45%] lg:-left-16',
                'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowLeftIcon className='h-6 w-6 dark:text-white' />
            </button>
            <button
              // ref={nextRefThumb}
              ref={(node) => setNextThumb(node)}
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
      </Wrapper>

      <Wrapper id='swiper-dialog' name='SwiperDialog' noClassName noProps noChildren>
        <Text>When clicked, show dialog</Text>
        {videoData ? (
          <div className='relative mx-auto mt-4 w-full lg:max-w-2xl xl:max-w-4xl'>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevVideo,
                nextEl: nextVideo,
                // prevEl: prevRefVideo.current,
                // nextEl: nextRefVideo.current,
              }}
              // onBeforeInit={(swiper) => {
              //   // @ts-ignore
              //   swiper.params.navigation.prevEl = prevRefVideo.current;
              //   // @ts-ignore
              //   swiper.params.navigation.nextEl = nextRefVideo.current;
              // }}
              // onInit={(swiper) => {
              //   // @ts-ignore
              //   swiper.params.navigation.prevEl = prevRefVideo.current;
              //   // @ts-ignore
              //   swiper.params.navigation.nextEl = nextRefVideo.current;
              //   swiper.navigation.init();
              //   swiper.navigation.update();
              // }}
              spaceBetween={24}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              className='w-full py-4'
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
                        'group relative h-64 overflow-hidden rounded-md lg:h-72 xl:h-80',
                        isActive && 'h-[280px] lg:h-[320px] xl:h-[370px]',
                        !isActive && 'mt-4 lg:mt-6',
                      )}
                    >
                      <Image
                        className={cn(
                          'w-full rounded-md object-cover transition-all duration-500',
                          isActive && 'group-hover:scale-105',
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
                          'group absolute inset-0 cursor-pointer rounded-md focus-visible:outline-none',
                          'bg-gradient-to-b from-transparent via-transparent to-neutral-950',
                          !isActive && 'cursor-default bg-black/50',
                        )}
                      >
                        <div className='flex h-full items-center justify-center'>
                          <svg
                            className='h-14 w-14 rounded-md group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-red-600 sm:h-[68px] sm:w-[68px]'
                            height='100%'
                            version='1.1'
                            viewBox='0 0 68 48'
                            width='100%'
                          >
                            <path
                              d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'
                              fill='#f00'
                            ></path>
                            <path d='M 45,24 27,14 27,34' fill='#fff'></path>
                          </svg>
                        </div>
                        <div className='absolute inset-x-0 bottom-0'>
                          <p className='mb-4 line-clamp-2 px-4 text-center text-lg font-medium text-white'>
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
              // ref={prevRefVideo}
              ref={(node) => setPrevVideo(node)}
              className={cn(
                'absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all lg:left-16 lg:p-3',
                'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowLeftIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
            </button>
            <button
              // ref={nextRefVideo}
              ref={(node) => setNextVideo(node)}
              className={cn(
                'absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all lg:right-16 lg:p-3',
                'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
              )}
            >
              <ArrowRightIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
            </button>
          </div>
        ) : (
          <div className='mx-auto flex gap-6 lg:max-w-2xl xl:max-w-4xl'>
            <Shimmer className='my-auto hidden h-64 rounded-md sm:block sm:w-[11%] lg:h-72 xl:h-80' />
            <Shimmer className='h-[280px] w-full rounded-md lg:h-[320px] xl:h-[370px]' />
            <Shimmer className='my-auto hidden h-64 rounded-md sm:block sm:w-[11%] lg:h-72 xl:h-80' />
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={videoPreview.open} onOpenChange={() => setVideoPreview((prev) => ({ ...prev, open: false }))}>
          <DialogContent className='max-w-5xl p-3 md:p-6'>
            {/* <DialogHeader className='text-left'>
            <DialogTitle className='pr-4'>{videoPreview.title}</DialogTitle>
          </DialogHeader> */}
            <iframe
              className='h-64 w-full rounded sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]'
              src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
              title={videoPreview.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </DialogContent>
        </Dialog>
      </Wrapper>

      <Wrapper id='swiper-hover-video' name='SwiperHoverVideo' noClassName noProps noChildren>
        <Text>When hover, show iframe</Text>
        <div className='relative mx-auto mt-4 w-full lg:max-w-2xl xl:max-w-4xl'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevVideoHover,
              nextEl: nextVideoHover,
              // prevEl: prevRefVideoHover.current,
              // nextEl: nextRefVideoHover.current,
            }}
            // onBeforeInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefVideoHover.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefVideoHover.current;
            // }}
            // onInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefVideoHover.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefVideoHover.current;
            //   swiper.navigation.init();
            //   swiper.navigation.update();
            // }}
            spaceBetween={24}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            className='w-full py-4'
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
                      'group group relative h-64 overflow-hidden rounded-md lg:h-72 xl:h-80',
                      isActive && 'h-[280px] lg:h-[320px] xl:h-[370px]',
                      !isActive && 'mt-4 lg:mt-6',
                    )}
                  >
                    <Image
                      className='w-full rounded-md object-cover'
                      src={youTubeGetCoverImage(youTubeGetID(video.video_url))}
                      alt={video.title}
                      fill
                      unoptimized
                    />
                    <div
                      className={cn(
                        'absolute inset-0 z-[0] rounded-md bg-gradient-to-b from-black/50 via-transparent to-transparent transition-all duration-500',
                        !isActive && 'cursor-default bg-black/50',
                        isActive && 'cursor-pointer group-hover:z-[-1]',
                      )}
                    >
                      <div className='flex h-full items-center justify-center'>
                        <svg
                          className='h-14 w-14 sm:h-[68px] sm:w-[68px]'
                          height='100%'
                          version='1.1'
                          viewBox='0 0 68 48'
                          width='100%'
                        >
                          <path
                            d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'
                            fill='#f00'
                          ></path>
                          <path d='M 45,24 27,14 27,34' fill='#fff'></path>
                        </svg>
                      </div>
                      <div className='absolute inset-x-0 top-0'>
                        <p className='mt-6 line-clamp-1 px-6 text-[17px] font-medium text-white'>{video.title}</p>
                      </div>
                    </div>
                    <iframe
                      className={cn(
                        'absolute inset-0 z-[-1] h-full w-full rounded transition-all duration-500',
                        isActive && 'group-hover:z-[1]',
                      )}
                      src={`https://www.youtube.com/embed/${youTubeGetID(video.video_url)}?autoplay=0`}
                      title={video.title}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            // ref={prevRefVideoHover}
            ref={(node) => setPrevVideoHover(node)}
            className={cn(
              'absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all lg:left-16 lg:p-3',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
          </button>
          <button
            // ref={nextRefVideoHover}
            ref={(node) => setNextVideoHover(node)}
            className={cn(
              'absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all lg:right-16 lg:p-3',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
          </button>
        </div>
      </Wrapper>

      <Wrapper id='swiper-active-video' name='SwiperActiveVideo' noClassName noProps noChildren>
        <Text>When active, show iframe</Text>
        <div className='relative mx-auto mt-4 w-full lg:max-w-2xl xl:max-w-4xl'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevVideoActive,
              nextEl: nextVideoActive,
              // prevEl: prevRefVideoActive.current,
              // nextEl: nextRefVideoActive.current,
            }}
            // onBeforeInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefVideoActive.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefVideoActive.current;
            // }}
            // onInit={(swiper) => {
            //   // @ts-ignore
            //   swiper.params.navigation.prevEl = prevRefVideoActive.current;
            //   // @ts-ignore
            //   swiper.params.navigation.nextEl = nextRefVideoActive.current;
            //   swiper.navigation.init();
            //   swiper.navigation.update();
            // }}
            spaceBetween={24}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            className='w-full py-4'
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
                      'group relative h-64 overflow-hidden rounded-md lg:h-72 xl:h-80',
                      isActive && 'h-[280px] lg:h-[320px] xl:h-[370px]',
                      !isActive && 'mt-4 lg:mt-6',
                    )}
                  >
                    <Image
                      className='w-full rounded-md object-cover transition-all duration-300'
                      src={youTubeGetCoverImage(youTubeGetID(video.video_url))}
                      alt={video.title}
                      fill
                      unoptimized
                    />
                    <div
                      className={cn(
                        'group absolute inset-0 cursor-pointer rounded-md focus-visible:outline-none',
                        !isActive && 'bg-black/50',
                      )}
                    >
                      <div className='flex h-full items-center justify-center'>
                        <div
                          className={cn(
                            'rounded-md bg-neutral-800/80 p-2 text-white transition-all duration-300 group-hover:bg-red-600 sm:p-3',
                          )}
                        >
                          <PlayIcon className='h-5 w-5 sm:h-6 sm:w-6' />
                        </div>
                      </div>
                    </div>
                    <iframe
                      className={cn('absolute inset-0 h-full w-full rounded', isActive ? 'z-[0]' : '-z-[1]')}
                      src={`https://www.youtube.com/embed/${youTubeGetID(video.video_url)}?autoplay=0`}
                      title={video.title}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            // ref={prevRefVideoActive}
            ref={(node) => setPrevVideoActive(node)}
            className={cn(
              'absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all lg:left-16 lg:p-3',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowLeftIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
          </button>
          <button
            // ref={nextRefVideoActive}
            ref={(node) => setNextVideoActive(node)}
            className={cn(
              'absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 shadow-lg transition-all lg:right-16 lg:p-3',
              'border bg-neutral-100 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-black/60 dark:hover:bg-black/90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            )}
          >
            <ArrowRightIcon className='h-5 w-5 dark:text-white lg:h-6 lg:w-6' />
          </button>
        </div>
      </Wrapper>
    </Layout>
  );
}
