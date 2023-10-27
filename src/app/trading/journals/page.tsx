import { Action, PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { JournalTable } from './components/JournalTable';

export default function Journals() {
  return (
    <>
      <PageHeader>
        <div>
          <Title>journals</Title>
          <Subtitle>Manage your journals</Subtitle>
        </div>
        <Action>
          <Button asChild>
            <Link href="/trading/journals/new">Create a new journal</Link>
          </Button>
        </Action>
      </PageHeader>
      <JournalTable />
    </>
  );
}
