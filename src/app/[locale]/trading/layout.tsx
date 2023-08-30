import TradingNav from '@/components/TradingNav';
import LocaleSwitcher from '@/components/locale-switcher';
import { ReactNode } from 'react';

export default function TradingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TradingNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </>
  );
}
