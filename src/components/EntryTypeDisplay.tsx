import { EntryType, getEntryType } from '@/model/entryType';

export default function EntryTypeDisplay({
  entryType,
}: {
  entryType: EntryType;
}) {
  const entry = getEntryType(entryType);
  return (
    <>
      {entry && (
        <div className="flex flex-row items-center">
          <entry.icon className="mr-1 h-4 w-4" />
          <span>{entry.type}</span>
        </div>
      )}
    </>
  );
}
