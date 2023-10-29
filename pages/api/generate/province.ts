import { NextApiRequest, NextApiResponse } from 'next';
import province from '@/data/province.json';
import slug from 'slug';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        // /api/generate/province?id=1
        const { data } = await supabase.from('vacation_province').select(`*`).eq('id', query.id).order('id');
        res.status(200).json(data);
        return;
      } else if (query.generate == 'true') {
        // /api/generate/province?generate=true
        const province_data = [];
        for (const item of province) {
          let nameSlug = slug(item.name);

          const { data: isSlugExist } = await supabase
            .from('vacation_province')
            .select(`*`)
            .eq('slug', nameSlug)
            .order('id');
          // if slug already exist, add province.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: province } = await supabase.from('vacation_province').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${province.length + 1}`;
          }
          province_data.push({
            ...item,
            slug: nameSlug,
          });
        }
        const { data } = await supabase.from('vacation_province').insert(province_data);
        res.status(200).json(data);
        return;
      } else {
        // /api/generate/province
        const { data } = await supabase.from('vacation_province').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
