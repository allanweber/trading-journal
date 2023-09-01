import { getProviders } from 'next-auth/react';

export default async function SigninForm() {
  const providers: any = await getProviders();
  return <div>SigninForm</div>;
}
