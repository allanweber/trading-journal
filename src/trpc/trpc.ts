import { currentUser } from '@clerk/nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = await currentUser();

  if (!user || user.emailAddresses.length < 1) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      userEmail: user.emailAddresses[0].emailAddress,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
