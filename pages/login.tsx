import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';

import useToast from '@/hooks/use-hot-toast';

import HeadSeo from '@/components/layout/HeadSeo';
import Button from '@/components/systems/Button';
import Heading from '@/components/systems/Heading';
import LoadingDots from '@/components/systems/LoadingDots';

// TODO change login background
export default function Login() {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;
  const [form, setForm] = useState({ username: '', password: '' });
  const formFilled = form.username !== '' && form.password !== '';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();
  const { status } = useSession();

  useEffect(() => {
    Router.prefetch('/dashboard');
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const toastId = pushToast({
      message: 'Login...',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/login`, form);
      if (res.status == 200) {
        // NextAuth
        updateToast({
          toastId,
          message: 'Success Login',
          isError: false,
        });
        const { id, username, name, type, token } = res.data;
        // FIX need this for playwright test case
        setTimeout(() => {
          signIn('credentials', {
            id,
            username,
            name,
            type,
            token,
            callbackUrl: callbackUrl || '/dashboard',
          });
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      if (Array.isArray(error?.response?.data?.message)) {
        const errors = [...error?.response?.data?.message].reverse();
        // show all error
        dismissToast();
        errors.forEach((item: any) => {
          pushToast({ message: item?.message, isError: true });
        });
        // only show one error
        // errors.map((item: any) => {
        //   updateToast({ toastId, message: item?.message, isError: true });
        // })
      } else {
        updateToast({ toastId, message: error?.response?.data?.message, isError: true });
      }
    }
    setLoading(false);
  }

  if (status === 'loading') {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center dark:bg-white'>
        <LoadingDots medium />
      </div>
    );
  }

  if (status === 'authenticated') {
    Router.push('/dashboard');
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <HeadSeo title='Login - MyVacation' description='Login - MyVacation' />

        <div className='min-h-screen w-screen text-sm font-medium dark:bg-white sm:grid sm:grid-cols-2'>
          <div className='relative sm:hidden'>
            <div className='relative h-72 w-auto min-[380px]:h-64'>
              <Image
                src='https://images.unsplash.com/photo-1515266591878-f93e32bc5937?w=500'
                alt='Image'
                className='object-cover object-top'
                unoptimized
                fill
                priority
              />
            </div>
            <div className='absolute inset-0 bg-black/50 p-8'>
              <div className='flex h-full flex-col justify-center'>
                <h1 className='mb-4 text-3xl font-bold text-white'>MyVacation</h1>
                <p className='mb-4 text-base font-normal text-white'>
                  Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the
                  magnificent city skylines throughout the country.
                </p>
                <p className='font-semibold text-white'>© MyVacation - 2023</p>
              </div>
            </div>
          </div>

          <div className='relative hidden sm:flex'>
            <div className='relative h-full w-full'>
              <Image
                src='https://images.unsplash.com/photo-1515266591878-f93e32bc5937?w=500'
                alt='Image'
                className='object-cover object-center'
                unoptimized
                fill
                priority
              />
            </div>
            <div className='absolute inset-0 bg-black/50'>
              <div className='flex h-full flex-col justify-between gap-2 px-8 py-12'>
                <div className='grow'>
                  <h1 className='text-4xl font-bold text-white'>MyVacation</h1>
                  <br />
                  <p className='text-base font-normal text-white'>
                    Enjoy the untouched beaches, mountains, lakes, and many more pleasing destinations as well as the
                    magnificent city skylines throughout the country. And when you decide to see them all, a visit won’t
                    be enough to embrace the wonders of Indonesia.
                  </p>
                </div>
                <p className='font-semibold text-white'>© MyVacation - 2023</p>
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-center px-8 py-6 md:px-16 md:py-0'>
            <div className='w-full sm:max-w-md'>
              <Image
                alt='Logo'
                src='/icon.png'
                width={100}
                height={100}
                className='mx-auto mb-16 hidden sm:block'
                unoptimized
              />

              <Heading h1 className='mb-6 font-semibold !text-neutral-800'>
                Login
              </Heading>

              <form onSubmit={handleSubmit}>
                <div className='mb-5'>
                  <label className='block text-sm text-neutral-800' htmlFor='username'>
                    Username
                  </label>
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={form.username}
                    onChange={handleChange}
                    className='mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-neutral-300 transition-all focus:border-sky-600 focus:ring-1 focus:ring-sky-500 dark:bg-white dark:text-neutral-800'
                    autoComplete='off'
                    required
                  />
                </div>

                <div className='mb-5'>
                  <label className='block text-sm text-neutral-800' htmlFor='password'>
                    Password
                  </label>
                  <div className='relative mb-4 flex items-center'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      placeholder='Password'
                      value={form.password}
                      onChange={handleChange}
                      className='mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-neutral-300 transition-all focus:border-sky-600 focus:ring-1 focus:ring-sky-500 dark:bg-white dark:text-neutral-800'
                      autoComplete='off'
                      required
                    />
                    <button
                      type='button'
                      aria-label='show password'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-0.5 z-10 mr-0.5 mt-2 rounded-md border-neutral-300 p-1.5 outline-none ring-neutral-300 backdrop-blur-lg focus:border-sky-600 focus:ring-1 focus:ring-sky-500'
                    >
                      {showPassword ? (
                        <EyeIcon className='h-5 w-5 text-neutral-600' />
                      ) : (
                        <EyeOffIcon className='h-5 w-5 text-neutral-600' />
                      )}
                    </button>
                  </div>
                </div>

                <Button type='submit' className='w-full !text-base' disabled={!formFilled || loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <p className='mt-4 text-center font-normal dark:text-neutral-800'>
                Dont have an account?{' '}
                <Link
                  href='/register'
                  className='rounded font-medium text-sky-600 transition-all duration-300 hover:text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                >
                  Register
                </Link>
              </p>

              <p className='mt-2 text-center font-normal dark:text-neutral-800'>
                or Continue to{' '}
                <Link
                  href='/'
                  className='rounded font-medium text-sky-600 transition-all duration-300 hover:text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                >
                  Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
