export interface Question {
  id: string;
  holeNumber: number;
  par: number;
  question: string;
  subtext?: string;
  type: 'radio' | 'text' | 'checkbox' | 'conditional';
  options?: string[];
  conditionalField?: {
    question: string;
    placeholder?: string;
    dependentField: string;
    showWhen: string[]; // Which option values trigger the conditional field
  };
  placeholder?: string;
}

export const questions: Question[] = [
  // FRONT 9 - YOUR GOLF GAME
  {
    id: 'drive_time',
    holeNumber: 1,
    par: 3,
    question: 'How far are you willing to drive to your home club?',
    type: 'radio',
    options: [
      '15 minutes or less',
      '15-30 minutes',
      '30-45 minutes',
      '45+ minutes'
    ]
  },
  {
    id: 'timeline',
    holeNumber: 2,
    par: 3,
    question: 'When are you looking to join?',
    type: 'radio',
    options: [
      'Within 3 months',
      '3-6 months',
      '6-12 months',
      'Just exploring for now'
    ]
  },
  {
    id: 'play_frequency',
    holeNumber: 3,
    par: 4,
    question: 'How often do you plan to play?',
    type: 'radio',
    options: [
      '3+ times per week',
      'Weekly',
      '2-3 times per month',
      'Once a month',
      'Occasionally'
    ]
  },
  {
    id: 'handicap',
    holeNumber: 4,
    par: 3,
    question: "What's your handicap?",
    type: 'text',
    placeholder: "e.g., 8, 0, or 'Don't have one yet'"
  },
  {
    id: 'current_golf_home',
    holeNumber: 5,
    par: 4,
    question: 'Where do you play golf now?',
    type: 'conditional',
    options: [
      'Public courses / Pay-per-round',
      'Semi-private club',
      'Private club member (looking to switch)',
      "Don't play regularly yet"
    ],
    conditionalField: {
      question: 'Which club?',
      dependentField: 'current_club_name',
      showWhen: ['Semi-private club', 'Private club member (looking to switch)']
    }
  },
  {
    id: 'annual_golf_spend',
    holeNumber: 6,
    par: 3,
    question: 'What do you typically spend on golf per year?',
    subtext: '(Greens fees, equipment, travel, lessons)',
    type: 'radio',
    options: [
      'Under $3,000',
      '$3,000-7,000',
      '$7,000-15,000',
      '$15,000+'
    ]
  },
  {
    id: 'primary_goal',
    holeNumber: 7,
    par: 5,
    question: 'What matters most to you in a club?',
    type: 'radio',
    options: [
      'Championship golf - playing a great course regularly',
      'Social golf - playing with friends, having fun',
      'Family club - activities for spouse/kids beyond golf',
      'Business networking - client entertainment, connections'
    ]
  },
  {
    id: 'tournament_interest',
    holeNumber: 8,
    par: 3,
    question: 'Club tournaments and competitions?',
    type: 'radio',
    options: [
      'Very interested - future club champ',
      'Sometimes - member-guest sounds fun',
      "Not my thing - casual golfer"
    ]
  },
  {
    id: 'practice_facility',
    holeNumber: 9,
    par: 4,
    question: 'How important is a quality practice facility?',
    subtext: '(Range, short game area, putting greens)',
    type: 'radio',
    options: [
      "Essential - I'm a range rat",
      'Very important',
      'Nice to have',
      'Not important'
    ]
  },
  // BACK 9 - THE CLUB
  {
    id: 'atmosphere',
    holeNumber: 10,
    par: 3,
    question: 'Preferred club atmosphere?',
    type: 'radio',
    options: [
      'Traditional / Formal',
      'Polished but relaxed',
      'Casual / Come as you are'
    ]
  },
  {
    id: 'family_situation',
    holeNumber: 11,
    par: 4,
    question: 'Who will use the club?',
    type: 'conditional',
    options: [
      'Just me',
      'Spouse/partner and me',
      'My family (spouse + kids)',
      'Business / client entertainment'
    ],
    conditionalField: {
      question: "Kids' ages:",
      placeholder: 'e.g., 8, 12',
      dependentField: 'kids_ages',
      showWhen: ['My family (spouse + kids)']
    }
  },
  {
    id: 'amenities',
    holeNumber: 12,
    par: 5,
    question: 'Which amenities matter to you?',
    subtext: '(Check all that apply)',
    type: 'checkbox',
    options: [
      'Pool',
      'Tennis / Pickleball',
      'Fitness center',
      'Kids programs',
      'Fine dining restaurant',
      'Casual dining',
      'Event spaces'
    ]
  },
  {
    id: 'dining_importance',
    holeNumber: 13,
    par: 3,
    question: 'Dining at the club?',
    type: 'radio',
    options: [
      "Important - I'll be there regularly",
      'Nice for post-round meals',
      'Just need a good bar',
      "Don't really care"
    ]
  },
  {
    id: 'membership_history',
    holeNumber: 14,
    par: 3,
    question: 'Have you been a club member before?',
    type: 'radio',
    options: [
      'Yes, previously (no longer a member)',
      'No, this would be my first club'
    ]
  },
  {
    id: 'architect_preference',
    holeNumber: 15,
    par: 4,
    question: 'Any favorite golf course architects or styles?',
    type: 'radio',
    options: [
      'A.W. Tillinghast (classic, strategic)',
      'Donald Ross (traditional, elegant)',
      'Modern designs (Rees Jones, Fazio, etc.)',
      'Not familiar with architects'
    ]
  },
  {
    id: 'initiation_budget',
    holeNumber: 16,
    par: 5,
    question: 'Initiation fee budget?',
    type: 'radio',
    options: [
      'Under $25,000',
      '$25,000-50,000',
      '$50,000-75,000',
      '$75,000-100,000',
      '$100,000+',
      'Show me the best regardless of price'
    ]
  },
  {
    id: 'annual_dues_budget',
    holeNumber: 17,
    par: 4,
    question: 'Annual dues budget?',
    type: 'radio',
    options: [
      'Under $10,000',
      '$10,000-20,000',
      '$20,000-30,000',
      '$30,000+',
      'Flexible'
    ]
  },
  {
    id: 'reciprocal_interest',
    holeNumber: 18,
    par: 3,
    question: 'How important is access to play at other clubs?',
    type: 'radio',
    options: [
      'Very important - I want variety',
      'Nice to have occasionally',
      'Home course is enough for me'
    ]
  }
];

