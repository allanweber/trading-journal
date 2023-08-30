'use client';

import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next/link';

const NavItems = [
  {
    key: 'dashboard',
    href: '/trading/dashboard',
  },
  {
    key: 'entries',
    href: '/trading/entries',
  },
];

export default function TradingNav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const active = (path: string) => pathname.includes(path);

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {NavItems.map((item) => (
        <Link
          key={item.href}
          href={`/${locale}/${item.href}`}
          className={cn(
            'text-muted-foreground ',
            active(item.href) ? 'text-primary border-b border-gray-900' : null,
            'text-sm font-medium transition-colors hover:text-primary'
          )}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}
