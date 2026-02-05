import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { formData } = await req.json()

    // Send notification email to matthew@ccnearme.com
    const notificationEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CCNearMe <matthew@ccnearme.com>',
        to: 'matthew@ccnearme.com',
        subject: `New Quiz Submission - ${formData.first_name} ${formData.last_name}`,
        html: `
          <h2>New Quiz Submission</h2>

          <h3>Contact Info</h3>
          <ul>
            <li><strong>Name:</strong> ${formData.first_name} ${formData.last_name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
            <li><strong>ZIP Code:</strong> ${formData.zip_code}</li>
            <li><strong>Age:</strong> ${formData.age_range || 'Not provided'}</li>
          </ul>

          <h3>Front 9</h3>
          <ul>
            <li><strong>Drive Time:</strong> ${formData.drive_time}</li>
            <li><strong>Timeline:</strong> ${formData.timeline}</li>
            <li><strong>Play Frequency:</strong> ${formData.play_frequency}</li>
            <li><strong>Handicap:</strong> ${formData.handicap || 'Not provided'}</li>
            <li><strong>Current Golf Home:</strong> ${formData.current_golf_home}</li>
            ${formData.current_club_name ? `<li><strong>Current Club:</strong> ${formData.current_club_name}</li>` : ''}
            <li><strong>Annual Golf Spend:</strong> ${formData.annual_golf_spend}</li>
            <li><strong>Primary Goal:</strong> ${formData.primary_goal}</li>
            <li><strong>Tournament Interest:</strong> ${formData.tournament_interest}</li>
            <li><strong>Practice Facility:</strong> ${formData.practice_facility}</li>
          </ul>

          <h3>Back 9</h3>
          <ul>
            <li><strong>Atmosphere:</strong> ${formData.atmosphere}</li>
            <li><strong>Family Situation:</strong> ${formData.family_situation}</li>
            ${formData.kids_ages ? `<li><strong>Kids Ages:</strong> ${formData.kids_ages}</li>` : ''}
            <li><strong>Amenities:</strong> ${formData.amenities ? JSON.stringify(formData.amenities) : 'None selected'}</li>
            <li><strong>Dining Importance:</strong> ${formData.dining_importance}</li>
            <li><strong>Membership History:</strong> ${formData.membership_history || formData.reason_for_switch || 'Not provided'}</li>
            <li><strong>Architect Preference:</strong> ${formData.architect_preference}</li>
            <li><strong>Initiation Budget:</strong> ${formData.initiation_budget}</li>
            <li><strong>Annual Dues Budget:</strong> ${formData.annual_dues_budget}</li>
            <li><strong>Reciprocal Interest:</strong> ${formData.reciprocal_interest}</li>
          </ul>

          ${formData.club_network_interest ? `
          <h3>Eligo Bonus</h3>
          <ul>
            <li><strong>Club Network Interest:</strong> ${formData.club_network_interest}</li>
          </ul>
          ` : ''}

          <h3>19th Hole</h3>
          <ul>
            <li><strong>Dream Course:</strong> ${formData.dream_course || 'Not provided'}</li>
            <li><strong>Favorite Course Played:</strong> ${formData.favorite_course_played || 'Not provided'}</li>
          </ul>

          ${formData.reference_name ? `
          <h3>Golf Reference</h3>
          <ul>
            <li><strong>Name:</strong> ${formData.reference_name}</li>
            <li><strong>Relationship:</strong> ${formData.reference_relationship || 'Not provided'}</li>
            <li><strong>Contact:</strong> ${formData.reference_contact || 'Not provided'}</li>
          </ul>
          ` : ''}

          <hr>
          <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
          <p><small>IP: ${formData.ip_address || 'Unknown'}</small></p>
        `,
      }),
    })

    if (!notificationEmail.ok) {
      throw new Error(`Failed to send notification email: ${await notificationEmail.text()}`)
    }

    // Send thank you email to user
    const thankYouEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CCNearMe <matthew@ccnearme.com>',
        to: formData.email,
        subject: 'Your CCNearMe Scorecard - Club Matches Coming Soon',
        html: `
          <h2>🏆 Round Complete!</h2>

          <p>Hi ${formData.first_name},</p>

          <p>Thanks for completing your CCNearMe questionnaire. Your scorecard is in, and we're working on your club matches.</p>

          <h3>What happens next:</h3>
          <ol>
            <li>We're matching you with 2-3 clubs that fit your game, budget, and preferences</li>
            <li>Within 24 hours, membership directors from matched clubs will reach out directly to schedule tours</li>
            <li>Check your email and phone for contact from clubs</li>
          </ol>

          <h3>Your Responses:</h3>

          <h4>Contact Info</h4>
          <ul>
            <li><strong>Name:</strong> ${formData.first_name} ${formData.last_name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
            <li><strong>ZIP Code:</strong> ${formData.zip_code}</li>
            ${formData.age_range ? `<li><strong>Age:</strong> ${formData.age_range}</li>` : ''}
          </ul>

          <h4>Your Golf Profile</h4>
          <ul>
            <li><strong>Drive Time:</strong> ${formData.drive_time}</li>
            <li><strong>Timeline:</strong> ${formData.timeline}</li>
            <li><strong>Play Frequency:</strong> ${formData.play_frequency}</li>
            <li><strong>Handicap:</strong> ${formData.handicap || 'Not provided'}</li>
            <li><strong>Primary Goal:</strong> ${formData.primary_goal}</li>
            <li><strong>Initiation Budget:</strong> ${formData.initiation_budget}</li>
            <li><strong>Annual Dues Budget:</strong> ${formData.annual_dues_budget}</li>
          </ul>

          <hr>

          <p>Questions? Just reply to this email.</p>

          <p>Best,<br>
          Matthew<br>
          CCNearMe</p>
        `,
      }),
    })

    if (!thankYouEmail.ok) {
      throw new Error(`Failed to send thank you email: ${await thankYouEmail.text()}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
