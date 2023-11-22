import {
  deleteJournal,
  getJournal,
  getJournals,
  saveJournal,
} from '@/lib/journals';
import { journalSchema } from '@/model/journal';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const journalRouter = router({
  list: privateProcedure
    .input(
      z
        .object({
          term: z.string().optional(),
          currencies: z.string().array().optional(),
          pageSize: z.number().optional(),
          pageNumber: z.number().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await getJournals(
        userEmail,
        input?.term,
        input?.currencies,
        input?.pageSize,
        input?.pageNumber
      );
    }),
  single: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getJournal(userEmail, input);
  }),
  save: privateProcedure
    .input(journalSchema)
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await saveJournal(userEmail, input);
    }),
  delete: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await deleteJournal(userEmail, input);
    }),
});
