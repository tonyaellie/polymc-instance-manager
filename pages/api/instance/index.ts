import AdmZip from 'adm-zip';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { polymc } from '../../../utils/config';
import getInstances from '../../../utils/getInstances';

export const config = {
  api: {
    bodyParser: false
  }
};

// export default async (req: any, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }


//   console.log(files);
//   const file = files.file;
//   const name = file.originalFilename;

//   if ((await getInstances()).includes(name)) {
//     return res.status(409);
//   }

//   if (file.mimetype !== 'application/zip') {
//     return res.status(415);
//   }

//   const zip = new AdmZip(file.filepath);

//   zip.extractAllTo(
//     join(polymc, 'instances', name.substring(0, name.length - 4))
//   );

//   res.send('success');
//   return res.status(201).send('');
// };
