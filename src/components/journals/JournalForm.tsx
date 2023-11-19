'use client';

import CurrencySelect from '@/components/CurrencySelect';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import DatePicker from '@/components/DatePicker';
import { NumberInput } from '@/components/NumberInput';
import FormDescriptionOrMessage from '@/components/ui/FormDescriptionOrMessage';
import { saveJournal } from '@/lib/journals';
import { Journal, journalSchema } from '@/model/journal';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JournalForm({ journal }: { journal?: Journal }) {
  const t = useTranslations('journal-form');
  const router = useRouter();
  const locale = useLocale();
  const [values, setValues] = useState<Journal>({
    name: '',
    startDate: new Date(),
    startBalance: 0,
    currency: 'USD',
  });

  useEffect(() => {
    if (journal) {
      setValues(journal);
    }
  }, [journal]);

  const form = useForm<Journal>({
    resolver: zodResolver(journalSchema),
    defaultValues: values,
    values,
  });

  async function onSubmit(data: Journal) {
    noStore();
    await saveJournal(data);
    toast({
      title: t('success-title'),
      description: t('success-description', { journal: data.name }),
    });
    router.replace(`/${locale}/trading/journals`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name-label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('name-placeholder')} {...field} />
              </FormControl>

              <FormDescriptionOrMessage
                form={form}
                fieldName="name"
                descriptionKey="name-description"
                translations={t}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('start-date-label')}</FormLabel>

              <DatePicker
                value={field.value}
                onSelect={field.onChange}
                placeholder={t('start-date-placeholder')}
              />

              <FormDescriptionOrMessage
                form={form}
                fieldName="startDate"
                descriptionKey="start-date-description"
                translations={t}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startBalance"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('start-balance-label')}</FormLabel>

              <NumberInput {...field} />

              <FormDescriptionOrMessage
                form={form}
                fieldName="startBalance"
                descriptionKey="start-balance-description"
                translations={t}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('currency-label')}</FormLabel>

              <CurrencySelect
                onValueChange={field.onChange}
                value={field.value}
              />

              <FormDescriptionOrMessage
                form={form}
                fieldName="currency"
                descriptionKey="currency-description"
                translations={t}
              />
            </FormItem>
          )}
        />

        <div className="justify-between space-x-2">
          <Button asChild variant="outline" className="w-[200px]">
            <Link href="/trading/journals">Cancel</Link>
          </Button>
          <Button type="submit" className="w-[200px]">
            {t('save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
