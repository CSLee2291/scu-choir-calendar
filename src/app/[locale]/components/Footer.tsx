"use client"; // Use client for potential dynamic content or hooks

import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  //const { t } = useTranslations('common');
  const tCommon = useTranslations('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-center py-4 mt-12">
      <div className="container mx-auto px-4 text-sm">
        © {currentYear} {tCommon('choir_name')} | {tCommon('all_rights_reserved')}
      </div>
    </footer>
  );
};