import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';
import Link from 'next/link';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Link href="/hello">Hello</Link>
      <h2>{dict.home.title}</h2>
      <p>{dict.home.text}</p>
    </>
  );
}
