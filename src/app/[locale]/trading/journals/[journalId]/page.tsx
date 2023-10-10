import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { useTranslations } from 'next-intl';
import JournalForm from '../components/JournalForm';

export default function Page({ params }: { params: { journalId: string } }) {
  const t = useTranslations('journals');

  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('new-journal')}</Title>
          <Subtitle>{t('edit-journal')}</Subtitle>
        </div>
      </PageHeader>
      <JournalForm journalId={params.journalId} />
    </>
  );
}
