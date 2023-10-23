import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Select from 'react-select';
import { mutate } from 'swr';

import { useAuthorsData, useGenresData } from '@/libs/swr';
import useToast from '@/hooks/use-hot-toast';

import Layout from '@/components/layout/Layout';
import Button from '@/components/systems/Button';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import SearchBox from '@/components/systems/SearchBox';
import Shimmer from '@/components/systems/Shimmer';
import Text from '@/components/systems/Text';
import TextArea from '@/components/systems/TextArea';
import Title from '@/components/systems/Title';

Book.auth = true;

export default function Book() {
  const router = useRouter();
  const { data: authors, error: errorAuthors } = useAuthorsData();
  const { data: genres, error: errorGenres } = useGenresData();
  const { updateToast, pushToast } = useToast();
  const [createItem, setCreateItem] = useState({
    author_id: null,
    title: '',
    isbn: '',
    language: '',
    pages: '',
    published: '',
    link: '',
    image: '',
    description: '',
  });
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [queryAuthor, setQueryAuthor] = useState('');
  const filteredAuthor =
    queryAuthor === ''
      ? authors
      : authors.filter((item: any) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryAuthor.toLowerCase().replace(/\s+/g, ''))
        );
  const [selectedGenres, setSelectedGenres] = useState();
  const [listOfGenres, setListOfGenres] = useState();

  // if user selecting author, set author id
  useEffect(() => {
    if (selectedAuthor) setCreateItem((createItem) => ({ ...createItem, author_id: selectedAuthor.id }));
  }, [selectedAuthor]);

  // convert genres data from db (id, name) to match with react-select requirement (value, label)
  useEffect(() => {
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
  }, [genres]);

  // if user selecting tags, set tags
  useEffect(() => {
    // @ts-ignore
    setCreateItem({ ...createItem, genre: selectedGenres });
  }, [selectedGenres]);

  async function handleSave(e) {
    e.preventDefault();
    const toastId = pushToast({
      message: 'Creating book',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`, createItem);
      if (res.status == 200) {
        updateToast({ toastId, message: res?.data?.message, isError: false });
        mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/book`);
        router.push('/book');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    }
  }

  if (errorAuthors || errorGenres) {
    return (
      <Layout title='Add Book - MyVacation'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Create Book - MyVacation' description='Create New Book - MyVacation'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Create Book</Title>
      </div>

      <form onSubmit={handleSave} className='grid grid-cols-1 gap-x-8 md:grid-cols-2'>
        <div>
          <LabeledInput
            label='Title'
            type='text'
            name='title'
            value={createItem.title}
            onChange={(e) => setCreateItem({ ...createItem, title: e.target.value })}
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
            <>
              <Text>Genre</Text>
              <Shimmer className='h-10 mb-4 mt-2' />
            </>
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
            <>
              <Text>Author</Text>
              <Shimmer className='h-10 mb-4 mt-2' />
            </>
          )}

          <LabeledInput
            wrapperClassName='mt-0.5'
            label='Image URL (Optional)'
            type='text'
            name='image'
            value={createItem.image}
            onChange={(e) => setCreateItem({ ...createItem, image: e.target.value })}
            placeholder='https://images.gr-assets.com/books/1630199330p5/153394.jpg'
          />

          <TextArea
            label='Description (Optional)'
            name='description'
            height={4}
            value={createItem.description}
            onChange={(e) => setCreateItem({ ...createItem, description: e.target.value })}
            placeholder='Book Description'
          />
        </div>
        <div>
          <LabeledInput
            label='ISBN (Optional)'
            type='number'
            min={0}
            name='isbn'
            value={createItem.isbn}
            onChange={(e) => setCreateItem({ ...createItem, isbn: e.target.value })}
            placeholder='9780684830490'
            onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />

          <LabeledInput
            label='Language (Optional)'
            type='text'
            name='language'
            value={createItem.language}
            onChange={(e) => setCreateItem({ ...createItem, language: e.target.value })}
            placeholder='English'
          />

          <LabeledInput
            label='Total Page (Optional)'
            type='number'
            min={0}
            name='pages'
            value={createItem.pages}
            onChange={(e) => setCreateItem({ ...createItem, pages: e.target.value })}
            placeholder='100'
            onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />

          <LabeledInput
            label='Published Date (Optional)'
            type='date'
            name='published'
            value={createItem.published}
            onChange={(e) => setCreateItem({ ...createItem, published: e.target.value })}
            placeholder='2023-05-05'
          />

          <LabeledInput
            label='GoodReads URL (Optional)'
            type='text'
            name='goodreads'
            value={createItem.link}
            onChange={(e) => setCreateItem({ ...createItem, link: e.target.value })}
            placeholder='https://www.goodreads.com/book/show/2767052-the-hunger-games'
          />

          <Button.success type='submit' className='mt-2 py-2 w-full'>
            Save
          </Button.success>
        </div>
      </form>
    </Layout>
  );
}
