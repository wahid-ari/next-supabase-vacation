import { useState } from 'react';

import { useProvincesData } from '@/libs/swr';

import { Heading } from '@/components/ui/Heading';
import { InputDebounce } from '@/components/ui/InputDebounce';

import ProvinceCardItem from '@/components/card/ProvinceCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export default function Provinces() {
  const { data, error } = useProvincesData();
  const [query, setQuery] = useState('');
  const filtered =
    query === ''
      ? data
      : data?.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  console.log(data);

  if (error) {
    return (
      <FrontLayout
        title='Province - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title='Province - MyVacation'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    >
      <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
        <Heading as='h1' variant='h3' className='font-medium'>
          Province
        </Heading>
        <InputDebounce
          id='search'
          name='search'
          placeholder='Search Province'
          className='sm:max-w-xs'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <div className='pt-6'>
        <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {filtered
            ? filtered?.map((item: any, index: number) => (
                <div key={index} className='relative'>
                  <ProvinceCardItem
                    href={`/provinces/${item.slug}`}
                    image_url={item.image_url}
                    name={`${item.name} - ${item?.vacation_destination?.length}`}
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
    </FrontLayout>
  );
}
