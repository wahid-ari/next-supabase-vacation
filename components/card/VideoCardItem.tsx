import { useState } from 'react';
import Image from 'next/image';

import { cn, youTubeGetCoverImage, youTubeGetID } from '@/libs/utils';

type Props = {
  className?: string;
  title: string;
  url: string;
  onPlay: () => void;
  [props: string]: any;
};

export default function VideoCardItem({
  className,
  title = 'Video Title',
  url = 'https://www.youtube.com/watch?v=GfO-3Oir-qM',
  onPlay,
  ...props
}: Props) {
  const youtub_id = youTubeGetID(url);
  const cover_url = youTubeGetCoverImage(youtub_id);
  const [isLoading, setLoading] = useState(true);

  return (
    <div className='group relative h-64 overflow-hidden rounded-md' {...props}>
      <Image
        className={cn(
          'w-full rounded-md object-cover brightness-90 transition-all duration-300 group-hover:brightness-100',
          isLoading ? 'blur-sm' : 'blur-0',
          className,
        )}
        src={cover_url}
        alt={title}
        fill
        unoptimized
        onLoad={() => setLoading(false)}
      />
      <button
        onClick={onPlay}
        className={cn(
          'group absolute inset-0 cursor-pointer rounded-md focus-visible:outline-none',
          'bg-gradient-to-b from-transparent via-transparent to-neutral-950',
        )}
      >
        <div className='flex h-full items-center justify-center'>
          <svg
            className='h-12 w-12 rounded group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-sky-500 sm:h-14 sm:w-14'
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
          <p className='mb-4 line-clamp-2 px-4 text-center text-base font-medium text-white'>{title}</p>
        </div>
      </button>
    </div>
  );
}
