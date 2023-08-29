import { useTranslations } from 'next-intl';

export default function Entries() {
  const t = useTranslations('entries');
  return <div>{t('title')}</div>;
}
