'use client';

import { ColumnDef } from '@tanstack/react-table';

import ActionConfirmation from '@/components/ActionConfirmation';
import DateDisplay from '@/components/DateDisplay';
import NumberDisplay from '@/components/NumberDisplay';
import { DataTableColumnHeader } from '@/components/datatable/DataTableColumnHeader';
import DataTableLink from '@/components/datatable/DataTableLink';
import { Entry } from '@/model/entry';
import { TrashIcon } from 'lucide-react';

export const columns = (
  actionsTitle: string,
  tTradeType: any,
  onDeleteConfirm: (id: string) => void
): ColumnDef<Entry>[] => [
  {
    accessorKey: 'trade',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <DataTableLink href={`/trading/entries/${row.id}`}>
          {row.original.entryType === 'TRADE'
            ? row.original.symbol
            : tTradeType(row.original.entryType)}
        </DataTableLink>
      </div>
    ),
    filterFn: (row, id, value) => {
      const rowValue = row.original.symbol ?? row.original.entryType;
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
    accessorKey: 'journal',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
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
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="w-auto">
        <DateDisplay withTime value={row.original.date} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="max-w-[100px]">
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
      <ActionConfirmation
        actionTitle={actionsTitle}
        onConfirm={() => onDeleteConfirm(row.id)}
      >
        <TrashIcon className="h-4 w-4" />
      </ActionConfirmation>
    ),
  },
];
