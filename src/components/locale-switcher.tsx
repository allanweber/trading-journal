'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toggle } from './ui/toggle';

export default function LocaleSwitcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<String>();
  const pathName = usePathname();

  useEffect(() => {
    const segments = pathName.split('/');
    setCurrentLocale(segments[1]);
  }, [pathName]);

  const handleLocaleChange = (locale: string) => {
    if (!pathName) router.push('/');
    const segments = pathName.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <>
      <Toggle
        variant="outline"
        pressed={currentLocale === 'en'}
        onPressedChange={(pressed) => handleLocaleChange('en')}
        size="sm"
      >
        En
      </Toggle>
      <Toggle
        variant="outline"
        pressed={currentLocale === 'pt'}
        onPressedChange={(pressed) => handleLocaleChange('pt')}
        size="sm"
        className="ml-2"
      >
        Pt
      </Toggle>
    </>
  );
}
