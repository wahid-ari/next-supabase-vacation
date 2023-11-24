import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: destination_categories } = await supabase
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
          total: 0,
        });
      }
      // console.log(items);
      // [
      //   {
      //     id: 1,
      //     label: 'Architecture',
      //     total: 0
      //   },
      //    {
      //     id: 2,
      //     label: 'Beach',
      //     total: 0
      //   }
      // ]
      // Count total destination that have same category
      let result = [];
      for (const item of items) {
        let filtered = destination_categories.filter((i) => i.category_id == item.id);
        result.push({
          ...item,
          total: filtered.length,
        });
      }
      // console.log(result)
      // [
      //   {
      //     id: 1,
      //     label: 'Architecture',
      //     total: 48,
      //   },
      //   {
      //     id: 2,
      //     label: 'Beach',
      //     total: 30,
      //   }
      // ]
      let sortedData = result.sort((a: any, b: any) => b.total - a.total).slice(0, 10);
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json(sortedData);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
