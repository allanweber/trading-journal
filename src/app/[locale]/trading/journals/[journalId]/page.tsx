'use client';

import { trpc } from '@/app/_trpc/client';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { useTranslations } from 'next-intl';
import JournalForm from '../components/JournalForm';

export default function Page({ params }: { params: { journalId: string } }) {
  const t = useTranslations('journals');
  const { data: journal, error } = trpc.journal.useQuery(params.journalId);

  return (
    <>
      <PageHeader>
        <Title>
          {t('new-journal')}
          <Subtitle>{t('edit-journal')}</Subtitle>
        </Title>
      </PageHeader>
      <ErrorDisplay error={error} />
      <JournalForm />
    </>
  );
}
