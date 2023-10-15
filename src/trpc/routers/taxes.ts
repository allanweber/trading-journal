import { getTaxes, saveTaxes } from '@/data/taxes';
import { taxesSchema } from '@/model/entry';
import { z } from 'zod';
import { privateProcedure, router } from '../trpc';

export const taxesRouter = router({
  single: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getTaxes(userEmail, input);
  }),
  save: privateProcedure.input(taxesSchema).mutation(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await saveTaxes(userEmail, input);
  }),
});
