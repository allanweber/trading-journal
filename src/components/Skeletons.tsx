import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

export function JournalsTableSkeleton() {
  return (
    <div>
      <div className="md:hidden rounded-md border min-w-full">
        {Array.from({ length: 3 }).map(() => (
          <>
            <div className="mb-2 w-full rounded-md p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
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
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
