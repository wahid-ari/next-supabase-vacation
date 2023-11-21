import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  // video_url: z.string().min(1, { message: 'Video URL is required' }),
  // TODO Docs https://zod.dev/?id=unions
  video_url: z.string().url({ message: 'Invalid Video URL' }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      const { data } = await supabase
        .from('vacation_video')
        .select(`id, title, video_url, vacation_island (id, name, slug), vacation_province (id, name, slug)`)
        .order('id');
      res.status(200).json(data);
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        const isValid = schema.safeParse(body);
        // TODO Docs https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
        if (isValid.success == false) {
          res.status(422).json({ message: isValid.error.issues });
          return;
        }
        // if (!body.title) {
        //   res.status(422).json({ message: 'Title required' });
        //   return;
        // } else if (!body.video_url) {
        //   res.status(422).json({ message: 'Video URL required' });
        //   return;
        // }
        else {
          const { error } = await supabase.from('vacation_video').insert([
            {
              title: body.title,
              video_url: body.video_url,
              island_id: body.island_id,
              province_id: body.province_id,
            },
          ]);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'video');
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add video' });
        }
      }
      break;

    case 'PUT':
      // Check session
      const sessionPut = await getSessionToken(res, header, token);
      if (sessionPut) {
        const isValid = schema.safeParse(body);
        // TODO Docs https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
        if (isValid.success == false) {
          res.status(422).json({ message: isValid.error.issues });
          return;
        }
        // if (!body.title) {
        //   res.status(422).json({ message: 'Title required' });
        //   return;
        // } else if (!body.video_url) {
        //   res.status(422).json({ message: 'Video URL required' });
        //   return;
        // }
        else {
          const { error } = await supabase
            .from('vacation_video')
            .update({
              title: body.title,
              video_url: body.video_url,
              island_id: body.island_id,
              province_id: body.province_id,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'video', body.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update video' });
        }
      }
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          res.status(422).json({ message: 'Id required' });
          return;
        } else {
          const { error } = await supabase.from('vacation_video').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ message: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'video', query.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete video' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
