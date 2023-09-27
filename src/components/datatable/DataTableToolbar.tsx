'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';

export interface FilterOptions {
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export interface InputFilter {
  placeholder: string;
  columnId: string;
}

export interface ToolbarOptions {
  inputFilter?: InputFilter;
  showViewOptions?: boolean;
  filters?: FilterOptions[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  options?: ToolbarOptions;
}

export function DataTableToolbar<TData>({
  table,
  options,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { inputFilter, showViewOptions, filters } = options ?? {};

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {inputFilter && (
          <Input
            placeholder={inputFilter.placeholder}
            value={
              (table
                .getColumn(inputFilter.columnId)
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table
                .getColumn(inputFilter.columnId)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filters?.map((filter) => (
          <DataTableFacetedFilter
            key={filter.columnId}
            column={table.getColumn(filter.columnId)}
            title={filter.title}
            options={filter.options}
          />
        ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {showViewOptions && <DataTableViewOptions table={table} />}
    </div>
  );
}
