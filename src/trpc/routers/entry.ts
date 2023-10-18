import { deleteEntry, getEntries, getEntryType } from '@/data/entries';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const entryRouter = router({
  list: privateProcedure.query(async ({ ctx }) => {
    const { userEmail } = ctx;
    return await getEntries(userEmail);
  }),
  delete: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await deleteEntry(userEmail, input);
    }),
  entryType: privateProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await getEntryType(userEmail, input);
    }),
});
