'use client';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import DirectionSelect from '@/components/DirectionSelect';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Trade, tradeSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TradeForm({
  depositId: tradeId,
}: {
  depositId?: string;
}) {
  const t = useTranslations('trade-form');
  const router = useRouter();
  const locale = useLocale();
  const [values, setValues] = useState<Trade>({
    symbol: '',
    entryType: EntryType.Trade,
  } as Trade);
  const [error, setError] = useState<any>(null);

  const mutation = trpc.trade.save.useMutation({
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

  if (tradeId) {
    trpc.trade.single.useQuery(tradeId, {
      onSuccess: (data) => {
        setValues(data);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

  const form = useForm<Trade>({
    resolver: zodResolver(tradeSchema),
    defaultValues: values,
    values,
  });

  function onSubmit(data: Trade) {
    mutation.mutate(data);
  }

  return (
    <>
      <MessageDisplay message={error} variant="destructive" />
      <Form {...form}>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="journalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('journal-label')}</FormLabel>
                      <FormControl>
                        <JournalSelect
                          onValueChange={(journal) =>
                            field.onChange(journal?._id)
                          }
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
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('symbol-label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('symbol-placeholder')}
                          {...field}
                        />
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
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="direction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('direction-label')}</FormLabel>
                      <FormControl>
                        <DirectionSelect
                          onValueChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="direction"
                        descriptionKey="direction-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
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
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
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
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('size-label')}</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="size"
                        descriptionKey="size-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <Separator className="mb-3" />
                <h3 className="-ml-1">{t('management')}</h3>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="profit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('profit-label')}</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="profit"
                        descriptionKey="profit-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="loss"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('loss-label')}</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="loss"
                        descriptionKey="loss-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                {/* TODO: Slider for Risk Reward */}
              </div>

              <div className="col-span-12">
                <Separator className="mb-3" />
                <h3 className="-ml-1">{t('close-trade')}</h3>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="exitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">
                        {t('exit-date-label')}
                      </FormLabel>

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
                        fieldName="exitDate"
                        descriptionKey="exit-date-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="exitPrice"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('exit-price-label')}</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="exitPrice"
                        descriptionKey="exit-price-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="costs"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('costs-label')}</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="costs"
                        descriptionKey="costs-description"
                        translations={t}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <Separator className="mb-3" />
                <h3 className="-ml-1">{t('additional')}</h3>
              </div>

              <div className="col-span-12 sm:col-span-12">
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
              </div>

              <FormButtonContainer>
                <Button
                  asChild
                  variant="outline"
                  className="w-full md:w-[200px]"
                >
                  <Link href="/trading/entries">{t('cancel')}</Link>
                </Button>
                <Button type="submit" className="w-full md:w-[200px]">
                  {t('save')}
                </Button>
              </FormButtonContainer>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
}
