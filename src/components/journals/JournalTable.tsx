import DateDisplay from '@/components/DateDisplay';
import NumberDisplay from '@/components/NumberDisplay';
import DataTableLink from '@/components/datatable/DataTableLink';
import { TablePagination } from '@/components/table/TablePagination';
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
import { Separator } from '../ui/separator';

export default async function JournalTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    currency?: string;
    pageSize?: string;
    page?: string;
  };
}) {
  const { data: journals, ...pagination } = await getJournals(
    searchParams?.query,
    searchParams?.currency?.split(','),
    searchParams?.pageSize ? parseInt(searchParams?.pageSize, 10) : undefined,
    searchParams?.page ? parseInt(searchParams?.page, 10) : undefined
  );

  return (
    <>
      <div className="md:hidden rounded-md border min-w-full">
        {journals?.map((journal) => (
          <>
            <div key={journal._id} className="mb-2 w-full rounded-md p-4">
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">{journal.name}</p>
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p>
                    <DateDisplay value={journal.startDate} />
                  </p>
                  <NumberDisplay
                    value={journal.startBalance}
                    currency={journal.currency}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <DataTableLink href={`/trading/journals/${journal._id}`}>
                    <EditIcon className="h-4 w-4" />
                  </DataTableLink>
                  <TrashIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
            <Separator />
          </>
        ))}
      </div>
      <div className="hidden rounded-md border min-w-full md:table">
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
                      <DataTableLink href={`/trading/journals/${journal._id}`}>
                        <TrashIcon className="h-4 w-4" />
                      </DataTableLink>
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
