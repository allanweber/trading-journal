import { z } from 'zod';
import { Direction } from './direction';
import { EntryType } from './entryType';

const minimalEntry = z.object({
  _id: z.string().optional(),
  journalId: z
    .string({
      required_error: 'journal-required',
    })
    .min(1, { message: 'journal-required' }),

  date: z.date({
    required_error: 'date-required',
  }),

  price: z
    .number({
      required_error: 'price-required',
      invalid_type_error: 'price-positive',
    })
    .positive({ message: 'price-positive' })
    .max(9999999999, { message: 'price-max' }),

  entryType: z.nativeEnum(EntryType, {
    required_error: 'entry-type-required',
  }),

  description: z
    .string()
    .max(100, {
      message: 'description-max',
    })
    .optional(),
});

export const tradeSchema = minimalEntry.extend({
  symbol: z
    .string({
      required_error: 'symbol-required',
    })
    .max(30, {
      message: 'symbol-max',
    }),

  direction: z.nativeEnum(Direction, {
    required_error: 'direction-required',
  }),

  size: z
    .number({
      required_error: 'size-required',
      invalid_type_error: 'size-positive',
    })
    .positive({ message: 'size-positive' })
    .max(9999999999, { message: 'size-max' }),
});

export const depositSchema = minimalEntry;
export const withdrawalSchema = minimalEntry;
export const taxesSchema = minimalEntry;
export const dividendSchema = minimalEntry.extend({
  symbol: z
    .string({
      required_error: 'symbol-required',
    })
    .max(30, {
      message: 'symbol-max',
    }),
});

export const entrySchema = z.union([
  depositSchema,
  withdrawalSchema,
  tradeSchema,
  taxesSchema,
  dividendSchema,
]);

export type Trade = z.infer<typeof tradeSchema>;
export type Deposit = z.infer<typeof depositSchema>;
export type Withdrawal = z.infer<typeof withdrawalSchema>;
export type Taxes = z.infer<typeof taxesSchema>;
export type Dividend = z.infer<typeof dividendSchema>;
export type Entry = z.infer<typeof entrySchema>;
