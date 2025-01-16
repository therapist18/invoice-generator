# Invoice Generator

A modern invoice generation application built with Next.js, Tailwind CSS, and ShadCN UI components.

## Features

- Create and edit professional invoices
- Real-time preview
- Export to PDF and Word formats
- Supabase integration for data storage
- Modern UI with ShadcN components
- Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- ShadcN UI
- Lucide Icons
- Supabase

## Project Structure

```
invoice-generator/
├── app/
│   ├── components/    # Reusable UI components
│   ├── api/          # API routes
│   └── ...           # Pages and layouts
├── public/           # Static assets
└── utils/           # Helper functions
```
