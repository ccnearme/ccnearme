'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { questions, hole14AlternativeQuestion, eligoBonusQuestion, hole19Questions } from '@/lib/questions';
import { supabase } from '@/lib/supabase';

type FormData = Record<string, string | string[]>;

export default function QuizPage() {
  const router = useRouter();

  // Initialize state from localStorage
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ccnearme_quiz_step');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ccnearme_quiz_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error loading saved data:', e);
        }
      }
    }
    return {};
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConditionalField, setShowConditionalField] = useState(false);
  const [agreedToShare, setAgreedToShare] = useState(false);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('ccnearme_quiz_data', JSON.stringify(formData));
    }
  }, [formData]);

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem('ccnearme_quiz_step', currentStep.toString());
  }, [currentStep]);

  // Calculate which question to show based on conditional logic
  const getActualQuestion = () => {
    const actualStep = currentStep - 1; // Adjust for intro screen

    if (actualStep < 0) return null; // Intro screen
    if (actualStep === 9) return null; // Making the turn
    if (actualStep === 19) return null; // 19th Hole page

    // Adjust for making the turn (between hole 9 and 10)
    const adjustedStep = actualStep > 9 ? actualStep - 1 : actualStep;

    // Check if we should show Hole 14 alternative (reason for switch)
    if (adjustedStep === 13) { // Hole 14 (0-indexed = 13)
      const currentGolfHome = formData.current_golf_home as string;
      if (currentGolfHome === 'Private club member (looking to switch)') {
        return hole14AlternativeQuestion;
      }
    }

    return questions[adjustedStep];
  };

  const currentQuestion = getActualQuestion();
  const isIntro = currentStep === 0;
  const isMakingTheTurn = currentStep === 10; // After hole 9
  const isHole18 = currentStep === 19; // Hole 18 (+ Eligo bonus on same screen)
  const is19thHole = currentStep === 20; // 19th Hole final page

  // Check if conditional field should show
  useEffect(() => {
    if (currentQuestion?.type === 'conditional' && currentQuestion.conditionalField) {
      const currentValue = formData[currentQuestion.id] as string;
      const shouldShow = currentQuestion.conditionalField.showWhen.includes(currentValue);
      setShowConditionalField(shouldShow);
    } else {
      setShowConditionalField(false);
    }
  }, [currentQuestion, formData]);

  const shouldShowEligoBonus = (): boolean => {
    const reciprocal = formData.reciprocal_interest as string;
    const initiation = formData.initiation_budget as string;
    const dues = formData.annual_dues_budget as string;

    const reciprocalInterested =
      reciprocal === 'Very important - I want variety' ||
      reciprocal === 'Nice to have occasionally';

    const highInitiation =
      initiation === '$50,000-75,000' ||
      initiation === '$75,000-100,000' ||
      initiation === '$100,000+' ||
      initiation === 'Show me the best regardless of price';

    const highDues =
      dues === '$20,000-30,000' ||
      dues === '$30,000+';

    return reciprocalInterested && (highInitiation || highDues);
  };

  const handleNext = async () => {
    // If on 19th Hole page, submit
    if (is19thHole) {
      if (!agreedToShare) {
        alert('Please agree to share your information with matched clubs.');
        return;
      }
      await handleSubmit();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    const current = (formData[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...current, value]);
    } else {
      handleInputChange(field, current.filter((v) => v !== value));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Get IP and user agent
      let ipAddress = '';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } catch (e) {
        console.error('Could not fetch IP:', e);
      }

      const { error } = await supabase.from('questionnaire_responses').insert([
        {
          // Contact
          first_name: formData.first_name as string,
          last_name: formData.last_name as string,
          email: formData.email as string,
          phone: formData.phone as string,
          zip_code: formData.zip_code as string,
          age_range: formData.age_range as string,
          // Front 9
          drive_time: formData.drive_time as string,
          timeline: formData.timeline as string,
          play_frequency: formData.play_frequency as string,
          handicap: formData.handicap as string,
          current_golf_home: formData.current_golf_home as string,
          current_club_name: formData.current_club_name as string,
          annual_golf_spend: formData.annual_golf_spend as string,
          primary_goal: formData.primary_goal as string,
          tournament_interest: formData.tournament_interest as string,
          practice_facility: formData.practice_facility as string,
          // Back 9
          atmosphere: formData.atmosphere as string,
          family_situation: formData.family_situation as string,
          kids_ages: formData.kids_ages as string,
          amenities: formData.amenities ? formData.amenities : null,
          dining_importance: formData.dining_importance as string,
          membership_history: formData.membership_history as string,
          reason_for_switch: formData.reason_for_switch as string,
          architect_preference: formData.architect_preference as string,
          initiation_budget: formData.initiation_budget as string,
          annual_dues_budget: formData.annual_dues_budget as string,
          reciprocal_interest: formData.reciprocal_interest as string,
          // Eligo bonus
          club_network_interest: formData.club_network_interest as string,
          // 19th Hole
          dream_course: formData.dream_course as string,
          favorite_course_played: formData.favorite_course_played as string,
          // Golf reference
          reference_name: formData.reference_name as string,
          reference_relationship: formData.reference_relationship as string,
          reference_contact: formData.reference_contact as string,
          // Meta
          ip_address: ipAddress,
          user_agent: navigator.userAgent,
        },
      ]);

      if (error) throw error;

      // Send emails via Edge Function
      try {
        const emailResponse = await fetch(
          'https://zjgiiasvprbceyolhich.supabase.co/functions/v1/send-quiz-emails',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
          }
        );

        if (!emailResponse.ok) {
          console.error('Failed to send emails:', await emailResponse.text());
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Don't fail the submission if emails fail
      }

      // Clear saved data after successful submission
      localStorage.removeItem('ccnearme_quiz_data');
      localStorage.removeItem('ccnearme_quiz_step');

      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIntro = () => (
    <div className="space-y-8 animate-fade-in text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-sage-800">
        🏌️ Driving Range
      </h1>
      <p className="text-xl text-gray-700 max-w-2xl mx-auto">
        Quick warm-up before we tee off.
      </p>
      <div className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="First name"
          value={(formData.first_name as string) || ''}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <input
          type="text"
          placeholder="Last name"
          value={(formData.last_name as string) || ''}
          onChange={(e) => handleInputChange('last_name', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={(formData.email as string) || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={(formData.phone as string) || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={(formData.zip_code as string) || ''}
          onChange={(e) => handleInputChange('zip_code', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
        />
        <select
          required
          value={(formData.age_range as string) || ''}
          onChange={(e) => handleInputChange('age_range', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white text-gray-900"
        >
          <option value="" disabled>Age</option>
          <option value="Under 25">Under 25</option>
          <option value="25-30">25-30</option>
          <option value="31-35">31-35</option>
          <option value="36-40">36-40</option>
          <option value="41-50">41-50</option>
          <option value="51+">51+</option>
        </select>
      </div>
    </div>
  );

  const renderMakingTheTurn = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/halfway-house.jpeg)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-12 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
          Making the Turn
        </h1>
        <div className="text-2xl md:text-3xl text-white space-y-4 font-light">
          <p className="drop-shadow-lg">Front 9 complete.</p>
          <p className="drop-shadow-lg">Back 9 covers club amenities and budget.</p>
        </div>
        <div className="pt-8">
          <button
            onClick={handleNext}
            className="px-12 py-4 bg-white hover:bg-gray-100 text-sage-800 font-bold rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-2xl"
          >
            Start the Back 9
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <p className="text-base font-semibold text-sage-600 tracking-wide uppercase">
            Hole {currentQuestion.holeNumber} | Par {currentQuestion.par}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-sage-800 whitespace-pre-line">
            {currentQuestion.question}
          </h2>
          {currentQuestion.subtext && (
            <p className="text-lg text-gray-600">{currentQuestion.subtext}</p>
          )}
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {currentQuestion.type === 'radio' &&
            currentQuestion.options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-4 border-2 border-sage-200 rounded-lg cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-all"
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={formData[currentQuestion.id] === option}
                  onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                  className="w-5 h-5 text-sage-600"
                />
                <span className="text-lg text-gray-800">{option}</span>
              </label>
            ))}

          {currentQuestion.type === 'text' && (
            <input
              type="text"
              placeholder={currentQuestion.placeholder}
              value={(formData[currentQuestion.id] as string) || ''}
              onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
              className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 text-lg"
            />
          )}

          {currentQuestion.type === 'checkbox' &&
            currentQuestion.options?.map((option) => {
              const currentValues = (formData[currentQuestion.id] as string[]) || [];
              return (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-4 border-2 border-sage-200 rounded-lg cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-all"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={currentValues.includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(currentQuestion.id, option, e.target.checked)
                    }
                    className="w-5 h-5 text-sage-600 rounded"
                  />
                  <span className="text-lg text-gray-800">{option}</span>
                </label>
              );
            })}

          {currentQuestion.type === 'conditional' && (
            <>
              {currentQuestion.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-4 border-2 border-sage-200 rounded-lg cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-all"
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={formData[currentQuestion.id] === option}
                    onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                    className="w-5 h-5 text-sage-600"
                  />
                  <span className="text-lg text-gray-800">{option}</span>
                </label>
              ))}

              {showConditionalField && currentQuestion.conditionalField && (
                <div className="mt-6 pt-6 border-t border-sage-200">
                  <label className="block text-lg font-semibold text-sage-800 mb-3">
                    {currentQuestion.conditionalField.question}
                  </label>
                  <input
                    type="text"
                    placeholder={currentQuestion.conditionalField.placeholder}
                    value={(formData[currentQuestion.conditionalField.dependentField] as string) || ''}
                    onChange={(e) =>
                      handleInputChange(currentQuestion.conditionalField!.dependentField, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 text-lg"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // Hole 18 + Eligo Bonus (same screen)
  const renderHole18 = () => {
    const showEligo = shouldShowEligoBonus();

    return (
      <div className="space-y-12 animate-fade-in max-w-2xl mx-auto">
        {/* Hole 18 */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-base font-semibold text-sage-600 tracking-wide uppercase">
              Hole 18 | Par 3
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-sage-800">
              How important is access to play at other clubs?
            </h2>
          </div>
          <div className="space-y-3">
            {questions[17].options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-4 border-2 border-sage-200 rounded-lg cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-all"
              >
                <input
                  type="radio"
                  name="reciprocal_interest"
                  value={option}
                  checked={formData.reciprocal_interest === option}
                  onChange={(e) => handleInputChange('reciprocal_interest', e.target.value)}
                  className="w-5 h-5 text-sage-600"
                />
                <span className="text-lg text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Eligo Bonus (conditional - shows below Hole 18 on same screen) */}
        {showEligo && (
          <div className="space-y-6 pt-8 border-t-2 border-sage-300">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-sage-800 whitespace-pre-line">
                {eligoBonusQuestion.question}
              </h2>
            </div>
            <div className="space-y-3">
              {eligoBonusQuestion.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-4 border-2 border-sage-200 rounded-lg cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-all"
                >
                  <input
                    type="radio"
                    name="club_network_interest"
                    value={option}
                    checked={formData.club_network_interest === option}
                    onChange={(e) => handleInputChange('club_network_interest', e.target.value)}
                    className="w-5 h-5 text-sage-600"
                  />
                  <span className="text-lg text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 19th Hole Page (dream + favorite + reference + submit)
  const render19thHole = () => (
    <div className="space-y-12 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-2">
          🍺 19th Hole
        </h1>
      </div>

      {/* Dream Course */}
      <div>
        <label className="block text-xl font-semibold text-sage-800 mb-2">
          {hole19Questions.dream_course.question}
        </label>
        <p className="text-sm text-gray-600 mb-3">{hole19Questions.dream_course.subtext}</p>
        <input
          type="text"
          value={(formData.dream_course as string) || ''}
          onChange={(e) => handleInputChange('dream_course', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 text-lg"
        />
      </div>

      {/* Favorite Course */}
      <div>
        <label className="block text-xl font-semibold text-sage-800 mb-2">
          {hole19Questions.favorite_course.question}
        </label>
        <p className="text-sm text-gray-600 mb-3">{hole19Questions.favorite_course.subtext}</p>
        <input
          type="text"
          value={(formData.favorite_course_played as string) || ''}
          onChange={(e) => handleInputChange('favorite_course_played', e.target.value)}
          className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500 text-lg"
        />
      </div>

      {/* Divider */}
      <div className="border-t-2 border-sage-300"></div>

      {/* Golf Reference */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-sage-800 mb-2">Golf Reference</h3>
          <p className="text-gray-600">
            Know a current club member, golf buddy, or instructor who can vouch for your game?
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={(formData.reference_name as string) || ''}
            onChange={(e) => handleInputChange('reference_name', e.target.value)}
            className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
          <input
            type="text"
            placeholder="e.g., 'Member at Montclair CC'"
            value={(formData.reference_relationship as string) || ''}
            onChange={(e) => handleInputChange('reference_relationship', e.target.value)}
            className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
          <input
            type="text"
            placeholder="Contact"
            value={(formData.reference_contact as string) || ''}
            onChange={(e) => handleInputChange('reference_contact', e.target.value)}
            className="w-full px-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-sage-300"></div>

      {/* Submit Section */}
      <div className="space-y-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToShare}
            onChange={(e) => setAgreedToShare(e.target.checked)}
            className="w-5 h-5 text-sage-600 rounded mt-1 flex-shrink-0"
          />
          <span className="text-gray-700">
            Share my information with matched clubs. Membership directors will reach out directly to schedule tours. (Free service)
          </span>
        </label>

        <button
          onClick={handleNext}
          disabled={isSubmitting || !agreedToShare}
          className="w-full px-8 py-5 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-lg text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Scorecard'}
        </button>

        <div className="text-center">
          <Link href="/privacy" className="text-sm text-sage-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );

  const renderProgressBar = () => {
    if (isIntro || isMakingTheTurn || isHole18 || is19thHole) return null;

    const totalHoles = 18;
    const currentHole = currentQuestion?.holeNumber || 0;
    const progress = (currentHole / totalHoles) * 100;

    return (
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative h-3 bg-gray-200 rounded-full overflow-visible">
          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-full bg-sage-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

          {/* Golfer - moves along with progress */}
          <div
            className="absolute transition-all duration-500"
            style={{ left: `${progress}%`, top: '-8px', transform: 'translateX(-50%)' }}
          >
            <span className="text-2xl">🏌️</span>
          </div>

          {/* Flag at the end */}
          <div className="absolute" style={{ right: '-12px', top: '-8px' }}>
            <span className="text-2xl">⛳</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50 py-8 px-4">
      {renderProgressBar()}

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {isIntro && renderIntro()}
        {isMakingTheTurn && renderMakingTheTurn()}
        {!isIntro && !isMakingTheTurn && !isHole18 && !is19thHole && renderQuestion()}
        {isHole18 && renderHole18()}
        {is19thHole && render19thHole()}

        {/* Navigation */}
        {!isMakingTheTurn && !is19thHole && (
          <div className={`flex mt-12 max-w-2xl mx-auto ${isIntro ? 'justify-center' : 'justify-between'}`}>
            {!isIntro && (
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 text-sage-700 hover:text-sage-900 disabled:opacity-0 disabled:cursor-not-allowed font-semibold"
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-8 py-4 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-lg text-lg transition-all duration-200 disabled:opacity-50"
            >
              {isIntro ? 'First Tee →' : 'Continue'}
            </button>
          </div>
        )}

        {/* Back button on 19th Hole page */}
        {is19thHole && (
          <div className="flex justify-start mt-8 max-w-2xl mx-auto">
            <button
              onClick={handlePrevious}
              className="px-6 py-3 text-sage-700 hover:text-sage-900 font-semibold"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
