'use client';

import { trpc } from '@/app/_trpc/client';
import { MessageDisplay } from '@/components/MessageDisplay';
import { DataTable } from '@/components/datatable/DataTable';
import { toast } from '@/components/ui/use-toast';
import { Journal } from '@/model/journal';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { columns } from './columns';

export function EntryTable({ journals }: { journals: Journal[] }) {
  const t = useTranslations('entries');
  const tTradeType = useTranslations('trade-types');

  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = trpc.entry.list.useQuery();
  const [error, setError] = useState<any>();

  useEffect(() => {
    setError(queryError);
  }, [queryError]);

  const deleteMutation = trpc.entry.delete.useMutation({
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

  const onDeleteConfirm = (entryId: string) => {
    deleteMutation.mutate(entryId);
  };

  const tableColumns = columns(t('delete-entry'), tTradeType, onDeleteConfirm);

  const toolbarOptions = {
    inputFilter: {
      placeholder: t('input-filter-placeholder'),
      columnId: 'trade',
    },
    showViewOptions: true,
    filters: [
      {
        columnId: 'journal',
        title: t('journal-filter'),
        options: journals.map((journal) => {
          return {
            label: journal.name,
            value: journal._id!,
          };
        }),
      },
    ],
  };

  if (journals.length === 0) {
    return <MessageDisplay message={t('journal-missing-message')} />;
  }

  return (
    <>
      <MessageDisplay message={error} variant="destructive" />
      <DataTable
        data={data}
        columns={tableColumns}
        toolbarOptions={toolbarOptions!}
        isLoading={isLoading}
      />
    </>
  );
}
