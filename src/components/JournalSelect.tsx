'use client';

import { trpc } from '@/app/_trpc/client';
import { getSymbol } from '@/model/currency';
import { Journal } from '@/model/journal';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FormControl } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  onValueChange: (value: Journal | undefined) => void;
  value: string;
  [x: string]: any;
};

export default function JournalSelect(props: Props) {
  const { onValueChange, value, ...rest } = props;
  const t = useTranslations('journal-select');

  const [journals, setJournals] = useState<Journal[]>([]);

  trpc.journal.list.useQuery(undefined, {
    onSuccess: (data) => {
      setJournals(data);
    },
  });

  const handleChange = (value: string) => {
    const journal = journals.find((journal) => journal._id === value);
    if (journal) {
      onValueChange(journal);
    } else {
      onValueChange(undefined);
    }
  };

  return (
    <Select onValueChange={handleChange} value={value} {...rest}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={t('placeholder')} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {journals.map((journal) => (
          <SelectItem value={journal._id!} key={journal._id}>
            {journal.name} - {getSymbol(journal.currency)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
