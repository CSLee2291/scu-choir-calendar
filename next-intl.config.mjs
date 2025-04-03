// next-intl.config.js
export const locales = ['en', 'zh-TW'];
export const defaultLocale = 'zh-TW';

export default {
  // Define the locales supported by your application
  locales,
  
  // Set the default locale
  defaultLocale,
  
  // Define how to load messages
  // This function will be called for each locale that needs to be loaded
  getMessages: async (locale) => {
    console.log(`[next-intl.config] Loading messages for locale: ${locale}`);
    try {
      // Import the messages from the messages directory
      return (await import(`./messages/${locale}.json`)).default;
    } catch (error) {
      console.error(`[next-intl.config] Error loading messages for locale: ${locale}`, error);
      throw error;
    }
  }
};
