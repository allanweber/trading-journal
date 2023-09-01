'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import English from './English';
import Portuguese from './Portuguese';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const locales = [
  {
    locale: 'en',
    label: 'english',
    icon: <English width="24" height="24" />,
  },
  {
    locale: 'pt',
    label: 'portuguese',
    icon: <Portuguese width="24" height="24" />,
  },
];

export default function LocaleSelect() {
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations('locale-select');
  const currentLocale = locales.find(
    (locale) => locale.locale === pathName.split('/')[1]
  );

  const handleLocaleChange = (locale: string) => {
    if (!pathName) router.push('/');
    const segments = pathName.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 rounded-full">
          <Avatar className="h-8 w-8 bg-transparent">
            <AvatarFallback className="bg-transparent">
              {currentLocale?.icon}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem asChild key={locale.locale}>
            <Button
              variant="ghost"
              onClick={() => handleLocaleChange(locale.locale)}
            >
              {locale.icon} <span className="ml-2">{t(locale.label)}</span>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
