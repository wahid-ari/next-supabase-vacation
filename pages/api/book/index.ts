import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id && !query.slug) {
        const { data } = await supabase
          .from('book_books')
          .select(`id, author_id, slug, title, language, pages, published, link, image, book_authors (id, slug, name)`)
          .order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        const { data } = await supabase.from('book_books').select(`title, description`).eq('slug', query.slug).single();
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data: genres } = await supabase.from('book_genres').select(`*`).order('id');
        const { data: books } = await supabase
          .from('book_books')
          .select(`*, book_authors (id, slug, name, image, bio, web)`)
          .eq(column, param)
          .order('id');
        let bookId = books[0].id;
        const { data: books_genres } = await supabase
          .from('book_books_genres')
          .select(`*`)
          .eq('book_id', bookId)
          .order('id');

        const books_with_genres = [];
        for (const books_genre of books_genres) {
          for (const genre of genres) {
            if (books_genre.genre_id == genre.id) {
              books_with_genres.push({
                id: genre.id,
                name: genre.name,
                slug: genre.slug,
              });
            }
          }
        }
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...books[0], genre_array: books_with_genres });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.title) {
          res.status(422).json({ error: 'Title required' });
          return;
        } else {
          let nameSlug = slug(body.title);
          const { data: isSlugExist } = await supabase.from('book_books').select(`*`).eq('slug', nameSlug).order('id');
          // if slug already exist, add books.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: books } = await supabase.from('book_books').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${books.length + 1}`;
          }
          // get genre string from array
          let genre_string = ',';
          body.genre?.forEach((item: any) => {
            genre_string = genre_string + ', ' + item.label;
          });
          let clean_genre_string = genre_string.replace(',,', '').replace(' ', '');
          // insert book
          const { data, error } = await supabase
            .from('book_books')
            .insert([
              {
                slug: nameSlug,
                author_id: body.author_id,
                title: body.title,
                isbn: body.isbn,
                language: body.language,
                pages: body.pages,
                published: body.published ? body.published : null,
                link: body.link,
                image: body.image,
                description: body.description,
                genre: clean_genre_string == ',' ? '' : clean_genre_string,
              },
            ])
            .select();
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // get book id after inserting
          const bookId = data[0].id;
          // if new book have genre
          if (body.genre?.length > 0) {
            // create array of genre of a book
            let genre = [];
            body.genre.forEach((item: any) => {
              genre.push({
                book_id: bookId,
                genre_id: item.value,
              });
            });
            // insert genre of a book to book_books_genres table
            const { error } = await supabase.from('book_books_genres').insert(genre);
            if (error) {
              res.status(422).json({ error: error.message });
              return;
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'book');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add book' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        if (!body.title) {
          res.status(422).json({ error: 'Title required' });
          return;
        } else {
          // get genre string from array
          let genre_string = ',';
          body.genre.forEach((item: any) => {
            genre_string = genre_string + ', ' + item.label;
          });
          let clean_genre_string = genre_string.replace(',,', '').replace(' ', '');
          // update book
          const { error } = await supabase
            .from('book_books')
            .update({
              author_id: body.author_id,
              title: body.title,
              isbn: body.isbn,
              language: body.language,
              pages: body.pages,
              published: body.published ? body.published : null,
              link: body.link,
              image: body.image,
              description: body.description,
              genre: clean_genre_string,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // delete genre related to edited book
          const { error: errorBooksGenres } = await supabase.from('book_books_genres').delete().eq('book_id', body.id);
          if (errorBooksGenres) {
            res.status(422).json({ error: errorBooksGenres.message });
            return;
          }
          // if edited book have genre
          if (body.genre?.length > 0) {
            // create array of genre of a edited book
            let genre = [];
            body.genre.forEach((item: any) => {
              genre.push({
                book_id: body.id,
                genre_id: item.value,
              });
            });
            // insert genre of a edited book to book_books_genres table
            const { error } = await supabase.from('book_books_genres').insert(genre);
            if (error) {
              res.status(422).json({ error: error.message });
              return;
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'book', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update book' });
        }
      }
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          res.status(422).json({ error: 'Id required' });
          return;
        } else {
          // delete genre related to book in book_books_genres table
          const { error: errorBooksGenres } = await supabase.from('book_books_genres').delete().eq('book_id', query.id);
          const { error } = await supabase.from('book_books').delete().eq('id', query.id);
          if (error || errorBooksGenres) {
            res.status(422).json({ error: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'book', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete book' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
