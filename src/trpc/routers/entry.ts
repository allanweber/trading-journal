import { getEntries } from '@/data/entries';
import { privateProcedure, router } from '../trpc';

export const entryRouter = router({
  list: privateProcedure.query(async ({ ctx }) => {
    const { userEmail } = ctx;
    return await getEntries(userEmail);
  }),
});
