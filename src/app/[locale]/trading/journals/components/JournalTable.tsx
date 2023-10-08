'use client';

import { trpc } from '@/app/_trpc/client';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { DataTable } from '@/components/datatable/DataTable';
import { toast } from '@/components/ui/use-toast';
import { currencies } from '@/model/currency/currencies';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { columns } from './columns';

export function JournalTable() {
  const t = useTranslations('journals');
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = trpc.journals.useQuery();
  const [error, setError] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    setError(queryError);
  }, [queryError]);

  const deleteMutation = trpc.journalDelete.useMutation({
    onSuccess: () => {
      toast({
        title: 'Journal deleted',
        description: 'Journal deleted successfully.',
      });
      refetch();
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onDeleteConfirm = (journalId: string) => {
    deleteMutation.mutate(journalId);
  };

  const tableColumns = columns(t('delete-journal'), onDeleteConfirm);

  const toolbarOptions = {
    inputFilter: {
      placeholder: t('input-filter-placeholder'),
      columnId: 'name',
    },
    showViewOptions: true,
    filters: [
      {
        columnId: 'currency',
        title: 'Currency',
        options: currencies.map((currency) => {
          return {
            label: `${currency.value} - ${currency.symbol}`,
            value: currency.value,
          };
        }),
      },
    ],
  };

  return (
    <>
      <ErrorDisplay error={error} />
      <DataTable
        data={data}
        columns={tableColumns}
        toolbarOptions={toolbarOptions}
        isLoading={isLoading}
      />
    </>
  );
}
