"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Dynamically import icons from the components directory
const CalendarIcon = dynamic(() => import('../../../components/icons/CalendarIcon'), { ssr: false });
const DownloadIcon = dynamic(() => import('../../../components/icons/DownloadIcon'), { ssr: false });
const ShareIcon = dynamic(() => import('@/components/icons/ShareIcon'), { ssr: false });

const HelpGuide: React.FC = () => {
  const t = useTranslations('help');

  // Define steps after the icons are imported
  const renderStep = (Icon: any, title: string, description: string, index: number) => (
    <div key={index} className="flex flex-col items-center text-center">
      <div className="w-24 h-24 md:w-32 md:h-32 mb-3 text-indigo-600 dark:text-indigo-400">
        <Icon className="w-full h-full object-contain" />
      </div>
      <h3 className="text-md md:text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );

  return (
    <div className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('guide_title')}</h2>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {renderStep(CalendarIcon, t('step1_title'), t('step1_description'), 0)}
            {renderStep(DownloadIcon, t('step2_title'), t('step2_description'), 1)}
            {renderStep(ShareIcon, t('step3_title'), t('step3_description'), 2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpGuide;
