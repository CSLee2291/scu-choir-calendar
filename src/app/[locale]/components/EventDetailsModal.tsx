"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';
import { enUS, zhTW } from 'date-fns/locale'; // Import locales
import { useTranslations } from 'next-intl';

import DownloadButtons from './DownloadButtons';
import type { CalendarEvent } from '@/lib/types';

interface EventDetailsModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, isOpen, onClose, locale }) => {
  //const { t } = useTranslations(['calendar', 'common']); // Load multiple namespaces
  const tCalendar = useTranslations('calendar');
  const tCommon = useTranslations('common');

  const dateLocale = locale === 'zh-TW' ? zhTW : enUS;

  if (!event) return null;

  const formatEventDate = (startStr: string | null, endStr: string | null, allDay: boolean): string => {
    if (!startStr) return tCommon('common:date_not_available');

    try {
        const start = parseISO(startStr);
        const end = endStr ? parseISO(endStr) : null;

        // Define formats based on locale
        const dateFormat = locale === 'zh-TW' ? 'yyyy年M月d日' : 'MMMM d, yyyy';
        const timeFormat = locale === 'zh-TW' ? 'ah:mm' : 'h:mm a'; // a for AM/PM marker

        if (allDay) {
             if (end && format(start, 'yyyyMMdd') !== format(end, 'yyyyMMdd')) {
                // Multi-day all-day event (ends the day *after* the last full day)
                 const inclusiveEndDate = new Date(end.getTime() - 1); // Adjust end date to be inclusive
                 if (format(start, 'yyyyMMdd') === format(inclusiveEndDate, 'yyyyMMdd')) {
                     // If it effectively ends on the same day it starts (e.g., event ending midnight) treat as single day
                     return format(start, dateFormat, { locale: dateLocale });
                 }
                 return `${format(start, dateFormat, { locale: dateLocale })} - ${format(inclusiveEndDate, dateFormat, { locale: dateLocale })}`;
             }
            // Single all-day event
            return format(start, dateFormat, { locale: dateLocale });
        } else {
             const startTime = format(start, timeFormat, { locale: dateLocale });
             if (end) {
                 const endTime = format(end, timeFormat, { locale: dateLocale });
                 // Check if start and end are on the same day
                 if (format(start, 'yyyyMMdd') === format(end, 'yyyyMMdd')) {
                     return `${format(start, dateFormat, { locale: dateLocale })} ${startTime} - ${endTime}`;
                 } else {
                     // Multi-day timed event
                     return `${format(start, `${dateFormat} ${timeFormat}`, { locale: dateLocale })} - ${format(end, `${dateFormat} ${timeFormat}`, { locale: dateLocale })}`;
                 }
             } else {
                 // Event with start time but no end time
                 return `${format(start, dateFormat, { locale: dateLocale })} ${startTime}`;
             }
        }
    } catch (e) {
        console.error("Error parsing date:", startStr, endStr, e);
        return tCommon('common:date_invalid');
    }
};


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 border-b pb-2 mb-4 flex justify-between items-center"
                >
                  {event.title}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label={tCommon('common:close')}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>
                <div className="mt-2 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                   <p>
                    <strong className="font-semibold">{tCalendar('calendar:date_time')}:</strong>{' '}
                    {formatEventDate(event.start, event.end, event.allDay)}
                    {event.allDay && <span className="text-xs text-gray-500 ml-2">({tCalendar('calendar:all_day')})</span>}
                  </p>
                   {event.location && (
                    <p>
                      <strong className="font-semibold">{tCalendar('calendar:location')}:</strong> {event.location}
                    </p>
                  )}
                  {event.description && (
                    <div>
                      <strong className="font-semibold">{tCalendar('calendar:description')}:</strong>
                      {/* Render description safely - basic approach, consider sanitization if HTML is expected */}
                      <p className="mt-1 whitespace-pre-wrap">{event.description}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <DownloadButtons event={event} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventDetailsModal;