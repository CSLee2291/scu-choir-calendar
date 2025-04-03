import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

// Base Metadata (can be overridden per page/layout)
export const metadata: Metadata = {
  title: 'SCU Choir Calendar', // Default title
  description: 'Calendar for Soochow University Alumni Choir',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The lang attribute will be set in the [locale] layout
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}