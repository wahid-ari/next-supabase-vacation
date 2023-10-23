import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (!query.q) {
        res.status(200).json({ message: 'Query Required' });
        return;
      }
      // TODO Docs https://supabase.com/docs/guides/database/full-text-search#search-multiple-columns
      // create function in supabase > sql editor > new query
      // create function title_isbn(book_books) returns text as $$
      //   select $1.title || ' ' || $1.isbn;
      // $$ language sql immutable;
      const { data: books } = await supabase.from('book_books').select(`*`).textSearch('title_isbn', `'${query.q}'`);
      const { data: authors } = await supabase.from('book_authors').select(`*`).textSearch('name', `'${query.q}'`);
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json({ books, authors });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
