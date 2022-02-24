import { readdirSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { polymc } from './config';

export default async () => {
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
