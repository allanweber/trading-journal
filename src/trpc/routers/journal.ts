import {
  deleteJournal,
  getJournal,
  getJournals,
  saveJournal,
} from '@/data/journals';
import { journalSchema } from '@/model/journal';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const journalRouter = router({
  list: privateProcedure.query(async ({ ctx }) => {
    console.log('ctx', ctx);
    const { userEmail } = ctx;
    return await getJournals(userEmail);
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
