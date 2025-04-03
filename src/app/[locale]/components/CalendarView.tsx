"use client";

import React, { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventClickArg, EventSourceInput } from '@fullcalendar/core';
import useSWR from 'swr';
import { FullCalendarEvent } from '@/lib/types';

// Define fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) {
        throw new Error('Failed to fetch calendar events');
    }
    return res.json();
});

interface CalendarViewProps {
  locale: string;
  onEventClick: (clickInfo: EventClickArg) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ locale, onEventClick }) => {
  // Fetch events from the API route
  const { data: events, error, isLoading } = useSWR<FullCalendarEvent[]>('/api/google-calendar', fetcher, {
    revalidateOnFocus: true, // Re-fetch when window gains focus
    // Add revalidation interval if desired
    // refreshInterval: 300000 // e.g., every 5 minutes
  });

  // Memoize the event source to prevent unnecessary re-renders
  const eventSource: EventSourceInput | undefined = useMemo(() => {
    if (events) {
      return events;
    }
    return undefined;
  }, [events]);

  // Map Next.js locale to FullCalendar locale
  const fcLocale = locale === 'zh-TW' ? 'zh-tw' : 'en'; // FullCalendar uses 'zh-tw'

  if (isLoading) return <p className="text-center py-10">Loading Calendar...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error loading events: {error.message}</p>;
  if (!events) return <p className="text-center py-10">No events found.</p>; // Should ideally not happen if fetch is ok

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek', // Responsive: these might get stacked on mobile
        }}
        events={eventSource}
        eventClick={onEventClick} // Pass the click handler
        locale={fcLocale} // Set FullCalendar's locale
        height="auto" // Adjust height automatically
        // Add more FullCalendar options as needed
        // selectable={true}
        // selectMirror={true}
        dayMaxEvents={true} // Or set a specific number
        buttonText={ // Example localization (can also be done via FullCalendar locale files)
          locale === 'zh-TW' ? {
            today: '今天',
            month: '月',
            week: '週',
            list: '列表'
          } : {}
        }
      />
    </div>
  );
};

export default CalendarView;