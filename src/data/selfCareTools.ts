import { BreathingTechnique, GroundingStep } from '../types/wellness';

export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: 'box',
    title: 'Box Breathing (4-4-4-4)',
    purpose: 'Standard clinical technique for resetting the nervous system, reducing acute stress, and improving focus.',
    phases: [
      { name: 'Inhale', durationSeconds: 4, instruction: 'Breathe in slowly through your nose, expanding your belly' },
      { name: 'Hold', durationSeconds: 4, instruction: 'Gently hold your breath with lungs comfortably full' },
      { name: 'Exhale', durationSeconds: 4, instruction: 'Release all air slowly and steadily through your mouth' },
      { name: 'Hold', durationSeconds: 4, instruction: 'Pause in stillness with lungs empty before the next breath' },
    ],
    totalCyclesRecommended: 4,
    clinicalNote: 'Employed by first responders, surgical teams, and clinicians to activate the parasympathetic brake.',
  },
  {
    id: 'relax_478',
    title: '4-7-8 Relaxing Breath',
    purpose: 'Designed for acute anxiety reduction, calming racing thoughts, and preparing the body for deep sleep.',
    phases: [
      { name: 'Inhale', durationSeconds: 4, instruction: 'Inhale quietly through your nose into the diaphragm' },
      { name: 'Hold', durationSeconds: 7, instruction: 'Maintain a soft, unforced hold, letting oxygen circulate' },
      { name: 'Exhale', durationSeconds: 8, instruction: 'Exhale completely through pursed lips with a gentle whoosh' },
    ],
    totalCyclesRecommended: 4,
    clinicalNote: 'Prolonged exhalation stimulates vagal tone, lowering pulse rate and calming central nervous arousal.',
  },
  {
    id: 'belly_deep',
    title: 'Coherent Resonance Breathing (5-5)',
    purpose: 'Optimizes heart rate variability (HRV) and synchronizes respiration with cardiac rhythm.',
    phases: [
      { name: 'Inhale', durationSeconds: 5, instruction: 'Smooth, continuous diaphragmatic inhale through the nose' },
      { name: 'Exhale', durationSeconds: 5, instruction: 'Smooth, continuous unforced exhale through the nose or mouth' },
    ],
    totalCyclesRecommended: 6,
    clinicalNote: 'Paces respiration at approximately 6 breaths per minute, the natural resonant frequency of the autonomic nervous system.',
  },
];

export const GROUNDING_54321_STEPS: GroundingStep[] = [
  {
    count: 5,
    sense: 'Sight',
    prompt: 'Acknowledge 5 things you can see around you right now.',
    instruction: 'Notice colors, reflections, shadows, or textures in your immediate visual field (e.g. the grain of a desk, light on a wall).',
    placeholder: 'e.g., A blue notebook, morning light on the floor, the texture of my keys...',
  },
  {
    count: 4,
    sense: 'Touch',
    prompt: 'Acknowledge 4 things you can physically feel.',
    instruction: 'Focus on tactile physical contact: the pressure of your feet on the ground, the texture of your clothes, or the coolness of air on your skin.',
    placeholder: 'e.g., Cotton fabric on my shoulders, feet firm on the floor, warmth in my hands...',
  },
  {
    count: 3,
    sense: 'Hearing',
    prompt: 'Acknowledge 3 distinct sounds you can hear.',
    instruction: 'Listen carefully for ambient acoustic details: distant traffic, computer fan hum, birds outside, or your own breath.',
    placeholder: 'e.g., A distant vehicle, rhythmic hum of the air conditioner, a bird singing...',
  },
  {
    count: 2,
    sense: 'Smell',
    prompt: 'Acknowledge 2 scents in your environment.',
    instruction: 'Gently breathe in through your nose. Notice the aroma of coffee, fresh air, paper, soap, or simply the neutral scent of the room.',
    placeholder: 'e.g., Faint scent of tea, fresh air from the window...',
  },
  {
    count: 1,
    sense: 'Taste / Affirmation',
    prompt: 'Acknowledge 1 taste or a steady internal affirmation.',
    instruction: 'Notice any lingering taste (mint, water) or ground yourself with a calm truth: "I am safe in this present moment."',
    placeholder: 'e.g., Fresh taste of water / "I am grounded and present right now."',
  },
];

export const COGNITIVE_REFRAME_QUESTIONS = [
  {
    id: 'cr_worry',
    label: 'What is the specific thought or scenario worrying me right now?',
    placeholder: 'Describe the distressing thought without judgment...',
  },
  {
    id: 'cr_control',
    label: 'What parts of this situation are within my direct control today?',
    placeholder: 'My actions, my boundaries, my words, my sleep tonight...',
  },
  {
    id: 'cr_uncontrolled',
    label: 'What parts belong outside my control (and must be accepted or released)?',
    placeholder: 'Other people’s reactions, global news, past events...',
  },
  {
    id: 'cr_microstep',
    label: 'What is one compassionate, manageable action I can take in the next hour?',
    placeholder: 'Drink water, take a 5-minute walk, send one clear email...',
  },
];
