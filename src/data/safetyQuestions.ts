import { Question } from '../types/assessment';

/**
 * Direct Clinical Safety Evaluation Questions
 * Designed to ensure immediate crisis intervention when user safety is compromised.
 * Reviewed against clinical guidelines (WHO, NICE, APA).
 */

export const DIRECT_SAFETY_QUESTIONS: Question[] = [
  {
    id: 'safety_active_thoughts',
    category: 'safety',
    instrumentName: 'Safety-Screen',
    text: 'Are you currently experiencing persistent thoughts of ending your life or hurting yourself?',
    subtext: 'Your privacy and safety are our highest priorities. Please answer honestly.',
    options: [
      { value: 0, label: 'No, not at all' },
      { value: 1, label: 'Fleeting thoughts, but no intention or plan' },
      { value: 2, label: 'Yes, I am having recurrent thoughts' },
      { value: 3, label: 'Yes, with active thoughts or urgent distress' },
    ],
    isRequired: true,
  },
  {
    id: 'safety_immediate_plan',
    category: 'safety',
    instrumentName: 'Safety-Screen',
    text: 'Do you have an immediate plan or intention to harm yourself right now or in the near future?',
    subtext: 'If you are in immediate danger, urgent emergency support is available 24/7.',
    options: [
      { value: 0, label: 'No, I have no plan or intention' },
      { value: 1, label: 'I have thought about how, but would not act on it' },
      { value: 3, label: 'Yes, I have an intention or plan' },
    ],
    isRequired: true,
  },
  {
    id: 'safety_current_environment',
    category: 'safety',
    instrumentName: 'Safety-Screen',
    text: 'Do you currently feel safe in your immediate environment?',
    options: [
      { value: 0, label: 'Yes, I feel safe right now' },
      { value: 1, label: 'Somewhat unsure, but manageable' },
      { value: 3, label: 'No, I do not feel safe' },
    ],
    isRequired: true,
  },
];
