'use client';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import DirectionSelect from '@/components/DirectionSelect';
import FormButtonContainer from '@/components/FormButtonContainer';
import JournalSelect from '@/components/JournalSelect';
import { MessageDisplay } from '@/components/MessageDisplay';
import { NumberInput } from '@/components/NumberInput';
import { TextArea } from '@/components/TextArea';
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
import { toast } from '@/components/ui/use-toast';
import { Trade, tradeSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TradeForm({ tradeId }: { tradeId?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<Trade>({
    symbol: '',
    entryType: EntryType.Trade,
  } as Trade);
  const [error, setError] = useState<any>(null);

  const mutation = trpc.trade.save.useMutation({
    onSuccess: () => {
      toast({
        title: 'Trade saved',
        description: 'Your trade was saved successfully',
      });
      router.push('/trading/entries');
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
                      <FormLabel>Journal</FormLabel>
                      <FormControl>
                        <JournalSelect
                          onValueChange={(journal) =>
                            field.onChange(journal?._id)
                          }
                          placeholder="Select a journal"
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="journalId"
                        description="The journal where this trade will be inserted"
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
                      <FormLabel>Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a symbol" {...field} />
                      </FormControl>
                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="symbol"
                        description="The symbol of this trade"
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
                      <FormLabel>Direction</FormLabel>
                      <FormControl>
                        <DirectionSelect
                          onValueChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="direction"
                        description="The direction of this trade"
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
                      <FormLabel className="mb-2">Trade Date</FormLabel>

                      <FormControl>
                        <DatePicker
                          withTime
                          value={field.value}
                          onSelect={field.onChange}
                          placeholder="Select a date for this trade"
                        />
                      </FormControl>
                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="date"
                        description="The date of this trade"
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
                      <FormLabel>Trade Price</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="price"
                        description="The price of this trade"
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
                      <FormLabel>Size of this trade</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="size"
                        description="The size of this trade"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <Separator className="mb-3" />
                <h3 className="-ml-1">Risk Management</h3>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="profit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Take profit</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="profit"
                        description="The take profit value of this trade"
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
                      <FormLabel>Stop loss</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="loss"
                        description="The stop loss value of this trade"
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
                <h3 className="-ml-1">Close Trade</h3>
              </div>

              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormField
                  control={form.control}
                  name="exitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">Exit Date</FormLabel>

                      <FormControl>
                        <DatePicker
                          withTime
                          value={field.value}
                          onSelect={field.onChange}
                          placeholder="Select a date for close this trade"
                        />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="exitDate"
                        description="Exit date must be after trade date"
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
                      <FormLabel>Exit value</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="exitPrice"
                        description="The value when you closed this trade"
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
                      <FormLabel>Costs value</FormLabel>

                      <FormControl>
                        <NumberInput {...field} />
                      </FormControl>

                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="costs"
                        description="The value of costs for this trade"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <Separator className="mb-3" />
                <h3 className="-ml-1">Additional Information</h3>
              </div>

              <div className="col-span-12 sm:col-span-12">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade Description (optional)</FormLabel>
                      <FormControl>
                        <TextArea
                          placeholder="Enter a description for this trade"
                          {...field}
                        />
                      </FormControl>
                      <FormDescriptionOrMessage
                        form={form}
                        fieldName="description"
                        description="The description of this trade"
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
                  <Link href="/trading/entries">Cancel</Link>
                </Button>
                <Button type="submit" className="w-full md:w-[200px]">
                  Save Trade
                </Button>
              </FormButtonContainer>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
}
