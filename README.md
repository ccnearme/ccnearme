# CCNearMe - Country Club Matching Platform

A Next.js application that matches golfers with private country clubs through an 18-question questionnaire styled as "18 holes of golf."

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL)
- **Vercel** (Deployment)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Go to your Supabase project: https://zjgiiasvprbceyolhich.supabase.co
2. Navigate to SQL Editor
3. Copy and run the SQL from `supabase-schema.sql`

This will create:
- `questionnaire_responses` table
- `clubs` table
- Necessary indexes
- Row Level Security policies

### 3. Import Clubs Data

To import the 247 clubs into your Supabase database:

1. Go to Supabase Dashboard > Table Editor
2. Select the `clubs` table
3. Click "Insert" > "Insert rows"
4. Or use the SQL Editor to bulk import from `clubs-data.json`

Alternative: Use the Supabase JavaScript client to import:

```bash
node import-clubs.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Application Flow

1. **Landing Page** (`/`) - Simple hero with "Start" CTA
2. **Quiz** (`/quiz`) - 18-question questionnaire with:
   - Intro (Driving Range) - collect basic info
   - Holes 1-9 (Front 9) - golf game questions
   - Making the Turn - breather screen
   - Holes 10-18 (Back 9) - club preferences and budget
3. **Thank You** (`/thank-you`) - Confirmation page

## Database Schema

### questionnaire_responses
Stores all user responses from the quiz

### clubs
Contains 247 private country clubs across:
- New Jersey (102 clubs)
- Westchester/Rockland/Orange County, NY (58 clubs)
- Bucks/Lehigh/Philadelphia suburbs, PA (52 clubs)
- Fairfield County, CT (20 clubs)
- Northern Delaware (15 clubs)

## Design Principles

- **Mobile-first** - Most users on phone
- **Clean typography** - Sans-serif, readable
- **Muted colors** - Sage green accents
- **Fast** - Smooth animations but performant
- **Honest tone** - For golf sickos, not golf hardos

## Deployment

Deploy to Vercel:

```bash
vercel
```

Environment variables are already set in `.env.local` and will need to be added to Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Project Structure

```
ccnearme/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/
│   │   └── page.tsx          # Questionnaire
│   ├── thank-you/
│   │   └── page.tsx          # Thank you page
│   ├── privacy/
│   │   └── page.tsx          # Privacy policy
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── questions.ts          # Question data
├── clubs-data.json           # 247 clubs dataset
└── supabase-schema.sql       # Database schema
```

## Next Steps

1. ✅ Set up database schema in Supabase
2. ✅ Import clubs data
3. Test the questionnaire flow
4. Build matching algorithm
5. Set up email notifications
6. Deploy to Vercel
