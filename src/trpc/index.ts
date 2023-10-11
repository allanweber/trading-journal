import { journalRouter } from './routers/journal';
import { router } from './trpc';

export const appRouter = router({
  journal: journalRouter,
});

export type AppRouter = typeof appRouter;
