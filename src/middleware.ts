import { authMiddleware } from '@clerk/nextjs';
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'pt'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req);
  },

  publicRoutes: ['/:locale/sign-in', '/:locale/sign-up'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
