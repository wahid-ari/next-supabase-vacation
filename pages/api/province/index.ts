import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';
import { z } from 'zod';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  // image_url: z.string().min(1, { message: 'Image URL is required' }).url({ message: 'Invalid Image URL' }),
  // TODO Docs https://zod.dev/?id=unions
  image_url: z.string().url({ message: 'Invalid Image URL' }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id && !query.slug) {
        // api/province
        const { data } = await supabase
          .from('vacation_province')
          .select(`id, slug, name, image_url, vacation_island (id, name, slug), vacation_destination (id, name, slug)`)
          .order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        // api/province?slug=slug&seo=true
        const { data } = await supabase.from('vacation_province').select(`name`).eq('slug', query.slug).single();
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
        // api/province?slug=slug
        // api/province?id=1
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data: province } = await supabase
          .from('vacation_province')
          .select(`*, vacation_island (id, name, slug)`)
          .eq(column, param)
          .order('id');
        const { data: destinations } = await supabase
          .from('vacation_destination')
          .select(
            `id, name, slug, image_url, description, location, vacation_island (id, name, slug), vacation_province (id, name, slug)`,
          )
          .eq('province_id', province[0]?.id)
          .order('id');
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...province[0], destinations });
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
        }
        // if (!body.name) {
        //   res.status(422).json({ message: 'Name required' });
        //   return;
        // } else if (!body.image_url) {
        //   res.status(422).json({ message: 'Image URL required' });
        //   return;
        // }
        else {
          let nameSlug = slug(body.name);
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
          const { error } = await supabase.from('vacation_province').insert([
            {
              slug: nameSlug,
              name: body.name,
              image_url: body.image_url,
              island_id: body.island_id,
            },
          ]);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'province');
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add province' });
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
        // if (!body.name) {
        //   res.status(422).json({ message: 'Name required' });
        //   return;
        // } else if (!body.image_url) {
        //   res.status(422).json({ message: 'Image URL required' });
        //   return;
        // }
        else {
          const { error } = await supabase
            .from('vacation_province')
            .update({
              name: body.name,
              image_url: body.image_url,
              island_id: body.island_id,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ message: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'province', body.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update province' });
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
          const { error } = await supabase.from('vacation_province').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ message: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'province', query.id);
          if (errorLogs) {
            res.status(422).json({ message: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete province' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
