'use client';

import { ColumnDef } from '@tanstack/react-table';

import ActionConfirmation from '@/components/ActionConfirmation';
import DateDisplay from '@/components/DateDisplay';
import NumberDisplay from '@/components/NumberDisplay';
import { DataTableColumnHeader } from '@/components/datatable/DataTableColumnHeader';
import DataTableLink from '@/components/datatable/DataTableLink';
import { getSymbol } from '@/model/currency';
import { Journal } from '@/model/journal';
import { TrashIcon } from 'lucide-react';

export const columns = (
  actionsTitle: string,
  onDeleteConfirm: (id: string) => void
): ColumnDef<Journal>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <DataTableLink href={`/trading/journals/${row.id}`}>
          {row.getValue('name')}
        </DataTableLink>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="w-auto">
        <DateDisplay value={row.getValue('startDate')} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'startBalance',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="max-w-[100px]">
        <NumberDisplay
          value={row.getValue('startBalance')}
          currency={row.getValue('currency')}
        />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="max-w-[100px]">{`${row.getValue(
        'currency'
      )} - ${getSymbol(row.getValue('currency'))}`}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
