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
      // const { data: books } = await supabase.from('book_books').select(`*`).textSearch('title_isbn', `'${query.q}'`);
      // const { data: authors } = await supabase.from('book_authors').select(`*`).textSearch('name', `'${query.q}'`);
      const { data: destination } = await supabase
        .from('vacation_destination')
        .select(
          `id, name, slug, image_url, description, location, vacation_island (id, name, slug), vacation_province (id, name, slug)`
        )
        .textSearch('name', `'${query.q}'`);
      const { data: island } = await supabase.from('vacation_island').select(`*`).textSearch('name', `'${query.q}'`);
      const { data: province } = await supabase
        .from('vacation_province')
        .select(`*`)
        .textSearch('name', `'${query.q}'`);
      const { data: video } = await supabase.from('vacation_video').select(`*`).textSearch('title', `'${query.q}'`);
      const { data: category } = await supabase
        .from('vacation_category')
        .select(`*`)
        .textSearch('name', `'${query.q}'`);
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({ books, authors });
      res.status(200).json({ destination, island, province, video, category });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
