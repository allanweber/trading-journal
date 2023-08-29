import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import Link from 'next/link';

type Props = {
  lang: Locale;
};

export default async function TradingNav(props: Props) {
  const dict = await getDictionary(props.lang);
  return (
    <nav>
      <span>
        <Link href={`./dashboard`}>{dict.nav.dashboard}</Link>
      </span>
      <span className="ml-2">
        <Link href={`./entries`}>{dict.nav.entries}</Link>
      </span>
    </nav>
  );
}
