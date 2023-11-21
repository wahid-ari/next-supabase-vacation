import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      if (!body.user_id) {
        res.status(422).json({ message: 'User id required' });
        return;
      } else if (!body.token) {
        res.status(422).json({ message: 'Token required' });
        return;
      } else {
        const { error } = await supabase.from('vacation_session').delete().eq('token', body.token);
        if (error) {
          res.status(422).json({ message: error.message });
          return;
        }
        res.status(200).json({ message: 'Success delete session' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
