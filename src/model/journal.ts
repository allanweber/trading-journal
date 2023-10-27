import { z } from 'zod';

export const journalSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({
      required_error: 'Journal Name is required',
    })
    .min(5, {
      message: 'Journal Name must be at least 5 characters long',
    })
    .max(30, {
      message: 'Journal Name must be at most 30 characters long',
    }),
  startDate: z.date({
    required_error: 'Start Date is required',
  }),
  startBalance: z
    .number({
      required_error: 'Start Balance is required',
      invalid_type_error: 'Start Balance must be a number',
    })
    .positive({ message: 'Start balance must be greater than 0' })
    .max(9999999999, {
      message: 'Start balance must be less than 10000000000',
    }),
  currency: z.string({
    required_error: 'Currency is required',
  }),
});

export type Journal = z.infer<typeof journalSchema>;
