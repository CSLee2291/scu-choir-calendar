// src/app/page.tsx
import { redirect } from 'next/navigation';
import { defaultLocale } from '../../next-intl.config';

// This page redirects from / to /[defaultLocale]
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
