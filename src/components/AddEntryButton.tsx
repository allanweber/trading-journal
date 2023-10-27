'use client';

import { getEntries } from '@/model/entryType';
import { useRouter } from 'next/navigation';
import { EntryType } from 'perf_hooks';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function AddEntryButton() {
  const router = useRouter();

  const handleAddEntry = (entry: EntryType) => {
    router.push(`/trading/entries/new/${entry}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Add Trade</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add by type</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {getEntries.map((entryType: any) => (
          <DropdownMenuItem
            key={entryType.type}
            onClick={() => handleAddEntry(entryType.type)}
          >
            <entryType.icon className="mr-2 h-4 w-4" />
            <span>{entryType.type}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
