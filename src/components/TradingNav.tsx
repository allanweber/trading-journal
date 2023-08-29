import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function TradingNav() {
  const t = useTranslations('nav');

  return (
    <nav>
      <span>
        <Link href={`./dashboard`}>{t('dashboard')}</Link>
      </span>
      <span className="ml-2">
        <Link href={`./entries`}>{t('entries')}</Link>
      </span>
    </nav>
  );
}
