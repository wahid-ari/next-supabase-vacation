import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowUpRightIcon, ImageIcon } from 'lucide-react';

import { useBookData } from '@/libs/swr';

import Layout from '@/components/layout/Layout';
import Heading from '@/components/systems/Heading';
import Shimmer from '@/components/systems/Shimmer';
import ShowMore from '@/components/systems/ShowMore';
import Title from '@/components/systems/Title';

Book.auth = true;

export default function Book() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useBookData(id);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Book Detail - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.title + ' - MyVacation' : 'Book Detail - MyVacation'}`}
      description='View Detail Book - MyVacation'
    >
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.title}</Title> : <Title>Book Detail</Title>}
      </div>

      {data ? (
        <div className='gap-6 sm:flex'>
          {data?.image ? (
            <div className='top-16 mx-auto w-3/5 self-start overflow-hidden sm:sticky sm:mx-0 sm:w-1/4 lg:w-1/5'>
              <Image
                alt={data?.title}
                src={data?.image}
                width={250}
                height={250}
                className={`mx-auto w-52 rounded ${isLoading ? 'blur-sm' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
                unoptimized
              />
            </div>
          ) : (
            <div className='mx-auto w-3/5 overflow-hidden sm:mx-0 sm:w-1/4 lg:w-1/5'>
              <div className='flex h-64 w-full items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800'>
                <ImageIcon className='h-16 w-16 text-neutral-500' />
              </div>
            </div>
          )}
          <div className='mt-6 w-full sm:mt-0 sm:w-3/4'>
            <div>
              <table className='text-[15px]'>
                <tbody>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>ISBN</td>
                    <td className='pb-2'>{data?.isbn ? data.isbn : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Language</td>
                    <td className='pb-2'>{data?.language ? data.language : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Pages</td>
                    <td className='pb-2'>{data?.pages ? data.pages : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Published</td>
                    <td className='pb-2'>{data?.published ? data.published : '-'}</td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Genre</td>
                    <td className='pb-2'>
                      <p className='font-medium text-neutral-700 dark:text-neutral-200'>
                        {data?.genre_array.map((item: any, index: number) => {
                          return (
                            <>
                              <Link
                                key={index + 1}
                                href={`/genre/detail/${item.id}`}
                                className='rounded text-[15px] font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                              >
                                {item.name}
                              </Link>
                              {index < data.genre_array.length - 1 ? ', ' : ''}
                            </>
                          );
                        })}
                        {data.genre_array?.length < 1 && '-'}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className='flex pb-2 pr-4 font-semibold'>Goodreads</td>
                    <td className='pb-2'>
                      {data?.link ? (
                        <a
                          href={data?.link}
                          className='flex w-16 items-center rounded text-[15px] font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Open
                          <ArrowUpRightIcon className='ml-1 h-4 w-4' />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>{data?.description}</p>

              <hr className='my-8 h-px border-0 bg-neutral-300 dark:bg-neutral-700' />
              <Heading h2>About the author</Heading>
              <div className='flex items-center gap-3'>
                {data?.book_authors?.image ? (
                  <Link
                    href={`/author/detail/${data?.book_authors?.id}`}
                    className='rounded text-base font-medium text-neutral-900 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100'
                  >
                    <Image
                      alt={data?.book_authors?.name}
                      src={data?.book_authors?.image}
                      width={50}
                      height={50}
                      className={`h-20 w-20 rounded-full object-cover brightness-90 transition-all duration-300 hover:brightness-100 ${
                        isLoading ? 'blur-sm' : 'blur-0'
                      }`}
                      onLoadingComplete={() => setLoading(false)}
                      unoptimized
                    />
                  </Link>
                ) : (
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
                    <ImageIcon className='h-8 w-8 text-neutral-500' />
                  </div>
                )}
                <div>
                  <Link
                    href={`/author/detail/${data?.book_authors?.id}`}
                    className='rounded text-base font-medium text-neutral-900 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100 dark:hover:text-sky-500'
                  >
                    {data?.book_authors?.name}
                  </Link>
                  {data?.book_authors?.web ? (
                    <a
                      href={data?.book_authors?.web}
                      className='mt-1 flex w-16 items-center rounded text-[15px] font-medium text-sky-500 transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Web
                      <ArrowUpRightIcon className='ml-1 h-4 w-4' />
                    </a>
                  ) : null}
                </div>
              </div>
              {data?.book_authors?.bio ? (
                <ShowMore count={400} className='mt-4 text-[15px] leading-6 text-neutral-700 dark:text-neutral-200'>
                  {data?.book_authors?.bio}
                </ShowMore>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className='gap-6 sm:flex'>
          <div className='mx-auto w-3/5 sm:mx-0 sm:w-1/4 lg:w-1/5'>
            <Shimmer>
              <div className='h-64 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          </div>
          <div className='mt-6 w-full sm:mt-0 sm:w-3/4 '>
            <Shimmer>
              <div className='h-4 mb-2 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 mb-2 w-40 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 mb-2 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 mb-2 w-32 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 mb-2 w-40 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-4 mb-5 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-44 w-full rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
            <Shimmer className='mt-6 relative isolate flex items-center gap-3'>
              <div className='w-16 h-16 rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div>
                <div className='h-4 mb-2 w-52 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-3 w-10 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </div>
            </Shimmer>
          </div>
        </div>
      )}
    </Layout>
  );
}
