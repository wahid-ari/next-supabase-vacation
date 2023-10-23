import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookIcon, LayoutListIcon, UsersIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { compareSearchResult, useSearchHistory } from '@/store/use-search-history';
// import { useSearchHistoryStore } from '@/store/use-store';
import { useSearchData } from '@/libs/swr';

import AuthorListItem from '@/components/dashboard/AuthorListItem';
import BookListItem from '@/components/dashboard/BookListItem';
import FrontLayout from '@/components/front/FrontLayout';
import Button from '@/components/systems/Button';
import Heading from '@/components/systems/Heading';
import LabeledInput from '@/components/systems/LabeledInput';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

export default function Browse() {
  const router = useRouter();
  const search = (router.query?.q as string) || '';
  const [query, setQuery] = useState(search);
  const { data, error } = useSearchData(search);

  useEffect(() => {
    setQuery(search);
  }, [search]);

  const {
    searchHistory,
    setSearchHistory,
    addBooksHistory,
    addAuthorsHistory,
    removeBooksHistory,
    removeAuthorsHistory,
    resetBooksHistory,
    resetAuthorsHistory,
    resetAllSearchHistory,
  } = useSearchHistory();
  // const booksHistory = useSearchHistoryStore((state) => state.books);
  // const setBooksHistory = useSearchHistoryStore((state) => state.setBooks);
  // const resetBooksHistory = useSearchHistoryStore((state) => state.resetBooks);

  // const authorsHistory = useSearchHistoryStore((state) => state.authors);
  // const setAuthorsHistory = useSearchHistoryStore((state) => state.setAuthors);
  // const resetAuthorsHistory = useSearchHistoryStore((state) => state.resetAuthors);

  // const resetAllSearchHistory = useSearchHistoryStore((state) => state.resetAllSearchHistory);

  useEffect(() => {
    if (data?.books?.length > 0) {
      // if already searching
      if (searchHistory.books.length > 0) {
        // compare history with new search result
        let newBooks = compareSearchResult(searchHistory.books, data?.books);
        if (newBooks != searchHistory.books) {
          addBooksHistory(newBooks);
        }
      } else {
        // first time searching, set search result to search history directly
        addBooksHistory(data?.books);
      }
      // if (booksHistory.length > 0) {
      //   // compare history with new search result
      //   let newMovies = compareSearchResult(booksHistory, data?.books);
      //   if (newMovies != booksHistory) {
      //     setBooksHistory(newMovies);
      //   }
      // } else {
      //   // first time searching, set search result to search history directly
      //   setBooksHistory(data?.books);
      // }
    }
    // Authors
    if (data?.authors?.length > 0) {
      if (searchHistory.authors.length > 0) {
        let newAuthors = compareSearchResult(searchHistory.authors, data?.authors);
        if (newAuthors != searchHistory.authors) {
          addAuthorsHistory(newAuthors);
        }
      } else {
        addAuthorsHistory(data?.authors);
      }
    }
    // if (data?.authors?.length > 0) {
    //   if (authorsHistory.length > 0) {
    //     let newActors = compareSearchResult(authorsHistory, data?.authors);
    //     if (newActors != authorsHistory) {
    //       setAuthorsHistory(newActors);
    //     }
    //   } else {
    //     setAuthorsHistory(data?.authors);
    //   }
    // }
  }, [addAuthorsHistory, addBooksHistory, data, searchHistory.authors, searchHistory.books]);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (query !== '') {
      router.push(`?q=${query}`);
    } else {
      router.push(`/browse`);
    }
  }

  if (error) {
    return (
      <FrontLayout title='Browse - MyVacation' description='Browse books - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </FrontLayout>
    );
  }

  return (
    <FrontLayout title='Browse - MyVacation' description='Browse books - MyVacation'>
      <Title>Browse</Title>

      <form className='mt-4' onSubmit={handleSubmit}>
        <div className='flex items-end gap-2'>
          <LabeledInput
            wrapperClassName='w-full'
            name='search'
            placeholder='Search Title, Author, ISBN'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <Button type='submit' value='Submit' className='mb-4 !px-8 !py-2.5'>
            Search
          </Button>
        </div>
      </form>

      {search ? (
        <>
          {!data && <Text>Searching &#8220;{search}&#8221;...</Text>}

          {data?.books?.length < 1 && data?.authors?.length < 1 ? (
            <div className='mb-12 mt-8 rounded border border-red-500 p-3'>
              <p className='text-red-500'>{`No results for "${query || search}"`}</p>
            </div>
          ) : null}

          {data?.books.length > 0 ? (
            <>
              <Heading h2 className='my-6 !text-[19px]'>
                Movies
              </Heading>
              <div className='mt-2 space-y-6'>
                {data?.books?.map((item: any, index: number) => (
                  <BookListItem
                    key={index}
                    href={`/book/detail/${item.id}`}
                    image={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                    title={item.title}
                    published={item.published}
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.authors?.length > 0 ? (
            <>
              <Heading h2 className='my-6 !text-[19px]'>
                Actors
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-6 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                {data?.authors?.map((item: any, index: number) => (
                  <AuthorListItem
                    key={index}
                    href={`/author/detail/${item.id}`}
                    image={item.image}
                    name={item.name}
                    web={item.web}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          {searchHistory.books.length > 0 || searchHistory.authors.length > 0 ? (
            <>
              <div className='mt-6 flex items-center justify-between'>
                <Heading h2 className='!mb-0 !text-[20px]'>
                  Recent Search
                </Heading>
                <button
                  onClick={resetAllSearchHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                >
                  Clear All
                </button>
              </div>

              {searchHistory.books.length > 0 ? (
                // {booksHistory?.length > 0 ? (
                <>
                  <div className='my-8 flex items-center justify-between'>
                    <Heading h3 className='!mb-0'>
                      Books
                    </Heading>
                    <button
                      onClick={resetBooksHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                    >
                      Clear Books
                    </button>
                  </div>
                  <div className='ml-1 mt-2 space-y-6'>
                    {searchHistory.books?.map((item: any, index: number) => (
                      // {booksHistory?.map((item: any, index: number) => (
                      <div key={index} className='relative'>
                        <BookListItem
                          href={`/book/detail/${item.id}`}
                          image={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                          title={item.title}
                          published={item.published}
                        />
                        <button
                          onClick={() => removeBooksHistory(item.id)}
                          className={twMerge(
                            'absolute -left-1 -top-1 rounded px-1.5 py-0.5 text-xs font-medium',
                            'bg-red-500 text-white transition-all hover:bg-red-600',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400'
                          )}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {searchHistory.authors?.length > 0 ? (
                // {authorsHistory?.length > 0 ? (
                <>
                  <div className='my-8 flex items-center justify-between'>
                    <Heading h3 className='!mb-0'>
                      Authors
                    </Heading>
                    <button
                      onClick={resetAuthorsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
                    >
                      Clear Authors
                    </button>
                  </div>
                  <div className='ml-1 mt-2 grid grid-cols-1 gap-6 pb-4 min-[500px]:grid-cols-2 md:grid-cols-3'>
                    {searchHistory.authors?.map((item: any, index: number) => (
                      // {authorsHistory?.map((item: any, index: number) => (
                      <div key={index} className='relative'>
                        <AuthorListItem
                          href={`/author/detail/${item.id}`}
                          image={item.image}
                          name={item.name}
                          web={item.web}
                        />
                        <button
                          onClick={() => removeAuthorsHistory(item.id)}
                          className={twMerge(
                            'absolute -left-1 -top-1 rounded-full px-1.5 py-0.5 text-xs font-medium',
                            'bg-red-500 text-white transition-all hover:bg-red-600',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400'
                          )}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </>
      )}

      <Heading h3 className='mt-8 !text-[19px]'>
        Browse
      </Heading>
      <div className='mt-2 grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 sm:grid-cols-3'>
        <Link
          href='/books'
          className='group h-20 rounded-lg bg-gradient-to-br from-red-500 to-yellow-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Book
            </h2>
            <BookIcon className='h-10 w-10 text-yellow-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/authors'
          className='group h-20 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Author
            </h2>
            <UsersIcon className='h-10 w-10 text-purple-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/genres'
          className='group h-20 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Genre
            </h2>
            <LayoutListIcon className='h-10 w-10 text-blue-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
      </div>
    </FrontLayout>
  );
}
