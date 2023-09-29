import { Action, PageHeader, Subtitle, Title } from '@/components/PageHeader';
import { DataTable } from '@/components/datatable/DataTable';
import { Button } from '@/components/ui/button';
import { currencies } from '@/model/currency/currencies';
import { Journal, getAllJournals } from '@/model/journal';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { columns } from './components/columns';

function JournalHeader() {
  const t = useTranslations('journals');
  return (
    <PageHeader>
      <Title>
        {t('title')}
        <Subtitle>{t('subtitle')}</Subtitle>
      </Title>
      <Action>
        <Button asChild>
          <Link href="./new">{t('create')}</Link>
        </Button>
      </Action>
    </PageHeader>
  );
}

function JournalTable({ journals }: { journals: Journal[] }) {
  const t = useTranslations('journals');

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
    <DataTable
      data={journals}
      columns={columns}
      toolbarOptions={toolbarOptions}
    />
  );
}

export default async function Journals() {
  const journals = await getAllJournals();
  return (
    <>
      <JournalHeader />
      <JournalTable journals={journals} />
    </>
  );
}
