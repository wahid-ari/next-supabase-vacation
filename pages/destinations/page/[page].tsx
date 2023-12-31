import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDestinationsData } from '@/libs/swr';
import { cn } from '@/libs/utils';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import DestinationCardItem from '@/components/card/DestinationCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Pagination from '@/components/systems/Pagination';
import Shimmer from '@/components/systems/Shimmer';

export async function getServerSideProps({ query }) {
  const page = query.page || 0;
  return { props: { page } };
}

export default function Destinations(params: any) {
  const router = useRouter();
  const page = Number(params.page);
  const search = (router.query?.q as string) || '';
  const [query, setQuery] = useState(search);
  const { data, error } = useDestinationsData(search ? `q=${search}` : `page=${page}&limit=12`);

  function changePage(to: any) {
    if (to + 1 != page) router.push(`${to + 1}`);
  }

  // this to update query based on search param
  useEffect(() => {
    setQuery(search);
  }, [search]);

  function handleSubmit(e: any) {
    e.preventDefault();
    router.push(`/destinations/page?q=${query}`);
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
                href='/destinations'
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
      <div className='py-4'>
        <form className='mb-8' onSubmit={handleSubmit}>
          <div className='flex items-end gap-2'>
            <Input
              name='search'
              placeholder='Search Destination'
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <Button type='submit' value='Submit' className='h-10 px-6 text-[15px]'>
              Search
            </Button>
          </div>
        </form>

        {/* if user searching and data not found  */}
        {data?.length < 1 && search ? (
          <div className='mt-8 rounded border border-red-500 p-3'>
            <p className='text-red-500'>{`No results for "${query || search}"`}</p>
          </div>
        ) : null}

        <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {/* if user not searching, show data from pagination */}
          {data &&
            !search &&
            data?.data?.map((item: any, index: number) => (
              <div key={index} className='relative'>
                <DestinationCardItem href={`/destinations/${item.slug}`} image_url={item.image_url} name={item.name} />
              </div>
            ))}

          {/* if user searching show search result */}
          {data &&
            search &&
            data?.map((item: any, index: number) => (
              <div key={index} className='relative'>
                <DestinationCardItem href={`/destinations/${item.slug}`} image_url={item.image_url} name={item.name} />
              </div>
            ))}

          {!data &&
            [...Array(12).keys()].map((i) => (
              <Shimmer key={i}>
                <div className='space-y-3'>
                  <div className='h-48 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                  <div className='h-4 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                </div>
              </Shimmer>
            ))}
        </div>
      </div>
      {/* if user not searching, show pagination */}
      {data && data?.data?.length > 0 && !search && (
        <div className='mt-4 text-center'>
          <Pagination
            currentPage={page - 1}
            setCurrentPage={changePage}
            totalPages={data?.pages?.length}
            showFirstLast
            showPrevNext
          />
        </div>
      )}
    </FrontLayout>
  );
}
