import * as ics from 'ics';
import type { CalendarEvent } from '@/lib/types';

// Helper to convert local ISO string to UTC array format for ics library
const dateToUTCArray = (dateStr: string | null): ics.DateArray | undefined => {
    if (!dateStr) return undefined;
    try {
        const date = new Date(dateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) {
           throw new Error('Invalid date string provided');
        }
        return [
            date.getUTCFullYear(),
            date.getUTCMonth() + 1, // Month is 1-indexed
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
        ];
    } catch (error) {
        console.error("Error converting date to UTC Array:", dateStr, error);
        return undefined;
    }
};

// Helper to convert local date string (YYYY-MM-DD) to date array
const allDayDateToArray = (dateStr: string | null): ics.DateArray | undefined => {
    if (!dateStr) return undefined;
    try {
         // Expecting YYYY-MM-DD format
        const parts = dateStr.split('-').map(Number);
        if (parts.length !== 3 || parts.some(isNaN)) {
            throw new Error('Invalid all-day date string format');
        }
        return [parts[0], parts[1], parts[2]]; // [Year, Month, Day]
    } catch (error) {
        console.error("Error converting all-day date to Array:", dateStr, error);
        return undefined;
    }
};


export function generateICS(event: CalendarEvent): string {
    if (!event.start) {
        throw new Error("Event start date is required to generate ICS");
    }

    let startArray: ics.DateArray | undefined;
    let endArray: ics.DateArray | undefined;

    if (event.allDay) {
        startArray = allDayDateToArray(event.start);
        // For all-day events, the 'end' in Google Calendar points to the day *after* the event finishes.
        // The 'ics' library expects the end date to be the day *after* the last day of the event for multi-day events.
        // If event.end exists and it's different from event.start, use it directly.
        if (event.end && event.end !== event.start) {
           endArray = allDayDateToArray(event.end);
        } else {
           // If no end date, or end date is same as start date, it's a single-day event.
           // 'ics' library doesn't need an end date for single all-day events if duration isn't specified.
           // But to be safe, we can set it to the day after the start date.
           const startDate = new Date(event.start + 'T00:00:00Z'); // Treat as UTC date
            if (!isNaN(startDate.getTime())) {
                const nextDay = new Date(startDate);
                nextDay.setUTCDate(startDate.getUTCDate() + 1);
                endArray = [nextDay.getUTCFullYear(), nextDay.getUTCMonth() + 1, nextDay.getUTCDate()];
            }
        }

         if (!startArray) {
            throw new Error("Invalid all-day start date format for ICS generation");
        }

    } else {
        startArray = dateToUTCArray(event.start);
        endArray = dateToUTCArray(event.end); // Can be undefined if event has no end

         if (!startArray) {
            throw new Error("Invalid start date/time for ICS generation");
        }
    }


    const eventAttributes: ics.EventAttributes = {
        title: event.title,
        start: startArray,
        startInputType: 'utc', // Specify that the array is UTC
        description: event.description,
        location: event.location,
        // uid: event.googleCalendarId || `${event.start}-${event.title}`.replace(/[^a-z0-9]/gi, ''), // Optional: unique ID
        calName: '東吳絃訟合唱團行事曆',
        productId: 'SCUAlumniChoir/NextJS',
    };

    // Add end date if valid
    if (endArray) {
        eventAttributes.end = endArray;
        eventAttributes.endInputType = 'utc';
    } else if (!event.allDay && startArray) {
        // If it's a timed event with no end, add a default duration
        eventAttributes.duration = { hours: 2 };
    }


    const { error, value } = ics.createEvent(eventAttributes);

    if (error) {
        console.error("ICS Creation Error:", error);
        throw error;
    }
    if (!value) {
        throw new Error("ICS generation resulted in an empty value.");
    }

    return value;
}