import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: category } = await supabase.from('vacation_category').select(`id`, { count: 'exact' });
      // const { count: category } = await supabase.from('vacation_category').select(`*`, { count: 'exact', head: true });
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({
      //   category: category,
      // });
      res.status(200).json({
        category: category.length,
      });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
