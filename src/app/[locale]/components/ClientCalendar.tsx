"use client";

import { useLocale } from 'next-intl';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { EventClickArg } from '@fullcalendar/core';
import type { CalendarEvent } from '@/lib/types';

// Dynamically import components
const CalendarView = dynamic(() => import('./CalendarView'), { ssr: false });
const EventDetailsModal = dynamic(() => import('./EventDetailsModal'), { ssr: false });
const HelpGuide = dynamic(() => import('./HelpGuide'), { ssr: false });

interface ClientCalendarProps {
  locale?: string;
}

export default function ClientCalendar({ locale: propLocale }: ClientCalendarProps) {
  // Get locale from context if not provided as prop
  const contextLocale = useLocale();
  const locale = propLocale || contextLocale || 'zh-TW';

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventData: CalendarEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      allDay: clickInfo.event.allDay,
      description: clickInfo.event.extendedProps.description || '',
      location: clickInfo.event.extendedProps.location || '',
      googleCalendarId: clickInfo.event.extendedProps.googleCalendarId || '',
    };
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <CalendarView
        locale={locale}
        onEventClick={handleEventClick}
      />

      <HelpGuide />

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
          locale={locale}
        />
      )}
    </>
  );
}
