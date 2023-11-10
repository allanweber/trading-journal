'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function CreateJournal() {
  const locale = useLocale();
  const t = useTranslations('journals');
  return (
    <Button asChild>
      <Link href={`/${locale}/trading/journals/new`}>{t('create')}</Link>
    </Button>
  );
}
