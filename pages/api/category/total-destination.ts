import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  // FIX create this
  switch (method) {
    case 'GET':
      const { data: vacation_categories } = await supabase
        .from('vacation_destination_category')
        .select(`*`)
        .order('id');
      const { data: categories } = await supabase.from('vacation_category').select(`*`).order('id');
      // Make an array of object structure
      let items = [];
      for (const category of categories) {
        items.push({
          id: category.id,
          label: category.name,
          slug: category.slug,
          total: 0,
        });
      }
      // Count total vacation that have same category
      let result = [];
      for (const item of items) {
        for (const vacation_category of vacation_categories) {
          if (vacation_category.category_id == item.id) {
            let filtered = items.filter((i) => i.id == vacation_category.category_id)[0];
            filtered.total += 1;
            result.push(filtered);
          }
        }
      }
      // Remove duplicate values from an array of objects in javascript
      // TODO Docs https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
      let data = result.reduce((unique, o) => {
        if (!unique.some((obj: any) => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
      data.sort((a: any, b: any) => b.total - a.total);
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json(data);
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
