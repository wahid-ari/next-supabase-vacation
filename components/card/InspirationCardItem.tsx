import { useState } from 'react';
import Image from 'next/image';
import { InstagramIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

type Props = {
  className?: string;
  alt: string;
  image_url: string;
  onClick: () => void;
  [props: string]: any;
};

export default function InspirationCardItem({ className, alt = 'Name', image_url, onClick, ...props }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative h-56 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        className,
      )}
      {...props}
    >
      <Image
        alt={alt}
        src={image_url}
        fill
        className={cn('rounded object-cover', isLoading ? 'blur-sm' : 'blur-0')}
        unoptimized
        onLoad={() => setLoading(false)}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-neutral-950/50'>
        <div className='flex w-full justify-end p-2'>
          <InstagramIcon className='h-5 w-5 text-neutral-200' />
        </div>
      </div>
    </button>
  );
}
