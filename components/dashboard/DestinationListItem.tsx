import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  href: string;
  name: string;
  image_url?: string;
  location?: string;
  [props: string]: any;
};

export default function DestinationListItem({ href, name, image_url, location, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div {...props} className='flex gap-3 items-center'>
      <Link
        href={href}
        className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-sky-500'
      >
        {image_url ? (
          <div className='relative h-28 w-28 overflow-hidden'>
            <Image
              alt={name}
              src={image_url}
              fill
              className={twMerge(
                'rounded object-cover brightness-90 hover:brightness-100 hover:scale-110 transition-all duration-300',
                isLoading ? 'blur-sm' : 'blur-0',
              )}
              onLoad={() => setLoading(false)}
              unoptimized
            />
          </div>
        ) : (
          <div className='flex h-28 w-28 items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
            <ImageIcon className='h-8 w-8 text-neutral-500' />
          </div>
        )}
      </Link>
      <div>
        <Link
          href={href}
          className={twMerge(
            'rounded text-md line-clamp-2 font-semibold text-neutral-700 transition-all duration-200 dark:text-neutral-100',
            'hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-sky-500',
          )}
        >
          {name}
        </Link>
        <p className='text-[15px] mt-2 text-neutral-700 dark:text-neutral-300'>{location}</p>
      </div>
    </div>
  );
}
