'use client';

import { trpc } from '@/app/_trpc/client';
import { MessageDisplay } from '@/components/MessageDisplay';
import { DataTable } from '@/components/datatable/DataTable';
import { toast } from '@/components/ui/use-toast';
import { currencies } from '@/model/currency';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { columns } from './columns';

export function JournalTable() {
  const t = useTranslations('journals');
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = trpc.journal.list.useQuery();
  const [error, setError] = useState<any>();

  useEffect(() => {
    setError(queryError);
  }, [queryError]);

  const deleteMutation = trpc.journal.delete.useMutation({
    onSuccess: () => {
      toast({
        title: t('delete-title'),
        description: t('delete-success'),
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
        title: t('currency-filter'),
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
      <MessageDisplay message={error} variant="destructive" />
      <DataTable
        data={data}
        columns={tableColumns}
        toolbarOptions={toolbarOptions}
        isLoading={isLoading}
      />
    </>
  );
}
