'use client';

import { trpc } from '@/app/_trpc/client';
import { Title } from '@radix-ui/react-toast';
import { useTranslations } from 'next-intl';
import { MessageDisplay } from '../MessageDisplay';
import { PageHeader, Subtitle } from '../PageHeader';
import JournalForm from './JournalForm';
import { JournalSkeleton } from './Skeletons';

export default function EditJournal({ journalId }: { journalId: string }) {
  const t = useTranslations('journals');

  const { data, isLoading, isSuccess, error } =
    trpc.journal.single.useQuery(journalId);

  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('edit-journal')}</Title>
          {isSuccess && <Subtitle>{data.name}</Subtitle>}
        </div>
      </PageHeader>
      {isLoading ? (
        <JournalSkeleton />
      ) : error ? (
        <MessageDisplay message={error} variant="destructive" />
      ) : isSuccess ? (
        <JournalForm journal={data} />
      ) : null}
    </>
  );
}
