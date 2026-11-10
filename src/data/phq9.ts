import { Question } from '../types/assessment';

/**
 * Patient Health Questionnaire (PHQ-9)
 * Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, and Kurt Kroenke (2001).
 * Standardized, validated screening tool for depressive symptoms.
 * 
 * Response scale (Over the last 2 weeks):
 * 0 = Not at all
 * 1 = Several days
 * 2 = More than half the days
 * 3 = Nearly every day
 * 
 * Clinical severity benchmarks:
 * 0-4: Minimal or no depression symptoms
 * 5-9: Mild depression indicators
 * 10-14: Moderate depression indicators
 * 15-19: Moderately severe depression indicators
 * 20-27: Severe depression indicators
 * 
 * Safety Critical:
 * Question 9 ("Thoughts that you would be better off dead, or of hurting yourself in some way")
 * triggers the emergency clinical safety pathway whenever score is > 0.
 */

const PHQ_OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

export const PHQ9_QUESTIONS: Question[] = [
  {
    id: 'phq_1',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Little interest or pleasure in doing things',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_2',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Feeling down, depressed, or hopeless',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_3',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Trouble falling or staying asleep, or sleeping too much',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_4',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Feeling tired or having little energy',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_5',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Poor appetite or overeating',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_6',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_7',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_8',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
  {
    id: 'phq_9',
    category: 'depression',
    instrumentName: 'PHQ-9',
    text: 'Thoughts that you would be better off dead, or of hurting yourself in some way',
    subtext: 'This question helps identify if you need urgent support. Immediate confidential help is available.',
    options: PHQ_OPTIONS,
    isRequired: true,
  },
];

export const PHQ_FUNCTIONAL_QUESTION: Question = {
  id: 'phq_functional',
  category: 'depression',
  instrumentName: 'PHQ-9',
  text: 'If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
  options: [
    { value: 0, label: 'Not difficult at all' },
    { value: 1, label: 'Somewhat difficult' },
    { value: 2, label: 'Very difficult' },
    { value: 3, label: 'Extremely difficult' },
  ],
  isRequired: false,
};
