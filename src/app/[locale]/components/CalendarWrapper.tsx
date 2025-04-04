"use client";

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for the client component
const CalendarClient = dynamic(
  () => import('./CalendarClient'),
  { ssr: false }
);

interface CalendarWrapperProps {
  locale: string;
}

export default function CalendarWrapper({ locale }: CalendarWrapperProps) {
  return <CalendarClient locale={locale} />;
}
