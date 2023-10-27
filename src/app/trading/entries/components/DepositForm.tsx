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
import { Deposit, depositSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DepositForm({ depositId }: { depositId?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<Deposit>({
    entryType: EntryType.Deposit,
  } as Deposit);
  const [error, setError] = useState<any>(null);

  const mutation = trpc.deposit.save.useMutation({
    onSuccess: () => {
      toast({
        title: 'Deposit saved',
        description: 'Your deposit was saved successfully',
      });
      router.push('/trading/entries');
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (depositId) {
    trpc.deposit.single.useQuery(depositId, {
      onSuccess: (data) => {
        setValues(data);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

  const form = useForm<Deposit>({
    resolver: zodResolver(depositSchema),
    defaultValues: values,
    values,
  });

  function onSubmit(data: Deposit) {
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
                  description="The journal where this deposit will be inserted"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">Deposit Date</FormLabel>

                <FormControl>
                  <DatePicker
                    withTime
                    value={field.value}
                    onSelect={field.onChange}
                    placeholder="Select a date for this deposit"
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="date"
                  description="The date of this deposit"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deposit value</FormLabel>

                <FormControl>
                  <NumberInput {...field} />
                </FormControl>

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="price"
                  description="The value of this deposit"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposit Description (optional)</FormLabel>
                <FormControl>
                  <TextArea
                    placeholder="Enter a description for this deposit"
                    {...field}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="description"
                  description="The description of this deposit"
                />
              </FormItem>
            )}
          />

          <FormButtonContainer>
            <Button asChild variant="outline" className="w-full md:w-[200px]">
              <Link href="/trading/entries">Cancel</Link>
            </Button>
            <Button type="submit" className="w-full md:w-[200px]">
              Deposit saved
            </Button>
          </FormButtonContainer>
        </form>
      </Form>
    </>
  );
}
