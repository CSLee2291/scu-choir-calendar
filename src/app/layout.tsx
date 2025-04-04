import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

// Base Metadata (can be overridden per page/layout)
export const metadata: Metadata = {
  title: 'SCU Choir Calendar',
  description: 'Calendar for Soochow University Alumni Choir',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
