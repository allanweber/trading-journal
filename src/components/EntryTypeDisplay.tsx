import { EntryType, getEntryType } from '@/model/entryType';
import { useTranslations } from 'next-intl';

export default function EntryTypeDisplay({
  entryType,
}: {
  entryType: EntryType;
}) {
  const t = useTranslations('trade-types');
  const entry = getEntryType(entryType);
  return (
    <>
      {entry && (
        <div className="flex flex-row items-center">
          <entry.icon className="mr-1 h-4 w-4" />
          <span>{t(entry.type)}</span>
        </div>
      )}
    </>
  );
}
