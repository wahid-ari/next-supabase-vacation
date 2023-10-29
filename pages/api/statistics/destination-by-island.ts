import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: vacation_island } = await supabase
        .from('vacation_island')
        .select(`*, vacation_destination (*)`)
        .order('id');
      // Make an array of object structure
      let items = [];
      for (const island of vacation_island) {
        items.push({
          id: island.id,
          label: island.name,
          total: island.vacation_destination.length,
        });
      }
      let sortedData = items.sort((a: any, b: any) => b.total - a.total).slice(0, 10);
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json(sortedData);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
