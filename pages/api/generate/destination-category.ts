import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';

import destination from '@/data/destination.json';
import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  // Removing url
  // for (const item of destination) {
  //   delete item.url;
  // }

  switch (method) {
    case 'GET':
      // /api/generate/destination-category
      const { data } = await supabase.from('vacation_destination_category').select(`*`).order('id');
      res.status(200).send(JSON.stringify(data, null, 2));
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
