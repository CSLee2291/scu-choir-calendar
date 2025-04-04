# SCU Alumni Choir Calendar

A Next.js-based calendar application for 東吳絃訟合唱團 (Soochow University Alumni Choir) that allows members to view and export event information.

## Summary

This application provides a centralized calendar system for the Soochow University Alumni Choir, making it easy for members to stay informed about upcoming rehearsals, performances, and social events. The calendar integrates with Google Calendar for data sourcing while offering a customized interface tailored to the choir's needs.

Members can view events in different formats (month, week, or list view), click on events to see detailed information, and export events to their personal calendars. The application supports both English and Traditional Chinese to accommodate all choir members.

## Features

- View choir events and activities
- Export events to:
  - ICS format (compatible with most calendar applications)
  - Google Calendar
- Multi-language support
- Dark/Light mode support
- Responsive design

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Internationalization**: next-intl
- **Calendar Export**: ics.js
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CSLee2291/scu-choir-calendar.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create necessary environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Recent Changes

### Fixed Internationalization and Client Components (2025-04-04)

1. **Improved Client-Side Architecture**:
   - Created a proper client component hierarchy with NextIntlClientProvider
   - Fixed the "Failed to call `useTranslations`" error by providing translations context
   - Implemented pre-loaded messages for client components

2. **Layout Component Optimization**:
   - Fixed the layout component to be synchronous as required by Next.js
   - Improved the component structure to better separate server and client concerns
   - Enhanced the dynamic loading of components to avoid hydration issues

### Fixed .ics File Download Functionality (2025-04-03)

1. **Server-side .ics Generation**:
   - Created a new API route at `/api/ics/route.ts` to handle .ics file generation on the server side
   - Updated the `DownloadButtons.tsx` component to use the new API route for generating and downloading .ics files

2. **Improved Error Handling**:
   - Added better validation and error handling in both the client and server code
   - Provided more detailed error messages to the user

3. **Fixed Layout Issues**:
   - Updated the `[locale]/layout.tsx` file to handle locale parameters correctly

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── [locale]/           # Localized routes
│   │   ├── components/     # Locale-specific components
│   │   │   ├── CalendarView.tsx
│   │   │   ├── ClientCalendar.tsx
│   │   │   ├── ClientCalendarWrapper.tsx
│   │   │   ├── EventDetailsModal.tsx
│   │   │   ├── HelpGuide.tsx
│   │   │   └── messages.ts     # Pre-loaded translations
│   │   ├── layout.tsx        # Locale layout
│   │   └── page.tsx          # Main page
│   └── api/                # API routes
│       ├── google-calendar/  # Google Calendar API
│       └── ics/              # .ics file generation API
├── lib/                     # Utility functions and shared logic
│   ├── ics-generator.ts     # ICS file generation
│   └── types.ts             # TypeScript type definitions
├── components/              # Shared React components
└── messages/                # Internationalization messages
    ├── en.json              # English translations
    └── zh-TW.json           # Traditional Chinese translations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/CSLee2291/scu-choir-calendar](https://github.com/CSLee2291/scu-choir-calendar)