// Separate question for conditional Hole 14 (reason for switch)
// This replaces the standard membership_history question when user selected
// "Private club member (looking to switch)" in Hole 5
export const hole14AlternativeQuestion: Question = {
  id: 'reason_for_switch',
  holeNumber: 14,
  par: 3,
  question: 'What made you start looking to switch clubs?',
  type: 'radio',
  options: [
    'Moving to a new area',
    'Looking for a better golf course',
    'Family needs changed',
    'Looking to upgrade/move up',
    'Cost concerns',
    "Club culture wasn't the right fit",
    'Other'
  ]
};

// Eligo bonus question (conditional)
// Show after Hole 18 IF:
// - reciprocal_interest is "Very important" or "Nice to have"
// AND
// - (initiation_budget >= $50k OR annual_dues_budget >= $20k)
export const eligoBonusQuestion: Question = {
  id: 'club_network_interest',
  holeNumber: 0, // Not a real hole
  par: 0,
  question: 'Did you know there are club networks that give you access to 100+ premier private clubs nationwide?\n\nInstead of joining just one club, you get access to an entire network.\n\nInterested?',
  type: 'radio',
  options: [
    'Yes, tell me more',
    'No, I prefer one home club'
  ]
};

// 19th Hole questions (always shows)
export const hole19Questions = {
  dream_course: {
    id: 'dream_course',
    holeNumber: 19,
    par: 5,
    question: "Where's your dream course to play?",
    subtext: "(And you can't say Augusta, Pine Valley, or Cypress Point - those are a given)",
    type: 'text' as const
  },
  favorite_course: {
    id: 'favorite_course_played',
    holeNumber: 19,
    par: 5,
    question: "What's your favorite course you've played?",
    subtext: "(If it's one of those three, feel free to flex)",
    type: 'text' as const
  }
};
