import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'PolyMC Instance Manager' }: Props) => (
  <div className="text-center">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <footer>
      <span>
        © {new Date().getFullYear()}{' '}
        <Link href="https://github.com/tonyaellie/polymc-instance-manager">
          <span className="hover:text-green-600 cursor-pointer">
            contributors
          </span>
        </Link>
      </span>
    </footer>
  </div>
);

export default Layout;
