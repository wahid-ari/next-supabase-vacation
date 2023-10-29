import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { data: destination } = await supabase.from('vacation_destination').select(`slug`).order('id');
      const { data: category } = await supabase.from('vacation_category').select(`slug`).order('id');
      const { data: island } = await supabase.from('vacation_island').select(`slug`).order('id');
      const { data: province } = await supabase.from('vacation_province').select(`slug`).order('id');
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json({ destination, category, island, province });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
