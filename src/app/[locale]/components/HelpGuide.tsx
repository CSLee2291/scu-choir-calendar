"use client";

import { useTranslations } from 'next-intl';

// Import your SVG components
import GuideStep1 from '../../../../public/images/svg/guide-step-1.svg';
import GuideStep2 from '../../../../public/images/svg/guide-step-2.svg';
import GuideStep3 from '../../../../public/images/svg/guide-step-3.svg';

const HelpGuide = () => {
  //const { t } = useTranslation('calendar'); // Assuming help texts are in 'calendar' namespace
  const tCalendar = useTranslations('calendar');

  const steps = [
    {
      title: tCalendar('help_step1_title'),
      description: tCalendar('help_step1_desc'),
      Icon: GuideStep1,
    },
    {
      title: tCalendar('help_step2_title'),
      description: tCalendar('help_step2_desc'),
      Icon: GuideStep2,
    },
    {
      title: tCalendar('help_step3_title'),
      description: tCalendar('help_step3_desc'),
      Icon: GuideStep3,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        {tCalendar('how_to_use_title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-3 text-indigo-600 dark:text-indigo-400">
              {/* Render the imported SVG component */}
              <step.Icon className="w-full h-full object-contain" />
            </div>
            <h3 className="text-md md:text-lg font-semibold text-gray-700 dark:text-gray-300">{step.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpGuide;
