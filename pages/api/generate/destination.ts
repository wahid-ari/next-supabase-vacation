import { NextApiRequest, NextApiResponse } from 'next';
import destination from '@/data/destination.json';
import slug from 'slug';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      // /api/generate/destination?id=1
      if (query.id) {
        const { data } = await supabase.from('vacation_destination').select(`*`).eq('id', query.id).order('id');
        res.status(200).json(data);
        return;
      }
      // /api/generate/destination?generate=true
      else if (query.generate == 'true') {
        const destination_data = [];
        for (const item of destination) {
          let nameSlug = slug(item.name);

          const { data: isSlugExist } = await supabase
            .from('vacation_destination')
            .select(`*`)
            .eq('slug', nameSlug)
            .order('id');
          // if slug already exist, add destination.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: destination } = await supabase.from('vacation_destination').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${destination.length + 1}`;
          }
          destination_data.push({
            ...item,
            slug: nameSlug,
          });
        }
        const { data } = await supabase.from('vacation_destination').insert(destination_data);
        res.status(200).json(data);
        return;
      }
      // /api/generate/destination
      else {
        const { data } = await supabase.from('vacation_destination').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
