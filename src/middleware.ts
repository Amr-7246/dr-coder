import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches a prefix path
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized paths
  matcher: ['/', '/(de|en)/:path*']
};
