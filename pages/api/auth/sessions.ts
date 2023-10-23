import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json({ authenticated: !!session, message: 'You are not logged in' });
        return;
      }
      res.status(200).json({ authenticated: !!session, session });
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
