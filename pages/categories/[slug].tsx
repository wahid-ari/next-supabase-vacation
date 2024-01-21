import { useState } from 'react';

import { useCategoryData } from '@/libs/swr';

import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { InputDebounce } from '@/components/ui/InputDebounce';

import DestinationCardItem from '@/components/card/DestinationCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export async function getServerSideProps(context: any) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/category?slug=${slug}&seo=true`).then((res) =>
    res.json(),
  );
  return {
    props: {
      slug: slug,
      seo: res,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/category?slug=${slug}&seo=true`]: res,
      },
    },
  };
}

export default function Categories({ slug, seo }) {
  const { data, error } = useCategoryData(null, slug);
  const [query, setQuery] = useState('');
  const limit = 12;
  const [page, setPage] = useState(1);
  const filtered =
    query === ''
      ? data?.destinations
      : data?.destinations?.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')),
        );
  let lastPage = page >= filtered?.length / limit;

  if (error) {
    return (
      <FrontLayout title='Category Detail - MyVacation' description='View Detail Category - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title={`${seo ? seo?.name + ' - MyVacation' : 'Category Detail - MyVacation'}`}
      description={`${seo ? seo?.description : 'View Detail Category - MyVacation'}`}
    >
      <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
        <Heading as='h1' variant='h3' className='font-medium'>
          {seo ? seo?.name : 'Category Detail'}
        </Heading>
        <InputDebounce
          id='search'
          name='search'
          placeholder='Search Destination'
          className='sm:max-w-xs'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <div className='pt-6'>
        <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {filtered
            ? filtered?.slice(0, page * limit).map((item: any, index: number) => (
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

      {data && !lastPage && (
        <div className='mt-8 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no Destination with Name &quot;{query}&quot;</p>
      )}

      {query == '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no Destination from {seo?.name}</p>
      )}
    </FrontLayout>
  );
}
