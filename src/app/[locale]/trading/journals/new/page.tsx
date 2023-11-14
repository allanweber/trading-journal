import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { useTranslations } from 'next-intl';
import JournalForm from '../../../../../components/journals/JournalForm';

export default function Page() {
  const t = useTranslations('journals');
  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('new-journal')}</Title>
          <Subtitle>{t('new-journal-description')}</Subtitle>
        </div>
      </PageHeader>
      <JournalForm />
    </>
  );
}
