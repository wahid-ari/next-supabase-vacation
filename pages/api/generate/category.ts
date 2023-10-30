import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';

import category from '@/data/category.json';
import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        // /api/generate/category?id=1
        const { data } = await supabase.from('vacation_category').select(`*`).eq('id', query.id).order('id');
        res.status(200).json(data);
        return;
      } else if (query.generate == 'true') {
        // /api/generate/category?generate=true
        const category_data = [];
        for (const item of category) {
          let nameSlug = slug(item.name);

          const { data: isSlugExist } = await supabase
            .from('vacation_category')
            .select(`*`)
            .eq('slug', nameSlug)
            .order('id');
          // if slug already exist, add category.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: category } = await supabase.from('vacation_category').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${category.length + 1}`;
          }
          category_data.push({
            ...item,
            slug: nameSlug,
          });
        }
        const { data } = await supabase.from('vacation_category').insert(category_data);
        res.status(200).json(data);
        return;
      } else {
        // /api/generate/category
        const { data } = await supabase.from('vacation_category').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
