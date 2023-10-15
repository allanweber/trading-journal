import { getTrade, saveTrade } from '@/data/trade';
import { tradeSchema } from '@/model/entry';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const tradeRouter = router({
  single: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getTrade(userEmail, input);
  }),
  save: privateProcedure.input(tradeSchema).mutation(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await saveTrade(userEmail, input);
  }),
});
