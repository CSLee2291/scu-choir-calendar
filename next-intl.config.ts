// next-intl.config.ts
import { getRequestConfig } from 'next-intl/server';

// Define the locales supported by your application
export const locales = ['en', 'zh-TW'];
export const defaultLocale = 'zh-TW';

export default getRequestConfig(async ({ locale }) => {
  console.log(`[next-intl.config] Loading messages for locale: ${locale}`);
  
  // Load messages from the messages directory
  let messages;
  try {
    messages = (await import(`./messages/${locale}.json`)).default;
    console.log(`[next-intl.config] Successfully loaded messages for locale: ${locale}`);
  } catch (error) {
    console.error(`[next-intl.config] Error loading messages for locale: ${locale}`, error);
    throw error;
  }

  return {
    locale,
    messages
  };
});
