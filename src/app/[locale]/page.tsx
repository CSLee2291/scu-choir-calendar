"use client"; // Makes this a Client Component

import { useState } from 'react';
import { useParams } from 'next/navigation'; // Hook to get locale from URL
import dynamic from 'next/dynamic'; // Load FullCalendar dynamically
import { EventClickArg } from '@fullcalendar/core';
import { useTranslations } from 'next-intl';

import EventDetailsModal from './components/EventDetailsModal';
import HelpGuide from './components/HelpGuide';
import type { CalendarEvent } from '@/lib/types'; // Define a type for your event object

// Dynamically import FullCalendar to avoid SSR issues
const CalendarView = dynamic(() => import('./components/CalendarView'), {
  ssr: false, // Important: FullCalendar relies on browser APIs
  loading: () => <p className="text-center py-10">Loading Calendar...</p>,
});

export default function CalendarPage() {
  // const { t } = useTranslations('calendar'); // Load 'calendar' namespace
  const tCalendar = useTranslations('calendar');
  const params = useParams();
  const locale = params.locale as string || 'zh-TW'; // Get current locale

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (clickInfo: EventClickArg) => {
    // Map FullCalendar event object to our simpler CalendarEvent type
    const eventData: CalendarEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr, // Use ISO strings
      end: clickInfo.event.endStr,
      allDay: clickInfo.event.allDay,
      description: clickInfo.event.extendedProps.description || '',
      location: clickInfo.event.extendedProps.location || '',
      googleCalendarId: clickInfo.event.extendedProps.googleCalendarId || '', // Store original ID if needed
    };
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-12">
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
    </div>
  );
}