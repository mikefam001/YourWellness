import { DemographicContext, SeverityLevel } from '../types/assessment';
import { RawAnswers } from './scoring';

/**
 * Deterministic Evidence-Informed Recommendation Engine
 * 
 * Clinical Governance:
 * - Never prescribes or suggests changing medications.
 * - Always distinguishes self-care strategies from professional medical consultation.
 * - Generates clear 4-stage action plan:
 *   1. Today (Immediate micro-actions)
 *   2. Next 7 Days (Structured stabilization)
 *   3. Longer-Term Wellness Habits (Sustainable resilience)
 *   4. When to Seek Professional Help (Objective clinical indicators)
 */

export function generatePersonalizedRecommendations(
  category: 'stress' | 'anxiety' | 'depression',
  severity: SeverityLevel,
  demographics: DemographicContext,
  _answers: RawAnswers
): {
  today: string[];
  sevenDays: string[];
  lifestyle: string[];
  whenToSeekProfessionalHelp: string[];
} {
  const isHighSeverity = severity === 'severe' || severity === 'moderately_severe';
  const isModerate = severity === 'moderate';

  const today: string[] = [];
  const sevenDays: string[] = [];
  const lifestyle: string[] = [];
  const whenToSeekProfessionalHelp: string[] = [];

  // ==================== STRESS RECOMMENDATIONS ====================
  if (category === 'stress') {
    if (isHighSeverity) {
      today.push('Perform a 5-minute Box Breathing session (4-4-4-4) to interrupt the sympathetic nervous cascade.');
      today.push('Establish a hard boundary this evening: defer non-urgent tasks and disconnect from work notifications 1 hour before sleep.');
      today.push('Identify the single heaviest task on your plate and delegate, postpone, or break it into 15-minute segments.');

      sevenDays.push('Conduct an energy audit: catalog commitments across work, family, and social obligations to eliminate or pause one significant drain.');
      sevenDays.push('Practice daily scheduled unwinding: reserve 30 uninterrupted minutes each afternoon or evening strictly for restorative recovery.');
      sevenDays.push('Limit caffeine intake after 12:00 PM, especially if sleep disturbances or somatic tension are present.');

      lifestyle.push('Incorporate progressive muscle relaxation or gentle somatic stretching 3–4 evenings weekly.');
      lifestyle.push('Schedule non-negotiable weekly rest blocks on your calendar just as you would professional appointments.');
      lifestyle.push('Adopt cognitive re-framing: distinguish factors within your direct locus of control from external uncontrollable circumstances.');

      whenToSeekProfessionalHelp.push('Stress symptoms persist for more than 4 consecutive weeks despite self-management efforts.');
      whenToSeekProfessionalHelp.push('Chronic physical manifestations arise (unexplained headaches, digestive issues, persistent elevated resting pulse).');
      whenToSeekProfessionalHelp.push('Stress begins causing emotional numbness, severe detachment, or frequent interpersonal conflict.');
    } else if (isModerate) {
      today.push('Take a 10-minute quiet walk or practice sensory grounding (5-4-3-2-1 technique) during your midday break.');
      today.push('Write down your top three priorities for tomorrow before finishing your day to declutter bedtime racing thoughts.');

      sevenDays.push('Set clear work-life shutdown cues: physically leave your workspace and transition with a calming ritual.');
      sevenDays.push('Evaluate your sleep environment: keep your bedroom dark, quiet, and cool (around 18-20°C / 65-68°F).');
      sevenDays.push('Engage in 20 minutes of moderate cardiovascular movement (brisk walking, cycling, or swimming) at least 3 times this week.');

      lifestyle.push('Practice boundary-setting by politely saying no to discretionary requests that overload your schedule.');
      lifestyle.push('Cultivate a weekly hobby or creative outlet devoid of performance pressure or evaluation.');

      whenToSeekProfessionalHelp.push('Stress feels unmanageable or begins spilling over into persistent anxiety or depressive moods.');
      whenToSeekProfessionalHelp.push('Daily responsibilities feel insurmountable or work performance noticeably declines.');
    } else {
      today.push('Acknowledge your current healthy coping strategies and note what habits are serving you well.');
      today.push('Maintain your regular bedtime and hydration routines.');

      sevenDays.push('Maintain regular physical activity to sustain baseline stress resilience.');
      sevenDays.push('Check in with a friend or colleague to maintain supportive social connectedness.');

      lifestyle.push('Continue prioritizing 7–8 hours of restorative sleep each night.');
      lifestyle.push('Periodically review your workload to catch early signs of creeping over-commitment.');

      whenToSeekProfessionalHelp.push('Major life transitions or unexpected crises occur that overwhelm your standard coping resources.');
    }
  }

  // ==================== ANXIETY RECOMMENDATIONS ====================
  if (category === 'anxiety') {
    if (isHighSeverity) {
      today.push('Practice the 4-7-8 relaxing breath technique: inhale for 4s, hold for 7s, exhale slowly through pursed lips for 8s (repeat 4 cycles).');
      today.push('Use sensory grounding to anchor your awareness: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.');
      today.push('Reach out to a trusted confidant or family member and let them know you are experiencing heightened anxiety today.');

      sevenDays.push('Schedule a formal consultation with a primary care doctor, licensed clinical psychologist, or accredited therapist.');
      sevenDays.push('Establish a dedicated "Worry Window": restrict worrying to 15 structured minutes at 4:30 PM, noting anxious thoughts down to postpone them during the rest of the day.');
      sevenDays.push('Eliminate or taper high-caffeine beverages and energy drinks, which directly stimulate adrenaline release.');

      lifestyle.push('Engage in structured Cognitive Behavioral Therapy (CBT) or Acceptance and Commitment Therapy (ACT) with a trained professional.');
      lifestyle.push('Practice daily morning exposure to natural daylight to support serotonin synthesis and circadian regulation.');
      lifestyle.push('Avoid unverified symptom searching on social media or medical forums during high anxiety episodes.');

      whenToSeekProfessionalHelp.push('Anxiety is causing frequent panic-like episodes (racing heart, shortness of breath, dizziness, sudden terror).');
      whenToSeekProfessionalHelp.push('Worry leads to avoidance behaviors (skipping work, avoiding social situations, dreading leaving home).');
      whenToSeekProfessionalHelp.push('Anxiety interferes with eating, sleeping, or sustaining basic daily responsibilities.');
    } else if (isModerate) {
      today.push('Engage in 5 minutes of guided diaphragmatic breathing to stimulate the vagus nerve and slow your heart rate.');
      today.push('Write down your main worrying thought and ask: "Is this thought 100% factual, or is it an anxious prediction?"');

      sevenDays.push('Introduce a calm wind-down routine 45 minutes before sleep: dim overhead lights and swap phone screens for reading.');
      sevenDays.push('Incorporate 30 minutes of aerobic exercise (brisk walking, jogging, dancing) to metabolize accumulated stress hormones.');
      sevenDays.push('Track anxiety triggers in a private notes log: identify specific situations, times of day, or social dynamics.');

      lifestyle.push('Learn CBT cognitive reframing exercises to challenge catastrophic "what-if" thinking spirals.');
      lifestyle.push('Foster safe, supportive connections where you can openly discuss your emotional state without judgment.');

      whenToSeekProfessionalHelp.push('Anxiety symptoms persist for more than 2 weeks or fail to improve with lifestyle modifications.');
      whenToSeekProfessionalHelp.push('Worry feels constantly uncontrollable and generates chronic physical fatigue or muscle tension.');
    } else {
      today.push('Celebrate your psychological balance and maintain the lifestyle routines that keep you centered.');
      today.push('Take a mindful 3-breath pause before stepping into complex or challenging meetings.');

      sevenDays.push('Stay mindful of caffeine and stimulant intake during demanding deadlines.');
      sevenDays.push('Maintain balanced sleep schedules, even across weekends.');

      lifestyle.push('Keep utilizing proactive relaxation techniques before anticipated high-pressure milestones.');

      whenToSeekProfessionalHelp.push('Experiencing new, unexplained panic surges or prolonged apprehension lasting multiple days.');
    }
  }

  // ==================== DEPRESSION RECOMMENDATIONS ====================
  if (category === 'depression') {
    if (isHighSeverity) {
      today.push('Schedule an appointment today with your doctor, general practitioner, or a registered mental health professional.');
      today.push('Break your day into tiny, manageable micro-steps (e.g. step 1: drink a glass of water; step 2: sit in the sun for 10 minutes).');
      today.push('Stay connected: contact one trusted friend, family member, or call a local confidential support helpline.');

      sevenDays.push('Attend a comprehensive clinical consultation with a healthcare provider for a thorough medical and psychological evaluation.');
      sevenDays.push('Implement Behavioral Activation: pick one low-effort, mildly rewarding activity each day (e.g. listening to a favorite album, preparing a simple warm meal).');
      sevenDays.push('Protect a consistent morning wake-up time, regardless of how tired you feel, to anchor your internal circadian rhythm.');

      lifestyle.push('Engage in evidence-based psychotherapy (such as CBT, Interpersonal Therapy, or psychodynamic counseling).');
      lifestyle.push('Build a compassionate support network: involve family, close friends, or peer support groups.');
      lifestyle.push('Ensure medical rule-outs (such as thyroid panel, vitamin D, vitamin B12, and iron levels) with your primary physician.');

      whenToSeekProfessionalHelp.push('IMMEDIATE: If experiencing active suicidal thoughts, feelings of hopelessness, or intent to self-harm, contact emergency services (e.g. 988, 112, 999) or visit an emergency room immediately.');
      whenToSeekProfessionalHelp.push('Inability to care for yourself (struggling to eat, hydrate, get out of bed, or maintain basic hygiene).');
      whenToSeekProfessionalHelp.push('Persistent profound loss of pleasure, apathy, or feelings of worthlessness lasting more than two weeks.');
    } else if (isModerate) {
      today.push('Get 15 minutes of direct sunlight exposure early in the day to help regulate melatonin and mood-related neurotransmitters.');
      today.push('Practice self-compassion: recognize that low motivation is a clinical symptom of low mood, not a personal flaw.');

      sevenDays.push('Book an exploratory consultation with a licensed counselor, psychologist, or primary care doctor.');
      sevenDays.push('Schedule one pleasant or restorative event every two days, keeping demands minimal.');
      sevenDays.push('Establish a gentle movement routine, such as a 20-minute daily walk outdoors.');

      lifestyle.push('Practice gratitude journaling: record two specific small occurrences you appreciated each evening.');
      lifestyle.push('Limit social isolation: even brief, low-pressure conversations with loved ones can prevent depressive withdrawal.');

      whenToSeekProfessionalHelp.push('Low mood, lack of pleasure, or fatigue continues for more than 14 consecutive days.');
      whenToSeekProfessionalHelp.push('Depressive feelings begin interfering with work attendance, academic progress, or family life.');
    } else {
      today.push('Maintain your current positive routine and celebrate your emotional resilience.');
      today.push('Reach out to check in on a colleague or friend.');

      sevenDays.push('Continue balanced habits around nutritious meals, hydration, and regular sleep.');
      sevenDays.push('Engage in regular social and recreational activities that bring you joy.');

      lifestyle.push('Build psychological resilience through ongoing mindfulness, physical exercise, and strong social ties.');

      whenToSeekProfessionalHelp.push('Noticing an uncharacteristic drop in mood, pleasure, or vitality lasting more than two weeks.');
    }
  }

  // Contextual modifications based on sleep & caffeine
  if (demographics.sleepQuality?.toLowerCase().includes('poor') || demographics.sleepHours?.includes('Fewer than 5')) {
    today.push('Prioritize sleep hygiene tonight: avoid blue light screens 60 minutes before bed and keep your sleep area pitch dark.');
  }

  return { today, sevenDays, lifestyle, whenToSeekProfessionalHelp };
}
