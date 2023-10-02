import { getAllJournals } from '@/model/journal';
import { privateProcedure, router } from './trpc';

export const appRouter = router({
  journals: privateProcedure.query(async ({ ctx }) => {
    const { userEmail } = ctx;
    const journals = await getAllJournals(userEmail);
    return journals;
  }),
});

export type AppRouter = typeof appRouter;
