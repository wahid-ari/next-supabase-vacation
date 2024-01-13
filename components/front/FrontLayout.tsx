import { ReactNode } from 'react';

import { cn } from '@/libs/utils';

import BackToTop from '@/components/front/BackToTop';
import Footer from '@/components/front/Footer';
import FrontNavbar from '@/components/front/FrontNavbar';
import HeadSeo from '@/components/layout/HeadSeo';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  transparentNavbar?: boolean;
  className?: string;
  [props: string]: any;
};

export default function FrontLayout({ children, title, description, transparentNavbar, className, ...props }: Props) {
  return (
    <>
      <HeadSeo title={title} description={description} />
      <div {...props} className='relative dark:bg-neutral-900'>
        <FrontNavbar transparentNavbar={transparentNavbar} />
        <main className={cn('mx-auto min-h-screen w-full max-w-7xl p-4 pb-10', className)}>{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
