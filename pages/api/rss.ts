import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: books } = await supabase
        .from('book_books')
        .select(`title, description, slug, created_at`)
        .order('id');
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json({ books });
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
