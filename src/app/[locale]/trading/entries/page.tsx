import AddEntryButton from '@/components/AddEntryButton';
import { Action, PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { useTranslations } from 'next-intl';

export default function Entries() {
  const t = useTranslations('entries');
  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </div>
        <Action>
          <AddEntryButton />
        </Action>
      </PageHeader>
    </>
  );
}
