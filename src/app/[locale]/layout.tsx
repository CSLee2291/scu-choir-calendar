// src/app/[locale]/layout.tsx
import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
// Import locales from next-intl.config.ts
import { locales } from '../../../next-intl.config';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // Get the locale from params
  const { locale } = params;
  
  // Validate the locale
  if (!locales.includes(locale)) {
    console.warn(`[Layout] Invalid locale "${locale}" received in params. Rendering 404.`);
    notFound();
  }
  
  console.log(`[Layout] Locale from params: ${locale}`);

  // Load messages for the locale
  let messages: AbstractIntlMessages;
  try {
    console.log(`[Layout] Attempting to load messages using getMessages()`);
    // Use getMessages without parameters to use the locale from the context
    messages = await getMessages();
    console.log(`[Layout] Successfully loaded messages using getMessages()`);
  } catch (error) {
    console.error(`[Layout] Error calling getMessages():`, error);
    notFound();
  }

  return (
      <html lang={locale} suppressHydrationWarning>
          <body className="flex flex-col min-h-screen">
              <Suspense fallback={<div>Loading...</div>}>
                  <NextIntlClientProvider locale={locale} messages={messages}>
                      <Header locale={locale} />
                      <main className="flex-grow container mx-auto px-4 py-8">
                          {children}
                      </main>
                      <Footer locale={locale} />
                  </NextIntlClientProvider>
              </Suspense>
          </body>
      </html>
  );
}
