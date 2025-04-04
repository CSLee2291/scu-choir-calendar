"use client";

import { useParams } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import dynamic from 'next/dynamic';
import messages from './messages';

// Use dynamic import with no SSR to avoid hydration issues
const ClientCalendar = dynamic(
  () => import('./ClientCalendar'),
  { ssr: false }
);

export default function ClientCalendarWrapper() {
  const params = useParams();
  const locale = params.locale as string || 'zh-TW';

  // Get the messages for the current locale or fallback to English
  const localeMessages = messages[locale as keyof typeof messages] || messages['en'];

  return (
    <NextIntlClientProvider locale={locale} messages={localeMessages}>
      <ClientCalendar />
    </NextIntlClientProvider>
  );
}
