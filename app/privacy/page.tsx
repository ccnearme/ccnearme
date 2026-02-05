import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-block text-sage-700 hover:text-sage-900 font-semibold mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-sage-800">Privacy Policy</h1>

        <div className="prose prose-lg space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-sage-800 mt-8">
              Information We Collect
            </h2>
            <p>
              When you use CCNearMe.com, we collect the information you provide in the
              questionnaire including your name, email, phone number, ZIP code, and your
              preferences about country clubs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sage-800 mt-8">
              How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Match you with country clubs that fit your preferences</li>
              <li>Send you your personalized club matches</li>
              <li>
                Connect you with clubs you've authorized us to share your information with
              </li>
              <li>Improve our matching algorithm and service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sage-800 mt-8">
              Information Sharing
            </h2>
            <p>
              With your consent, we share your information with country clubs that match your
              preferences. Clubs pay us a fee for qualified leads. We do not sell your
              information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sage-800 mt-8">Data Security</h2>
            <p>
              We use industry-standard security measures to protect your personal information.
              Your data is stored securely using Supabase's encrypted database services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sage-800 mt-8">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the information we have about you</li>
              <li>Request deletion of your information</li>
              <li>Opt out of communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sage-800 mt-8">Contact Us</h2>
            <p>
              Questions about this privacy policy? Email us at privacy@ccnearme.com
            </p>
          </section>

          <p className="text-sm text-gray-500 pt-8">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
