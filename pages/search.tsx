import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import { compareSearchResult, useSearchHistory } from '@/store/use-search-history';
import { useSearchData } from '@/libs/swr';
import { youTubeGetID } from '@/libs/utils';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';

import DestinationCardItem from '@/components/dashboard/DestinationCardItem';
import VideoCardItem from '@/components/dashboard/VideoCardItem';
import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Heading from '@/components/systems/Heading';
import LabeledInput from '@/components/systems/LabeledInput';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

// Search.auth = true;

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
        <div className='flex items-end gap-2'>
          <LabeledInput
            wrapperClassName='w-full sm:max-w-md'
            name='search'
            placeholder='Search Destination, Video, Province, Category and Island'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <Button type='submit' value='Submit' className='mb-4 !py-2.5 px-5'>
            Search
          </Button>
        </div>
      </form>

      {search ? (
        <>
          {!data && <Text>Searching &#8220;{search}&#8221;...</Text>}

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
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                {data?.video?.map((item: any, index: number) => (
                  <VideoCardItem
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
              <div className='mb-6 mt-6 flex items-center justify-between'>
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
                      title={`Delete ${item?.name}`}
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
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[550px]:grid-cols-2 lg:grid-cols-3'>
                {searchHistory.video?.map((item: any, index: number) => (
                  <div key={index} className='relative'>
                    <VideoCardItem
                      title={item?.title}
                      url={item?.video_url}
                      onPlay={() => setVideoPreview({ open: true, title: item?.title, video_url: item?.video_url })}
                    />
                    <button
                      title={`Delete ${item?.title}`}
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
            <DialogTitle className='pr-4'>{videoPreview.title}</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            <iframe
              className='h-64 sm:h-72 lg:h-80 xl:h-96 w-full rounded'
              src={`https://www.youtube.com/embed/${youtube_url}?autoplay=1`}
              title={videoPreview.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
