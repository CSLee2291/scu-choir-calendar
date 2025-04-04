"use client"; // Needed for LanguageSwitcher interaction

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher'; // Assuming it's in the same directory

interface HeaderProps {
    locale: string;
}

export const Header: React.FC<HeaderProps> = ({ locale }) => {
  // Determine title based on locale for display
  const displayTitle = locale === 'zh-TW' ? '東吳絃訟合唱團行事曆' : 'SCU Alumni Choir Calendar';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={`/${locale}`} className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
           {displayTitle}
        </Link>
        <div className="flex items-center space-x-4">
          {/* Add other nav links here if needed */}
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};