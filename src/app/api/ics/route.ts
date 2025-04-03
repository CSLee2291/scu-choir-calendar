import { NextResponse } from 'next/server';
import { generateICS } from '@/lib/ics-generator';
import type { CalendarEvent } from '@/lib/types';

export async function POST(request: Request) {
  try {
    // Parse the event data from the request body
    const event: CalendarEvent = await request.json();
    
    // Validate event data
    if (!event || !event.start) {
      return NextResponse.json(
        { error: 'Invalid event data. Start date is required.' },
        { status: 400 }
      );
    }
    
    // Generate the ICS string
    const icsString = generateICS(event);
    
    // Return the ICS data with appropriate headers
    return new NextResponse(icsString, {
      headers: {
        'Content-Type': 'text/calendar;charset=utf-8',
        'Content-Disposition': `attachment; filename="${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'event'}.ics"`,
      },
    });
  } catch (error) {
    console.error('Error generating ICS file:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
