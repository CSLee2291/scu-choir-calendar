import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import type { FullCalendarEvent } from '@/lib/types';

// Ensure environment variables are loaded (Next.js does this automatically in API routes)
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
// const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL;
// const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');


if (!GOOGLE_CALENDAR_ID) {
    console.error("Missing GOOGLE_CALENDAR_ID environment variable");
}
if (!GOOGLE_API_KEY /* && (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) */) {
    console.error("Missing Google API credentials (API Key or Service Account) in environment variables");
}

// Configure the Google Calendar API client
const calendar = google.calendar({
    version: 'v3',
    // --- Authentication ---
    // Option 1: API Key (Simpler for public read-only)
    auth: GOOGLE_API_KEY,

    // Option 2: Service Account (More Secure)
    // auth: new google.auth.GoogleAuth({
    //     credentials: {
    //         client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //         private_key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    //     },
    //     scopes: ['https://www.googleapis.com/auth/calendar.readonly'], // Read-only scope
    // }),
});

export async function GET(request: Request) {
    // You could add query parameters for start/end dates if needed for performance
    // const { searchParams } = new URL(request.url);
    // const timeMin = searchParams.get('start') || new Date().toISOString(); // Example: fetch from now onwards
    // const timeMax = searchParams.get('end');

    if (!GOOGLE_CALENDAR_ID || !GOOGLE_API_KEY /* Add check for Service Account if using */ ) {
        return NextResponse.json({ error: "API configuration missing on server." }, { status: 500 });
    }

    try {
        const response = await calendar.events.list({
            calendarId: GOOGLE_CALENDAR_ID,
            // timeMin: timeMin, // Fetch events starting from 'start' date provided by FullCalendar/client
            // timeMax: timeMax, // Fetch events up to 'end' date
             timeMin: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Fetch events from start of current year (adjust as needed)
            maxResults: 250, // Adjust as needed
            singleEvents: true, // Expand recurring events into single instances
            orderBy: 'startTime',
        });

        const events = response.data.items;

        if (!events) {
            return NextResponse.json({ error: "No events found or error fetching." }, { status: 404 });
        }

        // Map Google Calendar events to FullCalendarEvent format
        const formattedEvents: FullCalendarEvent[] = events.map((event) => ({
            id: event.id || `gcal-${Math.random().toString(36).substring(2, 15)}`, // Ensure an ID exists
            title: event.summary || 'No Title',
            start: event.start?.dateTime || event.start?.date || '', // Handles all-day vs timed events
            end: event.end?.dateTime || event.end?.date || undefined, // End is optional for all-day
            allDay: !!event.start?.date, // True if only 'date' is present, not 'dateTime'
            extendedProps: {
                description: event.description || '',
                location: event.location || '',
                googleCalendarId: event.id || undefined, // Keep original ID
            },
        })).filter(event => event.start); // Ensure event has a start date

        return NextResponse.json(formattedEvents);

    } catch (error: any) {
        console.error('Error fetching Google Calendar events:', error);
        let errorMessage = "Internal Server Error";
        let statusCode = 500;

        if (error.response?.data?.error?.message) {
            errorMessage = error.response.data.error.message;
            if (error.response.status === 404) {
                errorMessage = `Calendar not found or requires permissions: ${GOOGLE_CALENDAR_ID}`;
                statusCode = 404;
            }
             if (error.response.status === 403) {
                errorMessage = `Permission denied. Check API Key restrictions or Calendar sharing settings.`;
                statusCode = 403;
            }
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: "Failed to fetch calendar events.", details: errorMessage }, { status: statusCode });
    }
}