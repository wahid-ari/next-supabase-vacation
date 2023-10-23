import { NextApiRequest, NextApiResponse } from 'next';
import books from '@/data/books.json';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  // Removing tags_array
  for (const quote of books) {
    delete quote.genre_array;
  }

  switch (method) {
    case 'GET':
      if (!query.generate) {
        const { data } = await supabase.from('book_books').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
        return;
      } else if (query.generate == 'true') {
        const { data } = await supabase.from('book_books').insert(books);
        res.status(200).json(data);
        return;
      } else {
        const { data } = await supabase
          .from('book_books')
          .select(`*, book_books (*), book_books_books (*)`)
          .eq('id', query.id)
          .order('id');
        res.status(200).json(data);
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
