'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next/link';

const sidebarNavItems = [
  {
    key: 'settings',
    href: '/trading/user/settings',
  },
  {
    key: 'profile',
    href: '/trading/user/profile',
  },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('user-nav');
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={`/${locale}/${item.href}`}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  );
}
