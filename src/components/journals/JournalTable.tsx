'use client';

import DateDisplay from '@/components/DateDisplay';
import { TablePagination } from '@/components/table/TablePagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EditIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageDisplay } from '../MessageDisplay';
import { Separator } from '../ui/separator';
import JournalBalanceStatus from './JournalBalanceStatus';
import { JournalsTableSkeleton } from './Skeletons';

export default function JournalTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    currency?: string;
    pageSize?: string;
    page?: string;
  };
}) {
  const router = useRouter();
  create a hook to navigate with locale
  const {
    data: journals,
    isLoading,
    isSuccess,
    error,
  } = trpc.journal.list.useQuery({
    term: searchParams?.query,
    currencies: searchParams?.currency?.split(','),
    pageSize: searchParams?.pageSize
      ? parseInt(searchParams?.pageSize, 10)
      : undefined,
    pageNumber: searchParams?.page
      ? parseInt(searchParams?.page, 10)
      : undefined,
  });

  if (isLoading) {
    return <JournalsTableSkeleton />;
  }

  if (error) {
    return <MessageDisplay message={error} variant="destructive" />;
  }

  return (
    <>
      <div className="md:hidden rounded-md border min-w-full">
        {isSuccess &&
          journals?.data?.map((journal) => (
            <div
              key={journal._id}
              className="hover:bg-slate-200"
              onClick={() => navigate(`/trading/journals/${journal._id}`)}
            >
              <div className="mb-2 w-full rounded-md p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-medium">{journal.name}</p>
                </div>
                <div>
                  <p className="text-sm">{journal.description}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>
                      <DateDisplay value={journal.startDate} />
                    </p>
                  </div>
                  <div className="flex justify-end mb-2">
                    <JournalBalanceStatus journal={journal} />
                  </div>
                </div>
              </div>
              <Separator />
            </div>
          ))}
      </div>
      <div className="hidden rounded-md border min-w-full md:table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead> Balance</TableHead>
              <TableHead className="w-[100px]">Currency</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess &&
              (journals.pagination.total > 0 ? (
                journals.data.map((journal) => (
                  <TableRow key={journal._id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/trading/journals/${journal._id}`}
                        prefetch={false}
                      >
                        {journal.name}
                      </Link>
                    </TableCell>
                    <TableCell>{journal.description}</TableCell>
                    <TableCell>
                      <DateDisplay value={journal.startDate} />
                    </TableCell>
                    <TableCell>
                      <JournalBalanceStatus journal={journal} />
                    </TableCell>
                    <TableCell>{journal.currency}</TableCell>
                    <TableCell className="text-right">
                      <div className="max-w-[45px] flex justify-between">
                        <Link
                          href={`/trading/journals/${journal._id}`}
                          prefetch={false}
                        >
                          <EditIcon className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/trading/journals/${journal._id}`}
                          prefetch={false}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No journals found.
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {isSuccess && <TablePagination {...journals.pagination} />}
    </>
  );
}
