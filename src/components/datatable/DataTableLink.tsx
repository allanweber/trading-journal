import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
  [key: string]: any;
};

export default function DataTableLink({ children, href, ...props }: Props) {
  return (
    <Link
      href={href}
      className="hover:bg-transparent hover:underline"
      {...props}
    >
      {children}
    </Link>
  );
}
