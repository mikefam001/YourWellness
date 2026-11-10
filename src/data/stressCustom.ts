import { Question } from '../types/assessment';

/**
 * Contextual Stress and Burnout Assessment
 * Evaluates lifestyle, workplace, physical somatic tension, and recovery factors.
 * Explicitly labeled as an indicative wellness check-in to complement PSS-10.
 */

const FREQUENCY_OPTIONS = [
  { value: 0, label: 'Rarely or never' },
  { value: 1, label: 'Sometimes (1-2 days/week)' },
  { value: 2, label: 'Often (3-4 days/week)' },
  { value: 3, label: 'Constantly or nearly every day' },
];

export const STRESS_CONTEXT_QUESTIONS: Question[] = [
  {
    id: 'sc_physical',
    category: 'stress',
    instrumentName: 'MindPulse-Contextual',
    text: 'Do you experience physical tension, such as tight shoulders, jaw clenching, or tension headaches?',
    options: FREQUENCY_OPTIONS,
    isRequired: true,
  },
  {
    id: 'sc_exhaustion',
    category: 'stress',
    instrumentName: 'MindPulse-Contextual',
    text: 'How frequently do you feel mentally or emotionally exhausted by your daily commitments?',
    options: FREQUENCY_OPTIONS,
    isRequired: true,
  },
  {
    id: 'sc_unwind',
    category: 'stress',
    instrumentName: 'MindPulse-Contextual',
    text: 'Do you find it difficult to mentally switch off from work or responsibilities during personal time?',
    options: FREQUENCY_OPTIONS,
    isRequired: true,
  },
  {
    id: 'sc_irritability',
    category: 'stress',
    instrumentName: 'MindPulse-Contextual',
    text: 'How often do you experience a short temper, irritability, or low patience with family or colleagues?',
    options: FREQUENCY_OPTIONS,
    isRequired: true,
  },
  {
    id: 'sc_sleep_worry',
    category: 'stress',
    instrumentName: 'MindPulse-Contextual',
    text: 'Do racing thoughts or worrying about tomorrow wake you up or prevent you from falling asleep?',
    options: FREQUENCY_OPTIONS,
    isRequired: true,
  },
];
