import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { useTranslations } from 'next-intl';
import JournalForm from '../components/JournalForm';

export default function Page() {
  const t = useTranslations('journals');
  return (
    <>
      <PageHeader>
        <Title>
          {t('new-journal')}
          <Subtitle>{t('new-journal-description')}</Subtitle>
        </Title>
      </PageHeader>
      <JournalForm />
    </>
  );
}
