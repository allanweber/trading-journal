import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trading Journal',
  description: 'A trading journal for stock traders',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <meta name="referrer" content="no-referrer" />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          <body className={inter.className}>
            <main>{children}</main>
            <Toaster />
          </body>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
