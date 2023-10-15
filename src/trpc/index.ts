import { depositRouter } from './routers/deposit';
import { dividendRouter } from './routers/dividend';
import { entryRouter } from './routers/entry';
import { journalRouter } from './routers/journal';
import { taxesRouter } from './routers/taxes';
import { tradeRouter } from './routers/trade';
import { withdrawalRouter } from './routers/withdrawal';
import { router } from './trpc';

export const appRouter = router({
  journal: journalRouter,
  entry: entryRouter,
  deposit: depositRouter,
  withdrawal: withdrawalRouter,
  taxes: taxesRouter,
  dividend: dividendRouter,
  trade: tradeRouter,
});

export type AppRouter = typeof appRouter;
