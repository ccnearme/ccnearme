# Edge Function Deployment Guide

## What's Been Done
✅ Created Edge Function at `supabase/functions/send-quiz-emails/index.ts`
✅ Updated quiz form to call the Edge Function after submission
✅ Edge Function sends two emails via Resend:
  - Notification email to matthew@ccnearme.com with full submission details
  - Thank you email to the user with their scorecard

## Manual Deployment Steps

### 1. Deploy the Edge Function via Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/zjgiiasvprbceyolhich
2. Click on **Edge Functions** in the left sidebar
3. Click **Create Function** or **Deploy new function**
4. Name it: `send-quiz-emails`
5. Copy the entire contents of `supabase/functions/send-quiz-emails/index.ts` into the editor
6. Click **Deploy**

### 2. Set Environment Variables

1. In the Supabase Dashboard, go to **Project Settings** > **Edge Functions**
2. Scroll to **Secrets and Environment Variables**
3. Add a new secret:
   - Key: `RESEND_API_KEY`
   - Value: `re_AxcGtuzC_496U3fLAxeMesMSWGjuvEKnv`
4. Click **Save**

### 3. Verify the Function URL

The Edge Function will be available at:
```
https://zjgiiasvprbceyolhich.supabase.co/functions/v1/send-quiz-emails
```

This URL is already configured in the quiz form at `/app/quiz/page.tsx:215`

### 4. Test the Email Flow

1. Deploy your Next.js app with the updated quiz form code
2. Submit a test quiz response
3. Check that:
   - Quiz submission saves to database
   - You receive notification email at matthew@ccnearme.com
   - Test user receives thank you email
   - Form redirects to /thank-you page

### 5. Alternative: Deploy via CLI (if you have access token)

If you have a Supabase access token, you can deploy via CLI:

```bash
# Set your access token
export SUPABASE_ACCESS_TOKEN=your_token_here

# Deploy the function
npx supabase functions deploy send-quiz-emails --project-ref zjgiiasvprbceyolhich

# Set the secret
npx supabase secrets set RESEND_API_KEY=re_AxcGtuzC_496U3fLAxeMesMSWGjuvEKnv --project-ref zjgiiasvprbceyolhich
```

## Email Template Details

### Notification Email (to you)
- **To:** matthew@ccnearme.com
- **From:** CCNearMe <matthew@ccnearme.com>
- **Subject:** New Quiz Submission - {First Name} {Last Name}
- **Contains:** All quiz responses organized by section (Contact, Front 9, Back 9, etc.)

### Thank You Email (to user)
- **To:** User's email from form
- **From:** CCNearMe <matthew@ccnearme.com>
- **Subject:** Your CCNearMe Scorecard - Club Matches Coming Soon
- **Contains:**
  - Welcome message
  - What happens next (matching process, timeline)
  - Summary of their key responses
  - Contact info to reply

## Troubleshooting

If emails don't send:
1. Check Edge Function logs in Supabase Dashboard
2. Verify RESEND_API_KEY is set correctly
3. Confirm Resend API key is active at https://resend.com
4. Check browser console for any errors from the fetch call
5. Verify CORS headers are working (already configured in the Edge Function)

## Next Steps After Deployment

1. Deploy the updated Next.js app to Vercel
2. Test the complete flow on production
3. Monitor email delivery in Resend dashboard
4. Consider adding error tracking/logging for production
