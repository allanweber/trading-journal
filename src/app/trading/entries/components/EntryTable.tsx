'use client';

import { trpc } from '@/app/_trpc/client';
import { MessageDisplay } from '@/components/MessageDisplay';
import { DataTable } from '@/components/datatable/DataTable';
import { toast } from '@/components/ui/use-toast';
import { directions } from '@/model/direction';
import { getEntries } from '@/model/entryType';
import { Journal } from '@/model/journal';
import { useEffect, useState } from 'react';
import { columns } from './columns';

export function EntryTable({ journals }: { journals: Journal[] }) {
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
        title: 'Entry Deleted',
        description: 'Entry deleted successfully',
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

  const tableColumns = columns(onDeleteConfirm);

  const toolbarOptions = {
    inputFilter: {
      placeholder: 'Filter by symbol',
      columnId: 'symbol',
    },
    showViewOptions: true,
    filters: [
      {
        columnId: 'entryType',
        title: 'Entry Type',
        options: getEntries.map((entryType) => {
          return {
            label: entryType.type,
            value: entryType.type,
            icon: entryType.icon,
          };
        }),
      },
      {
        columnId: 'journal',
        title: 'Journal',
        options: journals.map((journal) => {
          return {
            label: journal.name,
            value: journal._id!,
          };
        }),
      },
      {
        columnId: 'direction',
        title: 'Direction',
        options: directions.map((direction) => {
          return {
            label: direction.direction,
            value: direction.direction,
            icon: direction.icon,
          };
        }),
      },
    ],
  };

  if (journals.length === 0) {
    return (
      <MessageDisplay message="You need to create a journal before adding a trade" />
    );
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
