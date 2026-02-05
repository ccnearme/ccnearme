import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="text-7xl mb-6">🏆</div>

        <h1 className="text-4xl md:text-5xl font-bold text-sage-800">
          Scorecard Submitted
        </h1>

        <p className="text-xl text-gray-700 leading-relaxed">
          Thanks for completing the round.
        </p>

        <div className="max-w-2xl mx-auto text-left space-y-6 pt-8">
          <p className="text-lg font-semibold text-sage-800">
            Here's what happens next:
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <span className="text-sage-600 font-bold text-xl flex-shrink-0">1.</span>
              <p className="text-lg">
                We're matching you with 2-3 clubs that fit your game, budget, and preferences
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-sage-600 font-bold text-xl flex-shrink-0">2.</span>
              <p className="text-lg">
                You'll receive an email within minutes with your complete scorecard and all your answers
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-sage-600 font-bold text-xl flex-shrink-0">3.</span>
              <p className="text-lg">
                Within 24 hours, membership directors from matched clubs will reach out directly to schedule tours
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-sage-200">
            <p className="text-lg text-gray-700">
              Check your email and phone for contact from clubs.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-gray-600">
              Questions? Reply to the scorecard email we send you.
            </p>
          </div>
        </div>

        <div className="pt-12">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg text-lg transition-all duration-200 shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
