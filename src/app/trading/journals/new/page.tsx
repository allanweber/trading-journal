import { PageHeader, Subtitle, Title } from '@/components/PageHeader';
import JournalForm from '../components/JournalForm';

export default function Page() {
  return (
    <>
      <PageHeader>
        <div>
          <Title>New Journal</Title>
          <Subtitle>Create a new journal to start trading</Subtitle>
        </div>
      </PageHeader>
      <JournalForm />
    </>
  );
}
