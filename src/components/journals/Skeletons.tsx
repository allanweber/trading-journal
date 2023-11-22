import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export function JournalsTableSkeleton() {
  return (
    <div>
      <div className="md:hidden rounded-md border min-w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
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
          </div>
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

export function JournalSkeleton() {
  const t = useTranslations('journal-form');
  return (
    <div className="space-y-8 ">
      <div className="space-y-2">
        <Label>{t('name-label')}</Label>
        <Skeleton className="h-10 w-full" />
        <p className="text-sm text-muted-foreground">{t('name-description')}</p>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Skeleton className="h-10 w-full" />
        <p className="text-sm text-muted-foreground">Journal Description</p>
      </div>

      <div className="space-y-2">
        <Label>{t('start-date-label')}</Label>
        <Skeleton className="h-10 w-full" />
        <p className="text-sm text-muted-foreground">
          {t('start-date-description')}
        </p>
      </div>

      <div className="space-y-2">
        <Label>{t('start-balance-label')}</Label>
        <Skeleton className="h-10 w-full" />
        <p className="text-sm text-muted-foreground">
          {t('start-balance-description')}
        </p>
      </div>

      <div className="space-y-2">
        <Label>{t('currency-label')}</Label>
        <Skeleton className="h-10 w-full" />
        <p className="text-sm text-muted-foreground">
          {t('currency-description')}
        </p>
      </div>

      <div className="px-4 py-3text-right sm:px-6">
        <div className="flex justify-end">
          <Button variant="outline" className="w-[200px]" disabled>
            <Skeleton className="h-4 w-full" />
          </Button>
          <Button className="w-[200px] ml-3" disabled>
            <Skeleton className="h-4 w-full" />
          </Button>
        </div>
      </div>
    </div>
  );
}
