import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import BackToTop from '@/components/front/BackToTop';
import Footer from '@/components/front/Footer';
import FrontNavbar from '@/components/front/FrontNavbar';
import HeadSeo from '@/components/layout/HeadSeo';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
  [props: string]: any;
};

export default function FrontLayout({ children, title, description, className, ...props }: Props) {
  return (
    <>
      <HeadSeo title={title} description={description} />
      <div {...props} className='relative dark:bg-neutral-900'>
        <FrontNavbar className='bg-white/50 backdrop-blur-md backdrop-filter dark:bg-neutral-900/30' />
        <main className={twMerge('mx-auto min-h-screen w-full max-w-7xl p-4 pb-10', className)}>{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
