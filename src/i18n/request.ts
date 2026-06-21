import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Await the incoming locale from the routing layer
  let locale = await requestLocale;

  // 2. Fallback default if locale cannot be found or matched
  if (!locale || !['en', 'ar'].includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    // 3. Cleanly load the specific JSON module without undefined risks
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
