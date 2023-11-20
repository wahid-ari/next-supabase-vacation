import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({});
      break;

    case 'POST':
      res.status(200).json({ message: 'Success add' });
      break;

    case 'PUT':
      res.status(201).json({ message: 'Success update' });
      break;

    case 'DELETE':
      res.status(200).json({ message: 'Success delete' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
