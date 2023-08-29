import { getDictionary } from '@/dictionaries';
import { Locale } from '@/i18n-config';

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return <div>{dict.dashboard.title}</div>;
}
