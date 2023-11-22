import EditJournal from '@/components/journals/EditJournal';

export default async function Page({
  params,
}: {
  params: { journalId: string };
}) {
  return (
    <>
      <EditJournal journalId={params.journalId} />
    </>
  );
}
