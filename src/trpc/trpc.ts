import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './context';

const t = initTRPC.context<Context>().create({ transformer: superjson });
const middleware = t.middleware;

// const isAuth = middleware(async (opts) => {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     throw new TRPCError({ code: 'UNAUTHORIZED' });
//   }

//   return opts.next({
//     ctx: {
//       userEmail: session.user.email!,
//       session,
//     },
//   });
// });

const isAuth = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      //TODO find a wai to get email
      userEmail: ctx.auth.user?.username,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
