import { JournalsTableSkeleton } from '@/components/Skeletons';
import JournalHeader from '@/components/journals/JournalHeader';
import JournalSearch from '@/components/journals/JournalSearch';
import JournalTable from '@/components/journals/JournalTable';
import { Suspense } from 'react';

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
  const params = new URLSearchParams(searchParams);
  return (
    <>
      <JournalHeader />
      <JournalSearch />
      <Suspense key={params.toString()} fallback={<JournalsTableSkeleton />}>
        <JournalTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}
