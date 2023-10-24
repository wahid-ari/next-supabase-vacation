import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const header = req.headers.authorization;
  const token = req.headers.authorization?.split(' ')[1] || '';

  switch (method) {
    case 'GET':
      if (!query.id && !query.slug) {
        const { data } = await supabase.from('vacation_category').select(`*`).order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        const { data } = await supabase.from('vacation_category').select(`name`).eq('slug', query.slug).single();
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
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
          .select(`*, vacation_island (*), vacation_province (*)`)
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
        res.status(200).json({ ...category[0], destination_by_category });
      }
      break;

    case 'POST':
      // Check session
      const sessionPost = await getSessionToken(res, header, token);
      if (sessionPost) {
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
          return;
        } else if (!body.image_url) {
          res.status(422).json({ error: 'Image required' });
          return;
        } else {
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
        if (!body.name) {
          res.status(422).json({ error: 'Name required' });
          return;
        } else if (!body.image_url) {
          res.status(422).json({ error: 'Image required' });
          return;
        } else {
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
