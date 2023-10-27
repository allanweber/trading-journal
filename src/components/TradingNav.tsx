'use client';

import { cn } from '@/lib/utils';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';

const NavItems = [
  {
    key: 'Dashboard',
    href: '/trading/dashboard',
  },
  {
    key: 'Journals',
    href: '/trading/journals',
  },
  {
    key: 'Trades',
    href: '/trading/entries',
  },
];

export default function TradingNav() {
  const pathname = usePathname();

  const active = (path: string) => pathname.includes(path);

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      <Link href={'/trading/dashboard'}>
        <Icons.logo className="h-8 w-8" />
      </Link>

      {NavItems.map((item) => (
        <Link
          key={item.href}
          href={`${item.href}`}
          className={cn(
            'text-muted-foreground ',
            active(item.href) ? 'text-primary border-b border-gray-900' : null,
            'text-sm font-medium transition-colors hover:text-primary'
          )}
        >
          {active(item.href) ? <h1>{item.key}</h1> : <span>{item.key}</span>}
        </Link>
      ))}
    </nav>
  );
}
