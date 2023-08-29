import TradingNav from '@/components/TradingNav';
import LocaleSwitcher from '@/components/locale-switcher';
import { ReactNode } from 'react';

export default function TradingLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <LocaleSwitcher />
      <TradingNav />
      {children}
    </main>
  );
}
