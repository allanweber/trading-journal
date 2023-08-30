'use client';

import { usePathname, useRouter } from 'next/navigation';
import English from './English';
import Portuguese from './Portuguese';
import { Toggle } from './ui/toggle';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = pathName.split('/')[1];

  const handleLocaleChange = (locale: string) => {
    if (!pathName) router.push('/');
    const segments = pathName.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <>
      <Toggle
        pressed={currentLocale === 'en'}
        onPressedChange={(pressed) => handleLocaleChange('en')}
        size="sm"
      >
        <English width="24" height="24" />
      </Toggle>
      <Toggle
        pressed={currentLocale === 'pt'}
        onPressedChange={(pressed) => handleLocaleChange('pt')}
        size="sm"
      >
        <Portuguese width="24" height="24" />
      </Toggle>
    </>
  );
}
