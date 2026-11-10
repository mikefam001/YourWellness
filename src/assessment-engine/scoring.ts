import {
  AssessmentCategory,
  AssessmentResultItem,
  ComprehensiveAssessmentReport,
  DemographicContext,
  SeverityLevel,
} from '../types/assessment';
import { generatePersonalizedRecommendations } from './recommendations';

/**
 * Deterministic Clinical Scoring Engine
 * 
 * Rules:
 * 1. PSS-10: 10 items (0-4). Positively stated items 4, 5, 7, 8 reverse scored (4 - raw).
 *    Total: 0-40.
 *    0–13: Low Perceived Stress
 *    14–26: Moderate Perceived Stress
 *    27–40: High Perceived Stress
 * 
 * 2. GAD-7: 7 items (0-3).
 *    Total: 0-21.
 *    0–4: Minimal anxiety symptoms
 *    5–9: Mild anxiety indicators
 *    10–14: Moderate anxiety indicators
 *    15–21: Severe anxiety indicators
 * 
 * 3. PHQ-9: 9 items (0-3).
 *    Total: 0-27.
 *    0–4: Minimal depression symptoms
 *    5–9: Mild depression indicators
 *    10–14: Moderate depression indicators
 *    15–19: Moderately severe depression indicators
 *    20–27: Severe depression indicators
 * 
 * 4. Safety Pathway:
 *    PHQ-9 item 9 > 0 OR Safety question triggers = Emergency Safety Flag
 */

export interface RawAnswers {
  [questionId: string]: number;
}

export function calculatePSS10Score(answers: RawAnswers): {
  score: number;
  severityLevel: SeverityLevel;
  severityLabel: string;
  itemBreakdown: Record<string, number>;
} {
  const reverseItems = ['pss_4', 'pss_5', 'pss_7', 'pss_8'];
  let totalScore = 0;
  const itemBreakdown: Record<string, number> = {};

  for (let i = 1; i <= 10; i++) {
    const id = `pss_${i}`;
    const rawVal = answers[id] ?? 0;
    const scoredVal = reverseItems.includes(id) ? 4 - rawVal : rawVal;
    itemBreakdown[id] = scoredVal;
    totalScore += scoredVal;
  }

  let severityLevel: SeverityLevel = 'minimal';
  let severityLabel = 'Low Perceived Stress';

  if (totalScore >= 27) {
    severityLevel = 'severe';
    severityLabel = 'High Perceived Stress';
  } else if (totalScore >= 14) {
    severityLevel = 'moderate';
    severityLabel = 'Moderate Perceived Stress';
  } else {
    severityLevel = 'minimal';
    severityLabel = 'Low Perceived Stress';
  }

  return { score: totalScore, severityLevel, severityLabel, itemBreakdown };
}

export function calculateGAD7Score(answers: RawAnswers): {
  score: number;
  severityLevel: SeverityLevel;
  severityLabel: string;
  itemBreakdown: Record<string, number>;
} {
  let totalScore = 0;
  const itemBreakdown: Record<string, number> = {};

  for (let i = 1; i <= 7; i++) {
    const id = `gad_${i}`;
    const val = answers[id] ?? 0;
    itemBreakdown[id] = val;
    totalScore += val;
  }

  let severityLevel: SeverityLevel = 'minimal';
  let severityLabel = 'Minimal Anxiety Symptoms';

  if (totalScore >= 15) {
    severityLevel = 'severe';
    severityLabel = 'Severe Anxiety Indicators';
  } else if (totalScore >= 10) {
    severityLevel = 'moderate';
    severityLabel = 'Moderate Anxiety Indicators';
  } else if (totalScore >= 5) {
    severityLevel = 'mild';
    severityLabel = 'Mild Anxiety Indicators';
  } else {
    severityLevel = 'minimal';
    severityLabel = 'Minimal Anxiety Symptoms';
  }

  return { score: totalScore, severityLevel, severityLabel, itemBreakdown };
}

