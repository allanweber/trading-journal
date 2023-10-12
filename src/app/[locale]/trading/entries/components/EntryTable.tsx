'use client';

import { trpc } from '@/app/_trpc/client';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { DataTable } from '@/components/datatable/DataTable';
import { toast } from '@/components/ui/use-toast';
import { Journal } from '@/model/journal';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { columns } from './columns';

export function EntryTable() {
  const t = useTranslations('entries');
  const tTradeType = useTranslations('trade-types');
  const [journalsToFilter, setJournalsToFilter] = useState<Journal[]>([]);
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = trpc.entry.list.useQuery();
  const [error, setError] = useState<any>();

  const { data: journals } = trpc.journal.list.useQuery();
  useEffect(() => {
    if (journals) {
      setJournalsToFilter(journals);
    }
  }, [journals]);

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
        options: journalsToFilter.map((journal) => {
          return {
            label: journal.name,
            value: journal._id!,
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
        toolbarOptions={toolbarOptions!}
        isLoading={isLoading}
      />
    </>
  );
}
