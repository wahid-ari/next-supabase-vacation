import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';

import island from '@/data/island.json';
import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        // /api/generate/island?id=1
        const { data } = await supabase.from('vacation_island').select(`*`).eq('id', query.id).order('id');
        res.status(200).json(data);
        return;
      } else if (query.generate == 'true') {
        // /api/generate/island?generate=true
        const island_data = [];
        for (const item of island) {
          let nameSlug = slug(item.name);

          const { data: isSlugExist } = await supabase
            .from('vacation_island')
            .select(`*`)
            .eq('slug', nameSlug)
            .order('id');
          // if slug already exist, add island.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: island } = await supabase.from('vacation_island').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${island.length + 1}`;
          }
          island_data.push({
            ...item,
            slug: nameSlug,
          });
        }
        const { data } = await supabase.from('vacation_island').insert(island_data);
        res.status(200).json(data);
        return;
      } else {
        // /api/generate/island
        const { data } = await supabase.from('vacation_island').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
