'use client';

import { trpc } from '@/app/_trpc/client';
import AddEntryButton from '@/components/AddEntryButton';
import Loading from '@/components/Loading';
import { Action, PageHeader, Subtitle, Title } from '@/components/PageHeader';
import CreateJournal from '@/components/journals/CreateJournal';
import { useTranslations } from 'next-intl';
import { EntryTable } from './components/EntryTable';

function LoadingJournals() {
  return <Loading />;
}

function PageAction({
  loading,
  hasJournals,
}: {
  loading: boolean;
  hasJournals: boolean;
}) {
  if (loading) return null;
  if (hasJournals) return <AddEntryButton />;
  return <CreateJournal />;
}

export default function Entries() {
  const t = useTranslations('entries');
  const { data, isLoading, isSuccess } = trpc.journal.list.useQuery();
  console.log(data);
  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </div>
        <Action>
          <PageAction
            loading={isLoading}
            hasJournals={isSuccess && data.total > 0}
          />
        </Action>
      </PageHeader>
      {isLoading ? (
        <LoadingJournals />
      ) : (
        <EntryTable journals={data?.data ?? []} />
      )}
    </>
  );
}
