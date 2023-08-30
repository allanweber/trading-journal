'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next/link';

export default function TradingNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations('nav');

  const pathname = usePathname();

  const active = (path: string): string | null => {
    if (pathname.includes(path)) {
      return 'text-primary border-b border-gray-900';
    }
    return null;
  };

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="./dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary text-muted-foreground ${active(
          'trading/dashboard'
        )}`}
      >
        {t('dashboard')}
      </Link>
      <Link
        href="./entries"
        className={`text-sm font-medium transition-colors hover:text-primary text-muted-foreground  ${active(
          'trading/entries'
        )}`}
      >
        {t('entries')}
      </Link>
    </nav>
  );
}
