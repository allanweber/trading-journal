import { getDividend, saveDividend } from '@/data/dividend';
import { dividendSchema } from '@/model/entry';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const dividendRouter = router({
  single: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getDividend(userEmail, input);
  }),
  save: privateProcedure
    .input(dividendSchema)
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await saveDividend(userEmail, input);
    }),
});
