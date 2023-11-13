'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import { PaginatedParams } from '@/model/pagination';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function TablePagination(props: PaginatedParams) {
  const { pageSize, page, total, totalPages } = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const changePageSize = (pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('pageSize', pageSize.toString());
    updatePath(params);
  };

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page + 1).toString());
    updatePath(params);
  };

  const lastPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', totalPages.toString());
    updatePath(params);
  };

  const previousPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page - 1).toString());
    updatePath(params);
  };

  const firstPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    updatePath(params);
  };

  const updatePath = (params: URLSearchParams) => {
    replace(`${pathname}?${params.toString()}`);
  };

  const cantPreviousPage = () => {
    return page === 1;
  };

  const cantNextPage = () => {
    return page === totalPages;
  };

  const t = useTranslations('pagination');
  return (
    <div className="flex items-center justify-between px-2">
      <div className="hidden md:flex flex-1 text-sm text-muted-foreground">
        {t('rows-count', { count: total })}
      </div>
      <div className="flex items-center md:space-x-6 lg:space-x-8">
        <div className="hidden md:flex">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">{t('rows-per-page')}</p>
            <Select
              value={pageSize?.toString()}
              onValueChange={(value) => changePageSize(parseInt(value, 10))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize?.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex w-[150px] items-start md:items-center justify-start md:justify-center text-sm font-medium">
          {t('page-and-total', {
            page: page,
            pages: totalPages,
          })}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => firstPage()}
            disabled={cantPreviousPage()}
          >
            <span className="sr-only">{t('first-page')}</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => previousPage()}
            disabled={cantPreviousPage()}
          >
            <span className="sr-only">{t('prev-page')}</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => nextPage()}
            disabled={cantNextPage()}
          >
            <span className="sr-only">{t('next-page')}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => lastPage()}
            disabled={cantNextPage()}
          >
            <span className="sr-only">{t('last-page')}</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
