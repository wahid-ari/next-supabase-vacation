import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useDestinationsData } from '@/libs/swr';
import { cn } from '@/libs/utils';

import DestinationCardItem from '@/components/dashboard/DestinationCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Pagination from '@/components/systems/Pagination';
import Shimmer from '@/components/systems/Shimmer';

export async function getServerSideProps({ query }) {
  const page = query.page || 0;
  return { props: { page } };
}

export default function Destinations(params: any) {
  const router = useRouter();
  const pageQuery = Number(params.page);
  const [page, setPage] = useState(pageQuery);
  const { data, error } = useDestinationsData(`page=${page + 1}&limit=12`);
  // this to update page based on pageQuery
  // pagination start from 0, if pageQuery = 1 then page = 0
  useEffect(() => {
    if (pageQuery !== 0) {
      setPage(pageQuery - 1);
    } else {
      setPage(0);
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
          <div className='text-center space-y-3'>
            <p>Data not found</p>
            <p>
              Back to{' '}
              <Link
                href='/destinations'
                className={cn(
                  'hover-underline-animation font-medium rounded text-[15px] hover:text-neutral-900 px-0.5',
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
      </div>
      {data && data?.data?.length > 0 && (
        <div className='text-center mt-4'>
          <Pagination
            currentPage={page}
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
