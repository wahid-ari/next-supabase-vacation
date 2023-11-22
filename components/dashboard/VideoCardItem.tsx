import Image from 'next/image';
import { PlayIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { youTubeGetCoverImage, youTubeGetID } from '@/libs/utils';

type Props = {
  title: string;
  url: string;
  onPlay: () => void;
  [props: string]: any;
};

export default function VideoCardItem({
  title = 'Video Title',
  url = 'https://www.youtube.com/watch?v=GfO-3Oir-qM',
  onPlay,
  ...props
}: Props) {
  const youtub_id = youTubeGetID(url);
  const cover_url = youTubeGetCoverImage(youtub_id);

  return (
    <div className='relative h-64 rounded-md group overflow-hidden' {...props}>
      <Image
        className='w-full object-cover rounded-md brightness-90 group-hover:brightness-100 transition-all duration-300'
        src={cover_url}
        alt='hero'
        layout='fill'
        unoptimized
      />
      <button
        onClick={onPlay}
        className={twMerge(
          'group absolute inset-0 rounded-md cursor-pointer focus-visible:outline-none',
          'bg-gradient-to-b from-transparent via-transparent to-neutral-950',
        )}
      >
        <div className='flex justify-center items-center h-full'>
          <div
            className={twMerge(
              'bg-neutral-800/80 rounded-md p-3 text-white group-hover:bg-red-600 transition-all duration-300',
              'group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-sky-500',
            )}
          >
            <PlayIcon className='h-5 w-5' />
          </div>
        </div>
        <div className='absolute bottom-0 inset-x-0'>
          <p className='font-medium text-base text-center line-clamp-2 text-white px-4 pb-4'>{title}</p>
        </div>
      </button>
    </div>
  );
}
