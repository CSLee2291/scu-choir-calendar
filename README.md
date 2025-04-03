# SCU Alumni Choir Calendar

A Next.js-based calendar application for 東吳絃訟合唱團 (Soochow University Alumni Choir) that allows members to view and export event information.

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

## Project Structure

```
src/
├── app/               # Next.js app directory
├── lib/              # Utility functions and shared logic
│   ├── ics-generator.ts
│   └── types.ts
└── components/       # React components
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