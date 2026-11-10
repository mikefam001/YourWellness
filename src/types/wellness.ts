/**
 * Wellness Toolkit and Educational Center Types
 */

export type WellnessArticleCategory = 'stress' | 'anxiety' | 'depression' | 'general';

export interface EducationalArticle {
  id: string;
  title: string;
  category: WellnessArticleCategory;
  categoryLabel: string;
  readTime: string;
  summary: string;
  content: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  clinicalTakeaway: string;
  references: string[];
}

export type BreathingTechniqueId = 'box' | 'relax_478' | 'belly_deep';

export interface BreathingPhase {
  name: string;
  durationSeconds: number;
  instruction: string;
}

export interface BreathingTechnique {
  id: BreathingTechniqueId;
  title: string;
  purpose: string;
  phases: BreathingPhase[];
  totalCyclesRecommended: number;
  clinicalNote: string;
}

export interface GroundingStep {
  count: number;
  sense: string;
  prompt: string;
  instruction: string;
  placeholder: string;
}

export interface DailyPlannerEntry {
  date: string;
  moodRating: number; // 1 to 5
  sleepHours: number;
  gratitudeItems: [string, string, string];
  mainWellnessGoal: string;
  worryItem?: string;
  reframeAction?: string;
}
