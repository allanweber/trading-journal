import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

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
  return (
    <ClerkProvider>
      <html lang="en">
        <meta name="referrer" content="no-referrer" />
        <Providers>
          <body className={inter.className}>
            <main>{children}</main>
            <Toaster />
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
