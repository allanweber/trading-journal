import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';

export default async function Entries({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return <div>{dict.entries.title}</div>;
}
