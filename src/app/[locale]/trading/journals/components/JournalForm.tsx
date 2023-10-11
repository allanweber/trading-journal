'use client';

import CurrencySelect from '@/components/CurrencySelect';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { InputMessage } from '@/components/InputMessage';
import { NumberInput } from '@/components/NumberInput';
import { Journal, journalSchema } from '@/model/journal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JournalForm({ journalId }: { journalId?: string }) {
  const t = useTranslations('journal-form');
  const router = useRouter();
  const [values, setValues] = useState<Journal>({
    name: '',
    startDate: new Date(),
    startBalance: 0,
    currency: 'USD',
  });
  const [error, setError] = useState<any>(null);

  const mutation = trpc.journalSave.useMutation({
    onSuccess: (data) => {
      toast({
        title: 'Journal saved',
        description: `Journal ${data.name} saved successfully.`,
      });
      router.push('/trading/journals');
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (journalId) {
    trpc.journal.useQuery(journalId, {
      onSuccess: (data) => {
        setValues(data);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

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
      <ErrorDisplay error={error} />
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
                <FormDescription>{t('name-description')}</FormDescription>
                <InputMessage form={form} field="name" translations={t} />
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
                <InputMessage form={form} field="startDate" translations={t} />
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

                <FormDescription>
                  {t('start-balance-description')}
                </FormDescription>
                <InputMessage
                  form={form}
                  field="startBalance"
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
                <FormDescription>{t('currency-description')}</FormDescription>
                <InputMessage form={form} field="currency" translations={t} />
              </FormItem>
            )}
          />

          <div className="justify-between space-x-2">
            <Button asChild variant="outline" className="w-[200px]">
              <Link href="/trading/journals">{t('cancel')}</Link>
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
