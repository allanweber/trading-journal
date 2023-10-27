'use client';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
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
import { toast } from '@/components/ui/use-toast';
import { Taxes, withdrawalSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function TaxesForm({ taxesId }: { taxesId?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<Taxes>({
    entryType: EntryType.Taxes,
  } as Taxes);
  const [error, setError] = useState<any>(null);

  const mutation = trpc.taxes.save.useMutation({
    onSuccess: () => {
      toast({
        title: 'Fee saved',
        description: 'Your fee was saved successfully',
      });
      router.push('/trading/entries');
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (taxesId) {
    trpc.taxes.single.useQuery(taxesId, {
      onSuccess: (data) => {
        setValues(data);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

  const form = useForm<Taxes>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: values,
    values,
  });

  function onSubmit(data: Taxes) {
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
                <FormLabel>Journal</FormLabel>
                <FormControl>
                  <JournalSelect
                    onValueChange={(journal) => field.onChange(journal?._id)}
                    placeholder="Select a journal"
                    value={field.value}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="journalId"
                  description="The journal where this fee will be inserted"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Fee Date</FormLabel>

                <FormControl>
                  <DatePicker
                    withTime
                    value={field.value}
                    onSelect={field.onChange}
                    placeholder="Select a date for this fee"
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="date"
                  description="The date of this fee"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fee value</FormLabel>

                <FormControl>
                  <NumberInput {...field} />
                </FormControl>

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="price"
                  description="The value of this fee"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Description (optional)</FormLabel>
                <FormControl>
                  <TextArea
                    placeholder="Enter a description for this fee"
                    {...field}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="description"
                  description="The description of this fee"
                />
              </FormItem>
            )}
          />

          <FormButtonContainer>
            <Button asChild variant="outline" className="w-full md:w-[200px]">
              <Link href="/trading/entries">Cancel</Link>
            </Button>
            <Button type="submit" className="w-full md:w-[200px]">
              Save Fee
            </Button>
          </FormButtonContainer>
        </form>
      </Form>
    </>
  );
}
