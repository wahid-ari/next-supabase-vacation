import { useIslandsData } from '@/libs/swr';

import IslandCardItem from '@/components/card/IslandCardItem';
import FrontLayout from '@/components/front/FrontLayout';
import Shimmer from '@/components/systems/Shimmer';

export default function Islands() {
  const { data, error } = useIslandsData();

  if (error) {
    return (
      <FrontLayout
        title='Island - MyVacation'
        description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout
      title='Island - MyVacation'
      description='Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t be enough to embrace the wonders of Indonesia.'
    >
      <div className='pt-4'>
        <div className='mt-2 grid grid-cols-1 gap-6 min-[450px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {data
            ? data?.map((item: any, index: number) => (
                <div key={index} className='relative'>
                  <IslandCardItem
                    href={`/islands/${item.slug}`}
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
