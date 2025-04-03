"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { generateICS } from '@/lib/ics-generator';
import type { CalendarEvent } from '@/lib/types';

interface DownloadButtonsProps {
  event: CalendarEvent;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ event }) => {
  //const { t } = useTranslations('calendar');
  const tCalendar = useTranslations('calendar');
  const tCommon = useTranslations('common');

  const handleDownloadICS = () => {
    try {
        // Validate event data before generating ICS
        if (!event.start) {
            throw new Error('Event start date is missing');
        }

        const icsString = generateICS(event);
        const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        // Sanitize title for filename
        const filename = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'event'}.ics`;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up
    } catch (error) {
        console.error("Error generating or downloading ICS:", error);
        // Provide more detailed user feedback
        alert(tCalendar('error_generating_ics') + (error instanceof Error ? `: ${error.message}` : ''));
    }
  };

  const getGoogleCalendarUrl = (): string => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams();

    params.append('text', event.title);

    // Format dates for Google Calendar URL (YYYYMMDDTHHmmssZ or YYYYMMDD)
    const formatGCALDate = (dateStr: string | null, allDay: boolean, isEnd: boolean = false): string => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            if (allDay) {
                // For all-day events, Google expects YYYYMMDD format.
                // For the end date, Google needs the date *after* the last day.
                const targetDate = isEnd ? new Date(date.getTime()) : date;
                 // No time component, just the date part in UTC context to avoid timezone shifts affecting the date itself
                 const year = targetDate.getUTCFullYear();
                 const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, '0');
                 const day = targetDate.getUTCDate().toString().padStart(2, '0');
                 return `${year}${month}${day}`;
            } else {
                // For timed events, Google expects YYYYMMDDTHHmmssZ (UTC time)
                return date.toISOString().replace(/-|:|\.\d{3}/g, '');
            }
        } catch {
            return '';
        }
    };

    const startDate = formatGCALDate(event.start, event.allDay);
    // Google calendar's end date is exclusive for all-day events
    const endDate = formatGCALDate(event.end, event.allDay, true);

    if (startDate && endDate) {
         params.append('dates', `${startDate}/${endDate}`);
    } else if (startDate) {
        // If only start date is available (might happen with malformed data)
        params.append('dates', `${startDate}/${startDate}`); // Make it a single point/day
    }


    if (event.description) params.append('details', event.description);
    if (event.location) params.append('location', event.location);

    return `${baseUrl}&${params.toString()}`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleDownloadICS}
        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        {/* Add an icon if desired */}
        {tCalendar('download_ics')} <span className='ml-1 text-xs'>(.ics)</span>
      </button>
      <a
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {/* Add Google Calendar Icon */}
        {tCalendar('add_to_google')}
      </a>
      {/* Outlook usually imports .ics well, so one button might suffice.
          If needed, a separate Outlook link can be generated, but it's less standard. */}
    </div>
  );
};

export default DownloadButtons;