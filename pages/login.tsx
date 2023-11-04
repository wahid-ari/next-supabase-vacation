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

export default function Login() {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl as string;
  const [form, setForm] = useState({ username: 'develop', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateToast, pushToast } = useToast();
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
    let isError = false;
    if (!form.username) {
      isError = true;
      pushToast({ message: "Username can't be empty", isError: true });
    }
    if (!form.password) {
      isError = true;
      pushToast({ message: "Password can't be empty", isError: true });
    }

    // jika tidak ada error save data
    if (!isError) {
      const toastId = pushToast({
        message: 'Login...',
        isLoading: true,
      });
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/login`, form);
        if (res.status == 200) {
          // NextAuth
          const { id, username, name, type, token } = res.data;
          signIn('credentials', {
            id,
            username,
            name,
            type,
            token,
            callbackUrl: callbackUrl || '/dashboard',
          });
          updateToast({
            toastId,
            message: 'Success Login',
            isError: false,
          });
        }
      } catch (error) {
        updateToast({ toastId, message: error?.response?.data?.error, isError: true });
        console.error(error);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          <div className='banner flex flex-col justify-between gap-2 p-8 sm:hidden'>
            <div>
              <h1 className='text-4xl font-bold text-white'>MyVacation</h1>
            </div>
            <p className='text-base font-normal text-white'>
              Find books you&apos;ll love, and keep track of the books you want to read. Be part of the largest
              community of book lovers on MyVacation
            </p>
            <p className='font-semibold text-white'>© MyVacation - 2023</p>
          </div>

          <div className='banner hidden flex-col justify-between gap-2 px-8 py-12 sm:flex'>
            <div>
              <h1 className='font-bold text-white sm:text-4xl md:text-5xl'>MyVacation</h1>
              <br />
              <p className='text-base font-normal text-white'>
                Find books you&apos;ll love, and keep track of the books you want to read. Be part of the largest
                community of book lovers on MyVacation
              </p>
            </div>
            <p className='font-semibold text-white'>© MyVacation - 2023</p>
          </div>

          <div className='flex w-full items-center justify-center px-8 py-16 md:px-16 md:py-0'>
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

                <Button type='submit' className='w-full !text-base'>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <p className='mt-4 text-center font-normal dark:text-neutral-800'>
                Dont have an account?{' '}
                <Link
                  href='/register'
                  className='rounded font-medium text-sky-600 transition-all duration-300 hover:text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                >
                  Register Now
                </Link>
              </p>

              <p className='mt-2 text-center font-normal dark:text-neutral-800'>
                Continue to{' '}
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