export function calculatePHQ9Score(answers: RawAnswers): {
  score: number;
  severityLevel: SeverityLevel;
  severityLabel: string;
  itemBreakdown: Record<string, number>;
  item9Score: number;
} {
  let totalScore = 0;
  const itemBreakdown: Record<string, number> = {};

  for (let i = 1; i <= 9; i++) {
    const id = `phq_${i}`;
    const val = answers[id] ?? 0;
    itemBreakdown[id] = val;
    totalScore += val;
  }

  const item9Score = answers['phq_9'] ?? 0;

  let severityLevel: SeverityLevel = 'minimal';
  let severityLabel = 'Minimal or No Depression Symptoms';

  if (totalScore >= 20) {
    severityLevel = 'severe';
    severityLabel = 'Severe Depression Indicators';
  } else if (totalScore >= 15) {
    severityLevel = 'moderately_severe';
    severityLabel = 'Moderately Severe Depression Indicators';
  } else if (totalScore >= 10) {
    severityLevel = 'moderate';
    severityLabel = 'Moderate Depression Indicators';
  } else if (totalScore >= 5) {
    severityLevel = 'mild';
    severityLabel = 'Mild Depression Indicators';
  } else {
    severityLevel = 'minimal';
    severityLabel = 'Minimal or No Depression Symptoms';
  }

  return { score: totalScore, severityLevel, severityLabel, itemBreakdown, item9Score };
}

export function evaluateClinicalSafety(answers: RawAnswers): {
  isHighRisk: boolean;
  hasSuicidalIdeation: boolean;
  hasImmediateIntent: boolean;
  hasUnsafeEnvironment: boolean;
  phq9Item9Score: number;
  notes: string[];
} {
  const phq9Item9Score = answers['phq_9'] ?? 0;
  const activeThoughts = answers['safety_active_thoughts'] ?? 0;
  const immediatePlan = answers['safety_immediate_plan'] ?? 0;
  const environmentSafe = answers['safety_current_environment'] ?? 0;

  const hasSuicidalIdeation = phq9Item9Score > 0 || activeThoughts > 0;
  const hasImmediateIntent = immediatePlan >= 2 || activeThoughts >= 3;
  const hasUnsafeEnvironment = environmentSafe >= 2;

  const notes: string[] = [];

  if (hasImmediateIntent) {
    notes.push('Reported immediate intention or active distress regarding self-harm.');
  } else if (hasSuicidalIdeation) {
    notes.push('Reported thoughts of self-harm or feelings that being dead would be better.');
  }

  if (hasUnsafeEnvironment) {
    notes.push('Reported feeling unsafe in their immediate environment.');
  }

  const isHighRisk = hasImmediateIntent || hasSuicidalIdeation || hasUnsafeEnvironment;

  return {
    isHighRisk,
    hasSuicidalIdeation,
    hasImmediateIntent,
    hasUnsafeEnvironment,
    phq9Item9Score,
    notes,
  };
}

