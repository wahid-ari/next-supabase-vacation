import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  // image_url: z.string().min(1, { message: 'Image URL is required' }).url({ message: 'Invalid Image URL' }),
  // TODO Docs https://zod.dev/?id=unions
  image_url: z.string().url({ message: 'Invalid Image URL' }),
  // TODO Docs https://github.com/colinhacks/zod/discussions/1254#discussioncomment-6395482
  url: z.string().url({ message: 'Invalid Content URL' }).optional().or(z.literal('')),
  content: z.string().min(50, { message: 'Content must be 50 or more characters long' }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id) {
        // api/inspiration
        const { data } = await supabase.from('vacation_inspiration').select(`*`).order('id');
        res.status(200).json(data);
        return;
      } else {
        // api/inspiration?id=1
        const { data } = await supabase
          .from('vacation_inspiration')
          .select(`*`)
          .eq('id', query?.id)
          .order('id');
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...data[0] });
      }
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
        } else {
          // insert inspiration
          const { error } = await supabase
            .from('vacation_inspiration')
            .insert([
              {
                title: body.title,
                image_url: body.image_url,
                url: body.url,
                content: body.content,
                latlng: body.latlng,
              },
            ])
            .select();
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'inspiration');
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add inspiration' });
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
        } else {
          // update inspiration
          const { error } = await supabase
            .from('vacation_inspiration')
            .update({
              title: body.title,
              image_url: body.image_url,
              url: body.url,
              content: body.content,
              latlng: body.latlng,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'inspiration', body.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update inspiration' });
          return;
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
          const { error } = await supabase.from('vacation_inspiration').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ message: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'inspiration', query.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete inspiration' });
          return;
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
