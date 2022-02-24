import type { NextApiRequest, NextApiResponse } from 'next';
import getInstances from '../../utils/getInstances';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  res.send(await getInstances());
};
