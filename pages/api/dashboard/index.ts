import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: destination } = await supabase.from('vacation_destination').select(`id`, { count: 'exact' });
      const { data: category } = await supabase.from('vacation_category').select(`id`, { count: 'exact' });
      const { data: island } = await supabase.from('vacation_island').select(`id`, { count: 'exact' });
      const { data: province } = await supabase.from('vacation_province').select(`id`, { count: 'exact' });
      const { data: video } = await supabase.from('vacation_video').select(`id`, { count: 'exact' });
      const { data: inspiration } = await supabase.from('vacation_inspiration').select(`id`, { count: 'exact' });

      // const { count: destination } = await supabase.from('vacation_destination').select(`*`, { count: 'exact', head: true });
      // const { count: category } = await supabase.from('vacation_category').select(`*`, { count: 'exact', head: true });
      // const { count: island } = await supabase.from('vacation_island').select(`*`, { count: 'exact', head: true });
      // const { count: province } = await supabase.from('vacation_province').select(`*`, { count: 'exact', head: true });
      // const { count: video } = await supabase.from('vacation_video').select(`*`, { count: 'exact', head: true });
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      // res.status(200).json({
      //   destination: destination,
      //   category: category,
      //   island: island,
      //   province: province,
      //   video: video
      // });
      res.status(200).json({
        destination: destination.length,
        category: category.length,
        island: island.length,
        province: province.length,
        video: video.length,
        inspiration: inspiration.length,
      });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
