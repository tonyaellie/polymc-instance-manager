import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { polymc } from '../../../utils/config';
import getInstances from '../../../utils/getInstances';
import AdmZip from 'adm-zip';
import rimraf from 'rimraf';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req;
  if (Array.isArray(id)) {
    return res.status(400).end('error invalid id');
  }
  switch (method) {
    case 'GET':
      if (!(await getInstances()).includes(id)) {
        return res.status(404).end('instance not found');
      }

      const zip = new AdmZip();
      zip.addLocalFolder(join(polymc, 'instances', id));

      const fileName = `${id}.zip`;
      const fileType = 'application/zip';

      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': fileType
      });

      const download = zip.toBuffer();

      res.end(download);
      break;
    case 'DELETE':
      return new Promise<void>(async (resolve, reject) => {
        if (!(await getInstances()).includes(id)) {
          console.log(id, await getInstances());
          res.status(404).end('instance not found');
          resolve();
          return;
        }

        rimraf(join(polymc, 'instances', id), () => {
          res.status(200).end('instance deleted');
          resolve();
        });
      });

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
