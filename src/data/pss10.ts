import { Question } from '../types/assessment';

/**
 * Perceived Stress Scale (PSS-10)
 * Developed by Sheldon Cohen, Tom Kamarck, and Robin Mermelstein (1983).
 * One of the most widely used psychological instruments for measuring the perception of stress.
 * 
 * Response scale:
 * 0 = Never
 * 1 = Almost Never
 * 2 = Sometimes
 * 3 = Fairly Often
 * 4 = Very Often
 * 
 * Items 4, 5, 7, and 8 are positively stated and reversed scored:
 * 0 -> 4, 1 -> 3, 2 -> 2, 3 -> 1, 4 -> 0.
 */

const PSS_OPTIONS = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Almost Never' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Fairly Often' },
  { value: 4, label: 'Very Often' },
];

export const PSS10_QUESTIONS: Question[] = [
  {
    id: 'pss_1',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
    options: PSS_OPTIONS,
    isReverseScored: false,
    isRequired: true,
  },
  {
    id: 'pss_2',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
    options: PSS_OPTIONS,
    isReverseScored: false,
    isRequired: true,
  },
  {
    id: 'pss_3',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you felt nervous and stressed?',
    options: PSS_OPTIONS,
    isReverseScored: false,
    isRequired: true,
  },
  {
    id: 'pss_4',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
    subtext: 'Positively phrased item (reverse-scored in clinical calculation)',
    options: PSS_OPTIONS,
    isReverseScored: true,
    isRequired: true,
  },
  {
    id: 'pss_5',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you felt that things were going your way?',
    subtext: 'Positively phrased item (reverse-scored in clinical calculation)',
    options: PSS_OPTIONS,
    isReverseScored: true,
    isRequired: true,
  },
  {
    id: 'pss_6',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
    options: PSS_OPTIONS,
    isReverseScored: false,
    isRequired: true,
  },
  {
    id: 'pss_7',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you been able to control irritations in your life?',
    subtext: 'Positively phrased item (reverse-scored in clinical calculation)',
    options: PSS_OPTIONS,
    isReverseScored: true,
    isRequired: true,
  },
  {
    id: 'pss_8',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you felt that you were on top of things?',
    subtext: 'Positively phrased item (reverse-scored in clinical calculation)',
    options: PSS_OPTIONS,
    isReverseScored: true,
    isRequired: true,
  },
  {
    id: 'pss_9',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you been angered because of things that were outside of your control?',
    options: PSS_OPTIONS,
    isReverseScored: false,
    isRequired: true,
  },
  {
    id: 'pss_10',
    category: 'stress',
    instrumentName: 'PSS-10',
    text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
    options: PSS_OPTIONS,
    isReverseScored: false,
    isRequired: true,
  },
];
