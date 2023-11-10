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
        // api/destination
        const { data } = await supabase.from('vacation_category').select(`*`).order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        // api/destination?slug=slug&seo=true
        const { data } = await supabase.from('vacation_category').select(`name`).eq('slug', query.slug).single();
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
        // api/destination?slug=slug
        // api/destination?id=1
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data: category } = await supabase.from('vacation_category').select(`*`).eq(column, param).order('id');
        const { data: destination_category } = await supabase
          .from('vacation_destination_category')
          .select(`*`)
          .eq('category_id', category[0].id)
          .order('id');
        const { data: destinations } = await supabase
          .from('vacation_destination')
          .select(
            `id, name, slug, location, image_url, description, vacation_island (id, name, slug), vacation_province (id, name, slug)`,
          )
          .order('id');

        const destination_by_category = [];
        for (const destination of destinations) {
          for (const category of destination_category) {
            if (category.destination_id == destination.id) {
              destination_by_category.push({
                ...destination,
              });
            }
          }
        }
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...category[0], destinations: destination_by_category });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        const isValid = schema.safeParse(body);
        // TODO Docs https://github.com/colinhacks/zod/issues/1190#issuecomment-1171607138
        if (isValid.success == false) {
          res.status(422).json({ error: isValid.error.issues });
          return;
        }
        // if (!body.name) {
        //   res.status(422).json({ error: 'Name required' });
        //   return;
        // } else if (!body.image_url) {
        //   res.status(422).json({ error: 'Image URL required' });
        //   return;
        // }
        else {
          let nameSlug = slug(body.name);
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
          const { error } = await supabase.from('vacation_category').insert([
            {
              slug: nameSlug,
              name: body.name,
              image_url: body.image_url,
            },
          ]);
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'category');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add category' });
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
          res.status(422).json({ error: isValid.error.issues });
          return;
        }
        // if (!body.name) {
        //   res.status(422).json({ error: 'Name required' });
        //   return;
        // } else if (!body.image_url) {
        //   res.status(422).json({ error: 'Image URL required' });
        //   return;
        // }
        else {
          const { error } = await supabase
            .from('vacation_category')
            .update({
              name: body.name,
              image_url: body.image_url,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'category', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update category' });
        }
      }
      break;

    case 'DELETE':
      // Check session
      const sessionDelete = await getSessionToken(res, header, token);
      if (sessionDelete) {
        if (!query.id) {
          res.status(422).json({ error: 'Id required' });
          return;
        } else {
          const { error } = await supabase.from('vacation_category').delete().eq('id', query.id);
          if (error) {
            res.status(422).json({ error: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'category', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete category' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
