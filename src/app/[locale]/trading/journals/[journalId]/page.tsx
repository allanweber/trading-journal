import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { getJournal } from '@/lib/journals';
import { Journal } from '@/model/journal';
import { useTranslations } from 'next-intl';
import JournalForm from '../../../../../components/journals/JournalForm';

const JournalHeader = ({ journal }: { journal: Journal }) => {
  const t = useTranslations('journals');
  return (
    <PageHeader>
      <div>
        <Title>{t('edit-journal')}</Title>
        <Subtitle>{journal.name}</Subtitle>
      </div>
    </PageHeader>
  );
};

export default async function Page({
  params,
}: {
  params: { journalId: string };
}) {
  const journal = await getJournal(params.journalId);
  return (
    <>
      <JournalHeader journal={journal} />
      <JournalForm journal={journal} />
    </>
  );
}
