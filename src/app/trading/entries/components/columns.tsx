'use client';

import { ColumnDef } from '@tanstack/react-table';

import ActionConfirmation from '@/components/ActionConfirmation';
import DateDisplay from '@/components/DateDisplay';
import DirectionDisplay from '@/components/DirectionDisplay';
import EntryTypeDisplay from '@/components/EntryTypeDisplay';
import NumberDisplay from '@/components/NumberDisplay';
import { DataTableColumnHeader } from '@/components/datatable/DataTableColumnHeader';
import DataTableLink from '@/components/datatable/DataTableLink';
import { Entry } from '@/model/entry';
import { EditIcon, TrashIcon } from 'lucide-react';

export const columns = (
  onDeleteConfirm: (id: string) => void
): ColumnDef<Entry>[] => [
  {
    accessorKey: 'symbol',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <DataTableLink href={`/trading/entries/${row.id}`}>
          {row.original.entryType === 'TRADE' ||
          row.original.entryType === 'DIVIDEND'
            ? row.getValue('symbol')
            : null}
        </DataTableLink>
      </div>
    ),
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);

      if (!rowValue) {
        return false;
      } else {
        return (rowValue as string).toLowerCase().includes(value.toLowerCase());
      }
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'entryType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entry Type" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">
        <EntryTypeDisplay entryType={row.getValue('entryType')} />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue('entryType'));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'journal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Journal" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">{row.original.journal.name}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.original.journal._id);
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">
        <DateDisplay withTime value={row.original.date} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'direction',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Direction" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">
        <DirectionDisplay direction={row.getValue('direction')} />
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue('direction'));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="w-auto">
        <NumberDisplay
          value={row.original.price}
          currency={row.original.journal.currency}
        />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="max-w-[45px] flex justify-between">
        <DataTableLink href={`/trading/entries/${row.id}`}>
          <EditIcon className="h-5 w-5" />
        </DataTableLink>

        <ActionConfirmation
          actionTitle="Delete Trade"
          onConfirm={() => onDeleteConfirm(row.id)}
        >
          <TrashIcon className="h-5 w-5" />
        </ActionConfirmation>
      </div>
    ),
  },
];
