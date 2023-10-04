import { getJournal, getJournals } from '@/lib/journals';
import { z } from 'zod';
import { privateProcedure, router } from './trpc';

export const appRouter = router({
  journals: privateProcedure.query(async ({ ctx }) => {
    const { userEmail } = ctx;
    const journals = await getJournals(userEmail);
    return journals;
  }),
  journal: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getJournal(userEmail, input);
  }),
});

export type AppRouter = typeof appRouter;
