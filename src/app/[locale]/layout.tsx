import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

type GenerateMetadataProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  // Access locale safely
  const locale = params?.locale || 'en';

  return {
    title: locale === 'zh-TW' ? '東吳絃訟合唱團行事曆' : 'SCU Alumni Choir Calendar',
    description: locale === 'zh-TW' ? '東吳絃訟合唱團活動行事曆' : 'Calendar for Soochow University Alumni Choir',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  // Access locale safely
  const locale = params?.locale || 'en';

  // Load messages from the messages directory
  let messages: Record<string, Record<string, string>>;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    // Fallback to default locale if messages can't be loaded
    messages = (await import(`../../../messages/en.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh-TW' }
  ];
}
