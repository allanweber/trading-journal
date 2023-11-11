import Loading from '@/components/Loading';
import JournalHeader from '@/components/journals/JournalHeader';
import JournalSearch from '@/components/journals/JournalSearch';
import JournalTable from '@/components/journals/JournalTable';
import { getJournals } from '@/lib/journals';
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
  const { data: journals, ...pagination } = await getJournals(
    searchParams?.query,
    searchParams?.currency?.split(','),
    searchParams?.pageSize ? parseInt(searchParams?.pageSize, 10) : undefined,
    searchParams?.page ? parseInt(searchParams?.page, 10) : undefined
  );

  return (
    <>
      <JournalHeader />
      <JournalSearch />
      <Suspense fallback={<Loading />}>
        <JournalTable journals={journals} pagination={pagination} />
      </Suspense>
    </>
  );
}
