import { getJournal, getJournals, saveJournal } from '@/data/journals';
import { journalSchema } from '@/model/journal';
import { z } from 'zod';
import { privateProcedure, router } from './trpc';

export const appRouter = router({
  journals: privateProcedure.query(async ({ ctx }) => {
    const { userEmail } = ctx;
    return await getJournals(userEmail);
  }),
  journal: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { userEmail } = ctx;
    return await getJournal(userEmail, input);
  }),
  journalSave: privateProcedure
    .input(journalSchema)
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = ctx;
      return await saveJournal(userEmail, input);
    }),
});

export type AppRouter = typeof appRouter;
