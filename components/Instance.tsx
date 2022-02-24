import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import downloadIcon from '../utils/icons/file_download_black_24dp.svg';
import deleteIcon from '../utils/icons/delete_forever_black_24dp.svg';

type Props = {
  name: string;
};

const deleteInstance = (name: string) => {
  if (
    confirm(`About to delete: ${name}
This is permanent and will completely delete the instance.`)
  ) {
    fetch(`/api/instance/${name}`, { method: 'DELETE' });
  }
};

const Instance = ({ name }: Props) => (
  <div className="border-2 rounded-md w-48 h-16">
    <div className="text-lg">
      <abbr
        title={name.length > 16 ? name : null}
        className={name.length > 16 ? 'no-underline hover:cursor-help' : null}
      >
        {name.substring(0, 16)}
        {name.length > 16 ? '…' : null}
      </abbr>
    </div>
    <div>
      <Link href={`/api/instance/${name}`}>
        <a>
          <Image src={downloadIcon} />
        </a>
      </Link>
      <Image
        src={deleteIcon}
        className="hover:cursor-pointer"
        onClick={() => {
          deleteInstance(name);
        }}
      />
    </div>
  </div>
);

export default Instance;
