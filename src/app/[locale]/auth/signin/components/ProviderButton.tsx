'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const providers = [
  {
    id: 'google',
    logo: <Icons.google className="mr-2 h-4 w-4" />,
  },
];

export default function ProviderButton({ provider }: { provider: any }) {
  const providerLogo = providers.find((p) => p.id === provider.id)?.logo;
  return (
    <Button
      type="button"
      onClick={() =>
        signIn(provider.id, {
          redirect: true,
          callbackUrl: '/',
        })
      }
    >
      {providerLogo}
      {provider.name}
    </Button>
  );
}
