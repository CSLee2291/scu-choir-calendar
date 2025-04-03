// middleware.ts
import createMiddleware from 'next-intl/middleware';

// Define the locales supported by your application
export const locales = ['en', 'zh-TW'];
export const defaultLocale = 'zh-TW';

// This middleware intercepts requests to /
// and redirects them to the default locale
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - etc.
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
