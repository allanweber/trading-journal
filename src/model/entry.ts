import { z } from 'zod';
import { Direction } from './direction';
import { EntryType } from './entryType';
import { journalSchema } from './journal';

const minimalEntry = z.object({
  _id: z.string().optional(),
  journalId: z
    .string({
      required_error: 'Journal is required',
    })
    .min(1, { message: 'Journal is required' }),

  date: z.date({
    required_error: 'Date is required',
  }),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be greater than 0' })
    .max(9999999999, { message: 'Price must be less than 10000000000' }),

  entryType: z.nativeEnum(EntryType, {
    required_error: 'Entry Type is required',
  }),

  description: z
    .string()
    .max(100, {
      message: 'Description must be at most 100 characters long',
    })
    .nullish(),
});

export const tradeSchema = minimalEntry
  .extend({
    symbol: z
      .string({
        required_error: 'symbol-required',
      })
      .min(1, { message: 'symbol-required' })
      .max(30, {
        message: 'Symbol must be at most 30 characters long',
      }),

    direction: z.nativeEnum(Direction, {
      required_error: 'Direction is required',
    }),

    size: z
      .number({
        required_error: 'Size is required',
        invalid_type_error: 'Size must be a number',
      })
      .positive({ message: 'Size must be greater than 0' })
      .max(999999, { message: 'Size must be less than 1000000' }),
    profit: z
      .number()
      .positive({ message: 'Profit must be greater than 0' })
      .max(9999999999, { message: 'Profit must be less than 10000000000' })
      .nullish(),
    loss: z
      .number()
      .positive({ message: 'Loss must be greater than 0' })
      .max(9999999999, { message: 'Loss must be less than 10000000000' })
      .nullish(),
    exitDate: z.date().nullish(),
    exitPrice: z
      .number()
      .positive({ message: 'Exit Price must be greater than 0' })
      .max(9999999999, { message: 'Exit Price must be less than 10000000000' })
      .nullish(),
    costs: z
      .number()
      .positive({ message: 'Costs must be greater than 0' })
      .max(9999999999, { message: 'Costs must be less than 10000000000' })
      .nullish(),
  })
  .superRefine(({ date, exitDate }, context) => {
    if (exitDate && exitDate < date) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Exit Date must be after Date',
        path: ['exitDate'],
      });
    }
  });

export const depositSchema = minimalEntry;
export const withdrawalSchema = minimalEntry;
export const taxesSchema = minimalEntry;
export const dividendSchema = minimalEntry.extend({
  symbol: z
    .string({
      required_error: 'Symbol is required',
    })
    .min(1, { message: 'Symbol is required' })
    .max(30, {
      message: 'Symbol must be at most 30 characters long',
    }),
});

export const entrySchema = minimalEntry
  .extend({
    journal: journalSchema,
  })
  .merge(tradeSchema as any)
  .merge(depositSchema)
  .merge(withdrawalSchema)
  .merge(taxesSchema)
  .merge(dividendSchema);

export type Trade = z.infer<typeof tradeSchema>;
export type Deposit = z.infer<typeof depositSchema>;
export type Withdrawal = z.infer<typeof withdrawalSchema>;
export type Taxes = z.infer<typeof taxesSchema>;
export type Dividend = z.infer<typeof dividendSchema>;
export type Entry = z.infer<typeof entrySchema>;
