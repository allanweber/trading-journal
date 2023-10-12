import { depositRouter } from './routers/deposit';
import { entryRouter } from './routers/entry';
import { journalRouter } from './routers/journal';
import { router } from './trpc';

export const appRouter = router({
  journal: journalRouter,
  entry: entryRouter,
  deposit: depositRouter,
});

export type AppRouter = typeof appRouter;
