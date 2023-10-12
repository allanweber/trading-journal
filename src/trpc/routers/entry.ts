import { deleteEntry, getEntries } from '@/data/entries';
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
});
