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
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import { MessageDisplay } from '@/components/MessageDisplay';
import { NumberInput } from '@/components/NumberInput';
import FormDescriptionOrMessage from '@/components/ui/FormDescriptionOrMessage';
import { Journal, journalSchema } from '@/model/journal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JournalForm({ journalId }: { journalId?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<Journal>({
    name: '',
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
      router.push('/trading/journals');
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (journalId) {
    trpc.journal.single.useQuery(journalId, {
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
      <MessageDisplay message={error} variant="destructive" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journal Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a name for your journal"
                    {...field}
                  />
                </FormControl>

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="name"
                  description="The name of the journal"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>

                <DatePicker
                  value={field.value}
                  onSelect={field.onChange}
                  placeholder="Select a start date for your journal"
                />

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="startDate"
                  description="This is the date you start trade in this journal. This date will be used to calculate the balance of your journal"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startBalance"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Balance</FormLabel>

                <NumberInput {...field} />

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="startBalance"
                  description="This is the balance you have in your account when you start trading in this journal. This balance will be used to calculate the balance of your journal"
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Currency</FormLabel>

                <CurrencySelect
                  onValueChange={field.onChange}
                  value={field.value}
                />

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="currency"
                  description="The selection will determine the currency used for all entries in this journal"
                />
              </FormItem>
            )}
          />

          <div className="justify-between space-x-2">
            <Button asChild variant="outline" className="w-[200px]">
              <Link href="/trading/journals">Cancel</Link>
            </Button>
            <Button type="submit" className="w-[200px]">
              Save Journal
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
