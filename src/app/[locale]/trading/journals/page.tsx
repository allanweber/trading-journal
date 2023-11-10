import DateDisplay from '@/components/DateDisplay';
import NumberDisplay from '@/components/NumberDisplay';
import { TablePagination } from '@/components/TablePagination';
import DataTableLink from '@/components/datatable/DataTableLink';
import JournalHeader from '@/components/journals/JournalHeader';
import JournalSearch from '@/components/journals/JournalSearch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getJournals } from '@/lib/journals';
import { EditIcon, TrashIcon } from 'lucide-react';

export default async function Journals({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    currency?: string;
    pageSize?: string;
  };
}) {
  const { data: journals, ...pagination } = await getJournals(
    searchParams?.query,
    searchParams?.currency?.split(','),
    searchParams?.pageSize ? parseInt(searchParams?.pageSize, 10) : undefined
  );

  return (
    <>
      <JournalHeader />
      <JournalSearch />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead className="text-right">Start Balance</TableHead>
              <TableHead className="w-[100px]">Currency</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journals && journals.length ? (
              journals.map((journal) => (
                <TableRow key={journal._id}>
                  <TableCell className="font-medium">
                    <DataTableLink href={`/trading/journals/${journal._id}`}>
                      {journal.name}
                    </DataTableLink>
                  </TableCell>
                  <TableCell>
                    <DateDisplay value={journal.startDate} />
                  </TableCell>
                  <TableCell className="text-right">
                    <NumberDisplay
                      value={journal.startBalance}
                      currency={journal.currency}
                    />
                  </TableCell>
                  <TableCell>{journal.currency}</TableCell>
                  <TableCell className="text-right">
                    <div className="max-w-[45px] flex justify-between">
                      <DataTableLink href={`/trading/journals/${journal._id}`}>
                        <EditIcon className="h-4 w-4" />
                      </DataTableLink>
                      <TrashIcon className="h-4 w-4" />
                      {/* <ActionConfirmation
                        actionTitle="Delete"
                        onConfirm={() => console.log('delete')}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </ActionConfirmation> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No journals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination {...pagination} />
    </>
  );
}
