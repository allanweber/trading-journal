'use client';

import { trpc } from '@/app/_trpc/client';
import AddEntryButton from '@/components/AddEntryButton';
import { Action, PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { EntryTable } from './components/EntryTable';

function LoadingJournals() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

function PageAction({
  loading,
  hasJournals,
  addJournalTitle,
}: {
  loading: boolean;
  hasJournals: boolean;
  addJournalTitle: string;
}) {
  const locale = useLocale();
  if (loading) return null;
  if (hasJournals) return <AddEntryButton />;
  return (
    <Button asChild>
      <Link href={`/${locale}/trading/journals/new`}>{addJournalTitle}</Link>
    </Button>
  );
}

export default function Entries() {
  const t = useTranslations('entries');
  const { data: journals, isLoading, isSuccess } = trpc.journal.list.useQuery();
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
            hasJournals={isSuccess && journals.length > 0}
            addJournalTitle={t('add-journal')}
          />
        </Action>
      </PageHeader>
      {isLoading ? (
        <LoadingJournals />
      ) : (
        <EntryTable journals={journals ?? []} />
      )}
    </>
  );
}
