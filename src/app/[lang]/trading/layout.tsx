import TradingNav from '@/components/TradingNav';
import LocaleSwitcher from '@/components/locale-switcher';
import { Locale, i18n } from '@/i18n-config';
import { ReactNode } from 'react';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function TradingLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <main>
      <LocaleSwitcher />
      <TradingNav lang={lang} />
      {children}
    </main>
  );
}
