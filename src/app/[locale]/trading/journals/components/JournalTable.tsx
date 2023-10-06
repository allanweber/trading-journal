'use client';

import { trpc } from '@/app/_trpc/client';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { DataTable } from '@/components/datatable/DataTable';
import { currencies } from '@/model/currency/currencies';
import { useTranslations } from 'next-intl';
import { columns } from './columns';

export function JournalTable() {
  const t = useTranslations('journals');
  const { data, isLoading, error } = trpc.journals.useQuery();

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
        columns={columns}
        toolbarOptions={toolbarOptions}
        isLoading={isLoading}
      />
    </>
  );
}
