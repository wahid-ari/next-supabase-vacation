import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';
import { z } from 'zod';

import { getSessionToken, supabase, writeLogs } from '@/libs/supabase';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  // image_url: z.string().min(1, { message: 'Image URL is required' }).url({ message: 'Invalid Image URL' }),
  // TODO Docs https://zod.dev/?id=unions
  image_url: z.string().url({ message: 'Invalid Image URL' }),
  description: z.string().min(8, { message: 'Description is required' }),
  content: z.string().min(12, { message: 'Content is required' }),
  // FIX change to this when deployed
  // description: z.string().min(80, { message: 'Description is required' }),
  // content: z.string().min(100, { message: 'Content is required' }),
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
          .from('vacation_destination')
          .select(
            `id, name, slug, image_url, description, location, vacation_island (id, name, slug), vacation_province (id, name, slug)`,
          )
          .order('id');
        res.status(200).json(data);
        return;
      } else if (query.slug && query.seo) {
        // api/province?slug=slug&seo=true
        const { data } = await supabase
          .from('vacation_destination')
          .select(`name, description`)
          .eq('slug', query.slug)
          .single();
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json(data);
        return;
      } else {
        // api/province?slug=slug
        // api/province?id=1
        let column = query.id ? 'id' : 'slug';
        let param = query.id ? query.id : query.slug;
        const { data: categories } = await supabase.from('vacation_category').select(`*`).order('id');
        const { data: destination } = await supabase
          .from('vacation_destination')
          .select(
            `id, name, slug, image_url, description, video_url, location, content, header_image_url, vacation_island (id, name, slug), vacation_province (id, name, slug)`,
          )
          .eq(column, param)
          .order('id');
        let destinationId = destination[0].id;
        const { data: destination_categories } = await supabase
          .from('vacation_destination_category')
          .select(`*`)
          .eq('destination_id', destinationId)
          .order('id');

        const destination_with_category = [];
        for (const destination_category of destination_categories) {
          for (const category of categories) {
            if (destination_category.category_id == category.id) {
              destination_with_category.push({
                id: category.id,
                name: category.name,
                slug: category.slug,
              });
            }
          }
        }
        // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
        res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
        res.status(200).json({ ...destination[0], category_array: destination_with_category });
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
        } else {
          let nameSlug = slug(body.name);
          const { data: isSlugExist } = await supabase
            .from('vacation_destination')
            .select(`*`)
            .eq('slug', nameSlug)
            .order('id');
          // if slug already exist, add destination.length + 1 to slug to make it unique
          if (isSlugExist.length > 0) {
            const { data: destination } = await supabase.from('vacation_destination').select(`id`, { count: 'exact' });
            nameSlug = `${nameSlug}-${destination.length + 1}`;
          }
          // insert destination
          const { data, error } = await supabase
            .from('vacation_destination')
            .insert([
              {
                slug: nameSlug,
                name: body.name,
                image_url: body.image_url,
                header_image_url: body.header_image_url,
                description: body.description,
                content: body.content,
                video_url: body.video_url,
                location: body.location,
                island_id: body.island_id,
                province_id: body.province_id,
              },
            ])
            .select();
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // get destination id after inserting
          const destinationId = data[0].id;
          // if new destination have category
          if (body.category?.length > 0) {
            // create array of category of a destination
            let category = [];
            body.category?.forEach((item: any) => {
              category.push({
                destination_id: destinationId,
                category_id: item.value,
              });
            });
            // insert category of a destination to vacation_destination_category table
            const { error } = await supabase.from('vacation_destination_category').insert(category);
            if (error) {
              res.status(422).json({ error: error.message });
              return;
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPost.user_id, 'create', 'destination');
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success add destination' });
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
        } else {
          // update destination
          const { error } = await supabase
            .from('vacation_destination')
            .update({
              name: body.name,
              image_url: body.image_url,
              header_image_url: body.header_image_url,
              description: body.description,
              content: body.content,
              video_url: body.video_url,
              location: body.location,
              island_id: body.island_id,
              province_id: body.province_id,
            })
            .eq('id', body.id);
          if (error) {
            res.status(422).json({ error: error.message });
            return;
          }
          // delete category related to edited destination
          const { error: errorDestinationCategory } = await supabase
            .from('vacation_destination_category')
            .delete()
            .eq('destination_id', body.id);
          if (errorDestinationCategory) {
            res.status(422).json({ error: errorDestinationCategory.message });
            return;
          }
          // if edited destination have category
          if (body.category?.length > 0) {
            // create array of category of a edited destination
            let category = [];
            body.category.forEach((item: any) => {
              category.push({
                destination_id: body.id,
                category_id: item.value,
              });
            });
            // insert category of a edited destination to vacation_destination_category table
            const { error } = await supabase.from('vacation_destination_category').insert(category);
            if (error) {
              res.status(422).json({ error: error.message });
              return;
            }
          }
          // Write logs
          const errorLogs = await writeLogs(sessionPut.user_id, 'update', 'destination', body.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(201).json({ message: 'Success update destination' });
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
          // delete category related to destination in vacation_destination_category table
          const { error: errorDestinationCategory } = await supabase
            .from('vacation_destination_category')
            .delete()
            .eq('destination_id', query.id);
          const { error } = await supabase.from('vacation_destination').delete().eq('id', query.id);
          if (error || errorDestinationCategory) {
            res.status(422).json({ error: error.message, detail: error.details });
            return;
          }
          // Write logs
          const errorLogs = await writeLogs(sessionDelete.user_id, 'delete', 'destination', query.id);
          if (errorLogs) {
            res.status(422).json({ error: error.message });
            return;
          }
          res.status(200).json({ message: 'Success delete destination' });
        }
      }
      break;

    default:
      res.status(200).json('Method required');
      break;
  }
}
