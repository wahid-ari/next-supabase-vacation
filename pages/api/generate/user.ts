import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcryptjs';

import { supabase } from '@/libs/supabase';

const admin_datas = [
  {
    name: 'Admin',
    username: 'admin',
    password: '',
    type: 'admin',
  },
  {
    name: 'Develop',
    username: 'develop',
    password: '',
    type: 'admin',
  },
  {
    name: 'User',
    username: 'user',
    password: '',
    type: 'user',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      if (query.id) {
        // /api/generate/user?id=1
        const { data } = await supabase.from('vacation_user').select(`*`).eq('id', query.id).order('id');
        res.status(200).json(data);
        return;
      } else if (query.generate == 'true') {
        // /api/generate/user?generate=true
        const admin_data_hashed = [];
        for (const item of admin_datas) {
          let password_hashed = await hash(item.password, 8);
          admin_data_hashed.push({
            ...item,
            password: password_hashed,
          });
        }
        // const admin_data_original = [];
        // for (const item of admin_data_hashed) {
        //   let password_original = await compare('', item.password);
        //   admin_data_original.push({
        //     ...item,
        //     password: password_original,
        //   });
        // }
        const { data } = await supabase.from('vacation_user').insert(admin_data_hashed);
        res.status(200).json(data);
        return;
      } else {
        // /api/generate/user
        const { data } = await supabase.from('vacation_user').select(`*`).order('id');
        res.status(200).send(JSON.stringify(data, null, 2));
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
