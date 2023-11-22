import JournalHeader from '@/components/journals/JournalHeader';
import JournalSearch from '@/components/journals/JournalSearch';
import JournalTable from '@/components/journals/JournalTable';

export default async function Journals({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    currency?: string;
    pageSize?: string;
    page?: string;
  };
}) {
  return (
    <>
      <JournalHeader />
      <JournalSearch />
      <JournalTable searchParams={searchParams} />
    </>
  );
}
