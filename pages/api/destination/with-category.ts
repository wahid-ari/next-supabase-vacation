import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      const { data: destinations } = await supabase
        .from('vacation_destination')
        .select(
          `id, name, slug, image_url, description, location, vacation_island (id, name, slug), vacation_province (id, name, slug)`,
        )
        .order('id');
      const { data: categories } = await supabase.from('vacation_category').select(`id, name, slug`).order('id');
      const { data: destination_categories } = await supabase
        .from('vacation_destination_category')
        .select(`id, destination_id, category_id`)
        .order('id');

      // TODO FIRST comparing destination table with destination_category table
      // comparing destination table with destination_category table to get all category id related to destination
      const destinations_with_all_categories_id = [];
      // iterate per destination
      for (const destination of destinations) {
        // to temporary save each destination categories
        let categories_array = [];
        // iterate per destination_category
        for (const destination_category of destination_categories) {
          // if match, push to categories_array
          if (destination?.id == destination_category?.destination_id) {
            categories_array.push({
              ...destination_category,
            });
          }
        }
        // console.log(categories_array);
        // [
        //   {
        //     id: 1,
        //     destination_id: 1,
        //     category_id: 2,
        //   },
        //   {
        //     id: 2,
        //     destination_id: 1,
        //     category_id: 3,
        //   }
        // ]
        // push destination with categories_array
        destinations_with_all_categories_id.push({
          ...destination,
          category_array: categories_array,
        });
      }
      // console.log(destinations_with_all_categories_id);
      // [
      //   {
      //     id: 1,
      //     name: "Kintamani: Bali's Scenic Gem",
      //     slug: 'kintamani-balis-scenic-gem',
      //     category_array: [
      //       {
      //         id: 1,
      //         destination_id: 1,
      //         category_id: 2,
      //       },
      //       {
      //         id: 2,
      //         destination_id: 1,
      //         category_id: 3,
      //       },
      //     ],
      //   }
      // ]
      // --------------------------------------------------------------------------------------------------------------
      // TODO SECOND comparing destination table with category table
      // from object above we can compare the category_array key to category table
      // comparing destinations_with_all_categories_id variabel with category table to get all category name related to destination
      const destination_with_all_categories_name = [];
      for (const destination of destinations_with_all_categories_id) {
        let temp = [];
        for (const item of destination?.category_array) {
          for (const category of categories) {
            if (item?.category_id == category?.id) {
              temp.push({
                ...category,
              });
            }
          }
        }
        // console.log(temp)
        // [
        //   { id: 2, name: 'Beach', slug: 'beach' },
        //   { id: 3, name: 'Lake', slug: 'lake' }
        // ]
        // push destination with each category related to destination
        // here we change the structure of object
        delete destination?.category_array;
        destination_with_all_categories_name.push({
          ...destination,
          categories: temp,
        });
      }
      // console.log(destination_with_all_categories_name);
      // [
      //   {
      //     id: 1,
      //     name: "Kintamani: Bali's Scenic Gem",
      //     slug: 'kintamani-balis-scenic-gem',
      //     categories: [
      //       {
      //         id: 2,
      //         name: 'Beach',
      //         slug: 'beach',
      //       },
      //       {
      //         id: 3,
      //         name: 'Lake',
      //         slug: 'lake',
      //       },
      //     ],
      //   },
      // ]
      // TODO Docs https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
      res.status(200).json(destination_with_all_categories_name);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
