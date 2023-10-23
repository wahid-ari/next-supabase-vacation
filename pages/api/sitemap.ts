import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: books } = await supabase.from('book_books').select(`slug`).order('id');
      const { data: authors } = await supabase.from('book_authors').select(`slug`).order('id');
      const { data: genres } = await supabase.from('book_genres').select(`slug`).order('id');
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json({ books, authors, genres });
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
