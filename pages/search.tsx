import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

import { compareSearchResult, useSearchHistory } from '@/store/use-search-history';
import { useSearchData } from '@/libs/swr';

import AuthorListItem from '@/components/dashboard/AuthorListItem';
import BookListItem from '@/components/dashboard/BookListItem';
import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Heading from '@/components/systems/Heading';
import LabeledInput from '@/components/systems/LabeledInput';
import Text from '@/components/systems/Text';
import Title from '@/components/systems/Title';

// Search.auth = true;

export default function Search() {
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
  }, [addAuthorsHistory, addBooksHistory, data, searchHistory.authors, searchHistory.books]);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (query !== '') {
      router.push(`?q=${query}`);
    } else {
      router.push(`/search`);
    }
  }

  if (error) {
    return (
      <Layout title='Search - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Search - MyVacation' description='Search - MyVacation'>
      <Title>Search</Title>

      <form className='mt-4' onSubmit={handleSubmit}>
        <div className='flex items-end gap-2'>
          <LabeledInput
            wrapperClassName='w-full sm:max-w-sm'
            name='search'
            placeholder='Search Title, Author, ISBN'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <Button type='submit' value='Submit' className='mb-4 !py-2.5 px-5'>
            Search
          </Button>
        </div>
      </form>

      {search ? (
        <>
          {!data && <Text>Searching &#8220;{search}&#8221;...</Text>}

          {data?.books.length < 1 && data?.authors.length < 1 ? (
            <div className='mt-8 rounded border border-red-500 p-3'>
              <p className='text-red-500'>{`No results for "${query || search}"`}</p>
            </div>
          ) : null}

          {data?.books.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Books
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

          {data?.authors.length > 0 ? (
            <>
              <Heading h3 className='mt-6'>
                Authors
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
      ) : searchHistory.books.length > 0 || searchHistory.authors.length > 0 ? (
        <>
          <div className='mt-6 flex items-center justify-between'>
            <Heading h2 className='!mb-0 text-[22px]'>
              Recent Search
            </Heading>
            <button
              onClick={resetAllSearchHistory}
              className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500'
            >
              Clear All
            </button>
          </div>

          {searchHistory.books.length > 0 ? (
            <>
              <div className='mb-6 mt-6 flex items-center justify-between'>
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
                  <div key={index} className='relative'>
                    <BookListItem
                      href={`/book/detail/${item.id}`}
                      image={item.image_small?.replace('SX50', 'SX150').replace('SY75', 'SX150')}
                      title={item.title}
                      published={item.published}
                    />
                    <button
                      title='Delete'
                      onClick={() => removeBooksHistory(item.id)}
                      className={twMerge(
                        'absolute -left-1 -top-1 rounded px-1.5 py-0.5 text-xs font-medium',
                        'bg-red-500 text-white transition-all hover:bg-red-600',
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
            <>
              <div className='mb-4 mt-8 flex items-center justify-between'>
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
                  <div key={index} className='relative'>
                    <AuthorListItem
                      href={`/author/detail/${item.id}`}
                      image={item.image}
                      name={item.name}
                      web={item.web}
                    />
                    <button
                      title='Delete'
                      onClick={() => removeAuthorsHistory(item.id)}
                      className={twMerge(
                        'absolute -left-1 -top-1 rounded-full px-1.5 py-0.5 text-xs font-medium',
                        'bg-red-500 text-white transition-all hover:bg-red-600',
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
    </Layout>
  );
}
