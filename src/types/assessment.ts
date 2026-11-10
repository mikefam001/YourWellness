/**
 * MindPulse Mental Wellness Assessment Types
 * Fully typed data structures for screening instruments, demographic factors,
 * scoring models, clinical safety gates, and personalized action plans.
 */

export type AssessmentCategory = 'stress' | 'anxiety' | 'depression' | 'combined';

export type ResponseOption = {
  value: number;
  label: string;
  subtext?: string;
};

export type Question = {
  id: string;
  category: 'stress' | 'anxiety' | 'depression' | 'context' | 'safety';
  text: string;
  subtext?: string;
  instrumentName?: 'PSS-10' | 'GAD-7' | 'PHQ-9' | 'MindPulse-Contextual' | 'Safety-Screen';
  options: ResponseOption[];
  isReverseScored?: boolean;
  isRequired?: boolean;
};

export type FunctionalImpairmentRating = 'not_difficult' | 'somewhat_difficult' | 'very_difficult' | 'extremely_difficult';

export interface DemographicContext {
  ageGroup?: string;
  gender?: string;
  country?: string;
  occupation?: string;
  sleepHours?: string;
  sleepQuality?: string;
  physicalActivity?: string;
  caffeineIntake?: string;
  majorStressors?: string[];
  symptomDuration?: string;
  previousSupport?: string;
  impactOnDailyLife?: string;
}

export type SeverityLevel = 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe';

export interface AssessmentResultItem {
  category: 'stress' | 'anxiety' | 'depression';
  instrumentName: string;
  instrumentVersion: string;
  score: number;
  maxScore: number;
  severityLevel: SeverityLevel;
  severityLabel: string;
  clinicalMeaning: string;
  symptomSummary: string[];
  contributingFactors: string[];
  functionalImpact: string;
  warningSigns: string[];
  recommendations: {
    today: string[];
    sevenDays: string[];
    lifestyle: string[];
    whenToSeekProfessionalHelp: string[];
  };
}

export interface ComprehensiveAssessmentReport {
  id: string;
  timestamp: string;
  completedCategories: AssessmentCategory;
  demographics: DemographicContext;
  results: {
    stress?: AssessmentResultItem;
    anxiety?: AssessmentResultItem;
    depression?: AssessmentResultItem;
  };
  safetyFlags: {
    isHighRisk: boolean;
    hasSuicidalIdeation: boolean;
    hasImmediateIntent: boolean;
    hasUnsafeEnvironment: boolean;
    phq9Item9Score: number;
    notes: string[];
  };
  clinicianSummary: string;
  isCustomWellnessOnly: boolean;
}

export interface StoredSessionProgress {
  id: string;
  date: string;
  category: AssessmentCategory;
  stressScore?: number;
  anxietyScore?: number;
  depressionScore?: number;
  stressSeverity?: string;
  anxietySeverity?: string;
  depressionSeverity?: string;
  isHighRisk?: boolean;
}
