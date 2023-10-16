'use client';

import { getEntries } from '@/model/entryType';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('add-entry-button');
  const tEntry = useTranslations('trade-types');
  const router = useRouter();

  const handleAddEntry = (entry: EntryType) => {
    router.push(`/trading/entries/new/${entry}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{t('add-entry')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t('select-type')}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {getEntries.map((entryType: any) => (
          <DropdownMenuItem
            key={entryType.type}
            onClick={() => handleAddEntry(entryType.type)}
          >
            <entryType.icon className="mr-2 h-4 w-4" />
            <span>{tEntry(entryType.type)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
