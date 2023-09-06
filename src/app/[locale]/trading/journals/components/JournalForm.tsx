'use client';

import CurrencySelect from '@/components/CurrencySelect';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
    // startBalance: z.number({
    //   required_error: t('start-balance-required'),
    // }),
    currency: z.string({
      required_error: t('currency-required'),
    }),
  });

  type JournalValues = z.infer<typeof journalSchema>;

  // Get from API
  const defaultValues: Partial<JournalValues> = {
    name: 'Journal name',
    startDate: new Date('2023-01-23'),
    currency: 'EUR',
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
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
              <FormLabel>Currency</FormLabel>
              <CurrencySelect
                onValueChange={field.onChange}
                defaultValue={field.value}
              />
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
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
  );
}
