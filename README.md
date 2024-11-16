# Cryptocurrency Dashboard

A modern cryptocurrency tracking application built with Next.js, featuring real-time prices, detailed coin information, and interactive charts.

## Features

- Real-time cryptocurrency price tracking
- Detailed coin information with price history
- Interactive price charts
- Dark/Light mode toggle
- Responsive design for all devices
- Real-time data from CoinGecko API

## Tech Stack

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- Chart.js
- Axios
- CoinGecko API

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]

Copy

Apply

README.md
Install dependencies:
npm install

Copy

Execute

Run the development server:
npm run dev

Copy

Execute

Open http://localhost:3000 in your browser.
Project Structure
├── components/
│   └── ThemeToggle.tsx
├── context/
│   └── ThemeContext.tsx
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   └── coin/
│       └── [id].tsx
├── types/
│   └── coin.ts
└── styles/
    └── globals.css

Copy

Apply

API Integration
The application uses the following CoinGecko API endpoints:

/coins/markets - For dashboard data
/coins/{id} - For detailed coin information
/coins/{id}/market_chart - For price history data
Features in Detail
Dashboard
List of top 100 cryptocurrencies
Real-time price updates
Price change indicators
Market cap rankings
Coin Detail Page
Detailed coin information
7-day price chart
Price change statistics
Comprehensive coin description
Theme Toggle
Dark/Light mode support
Persistent theme preference
Smooth theme transitions
```
