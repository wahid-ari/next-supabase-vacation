import Link from 'next/link';

import { cn } from '@/libs/utils';

import { buttonVariants } from '@/components/ui/Button';

import { UserAuthForm } from '@/components/example/auth/UserAuthForm';

export default function AuthenticationPage() {
  return (
    <div className='container relative grid h-[500px] flex-col items-center justify-center md:h-[800px] lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/design/example#auth'
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
      >
        Login
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 dark:border-r dark:border-r-neutral-700 dark:text-white lg:flex'>
        <div className='absolute inset-0 bg-gradient-to-b from-neutral-100/50 via-neutral-200/50 to-neutral-300 dark:from-neutral-900/50 dark:via-neutral-800/50 dark:to-neutral-700' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Acme Inc
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my
              clients faster than ever before.&rdquo;
            </p>
            <footer className='text-sm'>Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-neutral-500 dark:text-neutral-400'>
            By clicking continue, you agree to our{' '}
            <Link href='/terms' className='hover:text-primary underline underline-offset-4'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href='/privacy' className='hover:text-primary underline underline-offset-4'>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
