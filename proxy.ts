// proxy.ts  ← yeh naam important hai Next.js 16 ke liye
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';  // ya jo bhi path hai tumhara routing.ts ka

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match almost everything except internal Next.js stuff
    '/((?!_next|api|.*\\..*).*)',
    '/'
  ]
};