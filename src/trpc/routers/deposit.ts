import { getDeposit, saveDeposit } from '@/data/deposits';
import { depositSchema } from '@/model/entry';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const depositRouter = router({
  single: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getDeposit(userEmail, input);
  }),
  save: privateProcedure
    .input(depositSchema)
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await saveDeposit(userEmail, input);
    }),
});
