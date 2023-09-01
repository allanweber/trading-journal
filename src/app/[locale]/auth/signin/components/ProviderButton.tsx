'use client';

import { signIn } from 'next-auth/react';

export default function ProviderButton({ provider }: { provider: any }) {
  return (
    <div key={provider.name}>
      <button
        onClick={() =>
          signIn(provider.id, {
            redirect: true,
            callbackUrl: '/',
          })
        }
      >
        Sign in with {provider.name}
      </button>
    </div>
  );
}
