'use client';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import FormButtonContainer from '@/components/FormButtonContainer';
import JournalSelect from '@/components/JournalSelect';
import { MessageDisplay } from '@/components/MessageDisplay';
import { NumberInput } from '@/components/NumberInput';
import FormDescriptionOrMessage from '@/components/ui/FormDescriptionOrMessage';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Dividend, dividendSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DividendForm({ dividendId }: { dividendId?: string }) {
  const t = useTranslations('dividend-form');
  const router = useRouter();
  const locale = useLocale();
  const [values, setValues] = useState<Dividend>({
    symbol: '',
    entryType: EntryType.Dividend,
  } as Dividend);
  const [error, setError] = useState<any>(null);

  const mutation = trpc.dividend.save.useMutation({
    onSuccess: () => {
      toast({
        title: t('success-title'),
        description: t('success-description'),
      });
      router.push(`/${locale}/trading/entries`);
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (dividendId) {
    trpc.dividend.single.useQuery(dividendId, {
      onSuccess: (data) => {
        setValues(data);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

  const form = useForm<Dividend>({
    resolver: zodResolver(dividendSchema),
    defaultValues: values,
    values,
  });

  function onSubmit(data: Dividend) {
    mutation.mutate(data);
  }

  return (
    <>
      <MessageDisplay message={error} variant="destructive" />
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
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="journalId"
                  descriptionKey="journal-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('symbol-label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('symbol-placeholder')} {...field} />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="symbol"
                  descriptionKey="symbol-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">{t('date-label')}</FormLabel>

                <FormControl>
                  <DatePicker
                    withTime
                    value={field.value}
                    onSelect={field.onChange}
                    placeholder={t('date-placeholder')}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="date"
                  descriptionKey="date-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('price-label')}</FormLabel>

                <FormControl>
                  <NumberInput {...field} />
                </FormControl>

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="price"
                  descriptionKey="price-description"
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
                <FormLabel>{t('description-label')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('description-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="description"
                  descriptionKey="description-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormButtonContainer>
            <Button asChild variant="outline" className="w-full md:w-[200px]">
              <Link href="/trading/entries">{t('cancel')}</Link>
            </Button>
            <Button type="submit" className="w-full md:w-[200px]">
              {t('save')}
            </Button>
          </FormButtonContainer>
        </form>
      </Form>
    </>
  );
}
