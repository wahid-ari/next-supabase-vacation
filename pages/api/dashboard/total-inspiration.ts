import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: inspiration } = await supabase.from('vacation_inspiration').select(`id`, { count: 'exact' });
      // const { count: inspiration } = await supabase.from('vacation_inspiration').select(`*`, { count: 'exact', head: true });
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({
      //   inspiration: inspiration,
      // });
      res.status(200).json({
        inspiration: inspiration.length,
      });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
