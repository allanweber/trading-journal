import { PageHeader, Title } from '@/components/PageHeader';
import JournalForm from '../components/JournalForm';

export default function Page({ params }: { params: { journalId: string } }) {
  return (
    <>
      <PageHeader>
        <div>
          <Title>Edit Journal</Title>
        </div>
      </PageHeader>
      <JournalForm journalId={params.journalId} />
    </>
  );
}
