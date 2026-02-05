import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sage-50">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-sage-800 tracking-tight">
              Find Your Home of Golf
            </h1>
            <div className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed space-y-2">
              <p>18 questions. Takes about as long as a par 3.</p>
              <p>We find clubs that match your game and life. Free.</p>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/quiz"
              className="inline-block bg-sage-700 hover:bg-sage-800 text-white font-semibold px-12 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Find My Club
            </Link>
          </div>

          <div className="pt-16 text-lg text-gray-600">
            <p>Your home course is out there. We tee you up.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-800 text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-sage-600 mb-4">1</div>
              <h3 className="text-2xl font-semibold text-gray-800">
                Tell Us About Your Game
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Answer 18 questions about your preferences, budget, and what you're looking for.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-sage-600 mb-4">2</div>
              <h3 className="text-2xl font-semibold text-gray-800">
                We Find Your Matches
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We match you with 2-3 clubs in your area that actually fit your game and lifestyle.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-sage-600 mb-4">3</div>
              <h3 className="text-2xl font-semibold text-gray-800">
                We Make the Introductions
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We connect you directly with membership directors. They reach out to schedule tours.
              </p>
            </div>
          </div>

          <p className="text-center text-lg text-gray-700 font-medium mt-12">
            That's it. No runaround. No cost to you.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR SECTION */}
      <section className="py-20 px-4 bg-sage-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-800 text-center mb-12">
            Whether You're:
          </h2>

          <div className="space-y-4 max-w-2xl mx-auto mb-12">
            <div className="flex items-start space-x-3">
              <span className="text-sage-600 text-2xl font-bold">✓</span>
              <p className="text-lg text-gray-700">Looking for your first club</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-sage-600 text-2xl font-bold">✓</span>
              <p className="text-lg text-gray-700">Switching from another club</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-sage-600 text-2xl font-bold">✓</span>
              <p className="text-lg text-gray-700">Moving to the area</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-sage-600 text-2xl font-bold">✓</span>
              <p className="text-lg text-gray-700">Just exploring options</p>
            </div>
          </div>

          <p className="text-center text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            We'll match you with clubs that fit your game, your budget, and your life.
          </p>

          <div className="text-center">
            <Link
              href="/quiz"
              className="inline-block bg-sage-700 hover:bg-sage-800 text-white font-semibold px-12 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Find My Club
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
