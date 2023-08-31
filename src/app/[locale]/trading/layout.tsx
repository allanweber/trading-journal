//TODO: remove
'use client';

import NextAuthProvider from '@/app/context/NextAuthProvider';
import LocaleSelect from '@/components/LocaleSelect';
import TradingNav from '@/components/TradingNav';
import UserNav from '@/components/UserNav';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { ReactNode } from 'react';

export default function TradingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NextAuthProvider>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TradingNav />
            <div className="ml-auto flex items-center space-x-4">
              {/* TODO: remove */}
              <Button onClick={() => signIn()}>Login</Button>
              <LocaleSelect />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </NextAuthProvider>
    </>
  );
}
