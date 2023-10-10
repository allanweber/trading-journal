import { z } from 'zod';

export const journalSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string({
      required_error: 'name-required',
    })
    .min(5, {
      message: 'name-min',
    })
    .max(30, {
      message: 'name-max',
    }),
  startDate: z.date({
    required_error: 'start-date-required',
  }),
  startBalance: z
    .number({
      required_error: 'start-balance-required',
      invalid_type_error: 'start-balance-positive',
    })
    .positive({ message: 'start-balance-positive' })
    .max(9999999999, { message: 'start-balance-max' }),
  currency: z.string({
    required_error: 'currency-required',
  }),
});

export type Journal = z.infer<typeof journalSchema>;
