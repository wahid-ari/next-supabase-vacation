import { NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

export async function getSessionToken(res: NextApiResponse, header: string, token: string) {
  if (!header) return res.status(401).json({ message: 'Please provide bearer token in headers' });
  const { data } = await supabase.from('vacation_session').select('*').eq('token', token).single();
  if (data) return data;
  else res.status(401).json({ message: 'Token invalid' });
}

export async function writeLogs(user_id: number, action: string, table: string = '', data_id: string | string[] = '') {
  const { error } = await supabase.from('vacation_log').insert([
    {
      user_id: user_id,
      action: action,
      table: table,
      description: `user ${user_id} ${action} ${table} ${data_id}`,
    },
  ]);
  return error;
}

// TODO Docs https://github.com/orgs/supabase/discussions/1223
// getPagination() will result 0 - 9
// getPagination(1) will result 10 - 19
// getPagination(2) will result 20 - 29
// export function getPagination(page?: number, size: number = 10) {
//   const from = page ? page * size : 0;
//   const to = page ? from + size - 1 : size - 1;
//   return { from, to };
// }

// getPagination() will result 0 - 9
// getPagination(1) will result 0 - 9
// getPagination(2) will result 10 - 19
export function getPagination(page: number = 1, size: number = 10) {
  const from = page * size - size;
  const to = from + size - 1;
  return { from, to };
}
