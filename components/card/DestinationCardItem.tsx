import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  href: string;
  name: string;
  image_url: string;
  [props: string]: any;
};

export default function DestinationCardItem({
  className,
  href = '/destination',
  name = 'Destination Name',
  image_url,
  ...props
}: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className='grid' {...props}>
      <Link
        href={href}
        className='group overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
      >
        {image_url ? (
          <div className={cn('relative h-64 overflow-hidden', className)}>
            <Image
              className={cn(
                'w-full transform object-cover brightness-90 transition-all duration-500 group-hover:scale-110 group-hover:brightness-100',
                isLoading ? 'blur-sm' : 'blur-0',
              )}
              src={image_url}
              alt={`Explore ${name} Destination`}
              fill
              unoptimized
              onLoad={() => setLoading(false)}
            />
          </div>
        ) : (
          <div className='flex h-64 w-full items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
            <ImageIcon className='h-20 w-20 text-neutral-500' />
          </div>
        )}
        <div className='absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-neutral-950'>
          <div className='flex h-full items-end justify-center'>
            <p className='mb-4 line-clamp-2 px-2.5 text-center text-base font-medium text-white sm:px-4'>{name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
