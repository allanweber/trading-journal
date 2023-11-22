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

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import { NumberInput } from '@/components/NumberInput';
import FormDescriptionOrMessage from '@/components/ui/FormDescriptionOrMessage';
import { Journal, journalSchema } from '@/model/journal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MessageDisplay } from '../MessageDisplay';

export default function JournalForm({ journal }: { journal?: Journal }) {
  const t = useTranslations('journal-form');
  const router = useRouter();
  const locale = useLocale();
  const [values, setValues] = useState<Journal>({
    name: '',
    description: '',
    startDate: new Date(),
    startBalance: 0,
    currency: 'USD',
  });
  const [error, setError] = useState<any>(null);

  const mutation = trpc.journal.save.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Journal saved',
        description: `Your journal ${data.name} was saved successfully`,
      });
      router.push(`/${locale}/trading/journals`);
    },
    onError: (error) => {
      setError(error);
    },
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

  function onSubmit(data: Journal) {
    mutation.mutate(data);
  }

  return (
    <>
      <MessageDisplay message={error} variant="destructive" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Journal Description" {...field} />
                </FormControl>

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="description"
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

          <div className="px-4 py-3text-right sm:px-6">
            <div className="flex justify-end">
              <Button asChild variant="outline" className="w-[200px]">
                <Link href="/trading/journals">Cancel</Link>
              </Button>
              <Button type="submit" className="w-[200px] ml-3">
                {t('save')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
