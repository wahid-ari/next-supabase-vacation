import { NextApiRequest, NextApiResponse } from 'next';
import video from '@/data/video.json';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      // /api/generate/video?generate=true
      if (query.generate == 'true') {
        const { data } = await supabase.from('vacation_video').insert(video);
        res.status(200).json(data);
        return;
      }
      // /api/generate/video
      else {
        const { data } = await supabase.from('vacation_video').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
