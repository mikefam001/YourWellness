import { Question } from '../types/assessment';

/**
 * Generalized Anxiety Disorder 7-Item Scale (GAD-7)
 * Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and Bernd Löwe (2006).
 * Standardized, validated screening tool for generalized anxiety disorder.
 * 
 * Response scale (Over the last 2 weeks):
 * 0 = Not at all
 * 1 = Several days
 * 2 = More than half the days
 * 3 = Nearly every day
 * 
 * Clinical severity benchmarks:
 * 0-4: Minimal anxiety symptoms
 * 5-9: Mild anxiety indicators
 * 10-14: Moderate anxiety indicators (clinical evaluation recommended)
 * 15-21: Severe anxiety indicators
 */

const GAD_OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

export const GAD7_QUESTIONS: Question[] = [
  {
    id: 'gad_1',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: 'Feeling nervous, anxious, or on edge',
    options: GAD_OPTIONS,
    isRequired: true,
  },
  {
    id: 'gad_2',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: 'Not being able to stop or control worrying',
    options: GAD_OPTIONS,
    isRequired: true,
  },
  {
    id: 'gad_3',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: 'Worrying too much about different things',
    options: GAD_OPTIONS,
    isRequired: true,
  },
  {
    id: 'gad_4',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: 'Trouble relaxing',
    options: GAD_OPTIONS,
    isRequired: true,
  },
  {
    id: 'gad_5',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: "Being so restless that it's hard to sit still",
    options: GAD_OPTIONS,
    isRequired: true,
  },
  {
    id: 'gad_6',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: 'Becoming easily annoyed or irritable',
    options: GAD_OPTIONS,
    isRequired: true,
  },
  {
    id: 'gad_7',
    category: 'anxiety',
    instrumentName: 'GAD-7',
    text: 'Feeling afraid as if something awful might happen',
    options: GAD_OPTIONS,
    isRequired: true,
  },
];

export const GAD_FUNCTIONAL_QUESTION: Question = {
  id: 'gad_functional',
  category: 'anxiety',
  instrumentName: 'GAD-7',
  text: 'If you experienced any of the problems above, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?',
  options: [
    { value: 0, label: 'Not difficult at all' },
    { value: 1, label: 'Somewhat difficult' },
    { value: 2, label: 'Very difficult' },
    { value: 3, label: 'Extremely difficult' },
  ],
  isRequired: false,
};
