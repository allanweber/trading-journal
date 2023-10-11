'use client';

import DatePicker from '@/components/DatePicker';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { InputMessage } from '@/components/InputMessage';
import JournalSelect from '@/components/JournalSelect';
import { NumberInput } from '@/components/NumberInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Deposit, depositSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DepositForm() {
  const t = useTranslations('deposit-form');

  const [values, setValues] = useState<Deposit>({
    journalId: '',
    date: new Date(),
    price: 0,
    entryType: EntryType.Deposit,
    description: '',
  });
  const [error, setError] = useState<any>(null);

  const form = useForm<Deposit>({
    resolver: zodResolver(depositSchema),
    defaultValues: values,
    values,
  });

  function onSubmit(data: Deposit) {
    toast({
      title: 'Deposit saved',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <ErrorDisplay error={error} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="journalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('journal-label')}</FormLabel>
                <FormControl>
                  <JournalSelect
                    onValueChange={(journal) => field.onChange(journal?._id)}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>{t('journal-description')}</FormDescription>
                <InputMessage form={form} field="journalId" translations={t} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('date-label')}</FormLabel>

                <DatePicker
                  value={field.value}
                  onSelect={field.onChange}
                  placeholder={t('date-placeholder')}
                />
                <InputMessage form={form} field="date" translations={t} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('price-label')}</FormLabel>

                <NumberInput {...field} />

                <FormDescription>{t('price-description')}</FormDescription>
                <InputMessage form={form} field="price" translations={t} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description-label')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('description-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('description-description')}
                </FormDescription>
                <InputMessage
                  form={form}
                  field="description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <div className="justify-between space-x-2">
            <Button asChild variant="outline" className="w-[200px]">
              <Link href="/trading/entries">{t('cancel')}</Link>
            </Button>
            <Button type="submit" className="w-[200px]">
              {t('save')}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
