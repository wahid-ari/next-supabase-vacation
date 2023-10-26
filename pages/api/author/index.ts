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
        const { data } = await supabase.from('book_authors').select(`*`).order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        const { data } = await supabase.from('book_authors').select(`name, bio`).eq('slug', query.slug).single();
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data }: any = await supabase
          .from('book_authors')
          .select(
            `*, book_quotes (id, quote), book_books (id, slug, title, pages, language, published, link, image, image_small)`
          )
          .eq(column, param)
          .order('id');
        const { book_books, book_quotes } = data[0];
        delete data[0].book_books;
        delete data[0].book_quotes;
        const ready = {
          ...data[0],
          books: book_books,
          quotes: book_quotes,
        };
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        // res.status(200).json(data[0]);
        res.status(200).json(ready);
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
          return;
        } else {
          let nameSlug = slug(body.name);
          const { data: isSlugExist } = await supabase
            .from('book_authors')
            .select(`*`)
            .eq('slug', nameSlug)
            .order('id');
          // if slug already exist, add authors.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: authors } = await supabase.from('book_authors').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${authors.length + 1}`;
          }
          const { error } = await supabase.from('book_authors').insert([
            {
              slug: nameSlug,
              name: body.name,
              link: body.link,
              image: body.image,
              born: body.born,
              web: body.web,
              bio: body.bio,
            },
          ]);
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'author');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add author' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
          return;
        } else {
          const { error } = await supabase
            .from('book_authors')
            .update({
              name: body.name,
              link: body.link,
              image: body.image,
              born: body.born,
              web: body.web,
              bio: body.bio,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'author', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update author' });
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
          const { error } = await supabase.from('book_authors').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ error: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'author', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete author' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
