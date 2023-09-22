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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import DatePicker from '@/components/DatePicker';
import { NumberInput } from '@/components/NumberInput';

export default function JournalForm() {
  const t = useTranslations('journal-form');

  const journalSchema = z.object({
    name: z
      .string()
      .min(5, {
        message: t('name-min'),
      })
      .max(30, {
        message: t('name-max'),
      }),
    startDate: z.date({
      required_error: t('start-date-required'),
    }),
    startBalance: z
      .number({
        required_error: t('start-balance-required'),
        invalid_type_error: t('start-balance-positive'),
      })
      .positive({ message: t('start-balance-positive') }),
    currency: z.string({
      required_error: t('currency-required'),
    }),
  });

  type JournalValues = z.infer<typeof journalSchema>;

  // Get from API
  const defaultValues: Partial<JournalValues> = {
    name: 'Journal name',
    startDate: new Date(2023, 1, 1, 15, 23),
    currency: 'EUR',
    startBalance: 123.45,
  };

  const form = useForm<JournalValues>({
    resolver: zodResolver(journalSchema),
    defaultValues,
  });

  function onSubmit(data: JournalValues) {
    console.log(data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
              <FormDescription>{t('name-description')}</FormDescription>
              <FormMessage />
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

              <FormDescription>{t('start-date-description')}</FormDescription>
              <FormMessage />
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
              <FormMessage />
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
                defaultValue={field.value}
              />
              <FormDescription>{t('currency-description')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="justify-between space-x-2">
          <Button asChild variant="outline" className="w-[200px]">
            <Link href="/trading/journals">{t('cancel')}</Link>
          </Button>
          <Button
            type="submit"
            className="w-[200px]"
            disabled={!form.formState.isValid}
          >
            {t('save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
