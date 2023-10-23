import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Select from 'react-select';
import { mutate } from 'swr';

import { useAuthorsData, useBookData, useGenresData } from '@/libs/swr';
import useToast from '@/hooks/use-hot-toast';

import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import SearchBox from '@/components/systems/SearchBox';
import Shimmer from '@/components/systems/Shimmer';
import TextArea from '@/components/systems/TextArea';
import Title from '@/components/systems/Title';

Book.auth = true;

export default function Book() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { data, error } = useBookData(id);
  const { data: authors, error: errorAuthors } = useAuthorsData();
  const { data: genres, error: errorGenres } = useGenresData();
  const { updateToast, pushToast } = useToast();
  const [editItem, setEditItem] = useState({
    author_id: null,
    title: '',
    isbn: '',
    language: '',
    pages: '',
    published: null,
    link: '',
    image: '',
    description: '',
  });
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [queryAuthor, setQueryAuthor] = useState('');
  const [selectedGenres, setSelectedGenres] = useState();
  const [listOfGenres, setListOfGenres] = useState();
  const filteredAuthor =
    queryAuthor === ''
      ? authors
      : authors.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryAuthor.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (data) {
      setEditItem({
        author_id: data.book_authors?.id,
        title: data.title,
        isbn: data.isbn,
        language: data.language,
        pages: data.pages,
        published: data.published,
        link: data.link,
        image: data.image,
        description: data.description,
      });
      setSelectedAuthor({ id: data.book_authors?.id, name: data.book_authors?.name });
    }
  }, [data]);

  // if user selecting author, set author id
  useEffect(() => {
    if (selectedAuthor) setEditItem((editItem) => ({ ...editItem, author_id: selectedAuthor.id }));
  }, [selectedAuthor]);

  // convert genres data from db (id, name) to match with react-select requirement (value, label)
  // set current quote genres
  useEffect(() => {
    // list of all genres
    if (genres) {
      let listGenres = [];
      genres?.forEach((item: any) => {
        listGenres.push({
          value: item.id,
          label: item.name,
        });
      });
      // @ts-ignore
      setListOfGenres(listGenres);
    }
    // list current quote genres
    if (data && genres) {
      let bookCurrentGenres = [];
      for (const bookGenre of data?.genre_array) {
        for (const item of genres) {
          if (item.id == bookGenre.id) {
            bookCurrentGenres.push({
              value: item.id,
              label: item.name,
            });
          }
        }
      }
      // @ts-ignore
      setSelectedGenres(bookCurrentGenres);
    }
  }, [data, genres]);

  // if user selecting genres, set genres
  useEffect(() => {
    // use if here to fix data missing when reopening edit page
    if (selectedGenres) {
      // @ts-ignore
      setEditItem({ ...editItem, genre: selectedGenres });
    }
  }, [selectedGenres]);

  async function handleEdit(e) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Updating book',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`, { id: id, ...editItem });
      if (res.status == 201) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`);
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book?id=${id}`);
        router.push('/book');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    }
  }

  if (error || errorAuthors || errorGenres) {
    return (
      <Layout title='Edit Book - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit ${data ? data?.title + ' - MyVacation' : 'Book - MyVacation'}`} description='Edit Book - MyVacation'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>Edit {data?.title}</Title> : <Title>Edit Book</Title>}
      </div>

      {data ? (
        <form onSubmit={handleEdit} className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
          <div>
            <LabeledInput
              label='Title'
              type='text'
              name='title'
              value={editItem.title}
              onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
              placeholder='Book Title'
            />

            {listOfGenres ? (
              <>
                <Label htmlFor='genre' className='my-2'>
                  Genre
                </Label>
                <Select
                  options={listOfGenres}
                  isMulti
                  noOptionsMessage={() => 'Not Found'}
                  value={selectedGenres}
                  // @ts-ignore
                  onChange={setSelectedGenres}
                  placeholder='Search and Select Genre'
                  name='genre'
                  className='mb-4 rounded'
                  classNamePrefix='react-select'
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: `#0ea5e9`,
                      primary25: `#0ea5e9`,
                      primary50: `#0ea5e9`,
                      neutral40: `#EF4444`,
                    },
                  })}
                />
              </>
            ) : (
              <Shimmer className='h-10' />
            )}

            {filteredAuthor ? (
              <SearchBox
                label='Author'
                value={selectedAuthor}
                placeholder='Search and Select Author'
                onChange={setSelectedAuthor}
                onChangeQuery={(e) => setQueryAuthor(e.target.value)}
                afterLeave={() => setQueryAuthor('')}
                filtered={filteredAuthor}
                query={queryAuthor}
              />
            ) : (
              <Shimmer className='h-10' />
            )}

            <LabeledInput
              wrapperClassName='mt-0.5'
              label='Image URL (Optional)'
              type='text'
              name='image'
              value={editItem.image}
              onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
              placeholder='https://images.gr-assets.com/books/1630199330p5/153394.jpg'
            />

            <TextArea
              label='Description (Optional)'
              name='description'
              height={4}
              value={editItem.description}
              onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              placeholder='Book Description'
            />
          </div>
          <div>
            <LabeledInput
              label='ISBN (Optional)'
              type='number'
              min={0}
              name='isbn'
              value={editItem.isbn}
              onChange={(e) => setEditItem({ ...editItem, isbn: e.target.value })}
              placeholder='9780684830490'
              onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
            />

            <LabeledInput
              label='Language (Optional)'
              type='text'
              name='language'
              value={editItem.language}
              onChange={(e) => setEditItem({ ...editItem, language: e.target.value })}
              placeholder='English'
            />

            <LabeledInput
              label='Total Page (Optional)'
              type='number'
              min={0}
              name='pages'
              value={editItem.pages}
              onChange={(e) => setEditItem({ ...editItem, pages: e.target.value })}
              placeholder='100'
              onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
            />

            <LabeledInput
              label='Published Date (Optional)'
              type='date'
              name='published'
              value={editItem.published}
              onChange={(e) => setEditItem({ ...editItem, published: e.target.value })}
              placeholder='2023-05-05'
            />

            <LabeledInput
              label='GoodReads URL (Optional)'
              type='text'
              name='goodreads'
              value={editItem.link}
              onChange={(e) => setEditItem({ ...editItem, link: e.target.value })}
              placeholder='https://www.goodreads.com/book/show/2767052-the-hunger-games'
            />

            <Button type='submit' className='mt-2 py-2 w-full'>
              Update
            </Button>
          </div>
        </form>
      ) : (
        <div className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
          <div>
            {[...Array(4).keys()].map((_, i) => (
              <Shimmer key={i} className='mb-4 p-2'>
                <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </Shimmer>
            ))}

            <Shimmer className='mb-4 p-2'>
              <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-24 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          </div>
          <div>
            {[...Array(5).keys()].map((_, i) => (
              <Shimmer key={i} className='mb-4 p-2'>
                <div className='h-4 w-16 mb-2 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
                <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              </Shimmer>
            ))}

            <Shimmer className='mt-8 p-2'>
              <div className='h-6 rounded bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </Shimmer>
          </div>
        </div>
      )}
    </Layout>
  );
}
