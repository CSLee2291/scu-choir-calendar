// src/lib/types.ts
export interface CalendarEvent {
    id: string;
    title: string;
    start: string | null; // ISO string or null
    end: string | null;   // ISO string or null
    allDay: boolean;
    description?: string;
    location?: string;
    googleCalendarId?: string; // Original Google event ID
  }
  
  // Type for FullCalendar event source format
  export interface FullCalendarEvent {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay: boolean;
    extendedProps: {
        description?: string;
        location?: string;
        googleCalendarId?: string;
        [key: string]: any; // Allow other properties
    };
  }