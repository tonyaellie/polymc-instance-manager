import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import uploadIcon from '../utils/icons/file_upload_black_24dp.svg';

const Upload = () => (
  <form className="m-4" method="post" action="/api/instance">
    <input type="file" name="instance" />
    <input type="submit" value="Upload!" className="p-1 border-2 rounded-sm" />
  </form>
);

export default Upload;
