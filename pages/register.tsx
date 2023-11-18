import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import nookies from 'nookies';

import { validateRegister } from '@/validations/register';
import useToast from '@/hooks/use-hot-toast';

import HeadSeo from '@/components/layout/HeadSeo';
import Button from '@/components/systems/Button';
import Heading from '@/components/systems/Heading';

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  if (cookies.token) {
    return {
      redirect: {
        destination: '/dashboard',
      },
    };
  }
  return {
    props: {},
  };
}

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleRegister(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const { valid, errors } = await validateRegister(form);
      if (!valid && errors) {
        dismissToast();
        errors.forEach((el) => {
          pushToast({ message: el, isError: true });
        });
      } else {
        // FIX this register logic
        // const toastId = pushToast({
        //   message: 'Registering...',
        //   isLoading: true,
        // });
        // const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/register`, form);
        // if (res.status == 200) {
        //   nookies.set(null, 'id', res.data.id, { path: '/' });
        //   nookies.set(null, 'username', res.data.username, { path: '/' });
        //   nookies.set(null, 'name', res.data.name, { path: '/' });
        //   nookies.set(null, 'type', res.data.type, { path: '/' });
        //   nookies.set(null, 'token', res.data.token, { path: '/' });
        //   updateToast({
        //     toastId,
        //     message: 'Success Register',
        //     isError: false,
        //   });
        //   Router.replace('/');
        // }
        Router.replace('/dashboard');
      }
    } catch (error) {
      dismissToast();
      pushToast({ message: error?.response?.data?.error, isError: true });
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <>
      <HeadSeo title='Register - MyVacation' description='Register - MyVacation' />

      <div className='min-h-screen w-screen text-sm font-medium dark:bg-white sm:grid sm:grid-cols-2 '>
        <div className='banner flex flex-col justify-between gap-2 p-8 sm:hidden'>
          <div>
            <h1 className='text-4xl font-bold text-white'>MyVacation</h1>
          </div>
          <p className='text-base font-normal text-white'>
            Find books you&apos;ll love, and keep track of the books you want to read. Be part of the largest community
            of book lovers on MyVacation
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
              Register
            </Heading>

            <form onSubmit={handleRegister}>
              <div className='mb-5'>
                <label className='block text-sm text-neutral-800' htmlFor='name'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Username'
                  value={form.name}
                  onChange={handleChange}
                  className='mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-neutral-300 transition-all focus:border-sky-600 focus:ring-1 focus:ring-sky-500 dark:bg-white dark:text-neutral-800'
                  autoComplete='off'
                  required
                />
              </div>

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
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-0 z-10 mr-0.5 mt-2 rounded-md border-neutral-300 p-1.5 outline-none ring-neutral-300 backdrop-blur-lg focus:border-sky-600 focus:ring-1 focus:ring-sky-500'
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
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>

            <p className='mt-4 text-center font-normal dark:text-neutral-800'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='rounded font-medium text-sky-600 transition-all duration-300 hover:text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
              >
                Login Now
              </Link>
            </p>

            <p className='mt-2 text-center font-normal dark:text-neutral-800'>
              Continue to{' '}
              <Link
                href='/'
                className='rounded font-medium text-sky-600 transition-all duration-300 hover:text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
              >
                Dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
