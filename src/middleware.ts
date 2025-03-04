import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './libs/i18nNavigation';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
};
