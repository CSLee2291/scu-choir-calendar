// i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define supported locales
export const locales = ['en', 'zh-TW'];
export const defaultLocale = 'zh-TW';

// This is the configuration for next-intl
// It will be used by the middleware and the app router
export default getRequestConfig(async ({ locale }) => {
  console.log(`[i18n] getRequestConfig called for locale: ${locale}`);
  
  // Validate the locale
  if (!locales.includes(locale as any)) {
    console.warn(`[i18n] Invalid locale: ${locale}, falling back to ${defaultLocale}`);
    notFound();
  }

  // Load messages from the messages directory
  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
    console.log(`[i18n] Successfully loaded messages for locale: ${locale}`);
  } catch (error) {
    console.error(`[i18n] Error loading messages for locale: ${locale}`, error);
    notFound();
  }

  return {
    locale: locale,
    messages: messages
  };
});
