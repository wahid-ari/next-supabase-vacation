import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import { compareSearchResult, useSearchHistory } from '@/store/use-search-history';
import { useSearchData } from '@/libs/swr';
import { youTubeGetID } from '@/libs/utils';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';

import DestinationCardItem from '@/components/card/DestinationCardItem';
import VideoCardItem from '@/components/card/VideoCardItem';
import Layout from '@/components/layout/Layout';
import Heading from '@/components/systems/Heading';
import Shimmer from '@/components/systems/Shimmer';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

Search.auth = true;

export default function Search() {
  const router = useRouter();
  const search = (router.query?.q as string) || '';
  const [query, setQuery] = useState(search);
  const { data, error } = useSearchData(search);
  const [videoPreview, setVideoPreview] = useState({ open: false, title: '', video_url: '' });
  const youtube_url = youTubeGetID(videoPreview?.video_url);

  useEffect(() => {
    setQuery(search);
  }, [search]);

  const {
    searchHistory,
    setSearchHistory,
    addDestinationHistory,
    removeDestinationHistory,
    resetDestinationHistory,
    addVideoHistory,
    removeVideoHistory,
    resetVideoHistory,
    resetAllSearchHistory,
  } = useSearchHistory();

  useEffect(() => {
    // Destination
    if (data?.destination?.length > 0) {
      // if already searching
      if (searchHistory.destination?.length > 0) {
        // compare history with new search result
        let newDestination = compareSearchResult(searchHistory.destination, data?.destination);
        if (newDestination != searchHistory.destination) {
          addDestinationHistory(newDestination);
        }
      } else {
        // first time searching, set search result to search history directly
        addDestinationHistory(data?.destination);
      }
    }
    // Video
    if (data?.video?.length > 0) {
      // if already searching
      if (searchHistory.video?.length > 0) {
        // compare history with new search result
        let newVideo = compareSearchResult(searchHistory.video, data?.video);
        if (newVideo != searchHistory.video) {
          addVideoHistory(newVideo);
        }
      } else {
        // first time searching, set search result to search history directly
        addVideoHistory(data?.video);
      }
    }
  }, [data, searchHistory.destination, searchHistory.video, addDestinationHistory, addVideoHistory]);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (query !== '') {
      router.push(`?q=${query}`);
    } else {
      router.push(`/search`);
    }
  }

  if (error) {
    return (
      <Layout title='Search - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Search - MyVacation' description='Search - MyVacation'>
      <Title>Search</Title>

      <form className='mt-4' onSubmit={handleSubmit}>
        <div className='flex items-center gap-2'>
          <Input
            className='w-full sm:max-w-md'
            name='search'
            placeholder='Search Destination, Video, Province, Category and Island'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <Button type='submit' value='Submit' className='h-9'>
            Search
          </Button>
        </div>
      </form>

      {search ? (
        <>
          {!data && (
            <>
              <Text className='mt-4'>Searching &#8220;{search}&#8221;...</Text>
              <Heading h3 className='mt-6'>
                Destination
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
                {[...Array(4).keys()].map((i) => (
                  <Shimmer key={i}>
                    <div className='space-y-3'>
                      <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                      <div className='h-4 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                    </div>
                  </Shimmer>
                ))}
              </div>
              <Heading h3 className='mt-6'>
                Video
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                {[...Array(3).keys()].map((i) => (
                  <Shimmer key={i}>
                    <div className='space-y-3'>
                      <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                      <div className='h-4 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                    </div>
                  </Shimmer>
                ))}
              </div>
            </>
          )}

          {data?.destination?.length < 1 && data?.video?.length < 1 ? (
            <div className='mt-8 rounded border border-red-500 p-3'>
              <p className='text-red-500'>{`No results for "${query || search}"`}</p>
            </div>
          ) : null}

          {data?.destination?.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Destination
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
                {data?.destination?.map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <DestinationCardItem
                      href={`/destination/detail/${item.id}`}
                      image_url={item.image_url}
                      name={item.name}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {data?.video?.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Video
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[550px]:grid-cols-2 xl:grid-cols-3'>
                {data?.video?.map((item: any, index: number) => (
                  <VideoCardItem
                    className='scale-125'
                    key={index}
                    title={item?.title}
                    url={item?.video_url}
                    onPlay={() => setVideoPreview({ open: true, title: item?.title, video_url: item?.video_url })}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : searchHistory.destination?.length > 0 || searchHistory.video?.length > 0 ? (
        <>
          <div className='mt-6 flex items-center justify-between'>
            <Heading h2 className='!mb-0 text-[22px]'>
              Recent Search
            </Heading>
            <button
              onClick={resetAllSearchHistory}
              className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
            >
              Clear All
            </button>
          </div>

          {searchHistory.destination.length > 0 ? (
            <>
              <div className='my-6 flex items-center justify-between'>
                <Heading h3 className='!mb-0'>
                  Destination
                </Heading>
                <button
                  onClick={resetDestinationHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                >
                  Clear Destination
                </button>
              </div>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
                {searchHistory.destination?.map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <DestinationCardItem
                      href={`/destination/detail/${item.id}`}
                      image_url={item.image_url}
                      name={item.name}
                    />
                    <button
                      title={`Remove ${item?.name}`}
                      onClick={() => removeDestinationHistory(item.id)}
                      className={twMerge(
                        'absolute -right-1.5 -top-1.5 rounded-full px-2 py-1 text-xs font-medium',
                        'bg-red-500 text-white transition-all hover:bg-red-600',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
                      )}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {searchHistory.video?.length > 0 ? (
            <>
              <div className='mb-6 mt-8 flex items-center justify-between'>
                <Heading h3 className='!mb-0'>
                  Video
                </Heading>
                <button
                  onClick={resetVideoHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                >
                  Clear Video
                </button>
              </div>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[550px]:grid-cols-2 xl:grid-cols-3'>
                {searchHistory.video?.map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <VideoCardItem
                      className='scale-125'
                      title={item?.title}
                      url={item?.video_url}
                      onPlay={() => setVideoPreview({ open: true, title: item?.title, video_url: item?.video_url })}
                    />
                    <button
                      title={`Remove ${item?.title}`}
                      onClick={() => removeVideoHistory(item.id)}
                      className={twMerge(
                        'absolute -right-1.5 -top-1.5 rounded-full px-2 py-1 text-xs font-medium',
                        'bg-red-500 text-white transition-all hover:bg-red-600',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1',
                      )}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : null}

      {/* Preview Dialog */}
      <Dialog open={videoPreview.open} onOpenChange={() => setVideoPreview((prev) => ({ ...prev, open: false }))}>
        <DialogContent className='sm:max-w-[720px]'>
          <DialogHeader className='text-left'>
            <DialogTitle className='pr-6'>{videoPreview.title}</DialogTitle>
          </DialogHeader>
          <iframe
            className='h-64 w-full rounded sm:h-72 lg:h-80 xl:h-96'
            src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
            title={videoPreview.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
