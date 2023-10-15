import { getWithdrawal, saveWithdrawal } from '@/data/withdrawal';
import { withdrawalSchema } from '@/model/entry';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const withdrawalRouter = router({
  single: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getWithdrawal(userEmail, input);
  }),
  save: privateProcedure
    .input(withdrawalSchema)
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await saveWithdrawal(userEmail, input);
    }),
});
