import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: island } = await supabase.from('vacation_island').select(`id`, { count: 'exact' });
      // const { count: island } = await supabase.from('vacation_island').select(`*`, { count: 'exact', head: true });
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({
      //   island: island,
      // });
      res.status(200).json({
        island: island.length,
      });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
