import logger from '@tonyaellie/logger';
import { readdirSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { polymc, port } from './config.json';
import express from 'express';
import AdmZip from 'adm-zip';
import fileUpload, { UploadedFile } from 'express-fileupload';
// import rimraf from 'rimraf';

const getInstances = async () => {
  const dirs = (
    await readdir(join(polymc, 'instances'), { withFileTypes: true })
  )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const dirsFiltered = dirs.filter((dir) => {
    return readdirSync(join(polymc, 'instances', dir)).includes('instance.cfg');
  });

  return dirsFiltered;
};

const app = express();

app.use(fileUpload());

app.get('/', (req, res) => {
  res.send(`<html>
  <body>
    <form ref='uploadForm' 
      id='uploadForm' 
      action='http://localhost:3000/instance' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="instanceZip" />
        <input type='submit' value='Upload!' />
    </form>     
  </body>
</html>
`);
});

app.get('/instances', async (req, res) => {
  res.send(await getInstances());
});

app.get('/instance/:id', async (req, res) => {
  const id = req.params.id;
  if (!(await getInstances()).includes(id)) {
    return res.sendStatus(404);
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
});

app.post('/instance', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console.info(req.files);

  const instanceZip = req.files.instanceZip as UploadedFile;
  const name = instanceZip.name;

  if ((await getInstances()).includes(name)) {
    return res.sendStatus(409);
  }

  if (instanceZip.mimetype !== 'application/zip') {
    return res.sendStatus(415);
  }

  const zip = new AdmZip(instanceZip.data);

  zip.extractAllTo(
    join(polymc, 'instances', name.substring(0, name.length - 4))
  );

  res.send('success');
});

// app.delete('/instance/:id', async (req, res) => {
//   const id = req.params.id;
//   if (!(await getInstances()).includes(id)) {
//     return res.sendStatus(404);
//   }
//   rimraf(join(polymc, 'instances', id));
// });

app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
});
