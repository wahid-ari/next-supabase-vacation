import { useEffect, useState } from 'react';
import { ChevronUpIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

export default function BackToTop({ className, ...props }: { className?: string; [props: string]: any }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  }

  return (
    showBackToTop && (
      <div
        {...props}
        className={cn(
          'fixed bottom-[18px] right-4 z-40 rounded-full sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:transform',
          'bg-neutral-100 bg-opacity-20 backdrop-blur backdrop-filter dark:bg-opacity-40',
          'border dark:border-neutral-800 dark:bg-neutral-800',
        )}
      >
        {/* // <div className='fixed bottom-4 right-4 z-40 rounded-full bg-neutral-100 bg-opacity-20 backdrop-blur backdrop-filter dark:bg-neutral-800 dark:bg-opacity-40'> */}
        <button
          onClick={scrollToTop}
          className={cn(
            'flex items-center gap-1 rounded-full bg-transparent p-1 pl-1.5 text-[13px] text-neutral-700',
            'transition-all duration-300 ease-in hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            className,
          )}
        >
          <ChevronUpIcon className='size-5' />
          <span className='pr-1'>Back to Top</span>
        </button>
      </div>
    )
  );
}
