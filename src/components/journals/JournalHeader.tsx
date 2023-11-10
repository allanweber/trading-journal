import { useTranslations } from 'next-intl';
import { Action, PageHeader, Subtitle, Title } from '../PageHeader';
import CreateJournal from './CreateJournal';

export default function JournalHeader() {
  const t = useTranslations('journals');
  return (
    <PageHeader>
      <div>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </div>
      <Action>
        <CreateJournal />
      </Action>
    </PageHeader>
  );
}
