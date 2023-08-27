import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return (
    <>
      <h2>{dict.hello.title}</h2>
      <p>{dict.hello.text}</p>
    </>
  );
}