export function compileComprehensiveReport(
  category: AssessmentCategory,
  answers: RawAnswers,
  demographics: DemographicContext
): ComprehensiveAssessmentReport {
  const results: ComprehensiveAssessmentReport['results'] = {};
  const safetyFlags = evaluateClinicalSafety(answers);

  // 1. Process Stress if requested
  if (category === 'stress' || category === 'combined') {
    const pss = calculatePSS10Score(answers);
    const symptoms: string[] = [];
    if ((answers['pss_1'] ?? 0) >= 2) symptoms.push('Frequently upset by unexpected changes');
    if ((answers['pss_2'] ?? 0) >= 2) symptoms.push('Feeling unable to control important life events');
    if ((answers['pss_3'] ?? 0) >= 2) symptoms.push('Persistent nervousness and tension');
    if ((answers['pss_6'] ?? 0) >= 2) symptoms.push('Perception that responsibilities exceed coping ability');
    if ((answers['pss_10'] ?? 0) >= 2) symptoms.push('Difficulties piling up faster than they can be resolved');
    if ((answers['sc_physical'] ?? 0) >= 2) symptoms.push('Somatic tension (tight muscles, headaches)');
    if ((answers['sc_exhaustion'] ?? 0) >= 2) symptoms.push('Frequent mental and emotional fatigue');

    const warningSigns: string[] = [];
    if (pss.score >= 27) warningSigns.push('Significantly elevated perceived stress indicating potential burnout risk');
    if (demographics.sleepQuality?.toLowerCase().includes('poor')) warningSigns.push('Chronic sleep disruption compounding stress response');

    const recommendations = generatePersonalizedRecommendations('stress', pss.severityLevel, demographics, answers);

    results.stress = {
      category: 'stress',
      instrumentName: 'Perceived Stress Scale (PSS-10)',
      instrumentVersion: 'Cohen et al., 1983 (10-Item Edition)',
      score: pss.score,
      maxScore: 40,
      severityLevel: pss.severityLevel,
      severityLabel: pss.severityLabel,
      clinicalMeaning:
        pss.severityLevel === 'severe'
          ? 'Responses reflect high perceived stress over the past month. You may be feeling overwhelmed by external demands with diminished coping bandwidth.'
          : pss.severityLevel === 'moderate'
          ? 'Responses reflect moderate perceived stress. Daily challenges are noticeable and may be draining your energy if left unmanaged.'
          : 'Responses reflect low perceived stress. You report feeling generally capable of handling daily problems and unexpected events.',
      symptomSummary: symptoms.length > 0 ? symptoms : ['No prominent elevated stress symptoms reported'],
      contributingFactors: demographics.majorStressors && demographics.majorStressors.length > 0
        ? demographics.majorStressors
        : ['General day-to-day responsibilities'],
      functionalImpact:
        pss.severityLevel === 'severe'
          ? 'May substantially impair focus, sleep restorative quality, and emotional regulation.'
          : pss.severityLevel === 'moderate'
          ? 'May cause occasional fatigue, reduced patience, and tension during peak busy periods.'
          : 'Minimal observable interference with daily functioning reported.',
      warningSigns,
      recommendations,
    };
  }

  // 2. Process Anxiety if requested
  if (category === 'anxiety' || category === 'combined') {
    const gad = calculateGAD7Score(answers);
    const symptoms: string[] = [];
    if ((answers['gad_1'] ?? 0) >= 2) symptoms.push('Feeling nervous, anxious, or constantly on edge');
    if ((answers['gad_2'] ?? 0) >= 2) symptoms.push('Inability to stop or control persistent worry');
    if ((answers['gad_3'] ?? 0) >= 2) symptoms.push('Excessive worry spanning multiple life domains');
    if ((answers['gad_4'] ?? 0) >= 2) symptoms.push('Substantial difficulty relaxing or unwinding');
    if ((answers['gad_5'] ?? 0) >= 2) symptoms.push('Motor restlessness or trouble sitting still');
    if ((answers['gad_6'] ?? 0) >= 2) symptoms.push('Heightened irritability or reduced tolerance');
    if ((answers['gad_7'] ?? 0) >= 2) symptoms.push('Apprehensive dread as if something terrible will occur');

    const warningSigns: string[] = [];
    if (gad.score >= 10) warningSigns.push('Score meets or exceeds clinical threshold (GAD-7 ≥ 10) where formal diagnostic assessment is recommended');
    if ((answers['gad_functional'] ?? 0) >= 2) warningSigns.push('Symptoms are actively interfering with work, home duties, or interpersonal relationships');

    const recommendations = generatePersonalizedRecommendations('anxiety', gad.severityLevel, demographics, answers);

    results.anxiety = {
      category: 'anxiety',
      instrumentName: 'Generalized Anxiety Disorder 7-Item Scale (GAD-7)',
      instrumentVersion: 'Spitzer et al., 2006',
      score: gad.score,
      maxScore: 21,
      severityLevel: gad.severityLevel,
      severityLabel: gad.severityLabel,
      clinicalMeaning:
        gad.severityLevel === 'severe'
          ? 'Responses indicate severe anxiety symptoms over the past two weeks. Symptoms appear pervasive and likely cause significant distress.'
          : gad.severityLevel === 'moderate'
          ? 'Responses indicate moderate anxiety symptoms. Clinically recognized threshold for seeking formal professional guidance.'
          : gad.severityLevel === 'mild'
          ? 'Responses reflect mild anxiety indicators. Common in response to transitional life stressors or demanding periods.'
          : 'Responses reflect minimal anxiety indicators within typical non-clinical ranges.',
      symptomSummary: symptoms.length > 0 ? symptoms : ['No pronounced anxiety symptoms reported in the past 14 days'],
      contributingFactors: demographics.caffeineIntake?.includes('High')
        ? ['High caffeine intake may amplify autonomic nervous arousal', ...(demographics.majorStressors || [])]
        : (demographics.majorStressors || ['General daily demands']),
      functionalImpact:
        (answers['gad_functional'] ?? 0) >= 2
          ? 'Reported significant interference with occupational, academic, or social activities.'
          : 'Mild or manageable impact on daily responsibilities reported.',
      warningSigns,
      recommendations,
    };
  }

  // 3. Process Depression if requested
  if (category === 'depression' || category === 'combined') {
    const phq = calculatePHQ9Score(answers);
    const symptoms: string[] = [];
    if ((answers['phq_1'] ?? 0) >= 2) symptoms.push('Marked anhedonia (loss of interest or pleasure in activities)');
    if ((answers['phq_2'] ?? 0) >= 2) symptoms.push('Depressed, down, or hopeless mood on most days');
    if ((answers['phq_3'] ?? 0) >= 2) symptoms.push('Significant sleep disruption (insomnia or hypersomnia)');
    if ((answers['phq_4'] ?? 0) >= 2) symptoms.push('Persistent low energy, sluggishness, or fatigue');
    if ((answers['phq_5'] ?? 0) >= 2) symptoms.push('Appetite alteration (under-eating or over-eating)');
    if ((answers['phq_6'] ?? 0) >= 2) symptoms.push('Harsh self-criticism, guilt, or feeling like a failure');
    if ((answers['phq_7'] ?? 0) >= 2) symptoms.push('Impaired concentration and mental focus');
    if ((answers['phq_8'] ?? 0) >= 2) symptoms.push('Psychomotor agitation or noticeable slowing');
    if (phq.item9Score > 0) symptoms.push('Thoughts of self-harm or being better off dead');

    const warningSigns: string[] = [];
    if (safetyFlags.isHighRisk) {
      warningSigns.push('CRITICAL: User indicated safety concerns or suicidal ideation — immediate clinical evaluation indicated');
    }
    if (phq.score >= 15) {
      warningSigns.push('Score indicates moderately severe to severe depressive symptom indicators requiring comprehensive clinical evaluation');
    }
    if ((answers['phq_functional'] ?? 0) >= 2) {
      warningSigns.push('Substantial disruption to basic daily living, career, or domestic functioning');
    }

    const recommendations = generatePersonalizedRecommendations('depression', phq.severityLevel, demographics, answers);

    results.depression = {
      category: 'depression',
      instrumentName: 'Patient Health Questionnaire-9 (PHQ-9)',
      instrumentVersion: 'Kroenke et al., 2001',
      score: phq.score,
      maxScore: 27,
      severityLevel: phq.severityLevel,
      severityLabel: phq.severityLabel,
      clinicalMeaning:
        phq.severityLevel === 'severe'
          ? 'Responses reflect severe depressive symptom indicators. Professional evaluation by a doctor or psychologist is strongly recommended.'
          : phq.severityLevel === 'moderately_severe'
          ? 'Responses reflect moderately severe depressive symptom indicators. Symptoms are likely causing noticeable emotional and functional distress.'
          : phq.severityLevel === 'moderate'
          ? 'Responses indicate moderate depressive symptom indicators that warrant discussion with a healthcare provider.'
          : phq.severityLevel === 'mild'
          ? 'Responses reflect mild depressive symptoms. Lifestyle interventions and monitoring for persistence are suggested.'
          : 'Responses indicate minimal or no depressive symptoms over the preceding two weeks.',
      symptomSummary: symptoms.length > 0 ? symptoms : ['No notable depressive symptoms reported in the past 14 days'],
      contributingFactors: demographics.symptomDuration?.includes('Persistent')
        ? ['Prolonged duration (>6 months) suggests established patterns', ...(demographics.majorStressors || [])]
        : (demographics.majorStressors || ['General life circumstances']),
      functionalImpact:
        (answers['phq_functional'] ?? 0) >= 2
          ? 'Marked difficulty managing normal work, home, or social responsibilities.'
          : 'Low to moderate self-reported functional interference.',
      warningSigns,
      recommendations,
    };
  }

  // Summary statement
  let clinicianSummary = '';
  if (safetyFlags.isHighRisk) {
    clinicianSummary = 'SAFETY PRIORITY: This assessment flagged urgent safety indicators. While screening instruments provide structured symptom metrics, direct safety responses supersede score totals. Prompt crisis support and clinical consultation are advised.';
  } else {
    clinicianSummary = `This screening completed on ${new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })} provides preliminary insights based on validated psychometric scales (${category === 'combined' ? 'PSS-10, GAD-7, and PHQ-9' : category.toUpperCase()}). These results are intended for personal wellness awareness and to facilitate informed discussions with qualified medical or psychological practitioners. They do not constitute a psychiatric diagnosis.`;
  }

  return {
    id: `report_${Date.now()}`,
    timestamp: new Date().toISOString(),
    completedCategories: category,
    demographics,
    results,
    safetyFlags,
    clinicianSummary,
    isCustomWellnessOnly: false,
  };
}
