import { Action, PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { JournalTable } from './components/JournalTable';

export default function Journals() {
  const t = useTranslations('journals');
  return (
    <>
      <PageHeader>
        <div>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </div>
        <Action>
          <Button asChild>
            <Link href="/trading/journals/new">{t('create')}</Link>
          </Button>
        </Action>
      </PageHeader>
      <JournalTable />
    </>
  );
}
