import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { API_URL, fetcher } from '@/libs/swr';
import { cn } from '@/libs/utils';

import DestinationCardItem from '@/components/dashboard/DestinationCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Pagination from '@/components/systems/Pagination';
import Shimmer from '@/components/systems/Shimmer';

export default function Destinations() {
  const router = useRouter();
  const pageQuery = Number(router?.query?.page) || null;
  const [page, setPage] = useState(pageQuery);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error } = useSWR(shouldFetch ? `${API_URL}/destination?page=${page + 1}&limit=12` : null, fetcher);

  // this to update page based on pageQuery
  // pagination start from 0, if pageQuery = 1 then page = 0
  // only fetch data when pageQuery !== null
  useEffect(() => {
    if (pageQuery !== 0 && pageQuery !== null) {
      setPage(pageQuery - 1);
      setShouldFetch(true);
    } else {
      setPage(0);
      setShouldFetch(true);
    }
  }, [pageQuery]);

  function changePage(page: any) {
    router.push(`?page=${page + 1}`);
    setPage(page);
  }

  if (error) {
    return (
      <FrontLayout
        title='Destination - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  if (data?.data?.length < 1) {
    return (
      <FrontLayout
        title='Destination - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>
          <div className='space-y-3 text-center'>
            <p>Data not found</p>
            <p>
              Back to{' '}
              <Link
                href='/destinations/client'
                className={cn(
                  'hover-underline-animation rounded px-0.5 text-[15px] font-medium hover:text-neutral-900',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100',
                )}
              >
                Destination
              </Link>
            </p>
          </div>
        </div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title='Destination - MyVacation'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    >
      <div className='pb-4 pt-8'>
        <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {data
            ? data?.data?.map((item: any, index: number) => (
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
        {data && data?.data?.length > 0 && (
          <div className='mt-8 text-center'>
            <Pagination
              currentPage={page}
              setCurrentPage={changePage}
              totalPages={data?.pages?.length}
              showFirstLast
              showPrevNext
            />
          </div>
        )}
      </div>
    </FrontLayout>
  );
}
