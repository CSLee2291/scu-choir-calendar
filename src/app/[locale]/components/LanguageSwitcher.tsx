"use client";

import { usePathname, useRouter } from 'next/navigation'; // Use from next/navigation
import { useLocale } from 'next-intl';
import { locales } from 'i18n'; // Use absolute path from src

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const currentPathname = usePathname(); // Includes locale prefix if present

  const changeLocale = (newLocale: string) => {
    // next-intl's middleware handles the routing, we just need to push the new path
    // The pathname might or might not have the locale prefix depending on middleware config
    // We need to derive the path *without* the current locale prefix

    let pathWithoutLocale = currentPathname;
    if (currentPathname.startsWith(`/${currentLocale}`)) {
       pathWithoutLocale = currentPathname.substring(currentLocale.length+1) || '/'; // Remove prefix, ensure root '/'
    }

     // Construct the new path (middleware decides if prefix is needed)
     const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
    router.refresh(); // Optional: force refresh to ensure server components re-render with new locale if needed
  };

  return (
    <div className="flex space-x-2 text-sm">
      {locales.map((locale) => {
        if (locale === currentLocale) return null;
        return (
          <button
            key={locale}
            onClick={() => changeLocale(locale)}
            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {/* Use translations for language names if desired */}
            {locale === 'en' ? 'English' : '繁體中文'}
          </button>
        );
      })}
    </div>
  );
}