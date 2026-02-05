# CCNearMe - Complete Setup Guide

## Quick Start

Your Next.js application is ready to go! Follow these steps to get everything running.

### ✅ Already Complete

- [x] Next.js 14 project with TypeScript and Tailwind CSS
- [x] Supabase client configured
- [x] Environment variables set up
- [x] Landing page built
- [x] 18-question quiz flow
- [x] Thank you page
- [x] 100+ clubs dataset generated
- [x] Database schema created

### 🚀 Next Steps

## 1. Set Up Your Supabase Database

1. **Open Supabase Dashboard**
   - Go to: https://zjgiiasvprbceyolhich.supabase.co
   - Navigate to: SQL Editor

2. **Run the Database Schema**
   - Open the file `supabase-schema.sql` in this project
   - Copy the entire contents
   - Paste into Supabase SQL Editor
   - Click "Run"

   This creates:
   - `questionnaire_responses` table (stores user submissions)
   - `clubs` table (stores all 247 country clubs)
   - Indexes for performance
   - Row Level Security policies

3. **Verify Tables Were Created**
   - Go to: Table Editor in Supabase
   - You should see two new tables: `questionnaire_responses` and `clubs`

## 2. Import the Clubs Data

### Option A: Manual Import (Recommended for First Time)

1. Go to Supabase Dashboard > Table Editor
2. Select the `clubs` table
3. Click "Insert" > "Insert rows"
4. Copy a few clubs from `clubs-data.json` to test
5. Verify they appear in the table

### Option B: Bulk Import Script

```bash
# Install dotenv package first
npm install dotenv

# Run the import script
node import-clubs.js
```

This will import all 100+ clubs from `clubs-data.json` into your Supabase database.

**Note**: The clubs dataset currently has ~100 clubs. You mentioned needing 247 total. The current dataset includes:
- Elite tier clubs (Pine Valley, Winged Foot, Merion, etc.)
- Premium clubs
- Mid-tier clubs
- Accessible clubs

Across NJ, Westchester NY, Philadelphia suburbs PA, and more.

## 3. Test the Application

The dev server is already running at: **http://localhost:3000**

### Test the Flow:

1. **Landing Page** (`/`)
   - Clean hero with "Find Your Home of Golf" headline
   - "Start" button

2. **Quiz** (`/quiz`)
   - Driving Range intro (name, email, phone, ZIP)
   - Holes 1-9: Golf game questions
   - Making the Turn: Breather screen
   - Holes 10-18: Club preferences and budget
   - Submit

3. **Thank You** (`/thank-you`)
   - Confirmation message
   - "We'll email you your matches within 24 hours"

### Things to Test:

- [ ] Fill out the questionnaire
- [ ] Check that data appears in Supabase `questionnaire_responses` table
- [ ] Test on mobile (resize browser)
- [ ] Test form validation (email required)
- [ ] Test conditional field (kids ages when "family" selected)
- [ ] Test checkbox selections (amenities)

## 4. Customize as Needed

### Update Copy
Edit these files to change text:
- `app/page.tsx` - Landing page
- `lib/questions.ts` - Quiz questions
- `app/thank-you/page.tsx` - Thank you message

### Update Colors
Edit `tailwind.config.ts` to change the sage green theme:
```typescript
sage: {
  50: '#f6f7f6',
  // ... customize colors
}
```

### Add More Clubs
Edit `clubs-data.json` and add more club entries, then re-run the import script.

## 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Add Environment Variables in Vercel:
1. Go to your Vercel project settings
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = https://zjgiiasvprbceyolhich.supabase.co
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your key from .env.local)

## Project Structure

```
ccnearme/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── quiz/page.tsx            # 18-question questionnaire
│   ├── thank-you/page.tsx       # Success page
│   ├── privacy/page.tsx         # Privacy policy
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Styles + animations
├── lib/
│   ├── supabase.ts              # Supabase client setup
│   └── questions.ts             # All 18 questions data
├── clubs-data.json              # Country clubs dataset
├── supabase-schema.sql          # Database schema
├── import-clubs.js              # Data import script
├── .env.local                   # Supabase credentials
└── README.md                    # Documentation
```

## Database Schema

### questionnaire_responses
Stores every quiz submission with:
- User info (name, email, phone, ZIP)
- All 18 question responses
- Timestamp
- IP address (optional)

### clubs
Contains club information:
- Name, location (city, state, county, ZIP)
- Contact (phone, website)
- Coordinates (latitude, longitude)
- Course architect
- Tier (Elite/Premium/Mid-Tier/Accessible)
- Primary focus (Championship Golf / Family & Social)
- Atmosphere
- Notes

## Design Philosophy

**For golf sickos, not golf hardos.**

- Clean, direct, honest
- No stock photos of people pointing
- Muted sage greens, not bright/garish
- Fast, smooth transitions
- Mobile-first (most users on phone)

## Tone Examples

✅ Good:
- "Find Your Home of Golf"
- "We match you with clubs that fit your game"
- "Takes 5 minutes"
- "18 questions. Honest matches. No BS."

❌ Bad:
- "Curated experience"
- "Premium bespoke solutions"
- "Exclusive membership opportunities"

## Next Features to Build

1. **Matching Algorithm**
   - Calculate drive time from user ZIP to clubs
   - Filter by budget (initiation + dues)
   - Match atmosphere preferences
   - Weight golf vs. family focus

2. **Email System**
   - Send matches to users
   - Send lead notifications to clubs

3. **Admin Dashboard**
   - View submissions
   - Manage clubs
   - Track conversions

4. **Analytics**
   - Track completion rate
   - Popular preferences
   - Drop-off points

## Support

Questions? Issues?
- Check `README.md` for general info
- Review code comments in each file
- Test data flow: Form → Supabase → Thank you page

The foundation is solid. You're ready to start testing and iterating!
